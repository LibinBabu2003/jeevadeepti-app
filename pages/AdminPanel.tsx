import React, { useState } from 'react';
import { 
  collection, getDocs, deleteDoc, updateDoc, doc, query, orderBy, addDoc, serverTimestamp 
} from 'firebase/firestore';
import { db } from '../firebase';
import { Trash2, Search, ShieldCheck, Plus, Save, Phone, MapPin, Building2, Pencil, X } from 'lucide-react';
import { KERALA_DISTRICTS, BLOOD_GROUPS } from '../constants'; // Import constants for dropdowns

// --- TYPES ---
interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  location: string;
  phone: string;
  createdAt?: any;
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

  // --- EDIT STATE ---
  const [editingDonor, setEditingDonor] = useState<Donor | null>(null);

  // --- NEW CONTACT FORM STATE ---
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    location: ''
  });
  const [selectedCategory, setSelectedCategory] = useState('Ambulance');
  const [customCategory, setCustomCategory] = useState('');

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
      const q = query(collection(db, 'donors'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      
      const donorList = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          bloodGroup: data.bloodGroup || '',
          district: data.district || '',
          location: data.location || '',
          phone: data.phone || data.mobile || '',
          createdAt: data.createdAt
        } as Donor;
      });
      setDonors(donorList);
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

  // --- 4. UPDATE DONOR FUNCTION (EDIT) ---
  const handleUpdateDonor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDonor) return;

    try {
      const donorRef = doc(db, "donors", editingDonor.id);
      await updateDoc(donorRef, {
        name: editingDonor.name,
        phone: editingDonor.phone,
        bloodGroup: editingDonor.bloodGroup,
        district: editingDonor.district,
        location: editingDonor.location
      });

      // Update Local State
      setDonors(prev => prev.map(d => d.id === editingDonor.id ? editingDonor : d));
      setEditingDonor(null); // Close Modal
      alert("Donor Details Updated!");
    } catch (error) {
      console.error("Error updating: ", error);
      alert("Failed to update.");
    }
  };

  // --- 5. ADD NEW CONTACT FUNCTION ---
  const handleAddContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContact.name || !newContact.phone) {
      alert("Name and Phone are required!");
      return;
    }

    const finalCategory = (selectedCategory === 'Other' && customCategory.trim() !== '') 
      ? customCategory.trim() 
      : selectedCategory;

    try {
      const docData = {
        name: newContact.name,
        phone: newContact.phone,
        location: newContact.location,
        category: finalCategory,
        createdAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, "contacts"), docData);
      
      const newEntry: DirectoryContact = { 
        id: docRef.id, 
        name: docData.name,
        phone: docData.phone,
        location: docData.location,
        category: docData.category
      };
      
      setContacts([...contacts, newEntry]);
      
      setNewContact({ name: '', phone: '', location: '' });
      setSelectedCategory('Ambulance');
      setCustomCategory('');
      
      alert("Contact Added Successfully!");
    } catch (error) {
      console.error("Error adding contact: ", error);
      alert("Failed to add contact.");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' });
  };

  // --- 6. RENDER LOGIN SCREEN ---
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

  // --- 7. RENDER DASHBOARD ---
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
      
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
                placeholder="Search Name or Phone..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Registered</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase">Location</th>
                  <th className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {donors.filter(d => {
                  const term = searchTerm.toLowerCase();
                  const nameMatch = d.name ? d.name.toLowerCase().includes(term) : false;
                  const phoneMatch = d.phone ? d.phone.includes(term) : false;
                  return nameMatch || phoneMatch;
                }).map((donor) => (
                  <tr key={donor.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                      {formatDate(donor.createdAt)}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">{donor.name}</td>
                    <td className="px-6 py-4 text-gray-600">{donor.phone}</td>
                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold rounded-full bg-red-100 text-red-800">{donor.bloodGroup}</span></td>
                    <td className="px-6 py-4 text-gray-600">{donor.location}</td>
                    <td className="px-6 py-4 text-center flex justify-center gap-2">
                      {/* EDIT BUTTON */}
                      <button 
                        onClick={() => setEditingDonor(donor)} 
                        className="text-blue-600 hover:bg-blue-50 p-2 rounded-full transition-colors"
                        title="Edit Donor"
                      >
                        <Pencil className="h-5 w-5" />
                      </button>
                      
                      {/* DELETE BUTTON */}
                      <button 
                        onClick={() => handleDeleteDonor(donor.id, donor.name)} 
                        className="text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                        title="Delete Donor"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
                {donors.length === 0 && !loading && (
                   <tr><td colSpan={6} className="text-center py-6 text-gray-500">No donors found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* === EDIT MODAL (POPUP) === */}
      {editingDonor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Donor Details</h2>
              <button onClick={() => setEditingDonor(null)} className="p-1 hover:bg-gray-100 rounded-full">
                <X className="h-6 w-6 text-gray-500" />
              </button>
            </div>
            
            <form onSubmit={handleUpdateDonor} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input 
                  type="text" 
                  value={editingDonor.name} 
                  onChange={(e) => setEditingDonor({...editingDonor, name: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required 
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input 
                  type="text" 
                  value={editingDonor.phone} 
                  onChange={(e) => setEditingDonor({...editingDonor, phone: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Blood Group</label>
                  <select 
                    value={editingDonor.bloodGroup} 
                    onChange={(e) => setEditingDonor({...editingDonor, bloodGroup: e.target.value})}
                    className="w-full p-2 border rounded-lg bg-white"
                  >
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                  </select>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700">District</label>
                   <select 
                      value={editingDonor.district} 
                      onChange={(e) => setEditingDonor({...editingDonor, district: e.target.value})}
                      className="w-full p-2 border rounded-lg bg-white"
                   >
                      {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                   </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input 
                  type="text" 
                  value={editingDonor.location} 
                  onChange={(e) => setEditingDonor({...editingDonor, location: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required 
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setEditingDonor(null)} className="flex-1 py-2 border rounded-lg hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" className="flex-1 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-bold">Update</button>
              </div>
            </form>
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
                  <select 
                    className="w-full p-2 border rounded-md bg-white" 
                    value={selectedCategory} 
                    onChange={e => setSelectedCategory(e.target.value)}
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>

                  {/* SHOW THIS INPUT ONLY IF 'OTHER' IS SELECTED */}
                  {selectedCategory === 'Other' && (
                    <input 
                      type="text" 
                      className="w-full p-2 mt-2 border border-brand-300 rounded-md bg-brand-50 text-brand-800 placeholder-brand-300 focus:ring-2 focus:ring-brand-500 outline-none transition-all" 
                      placeholder="Name the category (Optional)" 
                      value={customCategory} 
                      onChange={e => setCustomCategory(e.target.value)}
                    />
                  )}
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
