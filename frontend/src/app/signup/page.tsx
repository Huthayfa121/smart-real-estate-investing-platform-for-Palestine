'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Building2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'investor' as 'investor' | 'advisor',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('كلمات المرور غير متطابقة');
      return;
    }

    if (formData.password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }

    setLoading(true);

    try {
      await signup(formData);
      router.push('/dashboard');
    } catch (err: any) {
      setError('فشل إنشاء الحساب. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-primary-700 hover:text-primary-800">
            <Building2 className="w-10 h-10" />
            <span className="heading-ar text-2xl font-bold">منصة الاستثمار العقاري</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="heading-ar text-3xl text-center mb-2 text-gray-900">
            ابدأ رحلتك الاستثمارية
          </h1>
          <p className="body-ar text-center text-gray-600 mb-8">
            أنشئ حساباً مجانياً الآن
          </p>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-6 body-ar text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                الاسم الكامل
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="input"
                placeholder="أحمد محمد"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                رقم الهاتف (اختياري)
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                className="input"
                placeholder="+970-XXX-XXXX"
              />
            </div>

            <div>
              <label htmlFor="role" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                نوع الحساب
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="input"
                required
              >
                <option value="investor">مستثمر</option>
                <option value="advisor">مستشار</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                كلمة المرور
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="input"
                placeholder="••••••••"
                required
              />
              <p className="body-ar text-xs text-gray-500 mt-1">
                يجب أن تحتوي على 8 أحرف على الأقل
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block body-ar text-sm font-medium text-gray-700 mb-2">
                تأكيد كلمة المرور
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="spinner"></span>
                  جارٍ إنشاء الحساب...
                </span>
              ) : (
                'إنشاء حساب'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="body-ar text-gray-600">
              لديك حساب بالفعل؟{' '}
              <Link href="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                سجل الدخول
              </Link>
            </p>
          </div>
        </div>

        <p className="body-ar text-center text-gray-600 text-sm mt-6">
          بإنشاء حساب، أنت توافق على{' '}
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

