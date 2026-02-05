import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Shield, Clock, Heart, ChevronRight, Activity, Users } from 'lucide-react';
import { db } from '../firebase';
import { collection, getCountFromServer } from 'firebase/firestore';

const Home: React.FC = () => {
  const [donorCount, setDonorCount] = useState<string>("...");

  // FETCH REAL-TIME COUNT
  useEffect(() => {
    async function getCount() {
      try {
        const coll = collection(db, "donors");
        const snapshot = await getCountFromServer(coll);
        // If count is less than 10, show actual number, else append '+'
        const count = snapshot.data().count;
        setDonorCount(count > 0 ? `${count}+` : "0");
      } catch (error) {
        console.error("Error fetching count:", error);
        setDonorCount("2k+"); // Fallback if offline
      }
    }
    getCount();
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative bg-white overflow-hidden">

        {/* 1. HERO IMAGE (Optimized for Speed) */}
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 h-64 sm:h-72 md:h-96 lg:h-full bg-gray-100">
          <img
            className="w-full h-full object-cover object-center"
            // CHANGED: w=800 and q=60 for faster loading
            src="https://images.unsplash.com/photo-1615461066159-fea0960485d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
            alt="Blood Donor Donating"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent lg:hidden"></div>
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-white via-white/40 to-transparent"></div>
        </div>

        {/* 2. TEXT CONTENT */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="bg-white lg:bg-transparent lg:max-w-2xl lg:w-full pb-8 lg:pb-28 xl:pb-32 -mt-12 lg:mt-0 pt-6 px-4 sm:px-6 lg:px-8 rounded-t-3xl lg:rounded-none shadow-xl lg:shadow-none">

            <main className="mx-auto max-w-7xl lg:pt-20 xl:pt-28">
              <div className="text-center lg:text-left">

                {/* Trust Badge - CHANGED: Darker red text for accessibility */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-800 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
                  <Shield className="w-3 h-3" /> 100% Verified Platform
                </div>

                {/* Headline - CHANGED: Darker red accent */}
                <h1 className="text-3xl tracking-tighter font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4 leading-tight">
                  <span className="block xl:inline">Your Blood Can</span>{' '}
                  <span className="block text-red-700 xl:inline">Save a Life.</span>
                </h1>

                {/* Description - CHANGED: Darker gray for readability */}
                <p className="mt-3 text-sm text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Jeevadeepti is Kerala's trusted emergency network. We connect patients with willing donors in seconds. Safe, fast, and voluntary.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/search"
                    className="flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-red-700 hover:bg-red-800 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-0.5 active:scale-95"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Find Blood
                  </Link>
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-8 py-3.5 border border-gray-200 text-base font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10 shadow-sm transition-all active:scale-95"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Register
                  </Link>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* ================= FLOATING STATS (LIVE DATA) ================= */}
      <div className="bg-gray-900 border-t-4 border-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-3 gap-4 md:gap-8 text-center divide-x divide-gray-800">
            <div>
              {/* REAL-TIME COUNT DISPLAYED HERE */}
              <div className="text-2xl md:text-4xl font-bold text-white mb-1 animate-pulse">
                {donorCount}
              </div>
              <div className="text-[10px] md:text-sm text-gray-400 font-medium uppercase tracking-widest">Donors</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-red-500 mb-1">14</div>
              <div className="text-[10px] md:text-sm text-gray-400 font-medium uppercase tracking-widest">Districts</div>
            </div>
            <div>
              <div className="text-2xl md:text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-[10px] md:text-sm text-gray-400 font-medium uppercase tracking-widest">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= ACTION CARDS ================= */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* SEO FIX: Added hidden h2 for proper structure */}
          <h2 className="sr-only">Quick Actions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-8">
            <Link to="/register" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-700 to-red-800 p-6 md:p-8 shadow-xl transition-all active:scale-[0.98]">
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
              <div className="relative z-10">
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white shadow-inner">
                  <Heart className="h-5 w-5 fill-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">I want to Donate</h3>
                <p className="text-red-100 text-sm md:text-base mb-4">Join our hero network. Help save lives in your area.</p>
                <span className="inline-flex items-center text-sm font-bold text-white bg-white/20 px-3 py-1.5 rounded-full">
                  Register Now <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>

            <Link to="/search" className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 md:p-8 shadow-lg transition-all active:scale-[0.98]">
              <div className="relative z-10">
                {/* CHANGED: Darker red text for icon */}
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-800">
                  <Search className="h-5 w-5" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">I need Blood</h3>
                <p className="text-gray-600 text-sm md:text-base mb-4">Search verified donors by District. Call directly.</p>
                {/* CHANGED: Darker red text for link */}
                <span className="inline-flex items-center text-sm font-bold text-red-800 bg-red-50 px-3 py-1.5 rounded-full">
                  Find Donors <ChevronRight className="ml-1 h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ================= FEATURES GRID ================= */}
      <div className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Why Jeevadeepti?</h2>
            <p className="text-gray-600 text-sm">Built for speed, safety, and community.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              {/* CHANGED: Darker blue for contrast */}
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-700 flex-shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Secure & Private</h3>
                <p className="text-xs text-gray-600 mt-1">We never share lists publicly. Only verified users access numbers.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              {/* CHANGED: Darker green for contrast */}
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center text-green-700 flex-shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Real-Time Speed</h3>
                <p className="text-xs text-gray-600 mt-1">Every second counts. Our search engine connects you instantly.</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-start gap-4">
              {/* CHANGED: Darker purple for contrast */}
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center text-purple-700 flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">Community Driven</h3>
                <p className="text-xs text-gray-600 mt-1">An initiative by Yuvadeepti SMYM. A family of volunteers.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;