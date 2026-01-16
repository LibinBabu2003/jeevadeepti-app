import React, { useState, useEffect } from 'react';
import { 
  collection, getDocs, deleteDoc, doc, query, orderBy, addDoc, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Trash2, Search, ShieldCheck, Plus, Save, Phone, MapPin, Building2 } from 'lucide-react';

// --- TYPES ---
interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  location: string;
  mobile: string;
}

interface DirectoryContact {
  id: string;
  name: string;
  category: string;
  phone: string;
  location: string;
}

const CATEGORIES = ['Ambulance', 'Hospital', 'Palliative', 'Police', 'Fire Force', 'Other'];

const AdminPanel: React.FC = () => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  // UI State
  const [activeTab, setActiveTab] = useState<'donors' | 'directory'>('donors');
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Data State
  const [donors, setDonors] = useState<Donor[]>([]);
  const [contacts, setContacts] = useState<DirectoryContact[]>([]);

  // Form State (For adding new contact)
  const [newContact, setNewContact] = useState({
    name: '',
    category: 'Ambulance',
    phone: '',
    location: ''
  });

  // --- 1. LOGIN ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // CHANGE THIS PASSWORD!
      setIsAuthenticated(true);
      fetchDonors();
      fetchContacts();
    } else {
      alert('Wrong Password!');
    }
  };

  // --- 2. FETCH DATA ---
  const fetchDonors = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'donors'), orderBy('name'));
      const snapshot = await getDocs(q);
      setDonors(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donor)));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const q = query(collection(db, 'contacts'), orderBy('name'));
      const snapshot = await getDocs(q);
      setContacts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as DirectoryContact)));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  // --- 3. DELETE FUNCTIONS ---
  const handleDeleteDonor = async (id: string, name: string) => {
    if (!window.confirm(`Delete donor: ${name}?`)) return;
    try {
      await deleteDoc(doc(db, 'donors', id));
      setDonors(prev => prev.filter(d => d.id !== id));
    } catch (err) { alert('Error deleting'); }
  };

  const handleDeleteContact = async (id: string, name: string) => {
    if (!window.confirm(`Delete contact: ${name}?`)) return;
    try {
      await deleteDoc(doc(db, 'contacts', id));
      setContacts(prev => prev.filter(c => c.id !== id));
    } catch (err) { alert('Error deleting'); }
  };

  // --- 4. ADD NEW CONTACT FUNCTION ---
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) {
      alert("Name and Phone are required!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        ...newContact,
        createdAt: serverTimestamp()
      });
      
      // Update UI immediately
      setContacts([...contacts, { id: docRef.id, ...newContact }]);
      
      // Reset Form
      setNewContact({ name: '', category: 'Ambulance', phone: '', location: '' });
      alert("Contact Added Successfully!");
    } catch (error) {
      console.error("Error adding contact: ", error);
      alert("Failed to add contact.");
    }
  };

  // --- 5. RENDER LOGIN SCREEN ---
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
              placeholder="Enter Password" 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-brand-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="w-full bg-brand-600 text-white py-3 rounded-lg font-bold hover:bg-brand-700">
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- 6. RENDER DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* HEADER & TABS */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        
        {/* TAB SWITCHER */}
        <div className="bg-gray-200 p-1 rounded-lg flex">
          <button 
            onClick={() => setActiveTab('donors')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'donors' ? 'bg-white text-brand-600 shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Donors
          </button>
          <button 
            onClick={() => setActiveTab('directory')}
            className={`px-6 py-2 rounded-md text-sm font-bold transition-all ${activeTab === 'directory' ? 'bg-white text-brand-600 shadow' : 'text-gray-600 hover:text-gray-900'}`}
          >
            Directory
          </button>
        </div>
      </div>

      {/* === VIEW 1: MANAGE DONORS === */}
      {activeTab === 'donors' && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-gray-50 flex gap-4">
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search Donors..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donors.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.mobile.includes(searchTerm)).map((donor) => (
                  <tr key={donor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium">{donor.name}</td>
                    <td className="px-6 py-4 text-gray-600">{donor.mobile}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">{donor.bloodGroup}</span></td>
                    <td className="px-6 py-4 text-gray-600">{donor.location}</td>
                    <td className="px-6 py-4 text-center">
                      <button onClick={() => handleDeleteDonor(donor.id, donor.name)} className="text-red-600 hover:bg-red-50 p-2 rounded-full">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* === VIEW 2: MANAGE DIRECTORY === */}
      {activeTab === 'directory' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT: ADD NEW FORM */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-brand-500">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Plus className="h-5 w-5 text-brand-600" /> Add New Entry
              </h2>
              <form onSubmit={handleAddContact} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name / Institution</label>
                  <input required type="text" className="w-full p-2 border rounded-md" placeholder="e.g. St. John's Hospital" value={newContact.name} onChange={e => setNewContact({...newContact, name: e.target.value})} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select className="w-full p-2 border rounded-md" value={newContact.category} onChange={e => setNewContact({...newContact, category: e.target.value})}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input required type="tel" className="w-full p-2 border rounded-md" placeholder="e.g. 0477 223344" value={newContact.phone} onChange={e => setNewContact({...newContact, phone: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input required type="text" className="w-full p-2 border rounded-md" placeholder="e.g. Alappuzha" value={newContact.location} onChange={e => setNewContact({...newContact, location: e.target.value})} />
                </div>

                <button type="submit" className="w-full bg-gray-900 text-white py-2 rounded-lg font-bold hover:bg-black flex items-center justify-center gap-2">
                  <Save className="h-4 w-4" /> Save Contact
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: LIST OF CONTACTS */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
               <div className="p-4 border-b bg-gray-50">
                 <h3 className="font-bold text-gray-700">Existing Directory Entries ({contacts.length})</h3>
               </div>
               <div className="overflow-y-auto max-h-[600px]">
                 {contacts.length === 0 ? (
                   <div className="p-8 text-center text-gray-500">No contacts found. Add one on the left!</div>
                 ) : (
                   <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                      {contacts.map((contact) => (
                        <tr key={contact.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">{contact.name}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1"><Building2 className="h-3 w-3"/> {contact.category}</div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                             <div className="flex items-center gap-2"><Phone className="h-3 w-3"/> {contact.phone}</div>
                             <div className="flex items-center gap-2 mt-1"><MapPin className="h-3 w-3"/> {contact.location}</div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleDeleteContact(contact.id, contact.name)} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                   </table>
                 )}
               </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default AdminPanel;