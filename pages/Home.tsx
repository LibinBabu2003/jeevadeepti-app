import React from 'react';
import { Link } from 'react-router-dom';
import { Search, HeartHandshake, Contact, Droplet } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-brand-50 to-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10 pointer-events-none">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -left-20 w-96 h-96 text-brand-600 fill-current">
              <path fill="#DC2626" d="M47.5,-61.8C59.7,-51.2,66.8,-34.5,69.5,-17.8C72.2,-1.1,70.5,15.6,61.9,29.3C53.3,43,37.8,53.7,21.6,60.8C5.4,67.9,-11.5,71.4,-26.8,66.1C-42.1,60.8,-55.8,46.7,-63.9,30.3C-72,13.9,-74.5,-4.8,-68.8,-21.3C-63.1,-37.8,-49.2,-52.1,-35.1,-61.8C-21,-71.5,-6.7,-76.6,6.3,-84.2L12.5,-91.8" transform="translate(100 100)" />
           </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            <span className="block text-brand-600">Jeevadeepti</span>
            <span className="block text-2xl sm:text-3xl mt-2 font-medium text-gray-600">Lighting Lives through Blood</span>
          </h1>
          <p className="mt-4 max-w-lg mx-auto text-lg text-gray-500 font-malayalam">
            രക്തം നൽകൂ, ജീവൻ രക്ഷിക്കൂ. <br/>
            An Initiative by <span className="font-bold text-brand-600">Yuvadeepti SMYM Muttar NEW</span>
          </p>

          <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Register Button */}
            <Link 
              to="/register" 
              className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-red-50 animate-card-pulse hover:animate-none"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-brand-600 text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <HeartHandshake size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Register as Donor</h2>
              <p className="text-xl font-bold text-brand-600 font-malayalam mb-4">ജീവൻ നൽകാം</p>
              <p className="text-gray-500 text-sm">Join our community of life savers. Your one donation can save up to 3 lives.</p>
              <div className="mt-6 flex items-center justify-center text-brand-600 font-semibold group-hover:underline">
                Register Now &rarr;
              </div>
            </Link>

            {/* Find Blood Button */}
            <Link 
              to="/search" 
              className="group relative bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-red-50"
            >
              <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-gray-800 text-white p-3 rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <Search size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Blood</h2>
              <p className="text-xl font-bold text-brand-600 font-malayalam mb-4">രക്തം അന്വേഷിക്കാം</p>
              <p className="text-gray-500 text-sm">Urgent requirement? Search our verified donor database by district and blood group.</p>
              <div className="mt-6 flex items-center justify-center text-brand-600 font-semibold group-hover:underline">
                Search Donors &rarr;
              </div>
            </Link>
          </div>

          <div className="mt-12">
            <Link 
              to="/directory"
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-brand-600 transition-colors bg-white px-6 py-3 rounded-full shadow-md hover:shadow-lg"
            >
              <Contact size={20} />
              <span className="font-medium">Emergency Directory</span>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Quick Stats or Info Strip */}
      <div className="bg-white py-12 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-4">
                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-600 mb-4">
                   <Droplet size={24} />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900">100% Voluntary</h3>
                 <p className="mt-2 text-gray-500 text-sm">All donors are voluntary members of Yuvadeepti SMYM.</p>
              </div>
              <div className="p-4">
                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-600 mb-4">
                   <HeartHandshake size={24} />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900">Community Care</h3>
                 <p className="mt-2 text-gray-500 text-sm">Serving our local communities in Kerala with compassion.</p>
              </div>
              <div className="p-4">
                 <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-100 text-brand-600 mb-4">
                   <Contact size={24} />
                 </div>
                 <h3 className="text-lg font-semibold text-gray-900">24/7 Support</h3>
                 <p className="mt-2 text-gray-500 text-sm">Our emergency directory is available anytime you need it.</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Home;