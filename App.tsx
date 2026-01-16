import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Register from './pages/Register';
import Directory from './pages/Directory';
// 1. IMPORT THE NEW PAGE
import AdminUpload from './pages/AdminUpload';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/register" element={<Register />} />
            <Route path="/directory" element={<Directory />} />
            
            {/* 2. ADD THE ROUTE HERE */}
            <Route path="/admin-upload" element={<AdminUpload />} />
          </Routes>
        </main>
        <footer className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-malayalam">യുവദീപ്തി എസ്.എം.വൈ.എം മുട്ടാർ  ന്യൂ </p>
            <p className="text-gray-500 text-sm mt-2">© 2026 Jeevadeepti. Saving Lives Together.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;