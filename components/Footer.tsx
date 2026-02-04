import React from 'react';
import { Heart, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 border-t border-gray-800 mt-auto text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID LAYOUT: Stacks on mobile, 3 columns on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

          {/* COLUMN 1: Logo & Copyright */}
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
              <span className="text-xl font-bold text-red-500 tracking-tight">Jeevadeepti</span>
            </div>
            <p className="text-gray-400 text-xs">Lighting Lives through Blood</p>
            <div className="text-gray-500 text-xs pt-2">
              <p>© 2026 Jeevadeepti.</p>
              <p>Initiative by <span className="text-gray-300">Yuvadeepti SMYM</span></p>
            </div>
          </div>

          {/* COLUMN 2: Quick Links (Centered) */}
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <Link to="/search" className="hover:text-white transition-colors">Find Donors</Link>
            <Link to="/register" className="hover:text-white transition-colors">Register as Donor</Link>
            <Link to="/awareness" className="hover:text-white transition-colors">Awareness (അറിവ്)</Link>
            {/* FIXED LINK BELOW: Matches App.tsx route "/privacy-policy" */}
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
          </div>

          {/* COLUMN 3: Admin Contact (Compact Box) */}
          <div className="flex justify-center md:justify-end">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-center max-w-xs w-full">
              <p className="text-gray-400 text-[10px] uppercase font-bold mb-2">Need Corrections?</p>

              <div className="flex gap-2 justify-center">
                <a
                  href="tel:+918547242798"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-700 hover:bg-white hover:text-gray-900 rounded text-xs font-semibold transition-all"
                >
                  <Phone className="h-3 w-3" /> Call
                </a>

                <a
                  href="https://wa.me/918547242798"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 hover:border-transparent rounded text-xs font-semibold transition-all"
                >
                  <MessageCircle className="h-3 w-3" /> WhatsApp
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