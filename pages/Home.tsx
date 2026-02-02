import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, UserPlus, Heart, Users, PhoneCall } from 'lucide-react';
import { collection, getCountFromServer } from 'firebase/firestore';
import { db } from '../firebase';

const Home: React.FC = () => {
  const [donorCount, setDonorCount] = useState<number | null>(null);

  // Fetch the total number of donors
  useEffect(() => {
    const getCount = async () => {
      try {
        const coll = collection(db, "donors");
        const snapshot = await getCountFromServer(coll);
        setDonorCount(snapshot.data().count);
      } catch (err) {
        console.error("Error counting donors:", err);
      }
    };
    getCount();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      {/* 1. Changed bg-gray-900 to bg-white to remove dark background color */}
      <div className="relative bg-white text-gray-800 overflow-hidden">
        
        {/* 2. BANNER IMAGE FIXES: 
            - Removed 'opacity-50' so image is fully visible (no gray shade).
            - Changed 'bg-center' to 'bg-[center_top]' so heads are not cut off on mobile.
        */}
        <div 
          className="absolute inset-0 bg-[url('/banner1.png')] bg-cover bg-[center_top]" 
        />
        
        {/* 3. Added a White Fade Overlay (Optional) to make text readable without making it gray */}
        {/* This fades from transparent at top to white at bottom, blending with the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-white/10 md:hidden" />

        {/* 4. REDUCED PADDING: Changed 'py-24' to 'py-16 md:py-24' to fit mobile screens better */}
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          
          {/* Icon Box - Added white background for readability over image */}
          <div className="bg-white/80 p-3 rounded-full mb-6 backdrop-blur-sm shadow-sm">
            <Heart className="h-12 w-12 text-red-600 animate-pulse" fill="currentColor" />
          </div>
          
          {/* Text with text-shadow for readability over image */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-gray-900 drop-shadow-lg shadow-white">
            Jeevadeepti
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-800 max-w-2xl mb-8 font-medium drop-shadow-md shadow-white bg-white/30 p-2 rounded-lg backdrop-blur-[2px]">
            Yuvadeepti SMYM Muttar New
            <br/>
            <span className="text-sm md:text-base opacity-90 mt-2 block font-normal">
              "Connecting life savers with those in need."
            </span>
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Link 
              to="/search" 
              className="flex-1 flex items-center justify-center gap-2 bg-white text-red-700 px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1 border border-gray-100"
            >
              <Search className="h-5 w-5" /> Find Donor
            </Link>
            <Link 
              to="/register" 
              className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:bg-red-700 transition-all transform hover:-translate-y-1"
            >
              <UserPlus className="h-5 w-5" /> Register
            </Link>
          </div>
        </div>
      </div>

      {/* LIVE STATS SECTION */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center border-t-4 border-red-500">
          
          {/* Stat 1 */}
          <div className="flex flex-col items-center">
            <div className="bg-red-50 p-3 rounded-full mb-3">
              <Users className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-4xl font-bold text-gray-900">
              {donorCount !== null ? donorCount : "..."}
            </h3>
            <p className="text-gray-500 font-medium">Registered Donors</p>
          </div>

          {/* Stat 2 */}
          <div className="flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0">
             <div className="bg-green-50 p-3 rounded-full mb-3">
               <PhoneCall className="h-8 w-8 text-green-600" />
             </div>
             <h3 className="text-4xl font-bold text-gray-900">24/7</h3>
             <p className="text-gray-500 font-medium">Emergency Directory</p>
          </div>

          {/* Stat 3 */}
          <div className="flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0">
             <div className="bg-blue-50 p-3 rounded-full mb-3">
               <Heart className="h-8 w-8 text-blue-600" />
             </div>
             <h3 className="text-4xl font-bold text-gray-900">100%</h3>
             <p className="text-gray-500 font-medium">Voluntary Service</p>
          </div>

        </div>
      </div>

      {/* HELPLINE / SUPPORT SECTION */}
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Assistance?</h2>
        <p className="text-gray-600 mb-6">
          If you are unable to find a donor or need urgent help, please contact the SMYM Coordinator.
        </p>
        <a 
          href="tel:9999999999"
          className="inline-flex items-center gap-2 text-gray-700 font-bold bg-gray-100 px-6 py-3 rounded-full hover:bg-gray-200 transition-colors"
        >
          <PhoneCall className="h-5 w-5" />
          Call Support
        </a>
      </div>

    </div>
  );
};

export default Home;
