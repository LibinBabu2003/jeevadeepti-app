import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KERALA_DISTRICTS, BLOOD_GROUPS } from '../constants';
import { UserPlus, Calendar, MapPin, Phone, User, Droplet, AlertCircle, Loader2 } from 'lucide-react';
// 1. Import extra tools for searching (query, where, getDocs)
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore'; 

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bloodGroup: '',
    district: '',
    location: '',
    lastDonationDate: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: {[key: string]: string} = {};
    if (!formData.name.trim()) newErrors.name = 'Full Name is required';
    if (!formData.phone || !/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number must be exactly 10 digits';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'Please select a Blood Group';
    if (!formData.district) newErrors.district = 'Please select a District';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    if (formData.lastDonationDate) {
      const selectedDate = new Date(formData.lastDonationDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) newErrors.lastDonationDate = 'Date cannot be in the future';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // --- DUPLICATION & LIMIT CHECK STARTS HERE ---

      // 1. Search for existing donors with this SAME phone number
      const donorsRef = collection(db, "donors");
      const q = query(donorsRef, where("phone", "==", formData.phone));
      const querySnapshot = await getDocs(q);

      // 2. Check: Is this number used 3 or more times?
      if (querySnapshot.size >= 3) {
        alert("Registration Failed: This phone number is already used for 3 donors. Please use a different number.");
        setLoading(false);
        return; // Stop here
      }

      // 3. Check: Is this EXACT person (Name + Blood Group) already registered?
      let isDuplicate = false;
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        // Compare Name (ignoring capital letters) and Blood Group
        if (data.name.toLowerCase() === formData.name.toLowerCase() && 
            data.bloodGroup === formData.bloodGroup) {
          isDuplicate = true;
        }
      });

      if (isDuplicate) {
        alert("You are already registered! No need to register again.");
        setLoading(false);
        return; // Stop here
      }
      
      // --- CHECKS PASSED: SAVE DATA ---

      await addDoc(collection(db, "donors"), {
        ...formData,
        createdAt: serverTimestamp(),
        lastDonationDate: formData.lastDonationDate || null 
      });

      alert("Registration Successful! You are now a live donor.");
      navigate('/');
      
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error saving data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-brand-600">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-brand-100 rounded-full flex items-center justify-center">
            <UserPlus className="h-6 w-6 text-brand-600" />
          </div>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">Donor Registration</h2>
          <p className="mt-2 text-sm text-gray-600 font-malayalam">രക്തദാനം മഹാദാനം</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
          <div className="rounded-md shadow-sm space-y-4">
            
            {/* Name */}
            <div className="relative">
              <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input id="name" name="name" type="text" className={`block w-full pl-10 rounded-lg p-2.5 border ${errors.name ? 'border-red-500' : 'border-gray-300'}`} placeholder="Your Name" value={formData.name} onChange={handleChange} />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.name}</p>}
            </div>

            {/* Phone */}
            <div className="relative">
              <label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input id="phone" name="phone" type="tel" className={`block w-full pl-10 rounded-lg p-2.5 border ${errors.phone ? 'border-red-500' : 'border-gray-300'}`} placeholder="10 digit number" value={formData.phone} onChange={handleChange} maxLength={10} />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-red-600 flex items-center"><AlertCircle className="w-3 h-3 mr-1"/>{errors.phone}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Blood Group */}
              <div>
                <label htmlFor="bloodGroup" className="text-sm font-medium text-gray-700 mb-1 block">Group</label>
                <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Droplet className="h-5 w-5 text-brand-400" />
                   </div>
                   <select id="bloodGroup" name="bloodGroup" className={`block w-full pl-10 rounded-lg p-2.5 border bg-white ${errors.bloodGroup ? 'border-red-500' : 'border-gray-300'}`} value={formData.bloodGroup} onChange={handleChange}>
                    <option value="">Select</option>
                    {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                   </select>
                </div>
                {errors.bloodGroup && <p className="mt-1 text-xs text-red-600">Required</p>}
              </div>

              {/* District */}
              <div>
                <label htmlFor="district" className="text-sm font-medium text-gray-700 mb-1 block">District</label>
                <select id="district" name="district" className={`block w-full rounded-lg p-2.5 border bg-white ${errors.district ? 'border-red-500' : 'border-gray-300'}`} value={formData.district} onChange={handleChange}>
                  <option value="">Select</option>
                  {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
                {errors.district && <p className="mt-1 text-xs text-red-600">Required</p>}
              </div>
            </div>

            {/* Location */}
            <div className="relative">
              <label htmlFor="location" className="text-sm font-medium text-gray-700 mb-1 block">Local Town/City</label>
              <div className="relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                 </div>
                 <input id="location" name="location" type="text" className={`block w-full pl-10 rounded-lg p-2.5 border ${errors.location ? 'border-red-500' : 'border-gray-300'}`} placeholder="e.g. Aluva" value={formData.location} onChange={handleChange} />
              </div>
            </div>

            {/* Last Donation */}
            <div className="relative">
              <label htmlFor="lastDonationDate" className="text-sm font-medium text-gray-700 mb-1 block">Last Donation Date</label>
              <div className="relative rounded-md shadow-sm">
                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                 </div>
                 <input id="lastDonationDate" name="lastDonationDate" type="date" className="block w-full pl-10 rounded-lg p-2.5 border border-gray-300" value={formData.lastDonationDate} onChange={handleChange} max={new Date().toISOString().split('T')[0]} />
              </div>
              <p className="text-xs text-gray-500 mt-1">Leave blank if never donated.</p>
            </div>

          </div>

          <button type="submit" disabled={loading} className={`w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-brand-600 hover:bg-brand-700'} shadow-lg transition-colors items-center`}>
            {loading ? <><Loader2 className="w-5 h-5 mr-2 animate-spin"/> Checking...</> : 'Register as Donor'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;