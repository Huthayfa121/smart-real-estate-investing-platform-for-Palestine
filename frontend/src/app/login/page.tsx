'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Building2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError('فشل تسجيل الدخول. تحقق من البريد الإلكتروني وكلمة المرور.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800">
            <Building2 className="w-10 h-10" />
            <span className="heading-ar text-2xl font-bold">منصة الاستثمار العقاري</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="heading-ar text-3xl text-center mb-2 text-gray-900">
            مرحباً بعودتك
          </h1>
          <p className="body-ar text-center text-gray-600 mb-8">
            سجل دخولك للوصول إلى حسابك
          </p>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 body-ar text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="ml-2 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="body-ar text-sm text-gray-700">تذكرني</span>
              </label>
              <Link href="/forgot-password" className="body-ar text-sm text-primary-600 hover:text-primary-700">
                نسيت كلمة المرور؟
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner"></span>
                  جارٍ تسجيل الدخول...
                </span>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="body-ar text-gray-600">
              ليس لديك حساب؟{' '}
              <Link href="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
                سجل الآن
              </Link>
            </p>
          </div>
        </div>

        <p className="body-ar text-center text-gray-600 text-sm mt-6">
          بتسجيل دخولك، أنت توافق على{' '}
          <Link href="/terms" className="text-primary-600 hover:underline">
            شروط الاستخدام
          </Link>{' '}
          و
          <Link href="/privacy" className="text-primary-600 hover:underline">
            {' '}سياسة الخصوصية
          </Link>
        </p>
      </div>
    </div>
  );
}

