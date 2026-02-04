import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Register from './pages/Register';
import Directory from './pages/Directory';
import AdminUpload from './pages/AdminUpload';
// 1. IMPORT THE NEW PAGE
import AdminPanel from './pages/AdminPanel';
import Footer from './components/Footer';
import Migration from './pages/Migration'; // Import it
import Awareness from './pages/Awareness';
import PrivacyPolicy from './pages/PrivacyPolicy'; // <--- 1. ADD THIS IMPORT

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
            <Route path="/admin-upload" element={<AdminUpload />} />

            {/* 2. ADD THE SECRET ROUTE HERE */}
            <Route path="/admin-manage" element={<AdminPanel />} />
            <Route path="/migrate-data" element={<Migration />} />
            <Route path="/awareness" element={<Awareness />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;