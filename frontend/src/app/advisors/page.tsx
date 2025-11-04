'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { advisorService } from '@/services/advisor.service';
import { Building2, MessageSquare, Star, Globe, MapPin, Briefcase, LogOut, User, Filter, Search } from 'lucide-react';

interface Advisor {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  specialization: string[];
  experience: number;
  certifications: string[];
  languages: string[];
  bio: string;
  rating: number;
  reviewCount: number;
  hourlyRate?: number;
  isAvailable: boolean;
}

export default function AdvisorsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [availableOnly, setAvailableOnly] = useState(false);

  useEffect(() => {
    loadAdvisors();
  }, [selectedSpecialization, availableOnly]);

  const loadAdvisors = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (selectedSpecialization) params.specialization = selectedSpecialization;
      if (availableOnly) params.available = true;

      const response = await advisorService.getAdvisors(params);
      setAdvisors(response.data.advisors || []);
      setError('');
    } catch (err: any) {
      console.error('Error loading advisors:', err);
      setError('فشل في تحميل المستشارين');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleContactAdvisor = (advisorId: string) => {
    if (!user) {
      router.push('/login?redirect=/advisors');
      return;
    }
    router.push(`/conversations?advisorId=${advisorId}`);
  };

  const filteredAdvisors = advisors.filter(advisor =>
    advisor.userId.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    advisor.specialization.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getSpecializationLabel = (spec: string) => {
    const labels: any = {
      'legal': 'قانوني',
      'financial': 'مالي',
      'investment': 'استثماري',
      'property-management': 'إدارة عقارات',
      'real-estate-agent': 'وكيل عقاري',
    };
    return labels[spec] || spec;
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
            <h1 className="heading-ar text-4xl mb-4">👥 المستشارون المعتمدون</h1>
            <p className="body-ar text-xl text-primary-50">
              تواصل مع خبراء قانونيين وماليين معتمدين لمساعدتك في قراراتك الاستثمارية
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
                placeholder="ابحث عن مستشار..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Specialization Filter */}
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">جميع التخصصات</option>
              <option value="legal">قانوني</option>
              <option value="financial">مالي</option>
              <option value="investment">استثماري</option>
              <option value="property-management">إدارة عقارات</option>
              <option value="real-estate-agent">وكيل عقاري</option>
            </select>

            {/* Available Only Toggle */}
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="body-ar text-gray-700">المتاحون فقط</span>
            </label>
          </div>
        </div>

        {/* Advisors Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <p className="body-ar text-red-800">{error}</p>
            <button onClick={loadAdvisors} className="btn btn-primary mt-4">
              إعادة المحاولة
            </button>
          </div>
        ) : filteredAdvisors.length === 0 ? (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-12 text-center">
            <User className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="heading-ar text-2xl mb-2 text-blue-900">لا يوجد مستشارون متاحون حالياً</h3>
            <p className="body-ar text-blue-800 mb-6">
              سيتم إضافة المستشارين المعتمدين قريباً. تحقق مرة أخرى لاحقاً.
            </p>
            <Link href="/library" className="btn btn-primary">
              تصفح المكتبة التعليمية
            </Link>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="body-ar text-gray-600">
                عرض {filteredAdvisors.length} من {advisors.length} مستشار
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAdvisors.map((advisor) => (
                <div
                  key={advisor._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Header */}
                  <div className="bg-gradient-to-br from-primary-500 to-primary-700 p-6 text-white">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold">
                          {advisor.userId.name.charAt(0)}
                        </span>
                      </div>
                      {advisor.isAvailable && (
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          متاح الآن
                        </span>
                      )}
                    </div>
                    <h3 className="heading-ar text-xl mb-1">{advisor.userId.name}</h3>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(advisor.rating)
                                ? 'text-yellow-300 fill-yellow-300'
                                : 'text-white/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span>({advisor.reviewCount} تقييم)</span>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-6">
                    {/* Specializations */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {advisor.specialization.map((spec, index) => (
                          <span
                            key={index}
                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs body-ar"
                          >
                            {getSpecializationLabel(spec)}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bio */}
                    <p className="body-ar text-gray-600 text-sm mb-4 line-clamp-3">
                      {advisor.bio}
                    </p>

                    {/* Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Briefcase className="w-4 h-4" />
                        <span className="body-ar">{advisor.experience} سنوات خبرة</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Globe className="w-4 h-4" />
                        <span className="body-ar">{advisor.languages.join(', ')}</span>
                      </div>
                      {advisor.hourlyRate && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="body-ar font-medium">
                            ${advisor.hourlyRate}/ساعة
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Certifications */}
                    {advisor.certifications.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-1">الشهادات:</p>
                        <div className="flex flex-wrap gap-1">
                          {advisor.certifications.slice(0, 2).map((cert, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {cert}
                            </span>
                          ))}
                          {advisor.certifications.length > 2 && (
                            <span className="text-xs text-gray-500">
                              +{advisor.certifications.length - 2}
                            </span>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Contact Button */}
                    <button
                      onClick={() => handleContactAdvisor(advisor._id)}
                      className="w-full btn btn-primary flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>تواصل الآن</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info Section */}
        {!user && (
          <div className="mt-12 bg-primary-50 border-2 border-primary-200 rounded-xl p-8 text-center">
            <h3 className="heading-ar text-2xl mb-4 text-primary-900">
              سجل الآن للتواصل مع المستشارين
            </h3>
            <p className="body-ar text-primary-800 mb-6">
              أنشئ حسابك المجاني للبدء بالتواصل مع المستشارين المعتمدين والحصول على توصيات استثمارية مخصصة
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="btn btn-primary">
                إنشاء حساب مجاني
              </Link>
              <Link href="/login" className="btn btn-outline">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

