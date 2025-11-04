'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import Logo from '@/components/Logo';
import { MapPin, TrendingUp, User as UserIcon, Target, BarChart } from 'lucide-react';

export default function HomePage() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <main className="min-h-screen bg-pi-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-pi-beige">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="body-ar text-brown hover:text-gold transition-colors">
                    {user.name}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn btn-outline btn-sm"
                  >
                    تسجيل الخروج
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="body-ar text-brown hover:text-gold transition-colors">
                    Log In
                  </Link>
                  <Link href="/signup" className="btn btn-primary btn-sm">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-pi-light-cream to-pi-cream">
        <div className="container-custom text-center">
          <h1 className="font-heading text-5xl md:text-7xl mb-6 text-dark-brown">
            START YOUR<br />
            INVESTMENT JOURNEY
          </h1>
          <p className="body-ar text-xl text-brown mb-8 max-w-2xl mx-auto">
            استثمر بثقة في العقارات الفلسطينية مع توصيات مخصصة ومستشارين معتمدين
          </p>
          <Link href={user ? "/dashboard" : "/signup"} className="btn btn-primary text-lg">
            EXPLORE NOW
          </Link>
        </div>
      </section>

      {/* Featured Cities */}
      <section className="section bg-white">
        <div className="container-custom">
          <h2 className="font-heading text-4xl text-center mb-12 text-dark-brown">
            FEATURED CITIES
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'NABLUS',
                nameAr: 'نابلس',
                avgPrice: '$850',
                returnRate: '7%',
                vacancy: '3%',
                icon: '🏛️'
              },
              {
                name: 'RAMALLAH',
                nameAr: 'رام الله',
                avgPrice: '$850',
                returnRate: '7%',
                vacancy: '3%',
                icon: '🏙️'
              },
              {
                name: 'GAZA',
                nameAr: 'غزة',
                avgPrice: '$8530',
                returnRate: '3%',
                vacancy: '3%',
                icon: '🏘️'
              },
            ].map((city, index) => (
              <div
                key={index}
                className="card text-center group hover:scale-105 transition-all"
                style={{ background: 'linear-gradient(135deg, #FAF8F3 0%, #F5EFE7 100%)' }}
              >
                <div className="text-5xl mb-4">{city.icon}</div>
                <h3 className="font-heading text-2xl mb-2 text-dark-brown">{city.name}</h3>
                <p className="body-ar text-sm text-brown mb-4">{city.nameAr}</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="body-ar text-brown">Avg Price/Meter</span>
                    <span className="font-bold text-gold">{city.avgPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="body-ar text-brown">Potential Value</span>
                    <span className="font-bold text-gold">{city.returnRate}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="body-ar text-brown">Vacancy Rate</span>
                    <span className="font-bold text-gold">{city.vacancy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Help You */}
      <section className="section bg-pi-cream">
        <div className="container-custom">
          <h2 className="font-heading text-4xl text-center mb-12 text-dark-brown">
            HOW WE HELP YOU?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <UserIcon className="w-10 h-10 text-brown" />
              </div>
              <h3 className="font-heading text-xl mb-2 text-dark-brown">1. Create Your Profile</h3>
              <p className="body-ar text-sm text-brown">
                أنشئ ملفك الاستثماري المخصص بناءً على أهدافك وميزانيتك
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <MapPin className="w-10 h-10 text-brown" />
              </div>
              <h3 className="font-heading text-xl mb-2 text-dark-brown">2. Choose Your City</h3>
              <p className="body-ar text-sm text-brown">
                اختر المدينة المفضلة واستكشف الفرص الاستثمارية المتاحة
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <BarChart className="w-10 h-10 text-brown" />
              </div>
              <h3 className="font-heading text-xl mb-2 text-dark-brown">3. Get Your Recommendation</h3>
              <p className="body-ar text-sm text-brown">
                احصل على توصيات استثمارية ذكية مبنية على تحليل السوق
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href={user ? "/onboarding" : "/signup"} className="btn btn-primary text-lg">
              ابدأ الآن
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl mb-6 text-dark-brown">
                Investment Simulator
              </h2>
              <p className="body-ar text-lg text-brown mb-6 leading-relaxed">
                احسب العوائد المتوقعة لاستثمارك باستخدام أداتنا الذكية. أدخل رأس المال ونوع العقار والمدينة 
                لتحصل على تحليل مفصل للعائد المتوقع وفترة الاسترداد ومستوى المخاطر.
              </p>
              <Link href={user ? "/recommendations" : "/signup"} className="btn btn-primary">
                جرب الحاسبة الآن
              </Link>
            </div>
            <div className="bg-pi-light-cream rounded-2xl p-8 border-2 border-pi-beige">
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-pi-beige">
                  <span className="text-sm text-brown">Capital Investment</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-pi-beige">
                  <span className="text-sm text-brown">Property Type</span>
                </div>
                <div className="bg-white rounded-lg p-4 border border-pi-beige">
                  <span className="text-sm text-brown">City</span>
                </div>
                <button className="w-full btn btn-primary">
                  Calculate Return
                </button>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <div className="text-2xl font-bold text-green-600">+12.5%</div>
                  <div className="text-xs text-green-700">Expected Annual Return</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600">8 Years</div>
                  <div className="text-xs text-blue-700">Payback Period</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Hub */}
      <section className="section bg-pi-cream">
        <div className="container-custom">
          <h2 className="font-heading text-4xl text-center mb-12 text-dark-brown">
            Knowledge Hub
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Beginner's Guide", desc: 'دليل شامل للمبتدئين في الاستثمار العقاري', link: '/library' },
              { title: "Investing in Land", desc: 'كل ما تحتاج معرفته عن استثمار الأراضي', link: '/library' },
              { title: "Rental Management", desc: 'إدارة العقارات المؤجرة بكفاءة', link: '/library' },
              { title: "Sohens Carn/Ivest", desc: 'استراتيجيات الاستثمار المتقدمة', link: '/library' },
              { title: "Property Management", desc: 'أفضل ممارسات إدارة الممتلكات', link: '/library' },
              { title: "Laws & Licenses", desc: 'القوانين والتراخيص العقارية', link: '/library' },
            ].map((item, index) => (
              <div key={index} className="card bg-white">
                <h3 className="font-heading text-lg mb-2 text-dark-brown">{item.title}</h3>
                <p className="body-ar text-sm text-brown mb-4">{item.desc}</p>
                <Link href={item.link} className="inline-block">
                  <button className="btn btn-primary btn-sm">
                    Read More
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="section bg-gradient-to-br from-brown to-gold text-white">
          <div className="container-custom text-center">
            <h2 className="font-heading text-4xl mb-6">
              Ready to Start Investing?
            </h2>
            <p className="body-ar text-xl mb-8 opacity-90">
              انضم الآن واحصل على توصيات استثمارية مخصصة
            </p>
            <Link href="/signup" className="btn bg-white text-brown hover:bg-pi-light-cream">
              Create Free Account
            </Link>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-dark-brown text-pi-beige py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo size="sm" className="mb-4" />
              <p className="body-ar text-sm opacity-80">
                منصة ذكية للاستثمار العقاري في فلسطين
              </p>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4 text-gold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="hover:text-gold transition-colors">من نحن</Link></li>
                <li><Link href="/library" className="hover:text-gold transition-colors">المكتبة</Link></li>
                <li><Link href="/advisors" className="hover:text-gold transition-colors">المستشارون</Link></li>
                <li><Link href="/contact" className="hover:text-gold transition-colors">اتصل بنا</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4 text-gold">Privacy Policy</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/privacy" className="hover:text-gold transition-colors">سياسة الخصوصية</Link></li>
                <li><Link href="/terms" className="hover:text-gold transition-colors">شروط الاستخدام</Link></li>
                <li><Link href="/disclaimer" className="hover:text-gold transition-colors">Disclaimer</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-lg mb-4 text-gold">Terms Element</h4>
              <p className="text-sm opacity-80">
                © 2024 Palestine Invest<br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
