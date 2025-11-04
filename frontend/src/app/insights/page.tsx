'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { TrendingUp, Building, Users, AlertCircle } from 'lucide-react';

export default function InsightsPage() {
  const [selectedCity, setSelectedCity] = useState('ramallah');

  const cityData: any = {
    ramallah: {
      name: 'Ramallah',
      nameAr: 'رام الله',
      avgPrice: '$850/متر',
      grossYield: '4-7%',
      vacancyRate: '5%',
      constructionCost: 'Moderate',
      description: 'عاصمة فلسطين الاقتصادية والثقافية، سوق عقاري نشط مع طلب قوي',
    },
    nablus: {
      name: 'Nablus',
      nameAr: 'نابلس',
      avgPrice: '$750/متر',
      grossYield: '5-8%',
      vacancyRate: '4%',
      constructionCost: 'Low',
      description: 'مركز تجاري تاريخي مع فرص استثمارية ممتازة',
    },
    gaza: {
      name: 'Gaza',
      nameAr: 'غزة',
      avgPrice: '$650/متر',
      grossYield: '6-10%',
      vacancyRate: '6%',
      constructionCost: 'High',
      description: 'سوق متنامٍ مع إمكانات كبيرة للنمو',
    },
  };

  const cities = [
    { id: 'ramallah', name: 'Ramallah', x: 50, y: 40 },
    { id: 'nablus', name: 'Nablus', x: 52, y: 28 },
    { id: 'gaza', name: 'Gaza', x: 35, y: 75 },
    { id: 'hebron', name: 'Hebron', x: 48, y: 65 },
    { id: 'bethlehem', name: 'Bethlehem', x: 48, y: 52 },
    { id: 'jenin', name: 'Jenin', x: 54, y: 18 },
  ];

  return (
    <div className="min-h-screen bg-pi-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-pi-beige">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Link href="/" className="body-ar text-brown">Language</Link>
              <Link href="/login" className="body-ar text-brown">Regions</Link>
              <Link href="/login" className="text-brown hover:text-gold">Log In</Link>
              <Link href="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom section">
        <h1 className="font-heading text-5xl text-center mb-12 text-dark-brown">
          City Insights
        </h1>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Map Section */}
          <div className="bg-white rounded-2xl p-8 border-2 border-pi-beige">
            <div className="relative w-full aspect-[3/4] bg-pi-light-cream rounded-xl overflow-hidden">
              {/* SVG Map of Palestine */}
              <svg viewBox="0 0 200 300" className="w-full h-full">
                {/* Palestine outline (simplified) */}
                <path
                  d="M 100 50 L 120 80 L 130 120 L 125 180 L 115 240 L 100 280 L 85 240 L 75 180 L 70 120 L 80 80 Z"
                  fill="#E8DCC4"
                  stroke="#8B6F47"
                  strokeWidth="2"
                />

                {/* City markers */}
                {cities.map((city) => (
                  <g key={city.id}>
                    <circle
                      cx={city.x + '%'}
                      cy={city.y + '%'}
                      r="6"
                      fill={selectedCity === city.id ? '#C4A962' : '#8B6F47'}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-125 transition-transform"
                      onClick={() => setSelectedCity(city.id)}
                    />
                    <text
                      x={city.x + '%'}
                      y={(city.y + 8) + '%'}
                      textAnchor="middle"
                      fontSize="8"
                      fill="#5C4A35"
                      className="pointer-events-none"
                    >
                      {city.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* City Details */}
          <div>
            {cityData[selectedCity] && (
              <div className="bg-white rounded-2xl p-8 border-2 border-beige shadow-lg">
                <h2 className="font-heading text-3xl mb-6 text-dark-brown">
                  {cityData[selectedCity].name}
                </h2>
                <p className="body-ar text-brown mb-6">
                  {cityData[selectedCity].description}
                </p>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-pi-light-cream rounded-lg">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5 text-brown" />
                      <span className="body-ar text-sm text-brown">Average Price/Meter</span>
                    </div>
                    <span className="font-bold text-gold">{cityData[selectedCity].avgPrice}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-pi-light-cream rounded-lg">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-brown" />
                      <span className="body-ar text-sm text-brown">Gross Yield</span>
                    </div>
                    <span className="font-bold text-gold">{cityData[selectedCity].grossYield}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-pi-light-cream rounded-lg">
                    <div className="flex items-center gap-2">
                      <Building className="w-5 h-5 text-brown" />
                      <span className="body-ar text-sm text-brown">Vacancy Rate</span>
                    </div>
                    <span className="font-bold text-gold">{cityData[selectedCity].vacancyRate}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-pi-light-cream rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-brown" />
                      <span className="body-ar text-sm text-brown">Construction Cost Index</span>
                    </div>
                    <span className="font-bold text-gold">{cityData[selectedCity].constructionCost}</span>
                  </div>
                </div>

                <button className="w-full mt-8 btn btn-primary py-4">
                  Compare Cities
                </button>
              </div>
            )}

            <div className="mt-6 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4">
              <p className="body-ar text-sm text-yellow-800">
                💡 البيانات محدثة بناءً على متوسطات السوق. للحصول على معلومات دقيقة، استشر أحد مستشارينا.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

