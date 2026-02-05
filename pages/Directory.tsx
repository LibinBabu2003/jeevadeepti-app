import React, { useState, useEffect } from 'react';
import { Phone, Ambulance, Building2, HeartPulse, Loader2, Filter, Shield, Flame } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
// Ensure you have updated types.ts as shown in the next step!
import { EmergencyContact } from '../types';

const CATEGORIES = ['All', 'Ambulance', 'Hospital', 'Palliative', 'Police', 'Fire Force', 'Other'];

const Directory: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    // Fetch data safely
    const q = query(collection(db, "contacts"), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EmergencyContact[];
      setContacts(list);
      setLoading(false);
    }, (error) => {
      console.error("Database Error:", error);
      setLoading(false); // Stop loading even if error
    });
    return () => unsubscribe();
  }, []);

  // --- CRASH PROOF ICON SELECTOR ---
  const getIcon = (category: string) => {
    // SAFETY CHECK: If category is missing/undefined, use empty string to prevent crash
    const cat = (category || '').toLowerCase();

    if (cat.includes('ambulance')) return <Ambulance className="h-5 w-5 text-blue-500" />;
    if (cat.includes('hospital')) return <Building2 className="h-5 w-5 text-green-500" />;
    if (cat.includes('palliative')) return <HeartPulse className="h-5 w-5 text-purple-500" />;
    if (cat.includes('police')) return <Shield className="h-5 w-5 text-indigo-800" />;
    if (cat.includes('fire')) return <Flame className="h-5 w-5 text-orange-500" />;
    return <Phone className="h-5 w-5 text-gray-500" />;
  };

  const filteredContacts = selectedCategory === 'All'
    ? contacts
    : contacts.filter(c => (c.category || 'Other') === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Emergency Directory</h1>
          <p className="mt-1 text-sm text-gray-500">Essential contacts for Alappuzha & nearby.</p>
        </div>

        {/* FILTER */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-4 w-4 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg leading-5 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-sm"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <div className="flex justify-center mt-12">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.length === 0 ? (
              <div className="col-span-full text-center py-10 bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-3">
                  <Filter className="h-6 w-6 text-gray-400" />
                </div>
                <h3 className="text-base font-medium text-gray-900">No contacts found</h3>
                <p className="text-sm text-gray-500">
                  {contacts.length === 0 ? "Database is empty." : `No entries found for '${selectedCategory}'.`}
                </p>
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-5 flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="flex-shrink-0 inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-50 border border-gray-100">
                          {getIcon(contact.category)}
                        </span>
                        <h3 className="text-base font-bold text-gray-900 truncate">{contact.name}</h3>
                      </div>
                      <p className="text-xs text-gray-500 pl-10 truncate">{contact.location}</p>
                      <div className="mt-2 pl-10 flex gap-2">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-gray-100 text-gray-800">
                          {contact.category || 'Unknown'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CALL BUTTON */}
                  <a
                    href={`tel:${contact.phone}`}
                    className="block w-full bg-gray-50 hover:bg-green-50 border-t border-gray-100 py-3 text-center transition-colors group"
                  >
                    <div className="flex items-center justify-center gap-2 text-gray-700 group-hover:text-green-700 font-bold text-sm">
                      <Phone className="h-4 w-4" />
                      <span>{contact.phone}</span>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Directory;