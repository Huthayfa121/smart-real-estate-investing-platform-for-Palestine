'use client';

import Link from 'next/link';
import { Building2, Shield, Eye, Lock, Database, Mail } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container-custom py-4">
          <Link href="/" className="flex items-center gap-2 text-primary-700">
            <Building2 className="w-8 h-8" />
            <span className="heading-ar text-xl font-bold">منصة الاستثمار العقاري</span>
          </Link>
        </div>
      </header>

      <main className="container-custom py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
          <div className="flex items-center gap-3 mb-8">
            <Shield className="w-10 h-10 text-primary-600" />
            <h1 className="heading-ar text-4xl text-gray-900">سياسة الخصوصية</h1>
          </div>

          <p className="body-ar text-gray-600 mb-8">
            آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🛡️ التزامنا بخصوصيتك</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                في منصة الاستثمار العقاري الذكية، نحن ملتزمون بحماية خصوصيتك وبياناتك الشخصية. 
                هذه السياسة توضح كيفية جمع واستخدام وحماية معلوماتك عند استخدام منصتنا.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <Database className="w-6 h-6" />
                البيانات التي نجمعها
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="heading-ar text-lg mb-2 text-gray-800">1. معلومات الحساب:</h3>
                  <ul className="body-ar text-gray-700 mr-6 space-y-2">
                    <li>• الاسم الكامل</li>
                    <li>• عنوان البريد الإلكتروني</li>
                    <li>• رقم الهاتف</li>
                    <li>• كلمة المرور (مشفرة)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="heading-ar text-lg mb-2 text-gray-800">2. الملف الاستثماري:</h3>
                  <ul className="body-ar text-gray-700 mr-6 space-y-2">
                    <li>• نطاق الميزانية</li>
                    <li>• الأهداف الاستثمارية</li>
                    <li>• تحمل المخاطر</li>
                    <li>• المواقع والعقارات المفضلة</li>
                  </ul>
                </div>
                <div>
                  <h3 className="heading-ar text-lg mb-2 text-gray-800">3. بيانات الاستخدام:</h3>
                  <ul className="body-ar text-gray-700 mr-6 space-y-2">
                    <li>• سجلات الدخول</li>
                    <li>• عنوان IP</li>
                    <li>• نوع المتصفح والجهاز</li>
                    <li>• الصفحات التي تزورها</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <Eye className="w-6 h-6" />
                كيف نستخدم بياناتك
              </h2>
              <ul className="body-ar text-gray-700 space-y-3 mr-6">
                <li>✓ تقديم توصيات استثمارية مخصصة</li>
                <li>✓ التواصل بينك وبين المستشارين المعتمدين</li>
                <li>✓ تحسين خدماتنا ومحتوانا التعليمي</li>
                <li>✓ إرسال إشعارات وتحديثات مهمة</li>
                <li>✓ ضمان أمان الحساب ومنع الاحتيال</li>
                <li>✓ الامتثال للقوانين واللوائح</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                حماية البيانات
              </h2>
              <p className="body-ar text-gray-700 leading-relaxed mb-4">
                نستخدم تقنيات أمان متقدمة لحماية بياناتك:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>🔒 تشفير البيانات أثناء النقل والتخزين (SSL/TLS)</li>
                <li>🔐 تشفير كلمات المرور باستخدام bcrypt</li>
                <li>🛡️ جدران حماية وأنظمة كشف التسلل</li>
                <li>👥 صلاحيات وصول محدودة للموظفين</li>
                <li>📋 مراجعات أمنية منتظمة</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">📤 مشاركة البيانات</h2>
              <p className="body-ar text-gray-700 leading-relaxed mb-4">
                نحن لا نبيع بياناتك الشخصية. قد نشارك معلوماتك فقط في الحالات التالية:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>• مع المستشارين المعتمدين (بموافقتك الصريحة)</li>
                <li>• مع مقدمي الخدمات المعتمدين (استضافة، تحليلات)</li>
                <li>• عند الضرورة القانونية أو لحماية الحقوق</li>
                <li>• في حالة اندماج أو استحواذ (بعد إخطارك)</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">✅ حقوقك</h2>
              <p className="body-ar text-gray-700 leading-relaxed mb-4">
                لديك الحق في:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>📖 الوصول إلى بياناتك الشخصية</li>
                <li>✏️ تصحيح أي معلومات غير دقيقة</li>
                <li>🗑️ حذف حسابك وبياناتك</li>
                <li>📥 تصدير بياناتك</li>
                <li>🚫 الاعتراض على معالجة بياناتك</li>
                <li>⚙️ تعديل إعدادات الخصوصية</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🍪 ملفات تعريف الارتباط (Cookies)</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتذكر تفضيلاتك. يمكنك التحكم في ملفات تعريف الارتباط 
                من إعدادات متصفحك.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <Mail className="w-6 h-6" />
                تواصل معنا
              </h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                لأي استفسارات أو طلبات تتعلق بخصوصيتك، يمكنك التواصل معنا:
              </p>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mt-4">
                <p className="body-ar text-gray-800">
                  📧 البريد الإلكتروني: privacy@palestine-realestate.com<br />
                  📞 الهاتف: +970-XXX-XXXX<br />
                  📍 العنوان: رام الله، فلسطين
                </p>
              </div>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🔄 التحديثات</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                قد نقوم بتحديث هذه السياسة من وقت لآخر. سنخطرك بأي تغييرات جوهرية عبر البريد الإلكتروني 
                أو من خلال إشعار على المنصة.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t flex gap-4">
            <Link href="/terms" className="btn btn-outline">
              شروط الخدمة
            </Link>
            <Link href="/disclaimer" className="btn btn-outline">
              إخلاء المسؤولية
            </Link>
            <Link href="/" className="btn btn-primary">
              العودة للرئيسية
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

