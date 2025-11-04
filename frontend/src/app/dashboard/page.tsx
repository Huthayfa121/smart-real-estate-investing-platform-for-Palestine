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

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/recommendations" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <TrendingUp className="w-8 h-8 text-primary-600" />
              <h3 className="heading-ar text-lg text-gray-900">توصياتي</h3>
            </div>
            <p className="body-ar text-sm text-gray-600">
              اكتشف الفرص الاستثمارية المخصصة لك
            </p>
          </Link>

          <Link href="/advisors" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <User className="w-8 h-8 text-blue-600" />
              <h3 className="heading-ar text-lg text-gray-900">المستشارون</h3>
            </div>
            <p className="body-ar text-sm text-gray-600">
              تواصل مع خبراء قانونيين وماليين
            </p>
          </Link>

          <Link href="/library" className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-8 h-8 text-green-600" />
              <h3 className="heading-ar text-lg text-gray-900">المكتبة</h3>
            </div>
            <p className="body-ar text-sm text-gray-600">
              محتوى تعليمي شامل عن الاستثمار العقاري
            </p>
          </Link>
        </div>

        {/* Welcome Message */}
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="heading-ar text-2xl mb-2 text-gray-900">
                👋 مرحباً بك، {user.name}!
              </h2>
              <p className="body-ar text-gray-700 mb-4">
                ابدأ رحلتك الاستثمارية الآن! أكمل ملفك الاستثماري للحصول على توصيات مخصصة.
              </p>
              <div className="flex gap-3">
                <Link href="/onboarding" className="btn btn-primary">
                  إكمال الملف الاستثماري
                </Link>
                <Link href="/recommendations" className="btn btn-outline">
                  عرض التوصيات
                </Link>
              </div>
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

