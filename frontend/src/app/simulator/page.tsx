'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { DollarSign, Home, MapPin, TrendingUp, Calendar, AlertCircle } from 'lucide-react';

export default function SimulatorPage() {
  const [capital, setCapital] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [city, setCity] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateReturn = () => {
    const capitalNum = parseFloat(capital) || 0;
    const returnRates: any = {
      'ramallah': { rate: 7, risk: 'Low', payback: 8 },
      'nablus': { rate: 7.5, risk: 'Low', payback: 7.5 },
      'gaza': { rate: 12, risk: 'Medium', payback: 6 },
      'hebron': { rate: 6.5, risk: 'Low', payback: 9 },
      'bethlehem': { rate: 8, risk: 'Medium', payback: 7 },
    };

    const cityData = returnRates[city.toLowerCase()] || returnRates['ramallah'];
    const expectedReturn = cityData.rate;
    const annualReturn = (capitalNum * expectedReturn) / 100;

    setResults({
      expectedReturn: `+${expectedReturn}%`,
      annualIncome: `$${annualReturn.toLocaleString()}`,
      paybackPeriod: `${cityData.payback} Years`,
      riskLevel: cityData.risk,
    });
  };

  return (
    <div className="min-h-screen bg-pi-cream">
      {/* Header */}
      <header className="bg-white border-b-2 border-pi-beige">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Link href="/" className="body-ar text-brown hover:text-gold">Language</Link>
              <Link href="/login" className="body-ar text-brown hover:text-gold">Log In</Link>
              <Link href="/signup" className="btn btn-primary btn-sm">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom section">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-heading text-5xl text-center mb-12 text-dark-brown">
            Investment Simulator
          </h1>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Calculator Form */}
            <div>
              <h2 className="font-heading text-2xl mb-6 text-dark-brown">
                Calculate Your Potential Return
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="body-ar block text-brown mb-2 text-sm">Capital Investment</label>
                  <div className="relative">
                    <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown w-5 h-5" />
                    <input
                      type="number"
                      value={capital}
                      onChange={(e) => setCapital(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full pr-10 pl-4 py-3 rounded-lg border-2 border-pi-beige focus:border-brown"
                    />
                  </div>
                </div>

                <div>
                  <label className="body-ar block text-brown mb-2 text-sm">Property Type</label>
                  <div className="relative">
                    <Home className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown w-5 h-5" />
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 rounded-lg border-2 border-pi-beige focus:border-brown appearance-none"
                    >
                      <option value="">Select type</option>
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="land">Land</option>
                      <option value="industrial">Industrial</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="body-ar block text-brown mb-2 text-sm">City</label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-brown w-5 h-5" />
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full pr-10 pl-4 py-3 rounded-lg border-2 border-pi-beige focus:border-brown appearance-none"
                    >
                      <option value="">Select city</option>
                      <option value="ramallah">Ramallah</option>
                      <option value="nablus">Nablus</option>
                      <option value="gaza">Gaza</option>
                      <option value="hebron">Hebron</option>
                      <option value="bethlehem">Bethlehem</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={calculateReturn}
                  disabled={!capital || !propertyType || !city}
                  className="w-full btn btn-primary py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Calculate Return
                </button>
              </div>
            </div>

            {/* Results */}
            <div>
              <h2 className="font-heading text-2xl mb-6 text-dark-brown">
                Your Projected Outcomes
              </h2>

              {results ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-green-700">Expected Annual Return</span>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-4xl font-bold text-green-600">{results.expectedReturn}</div>
                    <div className="text-sm text-green-700 mt-2">{results.annualIncome}/year</div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-blue-700">Payback Period</span>
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-4xl font-bold text-blue-600">{results.paybackPeriod}</div>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-yellow-700">Risk Analysis</span>
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-600">{results.riskLevel} Risk</div>
                  </div>

                  <div className="bg-white rounded-2xl p-6 border-2 border-pi-beige">
                    <p className="body-ar text-sm text-brown">
                      💡 هذه التوقعات مبنية على متوسطات السوق الحالية وقد تختلف النتائج الفعلية.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-12 text-center border-2 border-pi-beige">
                  <BarChart className="w-16 h-16 text-brown mx-auto mb-4 opacity-50" />
                  <p className="body-ar text-brown">
                    أدخل بياناتك لرؤية التوقعات
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

