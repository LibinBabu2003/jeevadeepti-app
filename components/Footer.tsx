import React from 'react';
import { Heart, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-8 pb-6 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-3 md:items-center">

          {/* BRAND */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              <span className="text-lg font-bold text-red-500 tracking-tight">Jeevadeepti</span>
            </div>
            <p className="text-gray-500 text-xs">Lighting Lives through Blood</p>
            <p className="text-gray-600 text-[10px] mt-1">© 2026 Yuvadeepti SMYM</p>
          </div>

          {/* LINKS (Horizontal on mobile) */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400 font-medium">
            <Link to="/search" className="hover:text-white transition-colors">Find</Link>
            <span className="text-gray-700">•</span>
            <Link to="/directory" className="hover:text-white transition-colors">Directory</Link>
            <span className="text-gray-700">•</span>
            <Link to="/awareness" className="hover:text-white transition-colors">Awareness</Link>
            <span className="text-gray-700">•</span>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          </div>

          {/* CONTACT */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-gray-800/60 border border-gray-700 rounded-lg p-3 text-center w-full max-w-xs">
              <p className="text-gray-500 text-[10px] uppercase font-bold mb-2">Admin Support</p>
              <div className="flex gap-2 justify-center">
                <a href="tel:+918547242798" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gray-700 hover:bg-white hover:text-gray-900 rounded text-xs font-semibold transition-all">
                  <Phone className="h-3.5 w-3.5" /> Call
                </a>
                <a href="https://wa.me/918547242798" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-transparent rounded text-xs font-semibold transition-all">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;