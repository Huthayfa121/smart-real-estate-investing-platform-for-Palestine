'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { conversationService } from '@/services/conversation.service';
import { Building2, Send, ArrowRight, User, Clock, LogOut, MessageSquare } from 'lucide-react';
import Link from 'next/link';

interface Message {
  _id?: string;
  sender: string;
  content: string;
  timestamp: string | Date;
  isRead: boolean;
}

interface Conversation {
  _id: string;
  participants: Array<{
    _id: string;
    name: string;
    email: string;
  }>;
  messages: Message[];
  lastMessage?: string;
  lastMessageAt?: string;
  status: string;
}

export default function ConversationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, logout } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    const advisorId = searchParams.get('advisorId');
    if (advisorId) {
      createConversation(advisorId);
    } else {
      loadConversations();
    }
  }, [user, searchParams]);

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadConversations = async () => {
    try {
      setLoading(true);
      const response = await conversationService.getConversations();
      const convos = response.data.conversations || [];
      setConversations(convos);
      if (convos.length > 0 && !selectedConversation) {
        setSelectedConversation(convos[0]);
      }
      setError('');
    } catch (err: any) {
      console.error('Error loading conversations:', err);
      setError('فشل في تحميل المحادثات');
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (advisorId: string) => {
    try {
      setLoading(true);
      const response = await conversationService.createConversation(advisorId);
      const conversation = response.data.conversation;
      setSelectedConversation(conversation);
      await loadConversations();
    } catch (err: any) {
      console.error('Error creating conversation:', err);
      setError('فشل في إنشاء المحادثة');
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !selectedConversation) return;

    try {
      setSending(true);
      await conversationService.addMessage(selectedConversation._id, message.trim());
      
      // Reload conversation to get updated messages
      const response = await conversationService.getConversationById(selectedConversation._id);
      setSelectedConversation(response.data.conversation);
      
      // Update conversations list
      await loadConversations();
      
      setMessage('');
      setError('');
    } catch (err: any) {
      console.error('Error sending message:', err);
      setError('فشل في إرسال الرسالة');
    } finally {
      setSending(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const getOtherParticipant = (conversation: Conversation) => {
    return conversation.participants.find(p => p._id !== user?.id);
  };

  const formatMessageTime = (timestamp: string | Date) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return minutes < 1 ? 'الآن' : `منذ ${minutes} دقيقة`;
    } else if (hours < 24) {
      return `منذ ${hours} ساعة`;
    } else {
      return date.toLocaleDateString('ar-EG', { month: 'short', day: 'numeric' });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-primary-700">
              <Building2 className="w-8 h-8" />
              <span className="heading-ar text-xl font-bold">منصة الاستثمار العقاري</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="body-ar text-gray-700 hover:text-primary-600">
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
                <span className="body-ar hidden sm:inline">تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="heading-ar text-3xl text-gray-900">💬 المحادثات</h1>
        </div>

        {loading && conversations.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : conversations.length === 0 ? (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-12 text-center">
            <MessageSquare className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="heading-ar text-2xl mb-2 text-blue-900">لا توجد محادثات بعد</h3>
            <p className="body-ar text-blue-800 mb-6">
              ابدأ محادثة مع أحد المستشارين للحصول على المساعدة في قراراتك الاستثمارية
            </p>
            <Link href="/advisors" className="btn btn-primary">
              تصفح المستشارين
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Conversations List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-4 bg-primary-600 text-white">
                  <h2 className="heading-ar text-lg">المحادثات ({conversations.length})</h2>
                </div>
                <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
                  {conversations.map((conv) => {
                    const other = getOtherParticipant(conv);
                    const isSelected = selectedConversation?._id === conv._id;
                    
                    return (
                      <button
                        key={conv._id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`w-full p-4 text-right hover:bg-gray-50 transition-colors ${
                          isSelected ? 'bg-primary-50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-primary-700 font-bold text-lg">
                              {other?.name.charAt(0)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="heading-ar text-sm font-medium text-gray-900 truncate">
                                {other?.name}
                              </h3>
                              {conv.lastMessageAt && (
                                <span className="text-xs text-gray-500">
                                  {formatMessageTime(conv.lastMessageAt)}
                                </span>
                              )}
                            </div>
                            <p className="body-ar text-sm text-gray-600 truncate">
                              {conv.lastMessage || 'لا توجد رسائل بعد'}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Chat Area */}
            <div className="lg:col-span-2">
              {selectedConversation ? (
                <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[600px]">
                  {/* Chat Header */}
                  <div className="p-4 bg-primary-600 text-white flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="font-bold">
                        {getOtherParticipant(selectedConversation)?.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h2 className="heading-ar text-lg">
                        {getOtherParticipant(selectedConversation)?.name}
                      </h2>
                      <p className="text-xs text-primary-100">
                        {getOtherParticipant(selectedConversation)?.email}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    {selectedConversation.messages.length === 0 ? (
                      <div className="flex items-center justify-center h-full">
                        <p className="body-ar text-gray-500">ابدأ المحادثة بإرسال رسالة</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {selectedConversation.messages.map((msg, index) => {
                          const isMe = msg.sender === user.id;
                          
                          return (
                            <div
                              key={index}
                              className={`flex ${isMe ? 'justify-start' : 'justify-end'}`}
                            >
                              <div
                                className={`max-w-[70%] ${
                                  isMe
                                    ? 'bg-primary-600 text-white'
                                    : 'bg-white text-gray-900'
                                } rounded-2xl px-4 py-3 shadow-sm`}
                              >
                                <p className="body-ar text-sm">{msg.content}</p>
                                <div
                                  className={`flex items-center gap-1 mt-1 text-xs ${
                                    isMe ? 'text-primary-100' : 'text-gray-500'
                                  }`}
                                >
                                  <Clock className="w-3 h-3" />
                                  <span>{formatMessageTime(msg.timestamp)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    )}
                  </div>

                  {/* Message Input */}
                  <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
                    {error && (
                      <div className="mb-2 bg-red-50 border border-red-200 rounded-lg p-2">
                        <p className="body-ar text-xs text-red-800">{error}</p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="اكتب رسالتك..."
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        disabled={sending}
                      />
                      <button
                        type="submit"
                        disabled={sending || !message.trim()}
                        className="btn btn-primary px-6 flex items-center gap-2"
                      >
                        {sending ? (
                          <div className="spinner w-4 h-4 border-white"></div>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>إرسال</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="body-ar text-xs text-gray-500 mt-2">
                      💡 نصيحة: كن واضحاً ومحدداً في أسئلتك للحصول على أفضل المساعدة
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-12 text-center h-[600px] flex items-center justify-center">
                  <div>
                    <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="body-ar text-gray-500">اختر محادثة لعرض الرسائل</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <h3 className="heading-ar text-lg mb-2 text-yellow-900">⚠️ إخلاء المسؤولية</h3>
          <p className="body-ar text-sm text-yellow-800">
            المعلومات المقدمة من المستشارين هي لأغراض إرشادية فقط ولا تشكل نصيحة قانونية أو مالية ملزمة. 
            يُنصح بالتشاور مع متخصصين معتمدين قبل اتخاذ أي قرارات استثمارية.
          </p>
        </div>
      </main>
    </div>
  );
}

