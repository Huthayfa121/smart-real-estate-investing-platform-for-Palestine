'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { recommendationService } from '@/services/recommendation.service';
import { Building2, TrendingUp, MapPin, DollarSign, BarChart, Heart, X, Sparkles, LogOut, RefreshCw } from 'lucide-react';

interface Recommendation {
  _id: string;
  propertyTitle: string;
  propertyDescription: string;
  location: string;
  propertyType: string;
  price: number;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  matchScore: number;
  reasons: string[];
  imageUrl?: string;
  propertyDetails: {
    size?: number;
    bedrooms?: number;
    bathrooms?: number;
    yearBuilt?: number;
    features?: string[];
  };
  status: 'active' | 'interested' | 'dismissed';
  createdAt: string;
}

export default function RecommendationsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'interested'>('active');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadRecommendations();
  }, [user, filter]);

  const loadRecommendations = async () => {
    try {
      setLoading(true);
      const statusParam = filter === 'all' ? undefined : filter;
      const response = await recommendationService.getRecommendations(statusParam);
      setRecommendations(response.data.recommendations || []);
      setError('');
    } catch (err: any) {
      console.error('Error loading recommendations:', err);
      setError('فشل في تحميل التوصيات');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    try {
      setGenerating(true);
      setError('');
      await recommendationService.generateRecommendations();
      await loadRecommendations();
    } catch (err: any) {
      console.error('Error generating recommendations:', err);
      if (err.response?.status === 400) {
        setError('الرجاء إكمال ملفك الاستثماري أولاً');
        router.push('/onboarding');
      } else {
        setError('فشل في توليد التوصيات');
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: 'interested' | 'dismissed') => {
    try {
      await recommendationService.updateRecommendationStatus(id, status);
      await loadRecommendations();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskLabel = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'منخفض';
      case 'medium':
        return 'متوسط';
      case 'high':
        return 'عالي';
      default:
        return risk;
    }
  };

  const getPropertyTypeLabel = (type: string) => {
    const labels: any = {
      residential: 'سكني',
      commercial: 'تجاري',
      industrial: 'صناعي',
      agricultural: 'زراعي',
      'mixed-use': 'متعدد الاستخدامات',
    };
    return labels[type] || type;
  };

  const filteredRecommendations = recommendations;

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

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="heading-ar text-4xl mb-4 flex items-center gap-3">
                  <Sparkles className="w-10 h-10" />
                  توصياتي الاستثمارية
                </h1>
                <p className="body-ar text-xl text-primary-50">
                  فرص استثمارية مخصصة لك بناءً على ملفك الاستثماري
                </p>
              </div>
              <button
                onClick={handleGenerate}
                disabled={generating}
                className="btn bg-white text-primary-700 hover:bg-primary-50 flex items-center gap-2"
              >
                {generating ? (
                  <>
                    <div className="spinner w-4 h-4 border-primary-700"></div>
                    <span>جاري التوليد...</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-4 h-4" />
                    <span>توليد توصيات</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg body-ar transition-colors ${
                filter === 'active'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              نشطة
            </button>
            <button
              onClick={() => setFilter('interested')}
              className={`px-4 py-2 rounded-lg body-ar transition-colors ${
                filter === 'interested'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              مهتم
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg body-ar transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الكل
            </button>
          </div>
        </div>

        {/* Recommendations Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner w-12 h-12"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-8 text-center">
            <p className="body-ar text-red-800 mb-4">{error}</p>
            <button onClick={loadRecommendations} className="btn btn-primary">
              إعادة المحاولة
            </button>
          </div>
        ) : filteredRecommendations.length === 0 ? (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-12 text-center">
            <Sparkles className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="heading-ar text-2xl mb-2 text-blue-900">لا توجد توصيات حالياً</h3>
            <p className="body-ar text-blue-800 mb-6">
              {filter === 'active'
                ? 'لم نجد توصيات نشطة لك حالياً. جرب توليد توصيات جديدة!'
                : 'لا توجد توصيات في هذا القسم'}
            </p>
            <div className="flex gap-4 justify-center">
              <button onClick={handleGenerate} className="btn btn-primary">
                <Sparkles className="w-4 h-4 inline ml-2" />
                توليد توصيات جديدة
              </button>
              <Link href="/onboarding" className="btn btn-outline">
                تحديث الملف الاستثماري
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <p className="body-ar text-gray-600">
                عرض {filteredRecommendations.length} توصية
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((rec) => (
                <div
                  key={rec._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  {/* Image */}
                  <div className="h-48 bg-gradient-to-br from-primary-400 to-primary-600 relative">
                    {rec.imageUrl ? (
                      <img
                        src={rec.imageUrl}
                        alt={rec.propertyTitle}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white text-6xl opacity-50">
                        <Building2 className="w-20 h-20" />
                      </div>
                    )}
                    {/* Match Score Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="body-ar text-sm font-bold text-primary-700">
                        {rec.matchScore}% توافق
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Type & Risk */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs body-ar">
                        {getPropertyTypeLabel(rec.propertyType)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs body-ar ${getRiskColor(rec.riskLevel)}`}>
                        مخاطر {getRiskLabel(rec.riskLevel)}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="heading-ar text-xl mb-2 text-gray-900 line-clamp-2">
                      {rec.propertyTitle}
                    </h3>

                    {/* Location & Price */}
                    <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="body-ar">{rec.location}</span>
                      </div>
                      <div className="flex items-center gap-1 font-bold text-primary-700">
                        <DollarSign className="w-4 h-4" />
                        <span>{rec.price.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Expected Return */}
                    <div className="flex items-center gap-2 mb-4 bg-green-50 p-2 rounded-lg">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="body-ar text-sm text-green-800">
                        عائد متوقع: <strong>{rec.expectedReturn}%</strong>
                      </span>
                    </div>

                    {/* Description */}
                    <p className="body-ar text-gray-600 text-sm line-clamp-2 mb-4">
                      {rec.propertyDescription}
                    </p>

                    {/* Reasons */}
                    {rec.reasons.length > 0 && (
                      <div className="mb-4">
                        <p className="body-ar text-xs text-gray-500 mb-2">لماذا هذه التوصية؟</p>
                        <ul className="space-y-1">
                          {rec.reasons.slice(0, 3).map((reason, index) => (
                            <li key={index} className="flex items-start gap-2 text-xs text-gray-600">
                              <span className="text-green-500 mt-0.5">✓</span>
                              <span className="body-ar">{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Actions */}
                    {rec.status === 'active' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(rec._id, 'interested')}
                          className="flex-1 btn btn-primary btn-sm flex items-center justify-center gap-2"
                        >
                          <Heart className="w-4 h-4" />
                          <span>مهتم</span>
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(rec._id, 'dismissed')}
                          className="px-3 btn btn-outline btn-sm"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {rec.status === 'interested' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-2 text-center">
                        <span className="body-ar text-sm text-green-800 font-medium">
                          ✓ تم وضع علامة مهتم
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Info Box */}
        <div className="mt-12 bg-primary-50 border-2 border-primary-200 rounded-xl p-6">
          <h3 className="heading-ar text-lg mb-2 text-primary-900">💡 كيف نختار التوصيات؟</h3>
          <p className="body-ar text-sm text-primary-800">
            نستخدم نظاماً ذكياً يحلل ملفك الاستثماري (ميزانيتك، أهدافك، تحمل المخاطر، والمناطق المفضلة) 
            لنقدم لك أفضل الفرص الاستثمارية المناسبة لك. كلما كانت بياناتك أكثر دقة، كانت التوصيات أفضل!
          </p>
        </div>
      </main>
    </div>
  );
}

