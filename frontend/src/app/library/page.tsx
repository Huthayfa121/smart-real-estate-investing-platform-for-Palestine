'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { contentService } from '@/services/content.service';
import { Building2, BookOpen, Video, FileText, TrendingUp, Search, Filter, LogOut } from 'lucide-react';

interface Content {
  _id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'market-report';
  category: string;
  imageUrl?: string;
  views: number;
  likes: number;
  publishedAt?: string;
}

export default function LibraryPage() {
  const { user, logout } = useAuth();
  const [content, setContent] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    loadContent();
  }, [selectedType, selectedCategory]);

  const loadContent = async () => {
    try {
      setLoading(true);
      const params: any = { status: 'published' };
      if (selectedType) params.type = selectedType;
      if (selectedCategory) params.category = selectedCategory;
      
      const response = await contentService.getContent(params);
      setContent(response.data.content || []);
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

  const filteredContent = content.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'guide':
        return <BookOpen className="w-5 h-5" />;
      case 'market-report':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-ar text-4xl mb-4">📚 مكتبة المحتوى التعليمي</h1>
            <p className="body-ar text-xl text-primary-50">
              تعلم كل ما تحتاجه عن الاستثمار العقاري في فلسطين
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="ابحث في المكتبة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">جميع الأنواع</option>
              <option value="article">مقالات</option>
              <option value="video">فيديوهات</option>
              <option value="guide">أدلة</option>
              <option value="market-report">تقارير السوق</option>
            </select>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">جميع الفئات</option>
              <option value="للمبتدئين">للمبتدئين</option>
              <option value="استثمار الأراضي">استثمار الأراضي</option>
              <option value="إدارة العقارات">إدارة العقارات</option>
              <option value="القوانين والتراخيص">القوانين والتراخيص</option>
              <option value="تمويل وقروض">تمويل وقروض</option>
              <option value="تحليل السوق">تحليل السوق</option>
            </select>
          </div>
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <p className="body-ar text-red-800">{error}</p>
            <button onClick={loadContent} className="btn btn-primary mt-4">
              إعادة المحاولة
            </button>
          </div>
        ) : filteredContent.length === 0 ? (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-12 text-center">
            <BookOpen className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="heading-ar text-2xl mb-2 text-blue-900">لا يوجد محتوى متاح حالياً</h3>
            <p className="body-ar text-blue-800 mb-6">
              سيتم إضافة المحتوى التعليمي قريباً. يمكنك العودة لاحقاً لتصفح المقالات والفيديوهات.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/dashboard" className="btn btn-primary">
                العودة للوحة التحكم
              </Link>
              <Link href="/" className="btn btn-outline">
                الصفحة الرئيسية
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="body-ar text-gray-600">
                عرض {filteredContent.length} من {content.length} محتوى
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((item) => (
                <Link
                  key={item._id}
                  href={`/library/${item._id}`}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative overflow-hidden">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {getTypeIcon(item.type)}
                        <span className="text-white text-6xl opacity-50">
                          {getTypeIcon(item.type)}
                        </span>
                      </div>
                    )}
                    {/* Type Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-2">
                      {getTypeIcon(item.type)}
                      <span className="body-ar text-sm font-medium">{getTypeLabel(item.type)}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="mb-2">
                      <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs body-ar">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="heading-ar text-xl mb-2 text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="body-ar text-gray-600 text-sm line-clamp-3 mb-4">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        👁️ {item.views || 0} مشاهدة
                      </span>
                      <span className="flex items-center gap-1">
                        ❤️ {item.likes || 0} إعجاب
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

