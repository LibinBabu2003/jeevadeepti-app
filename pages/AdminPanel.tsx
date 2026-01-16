import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { Trash2, Search, ShieldCheck } from 'lucide-react';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  location: string;
  mobile: string;
}

const AdminPanel: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // --- 1. SECURITY: Simple Password Check ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // SET YOUR SECRET PASSWORD HERE (e.g., "admin123")
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchDonors();
    } else {
      alert('Wrong Password!');
    }
  };

  // --- 2. FETCH DATA ---
  const fetchDonors = async () => {
    try {
      const q = query(collection(db, 'donors'), orderBy('name'));
      const querySnapshot = await getDocs(q);
      const donorList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Donor));
      setDonors(donorList);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  // --- 3. DELETE FUNCTION ---
  const handleDelete = async (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}? This cannot be undone.`)) {
      try {
        await deleteDoc(doc(db, 'donors', id));
        // Remove from UI immediately
        setDonors(donors.filter(donor => donor.id !== id));
        alert('Deleted successfully');
      } catch (error) {
        console.error("Error deleting:", error);
        alert('Error deleting user');
      }
    }
  };

  // Filter donors for search
  const filteredDonors = donors.filter(donor =>
    donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donor.mobile.includes(searchTerm)
  );

  // --- RENDER: LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
          <div className="flex justify-center mb-6">
            <div className="bg-brand-100 p-3 rounded-full">
              <ShieldCheck className="h-10 w-10 text-brand-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Admin Access</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter Admin Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700 transition">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- RENDER: DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Manage Donors</h1>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Name or Phone..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr><td colSpan={5} className="text-center py-4">Loading...</td></tr>
              ) : filteredDonors.map((donor) => (
                <tr key={donor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{donor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donor.mobile}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      {donor.bloodGroup}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-600">{donor.location}, {donor.district}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() => handleDelete(donor.id, donor.name)}
                      className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full hover:bg-red-100 transition"
                      title="Delete Donor"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDonors.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">No donors found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;