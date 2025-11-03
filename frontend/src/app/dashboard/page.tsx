'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Building2, LogOut, User, TrendingUp } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="spinner w-12 h-12"></div>
      </div>
    );
  }

  if (!user) return null;

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
              <span className="body-ar text-gray-700">{user.name}</span>
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

      {/* Main Content */}
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="heading-ar text-3xl mb-2 text-gray-900">
            مرحباً، {user.name} 👋
          </h1>
          <p className="body-ar text-gray-600">
            إليك نظرة عامة على استثماراتك وتوصياتك
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<TrendingUp className="w-8 h-8 text-primary-600" />}
            title="التوصيات النشطة"
            value="0"
          />
          <StatCard
            icon={<User className="w-8 h-8 text-blue-600" />}
            title="المحادثات"
            value="0"
          />
          <StatCard
            icon={<Building2 className="w-8 h-8 text-green-600" />}
            title="حالة الحساب"
            value="نشط"
          />
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-12 h-12 text-primary-600" />
            </div>
            <h2 className="heading-ar text-2xl mb-4 text-gray-900">
              🎉 مبروك! حسابك جاهز
            </h2>
            <p className="body-ar text-gray-600 mb-6 max-w-2xl mx-auto">
              الآن يمكنك البدء باستكشاف الفرص الاستثمارية، التواصل مع المستشارين، وقراءة المحتوى التعليمي.
              عندما يتم ربط النظام بالخادم (Backend)، ستحصل على توصيات مخصصة بناءً على ملفك الاستثماري.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="btn btn-primary">
                العودة للرئيسية
              </Link>
              <Link href="/library" className="btn btn-outline">
                تصفح المكتبة
              </Link>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
          <h3 className="heading-ar text-lg mb-2 text-blue-900">📝 ملاحظة للتطوير</h3>
          <p className="body-ar text-sm text-blue-800">
            هذه نسخة تجريبية من لوحة التحكم. لتفعيل جميع الميزات (التوصيات، المحادثات، المحتوى)، 
            يجب تشغيل الخادم (Backend) وربطه بقاعدة البيانات MongoDB.
            جميع ملفات الكود الخاصة بالخادم موجودة في مجلد <code className="bg-blue-200 px-2 py-1 rounded">backend/</code>
          </p>
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-4">
        <div>{icon}</div>
        <div>
          <p className="body-ar text-sm text-gray-600">{title}</p>
          <p className="heading-ar text-2xl text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

