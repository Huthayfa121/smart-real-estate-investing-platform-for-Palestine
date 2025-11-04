'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { profileService } from '@/services/profile.service';
import { consentService } from '@/services/consent.service';
import { authService } from '@/services/auth.service';
import { Building2, User, Shield, Key, Download, Trash2, Save, ArrowRight, LogOut } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'consent'>('profile');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Profile data
  const [profile, setProfile] = useState({
    budgetMin: '',
    budgetMax: '',
    investmentHorizon: 'medium',
    riskTolerance: 'medium',
    investmentGoals: [] as string[],
    preferredReturnType: 'both',
    preferredLocations: [] as string[],
    propertyTypes: [] as string[],
    additionalNotes: '',
  });

  // Consent data
  const [consent, setConsent] = useState({
    termsOfService: false,
    privacyPolicy: false,
    marketingEmails: false,
    dataSharing: false,
  });

  // Password change
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    loadData();
  }, [user]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load profile
      const profileResponse = await profileService.getProfile();
      if (profileResponse.data.profile) {
        const p = profileResponse.data.profile;
        setProfile({
          budgetMin: p.budgetRange?.min?.toString() || '',
          budgetMax: p.budgetRange?.max?.toString() || '',
          investmentHorizon: p.investmentHorizon || 'medium',
          riskTolerance: p.riskTolerance || 'medium',
          investmentGoals: p.investmentGoals || [],
          preferredReturnType: p.preferredReturnType || 'both',
          preferredLocations: p.preferredLocations || [],
          propertyTypes: p.propertyTypes || [],
          additionalNotes: p.additionalNotes || '',
        });
      }

      // Load consent
      const consentResponse = await consentService.getConsent();
      if (consentResponse.data.consent) {
        const c = consentResponse.data.consent;
        setConsent({
          termsOfService: c.termsOfService?.accepted || false,
          privacyPolicy: c.privacyPolicy?.accepted || false,
          marketingEmails: c.marketingEmails || false,
          dataSharing: c.dataSharing || false,
        });
      }
      
    } catch (err) {
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      const profileData = {
        budgetRange: {
          min: parseInt(profile.budgetMin) || 0,
          max: parseInt(profile.budgetMax) || 0,
        },
        investmentHorizon: profile.investmentHorizon,
        riskTolerance: profile.riskTolerance,
        investmentGoals: profile.investmentGoals,
        preferredReturnType: profile.preferredReturnType,
        preferredLocations: profile.preferredLocations,
        propertyTypes: profile.propertyTypes,
        additionalNotes: profile.additionalNotes,
      };

      await profileService.updateProfile(profileData);
      setSuccess('تم حفظ التغييرات بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('فشل في حفظ التغييرات');
    } finally {
      setSaving(false);
    }
  };

  const handleSaveConsent = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await consentService.updateConsent(consent);
      setSuccess('تم تحديث إعدادات الخصوصية بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError('فشل في تحديث الإعدادات');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (passwords.newPassword !== passwords.confirmPassword) {
        setError('كلمات المرور الجديدة غير متطابقة');
        return;
      }
      if (passwords.newPassword.length < 8) {
        setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        return;
      }

      setSaving(true);
      setError('');
      setSuccess('');

      await authService.updatePassword(passwords.currentPassword, passwords.newPassword);
      
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      
      setSuccess('تم تغيير كلمة المرور بنجاح');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'فشل في تغيير كلمة المرور');
    } finally {
      setSaving(false);
    }
  };

  const handleExportData = async () => {
    alert('سيتم تنزيل بياناتك قريباً. هذه الميزة قيد التطوير.');
  };

  const handleDeleteAccount = async () => {
    if (confirm('هل أنت متأكد من حذف حسابك؟ هذا الإجراء لا يمكن التراجع عنه.')) {
      alert('لحذف حسابك، يرجى التواصل مع فريق الدعم.');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const toggleArrayItem = (field: 'investmentGoals' | 'preferredLocations' | 'propertyTypes', value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  if (!user || loading) {
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

      <main className="container-custom py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700">
            <ArrowRight className="w-5 h-5" />
          </Link>
          <h1 className="heading-ar text-3xl text-gray-900">⚙️ الإعدادات</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full p-4 text-right flex items-center gap-3 transition-colors ${
                  activeTab === 'profile' ? 'bg-primary-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="body-ar">الملف الاستثماري</span>
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`w-full p-4 text-right flex items-center gap-3 transition-colors border-t ${
                  activeTab === 'security' ? 'bg-primary-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                <Key className="w-5 h-5" />
                <span className="body-ar">الأمان</span>
              </button>
              <button
                onClick={() => setActiveTab('consent')}
                className={`w-full p-4 text-right flex items-center gap-3 transition-colors border-t ${
                  activeTab === 'consent' ? 'bg-primary-600 text-white' : 'hover:bg-gray-50'
                }`}
              >
                <Shield className="w-5 h-5" />
                <span className="body-ar">الخصوصية والموافقات</span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-md p-8">
              {error && (
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
                  <p className="body-ar text-red-800">{error}</p>
                </div>
              )}
              {success && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4 mb-6">
                  <p className="body-ar text-green-800">{success}</p>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="heading-ar text-2xl mb-6">الملف الاستثماري</h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="body-ar block text-gray-700 mb-2">
                        الحد الأدنى للميزانية ($)
                      </label>
                      <input
                        type="number"
                        value={profile.budgetMin}
                        onChange={(e) => setProfile({...profile, budgetMin: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="body-ar block text-gray-700 mb-2">
                        الحد الأقصى للميزانية ($)
                      </label>
                      <input
                        type="number"
                        value={profile.budgetMax}
                        onChange={(e) => setProfile({...profile, budgetMax: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="body-ar block text-gray-700 mb-2">تحمل المخاطر</label>
                    <select
                      value={profile.riskTolerance}
                      onChange={(e) => setProfile({...profile, riskTolerance: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    >
                      <option value="low">منخفض</option>
                      <option value="medium">متوسط</option>
                      <option value="high">عالي</option>
                    </select>
                  </div>

                  <div>
                    <label className="body-ar block text-gray-700 mb-2">ملاحظات إضافية</label>
                    <textarea
                      value={profile.additionalNotes}
                      onChange={(e) => setProfile({...profile, additionalNotes: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    {saving ? (
                      <div className="spinner w-4 h-4 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>حفظ التغييرات</span>
                  </button>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <h2 className="heading-ar text-2xl mb-6">تغيير كلمة المرور</h2>

                  <div>
                    <label className="body-ar block text-gray-700 mb-2">كلمة المرور الحالية</label>
                    <input
                      type="password"
                      value={passwords.currentPassword}
                      onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="body-ar block text-gray-700 mb-2">كلمة المرور الجديدة</label>
                    <input
                      type="password"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="body-ar block text-gray-700 mb-2">تأكيد كلمة المرور</label>
                    <input
                      type="password"
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    />
                  </div>

                  <button
                    onClick={handleChangePassword}
                    disabled={saving}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    {saving ? (
                      <div className="spinner w-4 h-4 border-white"></div>
                    ) : (
                      <Key className="w-4 h-4" />
                    )}
                    <span>تغيير كلمة المرور</span>
                  </button>

                  <div className="border-t pt-6 mt-8">
                    <h3 className="heading-ar text-lg mb-4">إدارة البيانات</h3>
                    <div className="space-y-3">
                      <button
                        onClick={handleExportData}
                        className="btn btn-outline flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>تصدير بياناتي</span>
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="btn bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        <span>حذف الحساب</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Consent Tab */}
              {activeTab === 'consent' && (
                <div className="space-y-6">
                  <h2 className="heading-ar text-2xl mb-6">الخصوصية والموافقات</h2>

                  <div className="space-y-4">
                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent.termsOfService}
                        onChange={(e) => setConsent({...consent, termsOfService: e.target.checked})}
                        className="w-5 h-5 mt-0.5"
                      />
                      <div>
                        <span className="body-ar font-medium text-gray-900">شروط الخدمة</span>
                        <p className="body-ar text-sm text-gray-600 mt-1">
                          أوافق على شروط وأحكام استخدام المنصة
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent.privacyPolicy}
                        onChange={(e) => setConsent({...consent, privacyPolicy: e.target.checked})}
                        className="w-5 h-5 mt-0.5"
                      />
                      <div>
                        <span className="body-ar font-medium text-gray-900">سياسة الخصوصية</span>
                        <p className="body-ar text-sm text-gray-600 mt-1">
                          أوافق على سياسة الخصوصية وجمع البيانات
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent.marketingEmails}
                        onChange={(e) => setConsent({...consent, marketingEmails: e.target.checked})}
                        className="w-5 h-5 mt-0.5"
                      />
                      <div>
                        <span className="body-ar font-medium text-gray-900">رسائل البريد التسويقية</span>
                        <p className="body-ar text-sm text-gray-600 mt-1">
                          أرغب في تلقي عروض ونصائح استثمارية عبر البريد الإلكتروني
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-4 border-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent.dataSharing}
                        onChange={(e) => setConsent({...consent, dataSharing: e.target.checked})}
                        className="w-5 h-5 mt-0.5"
                      />
                      <div>
                        <span className="body-ar font-medium text-gray-900">مشاركة البيانات مع الشركاء</span>
                        <p className="body-ar text-sm text-gray-600 mt-1">
                          أوافق على مشاركة بياناتي مع شركاء الخدمة المعتمدين
                        </p>
                      </div>
                    </label>
                  </div>

                  <button
                    onClick={handleSaveConsent}
                    disabled={saving}
                    className="btn btn-primary flex items-center gap-2"
                  >
                    {saving ? (
                      <div className="spinner w-4 h-4 border-white"></div>
                    ) : (
                      <Save className="w-4 h-4" />
                    )}
                    <span>حفظ الإعدادات</span>
                  </button>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                    <p className="body-ar text-sm text-blue-800">
                      📖 لمزيد من المعلومات، راجع{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline">
                        سياسة الخصوصية
                      </Link>
                      {' '}و{' '}
                      <Link href="/terms" className="text-blue-600 hover:underline">
                        شروط الخدمة
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

