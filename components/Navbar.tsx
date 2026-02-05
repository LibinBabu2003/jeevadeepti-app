import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, ShieldCheck, Search, BookOpen, Lock } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Find Blood', path: '/search', icon: <Search className="w-4 h-4" /> },
    { name: 'Directory', path: '/directory', icon: <BookOpen className="w-4 h-4" /> },
    { name: 'Awareness', path: '/awareness', icon: <Heart className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">

          {/* BRAND */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
              <img
                src={logo}
                alt="Logo"
                className="h-9 w-9 object-contain group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <h1 className="text-xl font-black text-red-600 leading-none tracking-tighter">
                  JEEVA<span className="text-gray-900">DEEPTI</span>
                </h1>
                <span className="text-[9px] text-gray-500 font-bold tracking-widest uppercase">
                  Yuvadeepti SMYM
                </span>
              </div>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 flex items-center gap-2 ${isActive(link.path)
                    ? 'bg-red-50 text-red-700 shadow-sm'
                    : 'text-gray-600 hover:text-red-600 hover:bg-gray-50'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <div className="h-6 w-px bg-gray-200 mx-2"></div>

            <Link
              to="/register"
              className="bg-red-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow hover:bg-red-700 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Register
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 hover:bg-gray-100 transition-colors focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU (OVERLAY) */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-2xl md:hidden animate-fade-in-down z-50">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${isActive(link.path)
                    ? 'bg-red-50 text-red-700'
                    : 'text-gray-700 hover:bg-gray-50'
                  }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}

            <div className="border-t border-gray-100 my-2 pt-2">
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-red-600 text-white px-4 py-3 rounded-lg text-base font-bold shadow active:scale-95 transition-transform"
              >
                <ShieldCheck className="w-5 h-5" />
                Register as Donor
              </Link>
            </div>
            <div className="flex justify-center pt-2">
              <Link to="/privacy-policy" onClick={() => setIsOpen(false)} className="text-xs text-gray-400 font-medium flex items-center gap-1">
                <Lock className="w-3 h-3" /> Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;