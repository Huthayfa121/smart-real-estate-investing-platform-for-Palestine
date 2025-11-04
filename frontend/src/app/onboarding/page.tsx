'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/profile.service';
import { Building2, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const STEPS = ['الدخل', 'الأهداف', 'الاهتمامات'];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form Data
  const [formData, setFormData] = useState({
    // Step 1: Income
    budgetMin: '',
    budgetMax: '',
    investmentHorizon: 'medium',
    riskTolerance: 'medium',
    
    // Step 2: Goals
    investmentGoals: [] as string[],
    preferredReturnType: 'both',
    
    // Step 3: Interests
    preferredLocations: [] as string[],
    propertyTypes: [] as string[],
    additionalNotes: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayItem = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field as keyof typeof prev] as string[]).includes(value)
        ? (prev[field as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[field as keyof typeof prev] as string[]), value]
    }));
  };

  const handleNext = () => {
    // Validation
    if (currentStep === 0) {
      if (!formData.budgetMin || !formData.budgetMax) {
        setError('الرجاء إدخال نطاق الميزانية');
        return;
      }
      if (parseInt(formData.budgetMin) > parseInt(formData.budgetMax)) {
        setError('الحد الأدنى يجب أن يكون أقل من الحد الأقصى');
        return;
      }
    }
    if (currentStep === 1 && formData.investmentGoals.length === 0) {
      setError('الرجاء اختيار هدف استثماري واحد على الأقل');
      return;
    }
    if (currentStep === 2 && formData.propertyTypes.length === 0) {
      setError('الرجاء اختيار نوع عقار واحد على الأقل');
      return;
    }

    setError('');
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(0, prev - 1));
    setError('');
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');

      const profileData = {
        budgetRange: {
          min: parseInt(formData.budgetMin),
          max: parseInt(formData.budgetMax),
        },
        investmentHorizon: formData.investmentHorizon,
        riskTolerance: formData.riskTolerance,
        investmentGoals: formData.investmentGoals,
        preferredReturnType: formData.preferredReturnType,
        preferredLocations: formData.preferredLocations,
        propertyTypes: formData.propertyTypes,
        additionalNotes: formData.additionalNotes,
      };

      await profileService.updateProfile(profileData);
      
      // Success - redirect to dashboard
      router.push('/dashboard?onboarding=complete');
    } catch (err: any) {
      console.error('Error saving profile:', err);
      setError('فشل في حفظ البيانات. الرجاء المحاولة مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || !user) {
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
            <div className="flex items-center gap-2 text-primary-700">
              <Building2 className="w-8 h-8" />
              <span className="heading-ar text-xl font-bold">منصة الاستثمار العقاري</span>
            </div>
            <span className="body-ar text-gray-600">مرحباً، {user.name}</span>
          </div>
        </div>
      </header>

      <main className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Header */}
          <div className="mb-8 text-center">
            <h1 className="heading-ar text-3xl mb-2 text-gray-900">
              👋 مرحباً بك في منصتنا!
            </h1>
            <p className="body-ar text-gray-600">
              دعنا نتعرف عليك لنقدم لك أفضل التوصيات الاستثمارية
            </p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {STEPS.map((step, index) => (
                <div key={index} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        index < currentStep
                          ? 'bg-green-500 text-white'
                          : index === currentStep
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {index < currentStep ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                    <span
                      className={`body-ar text-sm ${
                        index <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-1 flex-1 mx-2 ${
                        index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-xl shadow-md p-8">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                <p className="body-ar text-red-800">{error}</p>
              </div>
            )}

            {/* Step 1: Income/Budget */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <h2 className="heading-ar text-2xl mb-4 text-gray-900">
                  💰 ما هي ميزانيتك الاستثمارية؟
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="body-ar block text-gray-700 mb-2">
                      الحد الأدنى للميزانية ($)
                    </label>
                    <input
                      type="number"
                      value={formData.budgetMin}
                      onChange={(e) => handleInputChange('budgetMin', e.target.value)}
                      placeholder="مثال: 50000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="body-ar block text-gray-700 mb-2">
                      الحد الأقصى للميزانية ($)
                    </label>
                    <input
                      type="number"
                      value={formData.budgetMax}
                      onChange={(e) => handleInputChange('budgetMax', e.target.value)}
                      placeholder="مثال: 200000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">
                    الأفق الاستثماري
                  </label>
                  <select
                    value={formData.investmentHorizon}
                    onChange={(e) => handleInputChange('investmentHorizon', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="short">قصير المدى (1-3 سنوات)</option>
                    <option value="medium">متوسط المدى (3-7 سنوات)</option>
                    <option value="long">طويل المدى (7+ سنوات)</option>
                  </select>
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">
                    تحمل المخاطر
                  </label>
                  <select
                    value={formData.riskTolerance}
                    onChange={(e) => handleInputChange('riskTolerance', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="low">منخفض - استثمارات آمنة ومستقرة</option>
                    <option value="medium">متوسط - توازن بين العائد والمخاطر</option>
                    <option value="high">عالي - عوائد مرتفعة مع مخاطر أكبر</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 2: Goals */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="heading-ar text-2xl mb-4 text-gray-900">
                  🎯 ما هي أهدافك الاستثمارية؟
                </h2>

                <div className="space-y-3">
                  {[
                    { value: 'دخل إيجاري ثابت', label: 'دخل إيجاري ثابت' },
                    { value: 'نمو رأس المال', label: 'نمو رأس المال على المدى الطويل' },
                    { value: 'تنويع المحفظة', label: 'تنويع المحفظة الاستثمارية' },
                    { value: 'استثمار آمن', label: 'استثمار آمن للمدخرات' },
                    { value: 'مشروع تجاري', label: 'بناء مشروع تجاري' },
                  ].map((goal) => (
                    <label
                      key={goal.value}
                      className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                      style={{
                        borderColor: formData.investmentGoals.includes(goal.value)
                          ? '#2563eb'
                          : '#e5e7eb',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={formData.investmentGoals.includes(goal.value)}
                        onChange={() => toggleArrayItem('investmentGoals', goal.value)}
                        className="w-5 h-5"
                      />
                      <span className="body-ar text-gray-900">{goal.label}</span>
                    </label>
                  ))}
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">
                    نوع العائد المفضل
                  </label>
                  <select
                    value={formData.preferredReturnType}
                    onChange={(e) => handleInputChange('preferredReturnType', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="rental">دخل إيجاري</option>
                    <option value="appreciation">نمو قيمة العقار</option>
                    <option value="both">كلاهما</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Interests */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="heading-ar text-2xl mb-4 text-gray-900">
                  📍 ما هي اهتماماتك العقارية؟
                </h2>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">
                    المواقع المفضلة
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      'رام الله',
                      'القدس',
                      'بيت لحم',
                      'الخليل',
                      'نابلس',
                      'جنين',
                      'طولكرم',
                      'قلقيلية',
                    ].map((location) => (
                      <label
                        key={location}
                        className="flex items-center gap-2 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                        style={{
                          borderColor: formData.preferredLocations.includes(location)
                            ? '#2563eb'
                            : '#e5e7eb',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.preferredLocations.includes(location)}
                          onChange={() => toggleArrayItem('preferredLocations', location)}
                          className="w-4 h-4"
                        />
                        <span className="body-ar text-sm">{location}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">
                    أنواع العقارات *
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'residential', label: '🏠 سكني' },
                      { value: 'commercial', label: '🏢 تجاري' },
                      { value: 'industrial', label: '🏭 صناعي' },
                      { value: 'agricultural', label: '🌾 زراعي' },
                      { value: 'mixed-use', label: '🏗️ متعدد الاستخدامات' },
                    ].map((type) => (
                      <label
                        key={type.value}
                        className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50"
                        style={{
                          borderColor: formData.propertyTypes.includes(type.value)
                            ? '#2563eb'
                            : '#e5e7eb',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.propertyTypes.includes(type.value)}
                          onChange={() => toggleArrayItem('propertyTypes', type.value)}
                          className="w-5 h-5"
                        />
                        <span className="body-ar text-gray-900">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="body-ar block text-gray-700 mb-2">
                    ملاحظات إضافية (اختياري)
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                    placeholder="أخبرنا المزيد عن تفضيلاتك الاستثمارية..."
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4 mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`btn ${
                  currentStep === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'btn-outline'
                } flex items-center gap-2`}
              >
                <ChevronRight className="w-5 h-5" />
                <span>السابق</span>
              </button>

              <button
                onClick={handleNext}
                disabled={loading}
                className="btn btn-primary flex items-center gap-2"
              >
                <span>{currentStep === STEPS.length - 1 ? 'إنهاء' : 'التالي'}</span>
                {loading ? (
                  <div className="spinner w-4 h-4 border-white"></div>
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="body-ar text-sm text-blue-800">
              💡 ستساعدنا هذه المعلومات في تقديم توصيات استثمارية مخصصة لك. يمكنك تعديل بياناتك في أي وقت من لوحة التحكم.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

