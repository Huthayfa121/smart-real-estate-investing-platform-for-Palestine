'use client';

import Link from 'next/link';
import { Building2, FileText, Check, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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
            <FileText className="w-10 h-10 text-primary-600" />
            <h1 className="heading-ar text-4xl text-gray-900">شروط الخدمة</h1>
          </div>

          <p className="body-ar text-gray-600 mb-8">
            آخر تحديث: {new Date().toLocaleDateString('ar-EG')}
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">📋 المقدمة</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                مرحباً بك في منصة الاستثمار العقاري الذكية. باستخدامك لخدماتنا، فإنك توافق على هذه الشروط والأحكام. 
                يرجى قراءتها بعناية قبل استخدام المنصة.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <Check className="w-6 h-6" />
                قبول الشروط
              </h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                بالوصول إلى المنصة أو استخدامها، فإنك تقر بأنك قد قرأت وفهمت ووافقت على الالتزام بهذه الشروط. 
                إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">👤 الأهلية والتسجيل</h2>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>• يجب أن تكون بعمر 18 عاماً أو أكثر لاستخدام المنصة</li>
                <li>• يجب تقديم معلومات دقيقة وكاملة عند التسجيل</li>
                <li>• أنت مسؤول عن الحفاظ على سرية حسابك</li>
                <li>• يجب إخطارنا فوراً بأي استخدام غير مصرح به</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🎯 الخدمات المقدمة</h2>
              <p className="body-ar text-gray-700 leading-relaxed mb-4">
                توفر منصتنا:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>✓ توصيات استثمارية مخصصة بناءً على ملفك</li>
                <li>✓ محتوى تعليمي عن الاستثمار العقاري</li>
                <li>✓ التواصل مع مستشارين معتمدين</li>
                <li>✓ أدوات لإدارة اهتماماتك الاستثمارية</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">⚠️ المسؤوليات والقيود</h2>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>• المعلومات المقدمة لأغراض إرشادية فقط</li>
                <li>• لا نقدم نصائح قانونية أو مالية ملزمة</li>
                <li>• جميع القرارات الاستثمارية هي مسؤوليتك الخاصة</li>
                <li>• يجب التحقق من جميع المعلومات قبل اتخاذ القرارات</li>
                <li>• لسنا مسؤولين عن أي خسائر أو أضرار ناتجة عن استخدام المنصة</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🚫 الاستخدام المحظور</h2>
              <p className="body-ar text-gray-700 leading-relaxed mb-4">
                يُحظر استخدام المنصة لـ:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>✗ أي أغراض غير قانونية أو احتيالية</li>
                <li>✗ انتحال شخصية الآخرين</li>
                <li>✗ نشر محتوى مسيء أو ضار</li>
                <li>✗ محاولة اختراق أو إتلاف النظام</li>
                <li>✗ جمع بيانات المستخدمين الآخرين</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">📝 الملكية الفكرية</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                جميع المحتويات والعلامات التجارية على المنصة مملوكة لنا أو لمرخصينا. لا يجوز نسخها أو توزيعها 
                دون إذن كتابي مسبق.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" />
                إنهاء الخدمة
              </h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                نحتفظ بالحق في تعليق أو إنهاء حسابك في أي وقت إذا انتهكت هذه الشروط أو إذا رأينا أن ذلك ضروري 
                لحماية المنصة أو مستخدميها.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">⚖️ القانون الحاكم</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                تخضع هذه الشروط وتُفسر وفقاً لقوانين فلسطين. أي نزاعات ستُحل في المحاكم المختصة في فلسطين.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">📞 التواصل</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                لأي أسئلة حول هذه الشروط:
              </p>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mt-4">
                <p className="body-ar text-gray-800">
                  📧 legal@palestine-realestate.com<br />
                  📞 +970-XXX-XXXX
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t flex gap-4">
            <Link href="/privacy" className="btn btn-outline">
              سياسة الخصوصية
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

