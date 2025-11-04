'use client';

import Link from 'next/link';
import { Building2, AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
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
            <AlertTriangle className="w-10 h-10 text-yellow-600" />
            <h1 className="heading-ar text-4xl text-gray-900">إخلاء المسؤولية</h1>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-8">
            <p className="body-ar text-yellow-900 font-medium">
              ⚠️ تحذير مهم: يرجى قراءة هذا الإخلاء بعناية قبل استخدام المنصة
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🎯 الغرض من المنصة</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                منصة الاستثمار العقاري الذكية هي أداة معلوماتية وتعليمية مصممة لمساعدة المستثمرين في فهم 
                السوق العقاري في فلسطين. المعلومات المقدمة هي لأغراض إرشادية فقط ولا تشكل نصيحة مهنية.
              </p>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                ليست نصيحة مالية أو قانونية
              </h2>
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
                <p className="body-ar text-red-900 leading-relaxed mb-4">
                  <strong>تنويه هام:</strong> المعلومات والتوصيات المقدمة على هذه المنصة:
                </p>
                <ul className="body-ar text-red-800 space-y-2 mr-6">
                  <li>✗ لا تشكل نصيحة مالية أو استثمارية مهنية</li>
                  <li>✗ لا تشكل نصيحة قانونية أو ضريبية</li>
                  <li>✗ لا تضمن نتائج استثمارية محددة</li>
                  <li>✗ لا تحل محل استشارة متخصص معتمد</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">📊 المخاطر الاستثمارية</h2>
              <p className="body-ar text-gray-700 leading-relaxed mb-4">
                الاستثمار العقاري ينطوي على مخاطر، بما في ذلك:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6">
                <li>• احتمالية خسارة جزء أو كل رأس المال المستثمر</li>
                <li>• تقلبات أسعار العقارات</li>
                <li>• المخاطر القانونية والتنظيمية</li>
                <li>• مخاطر السيولة وصعوبة البيع</li>
                <li>• التغيرات في السوق المحلي والعالمي</li>
                <li>• المخاطر الجيوسياسية الخاصة بالمنطقة</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🔍 دقة المعلومات</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                بينما نبذل قصارى جهدنا لتقديم معلومات دقيقة ومحدثة، فإننا لا نضمن:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6 mt-4">
                <li>• دقة أو اكتمال أي معلومات</li>
                <li>• ملاءمة المعلومات لظروفك الخاصة</li>
                <li>• خلو المحتوى من الأخطاء</li>
                <li>• تحديث المعلومات في الوقت الفعلي</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">👥 المستشارون الخارجيون</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                المستشارون المتاحون على المنصة هم مستقلون. نحن نسهل التواصل فقط ولا نتحمل مسؤولية:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6 mt-4">
                <li>• جودة أو دقة نصائحهم</li>
                <li>• تصرفاتهم أو إهمالهم</li>
                <li>• أي نزاعات بينك وبينهم</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">🛡️ حدود المسؤولية</h2>
              <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-6">
                <p className="body-ar text-gray-800 leading-relaxed">
                  لن نكون مسؤولين تحت أي ظرف عن أي خسائر أو أضرار مباشرة أو غير مباشرة ناتجة عن:
                </p>
                <ul className="body-ar text-gray-700 space-y-2 mr-6 mt-3">
                  <li>• استخدامك أو عدم قدرتك على استخدام المنصة</li>
                  <li>• الاعتماد على أي معلومات من المنصة</li>
                  <li>• القرارات الاستثمارية المتخذة بناءً على المعلومات المقدمة</li>
                  <li>• أخطاء أو سهو في المحتوى</li>
                  <li>• انقطاع أو تعطل الخدمة</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">✅ توصياتنا</h2>
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6">
                <p className="body-ar text-green-900 font-medium mb-3">
                  قبل اتخاذ أي قرار استثماري، نوصي بشدة بـ:
                </p>
                <ul className="body-ar text-green-800 space-y-2 mr-6">
                  <li>✓ استشارة محامٍ مختص بالعقارات</li>
                  <li>✓ استشارة مستشار مالي معتمد</li>
                  <li>✓ إجراء بحث مستقل شامل</li>
                  <li>✓ التحقق من جميع المستندات القانونية</li>
                  <li>✓ فحص العقار بواسطة مختصين</li>
                  <li>✓ فهم جميع المخاطر المحتملة</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">⚖️ مسؤوليتك الشخصية</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                باستخدامك للمنصة، فإنك تقر وتوافق على أنك:
              </p>
              <ul className="body-ar text-gray-700 space-y-2 mr-6 mt-4">
                <li>• تتحمل المسؤولية الكاملة عن قراراتك الاستثمارية</li>
                <li>• فهمت المخاطر المرتبطة بالاستثمار العقاري</li>
                <li>• ستجري بحثك الخاص وتستشير متخصصين</li>
                <li>• لن تحملنا المسؤولية عن أي خسائر</li>
              </ul>
            </section>

            <section>
              <h2 className="heading-ar text-2xl mb-4 text-gray-900">📞 الأسئلة</h2>
              <p className="body-ar text-gray-700 leading-relaxed">
                إذا كانت لديك أسئلة حول هذا الإخلاء:
              </p>
              <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mt-4">
                <p className="body-ar text-gray-800">
                  📧 info@palestine-realestate.com<br />
                  📞 +970-XXX-XXXX
                </p>
              </div>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t flex gap-4">
            <Link href="/privacy" className="btn btn-outline">
              سياسة الخصوصية
            </Link>
            <Link href="/terms" className="btn btn-outline">
              شروط الخدمة
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

