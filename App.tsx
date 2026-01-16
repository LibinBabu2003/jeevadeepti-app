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
            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;