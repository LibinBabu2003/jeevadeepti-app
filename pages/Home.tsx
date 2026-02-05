import React from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Heart, Users, ShieldCheck, Phone } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* --- HERO SECTION --- */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] sm:text-xs font-bold uppercase tracking-wide mb-4 animate-fade-in">
                  <Heart className="h-3 w-3 fill-current" />
                  Kerala's Most Trusted Platform
                </div>
                {/* Mobile: Text-3xl | Desktop: Text-6xl */}
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl leading-tight">
                  <span className="block xl:inline">Your Blood Can</span>{' '}
                  <span className="block text-red-600 xl:inline">Save a Life Today</span>
                </h1>
                <p className="mt-3 text-sm sm:text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Jeevadeepti connects those in need with willing donors in seconds. Safe, secure, and purely voluntary.
                </p>

                <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3">
                  <Link to="/search" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl transition-all">
                    <Search className="h-5 w-5 mr-2" />
                    Find Blood
                  </Link>
                  <Link to="/register" className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-red-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Register
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-red-50 h-56 lg:h-auto">
          <img
            className="w-full h-full object-cover opacity-90"
            src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="Blood Donation"
          />
          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-white via-white/20 to-transparent"></div>
        </div>
      </div>

      {/* --- STATS SECTION (Compact on Mobile) --- */}
      <div className="bg-gray-900 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile: Grid-2 (Compact) | Desktop: Grid-3 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1">100%</div>
              <div className="text-gray-400 text-xs sm:text-base font-medium">Verified</div>
            </div>
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
              <div className="text-2xl sm:text-4xl font-extrabold text-red-500 mb-1">24/7</div>
              <div className="text-gray-400 text-xs sm:text-base font-medium">Support</div>
            </div>
            {/* Third item spans 2 cols on mobile to center it */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 col-span-2 sm:col-span-1">
              <div className="text-2xl sm:text-4xl font-extrabold text-white mb-1">Secure</div>
              <div className="text-gray-400 text-xs sm:text-base font-medium">Private</div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">Why Jeevadeepti?</h2>
            <p className="mt-2 text-sm sm:text-lg text-gray-500">Built for speed, safety, and community.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center px-4 p-6 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">100% Secure</h3>
              <p className="text-gray-500 text-sm">We log every search. Donor numbers are never public. Only verified users can access.</p>
            </div>

            <div className="text-center px-4 p-6 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Community Driven</h3>
              <p className="text-gray-500 text-sm">An initiative by Yuvadeepti SMYM. Local, real, and caring about Alappuzha.</p>
            </div>

            <div className="text-center px-4 p-6 rounded-2xl border border-gray-50 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-2">Direct Contact</h3>
              <p className="text-gray-500 text-sm">No middlemen. Connect directly with the donor via Call or WhatsApp instantly.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;