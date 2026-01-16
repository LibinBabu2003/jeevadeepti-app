import React from 'react';
import { Heart, Phone, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Flex Container for Vertical Alignment */}
        <div className="flex flex-col items-center justify-center gap-8">
          
          {/* 1. Logo & Tagline */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-brand-500 fill-brand-500" />
              <span className="text-2xl font-bold text-brand-500 tracking-tight">Jeevadeepti</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">Lighting Lives through Blood</p>
          </div>
          
          {/* 2. Admin Contact Box (Centered & Styled) */}
          <div className="w-full max-w-sm bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-5 text-center shadow-sm">
            <p className="text-gray-400 text-xs uppercase tracking-wider font-bold mb-3">
              Need Corrections?
            </p>
            <p className="text-gray-300 text-sm mb-4">
              Made a mistake? Contact Admin:
            </p>
            
            <div className="flex justify-center gap-3">
              {/* Phone Button */}
              <a 
                href="tel:+918547242798" 
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-700 hover:bg-white hover:text-gray-900 rounded-lg text-sm font-semibold transition-all duration-200 group"
              >
                <Phone className="h-4 w-4 text-brand-400 group-hover:text-brand-600" />
                <span>Call</span>
              </a>

              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/918547242798" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-[#25D366] rounded-lg text-sm font-semibold transition-all duration-200"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* 3. Copyright Section */}
          <div className="text-center border-t border-gray-800 w-full pt-8">
            <p className="text-gray-500 text-sm">
              An Initiative by <span className="font-semibold text-white">Yuvadeepti SMYM</span>
            </p>
            <p className="text-gray-600 text-xs mt-2">
              © 2026 Jeevadeepti. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;