'use client';

import Link from 'next/link';
import { Building2, MessageSquare, BookOpen, Shield } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="container-custom section">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-ar text-4xl md:text-5xl lg:text-6xl mb-6">
              منصة الاستثمار العقاري الذكية
            </h1>
            <p className="body-ar text-xl md:text-2xl mb-8 text-primary-50">
              استثمر بثقة في العقارات الفلسطينية مع توصيات مخصصة ومستشارين معتمدين
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/signup" className="btn btn-primary bg-white text-primary-700 hover:bg-primary-50">
                ابدأ الآن مجاناً
              </Link>
              <Link href="/login" className="btn btn-outline border-white text-white hover:bg-white hover:text-primary-700">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-gray-50">
        <div className="container-custom">
          <h2 className="heading-ar text-3xl md:text-4xl text-center mb-12 text-gray-900">
            لماذا تختار منصتنا؟
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Building2 className="w-10 h-10 text-primary-600" />}
              title="توصيات مخصصة"
              description="احصل على فرص استثمارية مناسبة لدخلك وأهدافك"
            />
            <FeatureCard
              icon={<MessageSquare className="w-10 h-10 text-primary-600" />}
              title="مستشارون معتمدون"
              description="تواصل مباشرة مع خبراء قانونيين وماليين"
            />
            <FeatureCard
              icon={<BookOpen className="w-10 h-10 text-primary-600" />}
              title="مكتبة تعليمية"
              description="تعلم أساسيات الاستثمار العقاري والقوانين"
            />
            <FeatureCard
              icon={<Shield className="w-10 h-10 text-primary-600" />}
              title="أمان وخصوصية"
              description="بياناتك محمية بأعلى معايير الأمان"
            />
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container-custom">
          <h2 className="heading-ar text-3xl md:text-4xl text-center mb-12 text-gray-900">
            مكتبة المحتوى التعليمي
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard
              title="نصائح للمبتدئين"
              description="ابدأ رحلتك الاستثمارية بأساس قوي"
              link="/library/beginner"
              color="bg-blue-500"
            />
            <CategoryCard
              title="استثمار الأراضي"
              description="دليلك لاستثمار الأراضي وتخزينها"
              link="/library/land"
              color="bg-green-500"
            />
            <CategoryCard
              title="إدارة العقارات"
              description="إدارة استثماراتك بكفاءة واحترافية"
              link="/library/management"
              color="bg-yellow-500"
            />
            <CategoryCard
              title="القوانين والتراخيص"
              description="افهم الجوانب القانونية للعقارات"
              link="/library/law"
              color="bg-purple-500"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="heading-ar text-3xl md:text-4xl mb-6">
            جاهز لبدء رحلتك الاستثمارية؟
          </h2>
          <p className="body-ar text-xl mb-8 text-primary-50">
            انضم الآن وابدأ في اتخاذ قرارات استثمارية واثقة ومدروسة
          </p>
          <Link href="/signup" className="btn btn-primary bg-white text-primary-700 hover:bg-primary-50">
            سجل مجاناً الآن
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="heading-ar text-xl mb-4 text-white">منصة الاستثمار العقاري</h3>
              <p className="body-ar text-sm">
                نساعد المستثمرين الفلسطينيين على اتخاذ قرارات عقارية واثقة ومدروسة
              </p>
            </div>
            <div>
              <h4 className="heading-ar text-lg mb-4 text-white">روابط سريعة</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-white transition-smooth">من نحن</Link></li>
                <li><Link href="/library" className="hover:text-white transition-smooth">المكتبة</Link></li>
                <li><Link href="/advisors" className="hover:text-white transition-smooth">المستشارون</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-smooth">اتصل بنا</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="heading-ar text-lg mb-4 text-white">قانوني</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition-smooth">سياسة الخصوصية</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-smooth">شروط الاستخدام</Link></li>
                <li><Link href="/disclaimer" className="hover:text-white transition-smooth">إخلاء المسؤولية</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="heading-ar text-lg mb-4 text-white">تواصل معنا</h4>
              <p className="body-ar text-sm">
                البريد الإلكتروني: info@realestate-palestine.com
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
            <p>© 2024 منصة الاستثمار العقاري الذكية - فلسطين. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="card text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="heading-ar text-xl mb-2 text-gray-900">{title}</h3>
      <p className="body-ar text-gray-600">{description}</p>
    </div>
  );
}

function CategoryCard({ title, description, link, color }: { title: string; description: string; link: string; color: string }) {
  return (
    <Link href={link} className="card hover:scale-105 transition-smooth">
      <div className={`w-full h-32 ${color} rounded-lg mb-4 flex items-center justify-center`}>
        <BookOpen className="w-16 h-16 text-white" />
      </div>
      <h3 className="heading-ar text-xl mb-2 text-gray-900">{title}</h3>
      <p className="body-ar text-gray-600 text-sm">{description}</p>
    </Link>
  );
}
