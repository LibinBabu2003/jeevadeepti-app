import React, { useState } from 'react';
import { collection, addDoc, setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { UserPlus, Calendar, ShieldCheck } from 'lucide-react';
import { KERALA_DISTRICTS, BLOOD_GROUPS } from '../constants';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'A+',
    district: 'Alappuzha',
    location: '',
    phone: '',
    dob: '',
    lastDonationDate: ''
  });

  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateAge = (dobString: string) => {
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // SECURITY: Consent Check Only
    if (!agreed) {
      alert("You must agree to the privacy terms to register.");
      return;
    }

    setLoading(true);

    try {
      const age = calculateAge(formData.dob);

      // --- SPLIT DATA (THE VAULT STRATEGY) ---

      // A. Public Data (Safe for Network Tab)
      const publicData = {
        name: formData.name,
        bloodGroup: formData.bloodGroup,
        district: formData.district,
        location: formData.location,
        dob: formData.dob,
        lastDonationDate: formData.lastDonationDate,
        createdAt: serverTimestamp(),
        consent: true
      };

      // B. Private Data (The Secure Vault)
      const privateData = {
        phone: formData.phone
      };

      // --- SAVE TO FIREBASE ---
      const docRef = await addDoc(collection(db, "donors"), publicData);
      await setDoc(doc(db, "donors_sensitive", docRef.id), privateData);

      // --- SUCCESS MESSAGE ---
      if (age < 18) {
        alert(`Registration Successful!\n\n⚠️ NOTE: You are currently ${age} years old.\nYour details have been saved, but you will NOT appear in the search list until you turn 18.`);
      } else {
        alert("Registration Successful! You are now listed as a donor.");
      }

      setFormData({
        name: '',
        bloodGroup: 'A+',
        district: 'Alappuzha',
        location: '',
        phone: '',
        dob: '',
        lastDonationDate: ''
      });
      setAgreed(false);

    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error registering. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-200">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="bg-red-100 p-2 rounded-full">
          <UserPlus className="h-6 w-6 text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Donor Registration</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="Enter your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input required type="date" className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
          </div>
          <p className="text-xs text-gray-500 mt-1">* We verify age automatically.</p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input required type="tel" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="10-digit mobile number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
        </div>

        {/* Blood Group & District */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <select className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 outline-none" value={formData.bloodGroup} onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}>
              {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 outline-none" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}>
              {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local Town / Place</label>
          <input required type="text" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" placeholder="e.g. Edathua, Muttar" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
        </div>

        {/* Last Donation Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Donation Date (Optional)</label>
          <input type="date" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none" value={formData.lastDonationDate} onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })} />
        </div>

        {/* --- LEGAL CONSENT SECTION (KEPT) --- */}
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-4">
          <div className="flex items-start gap-3">
            <div className="flex h-5 items-center">
              <input id="consent" name="consent" type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600" />
            </div>
            <div className="text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">I agree to the Terms & Privacy Policy</label>
              <p className="text-gray-500 mt-1 text-xs">
                I voluntarily consent to share my phone number. I understand it will be visible to registered seekers.
              </p>
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading || !agreed} className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 mt-2 transition-colors ${agreed ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
          {loading ? "Registering..." : <><ShieldCheck className="h-5 w-5" /> Register Securely</>}
        </button>
      </form>
    </div>
  );
};

export default Register;