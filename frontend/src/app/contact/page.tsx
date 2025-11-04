'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Building2, Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSuccess(true);
    setSending(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <Link href="/" className="flex items-center gap-2 text-primary-700">
            <Building2 className="w-8 h-8" />
            <span className="heading-ar text-xl font-bold">منصة الاستثمار العقاري</span>
          </Link>
        </div>
      </header>

      <main className="container-custom py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-ar text-5xl mb-4 text-gray-900">📞 تواصل معنا</h1>
            <p className="body-ar text-xl text-gray-600">
              نحن هنا للإجابة على أسئلتك ومساعدتك
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-xl shadow-md p-8">
              <h2 className="heading-ar text-2xl mb-6 text-gray-900">أرسل لنا رسالة</h2>
              
              {success && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                  <p className="body-ar text-green-800">
                    ✓ تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="body-ar block text-gray-700 mb-2">الاسم</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="أدخل اسمك"
                  />
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">البريد الإلكتروني</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">الموضوع</label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">اختر الموضوع</option>
                    <option value="general">استفسار عام</option>
                    <option value="technical">مشكلة تقنية</option>
                    <option value="advisor">استفسار عن المستشارين</option>
                    <option value="partnership">فرص الشراكة</option>
                    <option value="other">أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">الرسالة</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="اكتب رسالتك هنا..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full btn btn-primary flex items-center justify-center gap-2"
                >
                  {sending ? (
                    <>
                      <div className="spinner w-4 h-4 border-white"></div>
                      <span>جاري الإرسال...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>إرسال الرسالة</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md p-8">
                <h2 className="heading-ar text-2xl mb-6 text-gray-900">معلومات الاتصال</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="heading-ar text-lg mb-1 text-gray-900">البريد الإلكتروني</h3>
                      <p className="body-ar text-gray-600">info@palestine-realestate.com</p>
                      <p className="body-ar text-gray-600">support@palestine-realestate.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="heading-ar text-lg mb-1 text-gray-900">الهاتف</h3>
                      <p className="body-ar text-gray-600">+970-XXX-XXXX</p>
                      <p className="body-ar text-sm text-gray-500 mt-1">
                        الأحد - الخميس: 9:00 صباحاً - 5:00 مساءً
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="heading-ar text-lg mb-1 text-gray-900">العنوان</h3>
                      <p className="body-ar text-gray-600">
                        رام الله، فلسطين<br />
                        شارع الإرسال
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
                <h3 className="heading-ar text-lg mb-3 text-primary-900">❓ الأسئلة الشائعة</h3>
                <p className="body-ar text-sm text-primary-800 mb-4">
                  قبل التواصل معنا، قد تجد إجابتك في قسم الأسئلة الشائعة
                </p>
                <Link href="/library" className="btn btn-outline border-primary-600 text-primary-700 hover:bg-primary-100 w-full">
                  تصفح المكتبة
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

