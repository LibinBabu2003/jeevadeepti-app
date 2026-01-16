import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png'; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { name: 'Find Blood', path: '/search' },
    { name: 'Directory', path: '/directory' },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* --- LEFT SIDE: LOGO & BRAND --- */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <img 
                src={logo} 
                alt="Jeevadeepti Logo" 
                className="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-200" 
              />
              <div className="flex flex-col justify-center items-center">
                <h1 className="text-xl font-black text-brand-600 leading-none tracking-tight font-sans">
                  JEEVA<span className="text-gray-800">DEEPTI</span>
                </h1>
                <span className="text-[10px] text-gray-500 font-bold tracking-wider uppercase pt-0.5">
                  Yuvadeepti SMYM
                </span>
              </div>
            </Link>
          </div>

          {/* --- RIGHT SIDE: DESKTOP MENU --- */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-bold tracking-wide transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            {/* BUTTON CHANGED TO 'Register' */}
            <Link 
              to="/register" 
              className="bg-brand-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md hover:bg-brand-700 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Register
            </Link>
          </div>

          {/* --- MOBILE MENU BUTTON --- */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-brand-50 text-brand-700'
                    : 'text-gray-600 hover:text-brand-600 hover:bg-gray-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Mobile Register Link */}
            <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-bold text-brand-600 bg-brand-50 mt-2"
              >
                Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;