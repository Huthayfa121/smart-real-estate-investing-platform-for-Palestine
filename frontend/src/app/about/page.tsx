'use client';

import Link from 'next/link';
import { Building2, Target, Users, Shield, TrendingUp, Heart, Lightbulb } from 'lucide-react';

export default function AboutPage() {
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
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="heading-ar text-5xl mb-4 text-gray-900">🏠 من نحن</h1>
            <p className="body-ar text-xl text-gray-600">
              منصة ذكية لتمكين المستثمرين الفلسطينيين في السوق العقاري
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-8">
            <h2 className="heading-ar text-3xl mb-6 text-gray-900 flex items-center gap-3">
              <Target className="w-8 h-8 text-primary-600" />
              رؤيتنا
            </h2>
            <p className="body-ar text-gray-700 leading-relaxed text-lg">
              نؤمن بأن كل فلسطيني يستحق الحصول على المعلومات والأدوات اللازمة لاتخاذ قرارات استثمارية واعية 
              في السوق العقاري. نسعى لأن نكون الشريك الموثوق الذي يرافق المستثمرين في رحلتهم الاستثمارية من البداية 
              حتى تحقيق أهدافهم.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-8">
            <h2 className="heading-ar text-3xl mb-6 text-gray-900 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500" />
              مهمتنا
            </h2>
            <p className="body-ar text-gray-700 leading-relaxed text-lg mb-6">
              تمكين المستثمرين الفلسطينيين من خلال:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { icon: '📚', title: 'التعليم', desc: 'محتوى تعليمي شامل عن الاستثمار العقاري' },
                { icon: '🎯', title: 'التوصيات', desc: 'فرص استثمارية مخصصة بناءً على ملفك' },
                { icon: '👥', title: 'الاستشارات', desc: 'ربطك بمستشارين قانونيين وماليين معتمدين' },
                { icon: '🛡️', title: 'الشفافية', desc: 'معلومات موثوقة ودقيقة عن السوق' },
              ].map((item, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-4">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="heading-ar text-lg mb-1 text-gray-900">{item.title}</h3>
                  <p className="body-ar text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 md:p-12 mb-8">
            <h2 className="heading-ar text-3xl mb-6 text-gray-900 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              ما يميزنا
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="heading-ar text-xl mb-2 text-gray-900 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  تقنية ذكية
                </h3>
                <p className="body-ar text-gray-700 leading-relaxed">
                  نستخدم خوارزميات ذكية لتحليل ملفك الاستثماري وتقديم توصيات مخصصة تناسب أهدافك وميزانيتك.
                </p>
              </div>

              <div>
                <h3 className="heading-ar text-xl mb-2 text-gray-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  شبكة من الخبراء
                </h3>
                <p className="body-ar text-gray-700 leading-relaxed">
                  مستشارون قانونيون وماليون معتمدون متخصصون في السوق العقاري الفلسطيني.
                </p>
              </div>

              <div>
                <h3 className="heading-ar text-xl mb-2 text-gray-900 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary-600" />
                  خصوصية وأمان
                </h3>
                <p className="body-ar text-gray-700 leading-relaxed">
                  نحمي بياناتك بأعلى معايير الأمان ونلتزم بالشفافية الكاملة في التعامل مع معلوماتك.
                </p>
              </div>

              <div>
                <h3 className="heading-ar text-xl mb-2 text-gray-900 flex items-center gap-2">
                  📖 محتوى تعليمي
                </h3>
                <p className="body-ar text-gray-700 leading-relaxed">
                  مكتبة شاملة من المقالات والأدلة لمساعدتك على فهم السوق واتخاذ قرارات مستنيرة.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-primary-600 text-white rounded-xl p-8 md:p-12 text-center">
            <h2 className="heading-ar text-3xl mb-4">🚀 انضم إلينا اليوم</h2>
            <p className="body-ar text-xl text-primary-50 mb-6">
              ابدأ رحلتك الاستثمارية مع آلاف المستثمرين الذين يثقون بمنصتنا
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/signup" className="btn bg-white text-primary-700 hover:bg-primary-50">
                سجل مجاناً
              </Link>
              <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

