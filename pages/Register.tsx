import React, { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { UserPlus, Save, Calendar } from 'lucide-react';
import { KERALA_DISTRICTS, BLOOD_GROUPS } from '../constants';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: 'A+',
    district: 'Alappuzha',
    location: '',
    phone: '',
    dob: '', // Added DOB field
    lastDonationDate: ''
  });

  const [loading, setLoading] = useState(false);

  // --- AGE CALCULATION HELPER ---
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
    setLoading(true);

    try {
      // 1. Calculate Age
      const age = calculateAge(formData.dob);

      // 2. Save Data
      await addDoc(collection(db, "donors"), {
        ...formData,
        createdAt: serverTimestamp()
      });

      // 3. Conditional Alert Message
      if (age < 18) {
        alert(`Registration Successful!\n\n⚠️ NOTE: You are currently ${age} years old.\nYour details have been saved, but you will NOT appear in the search list until you turn 18.`);
      } else {
        alert("Registration Successful! You are now listed as a donor.");
      }

      // 4. Reset Form
      setFormData({
        name: '',
        bloodGroup: 'A+',
        district: 'Alappuzha',
        location: '',
        phone: '',
        dob: '',
        lastDonationDate: ''
      });

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
          <input
            required
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Date of Birth (New Field) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              required
              type="date"
              className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            * We verify age automatically. If under 18, you will be hidden until your birthday.
          </p>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
          <input
            required
            type="tel"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="10-digit mobile number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Blood Group & District */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <select
              className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 outline-none"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
            >
              {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
            <select
              className="w-full p-3 border rounded-lg bg-white focus:ring-2 focus:ring-red-500 outline-none"
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
            >
              {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Local Town / Place</label>
          <input
            required
            type="text"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            placeholder="e.g. Edathua, Muttar"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        {/* Last Donation Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Donation Date (Optional)</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
            value={formData.lastDonationDate}
            onChange={(e) => setFormData({ ...formData, lastDonationDate: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 mt-2"
        >
          {loading ? "Registering..." : <><Save className="h-5 w-5" /> Register Now</>}
        </button>

      </form>
    </div>
  );
};

export default Register;