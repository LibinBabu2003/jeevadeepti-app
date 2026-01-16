import React, { useState, useEffect } from 'react';
import { Phone, Ambulance, Building2, HeartPulse, Loader2, Filter, Shield, Flame } from 'lucide-react';
// 1. Import Database tools
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; 
import { EmergencyContact } from '../types';

// Define the categories for the filter dropdown
const CATEGORIES = ['All', 'Ambulance', 'Hospital', 'Palliative', 'Police', 'Fire Force', 'Other'];

const Directory: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 2. New State for Filter
  const [selectedCategory, setSelectedCategory] = useState('All');

  // 3. Fetch contacts from Firebase
  useEffect(() => {
    // Added orderBy('name') so the list is always alphabetical
    const q = query(collection(db, "contacts"), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as any[];
      setContacts(list);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Helper to choose the right icon
  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('ambulance')) return <Ambulance className="h-6 w-6 text-blue-500" />;
    if (cat.includes('hospital')) return <Building2 className="h-6 w-6 text-green-500" />;
    if (cat.includes('palliative')) return <HeartPulse className="h-6 w-6 text-purple-500" />;
    if (cat.includes('police')) return <Shield className="h-6 w-6 text-indigo-800" />;
    if (cat.includes('fire')) return <Flame className="h-6 w-6 text-orange-500" />;
    return <Phone className="h-6 w-6 text-gray-500" />;
  };

  // 4. Filter Logic: Show All or only matching category
  const filteredContacts = selectedCategory === 'All' 
    ? contacts 
    : contacts.filter(c => c.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Emergency Directory</h1>
          <p className="mt-2 text-gray-600">Important contacts for emergency situations</p>
        </div>

        {/* --- FILTER DROPDOWN SECTION --- */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-xs">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 sm:text-sm shadow-sm appearance-none cursor-pointer"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center mt-12">
            <Loader2 className="w-8 h-8 animate-spin text-brand-600" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredContacts.length === 0 ? (
               <div className="col-span-full text-center py-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <Filter className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">No contacts found</h3>
                  <p className="text-gray-500">No entries found for the category "{selectedCategory}".</p>
               </div>
            ) : (
              filteredContacts.map((contact) => (
                <div key={contact.id} className="bg-white rounded-lg shadow divide-y divide-gray-200 border-l-4 border-brand-500 hover:shadow-md transition-shadow">
                  <div className="w-full flex items-center justify-between p-6 space-x-6">
                    <div className="flex-1 truncate">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-gray-900 text-sm font-medium truncate">{contact.name}</h3>
                        <span className="flex-shrink-0 inline-block px-2 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                          {contact.category}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-500 text-sm truncate">{contact.location}</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-full">
                       {getIcon(contact.category)}
                    </div>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="w-0 flex-1 flex">
                        <a
                          href={`tel:${contact.phone}`}
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-brand-500"
                        >
                          <Phone className="w-5 h-5 text-gray-400 mr-3" aria-hidden="true" />
                          <span className="text-lg font-bold">{contact.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
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