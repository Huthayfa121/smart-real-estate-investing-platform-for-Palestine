'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { contentService } from '@/services/content.service';
import { Building2, ArrowRight, Calendar, Eye, Heart, FileText, Video, BookOpen, TrendingUp, LogOut } from 'lucide-react';

interface Content {
  _id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'market-report';
  category: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  imageUrl?: string;
  videoUrl?: string;
  views: number;
  likes: number;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
}

export default function ContentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (params.id) {
      loadContent(params.id as string);
    }
  }, [params.id]);

  const loadContent = async (id: string) => {
    try {
      setLoading(true);
      const response = await contentService.getContentById(id);
      setContent(response.data.content);
      setError('');
    } catch (err: any) {
      console.error('Error loading content:', err);
      setError('فشل في تحميل المحتوى');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-6 h-6" />;
      case 'video':
        return <Video className="w-6 h-6" />;
      case 'guide':
        return <BookOpen className="w-6 h-6" />;
      case 'market-report':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <FileText className="w-6 h-6" />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: any = {
      article: 'مقالة',
      video: 'فيديو',
      guide: 'دليل',
      'market-report': 'تقرير سوق',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-xl shadow-md p-8 max-w-md text-center">
          <p className="body-ar text-red-600 mb-4">{error || 'المحتوى غير موجود'}</p>
          <Link href="/library" className="btn btn-primary">
            العودة للمكتبة
          </Link>
        </div>
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
              {user ? (
                <>
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
                </>
              ) : (
                <>
                  <Link href="/login" className="body-ar text-gray-700 hover:text-primary-600">
                    تسجيل الدخول
                  </Link>
                  <Link href="/signup" className="btn btn-primary btn-sm">
                    تسجيل
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/library"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 body-ar"
          >
            <ArrowRight className="w-4 h-4" />
            العودة للمكتبة
          </Link>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            {/* Hero Image/Video */}
            {content.type === 'video' && content.videoUrl ? (
              <div className="aspect-video bg-black">
                <video
                  src={content.videoUrl}
                  controls
                  className="w-full h-full"
                  poster={content.imageUrl}
                >
                  متصفحك لا يدعم تشغيل الفيديو
                </video>
              </div>
            ) : content.imageUrl ? (
              <img
                src={content.imageUrl}
                alt={content.title}
                className="w-full h-64 md:h-96 object-cover"
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <div className="text-white text-8xl opacity-50">
                  {getTypeIcon(content.type)}
                </div>
              </div>
            )}

            <div className="p-8">
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <div className="flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-1 rounded-full">
                  {getTypeIcon(content.type)}
                  <span className="body-ar text-sm font-medium">{getTypeLabel(content.type)}</span>
                </div>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm body-ar">
                  {content.category}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {content.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {content.likes || 0}
                  </span>
                  {content.publishedAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(content.publishedAt).toLocaleDateString('ar-EG')}
                    </span>
                  )}
                </div>
              </div>

              {/* Title */}
              <h1 className="heading-ar text-3xl md:text-4xl mb-4 text-gray-900">
                {content.title}
              </h1>

              {/* Description */}
              <p className="body-ar text-xl text-gray-600 mb-6">
                {content.description}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pb-6 border-b border-gray-200">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-700 font-bold text-lg">
                    {content.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="body-ar font-medium text-gray-900">{content.author.name}</p>
                  <p className="text-sm text-gray-600">كاتب ومحلل عقاري</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <div 
              className="prose prose-lg max-w-none body-ar"
              style={{ direction: 'rtl' }}
              dangerouslySetInnerHTML={{ __html: content.content }}
            />
          </div>

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="bg-white rounded-xl shadow-md p-6 mb-8">
              <h3 className="heading-ar text-lg mb-3 text-gray-900">الكلمات المفتاحية</h3>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm body-ar"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Content / CTA */}
          <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-8 text-center">
            <h3 className="heading-ar text-2xl mb-4 text-primary-900">
              هل أعجبك هذا المحتوى؟
            </h3>
            <p className="body-ar text-primary-800 mb-6">
              استكشف المزيد من المقالات والأدلة التعليمية في مكتبتنا
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/library" className="btn btn-primary">
                تصفح المكتبة
              </Link>
              {user ? (
                <Link href="/dashboard" className="btn btn-outline">
                  لوحة التحكم
                </Link>
              ) : (
                <Link href="/signup" className="btn btn-outline">
                  سجل مجاناً
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

