import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { Phone, MapPin, MessageCircle, ShieldAlert, LogIn, Lock, Navigation, Hospital } from 'lucide-react';
import { KERALA_DISTRICTS, BLOOD_GROUPS } from '../constants';
import { HOSPITALS, TOWN_COORDINATES, getDistance } from '../data/locations';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  location: string;
  lastDonationDate?: string;
  dob?: string;
  phone?: string;
  distance?: number;
}

// Helper: Random Shuffle
const shuffleArray = (array: Donor[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const Search: React.FC = () => {
  // FILTERS
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedHospitalId, setSelectedHospitalId] = useState('');

  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  // SECURITY
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [revealedPhones, setRevealedPhones] = useState<Record<string, string>>({});
  const [selectedDonorForConsent, setSelectedDonorForConsent] = useState<Donor | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return () => unsubscribe();
  }, []);

  // FETCH & RANDOMIZE
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "donors"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Donor));
      setDonors(shuffleArray(list));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // LOGIN & LOGOUT
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (error) { console.error(error); alert("Login failed."); }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setRevealedPhones({});
  };

  // --- SECURITY LOGIC ---
  const initiateReveal = (donor: Donor) => {
    if (!currentUser) {
      if (window.confirm("🔒 Login required to view contact.")) handleLogin();
      return;
    }
    setSelectedDonorForConsent(donor);
  };

  const confirmConsentAndReveal = async () => {
    if (!selectedDonorForConsent || !currentUser) return;
    const donor = selectedDonorForConsent;

    try {
      let userIp = "Unknown";
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        userIp = data.ip;
      } catch (e) { }

      // LOG ACCESS
      await addDoc(collection(db, "secure_access_logs"), {
        seeker_email: currentUser.email,
        seeker_name: currentUser.displayName,
        seeker_uid: currentUser.uid,
        seeker_ip: userIp,
        target_donor_id: donor.id,
        // Log the real name in database, even if masked in UI
        target_donor_name: donor.name,
        action: "VIEWED_PHONE",
        timestamp: serverTimestamp(),
        device: navigator.userAgent
      });

      // FETCH NUMBER
      const privateSnap = await getDoc(doc(db, "donors_sensitive", donor.id));
      let phoneToReveal = "";

      if (privateSnap.exists()) {
        phoneToReveal = privateSnap.data().phone;
      } else {
        // @ts-ignore
        if (donor.phone) phoneToReveal = donor.phone;
        else {
          alert("Contact not found.");
          setSelectedDonorForConsent(null);
          return;
        }
      }

      // --- AUTO-CLOSE LOGIC ---
      // We set the state to a NEW object containing ONLY the current donor.
      // This wipes out any previous keys, effectively closing other cards.
      setRevealedPhones({ [donor.id]: phoneToReveal });

    } catch (e) { alert("Verification failed."); }
    setSelectedDonorForConsent(null);
  };

  // FILTERING & DISTANCE
  const selectedHospital = HOSPITALS.find(h => h.id === selectedHospitalId);

  let processedDonors = donors.map(donor => {
    let dist = undefined;
    if (selectedHospital && donor.location) {
      const locKey = donor.location.toLowerCase().trim();
      const coords = TOWN_COORDINATES[locKey];
      if (coords) {
        dist = getDistance(selectedHospital.lat, selectedHospital.lng, coords.lat, coords.lng);
      }
    }
    return { ...donor, distance: dist };
  });

  processedDonors = processedDonors.filter(donor => {
    if (selectedBloodGroup && donor.bloodGroup !== selectedBloodGroup) return false;
    if (selectedDistrict && donor.district !== selectedDistrict) return false;
    if (searchLocation && !donor.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
    return true;
  });

  if (selectedHospitalId) {
    processedDonors.sort((a, b) => {
      const distA = a.distance !== undefined ? a.distance : 9999;
      const distB = b.distance !== undefined ? b.distance : 9999;
      return distA - distB;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Find <span className="text-red-600">Blood</span></h1>
          {currentUser ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-green-700 bg-green-100 px-3 py-1 rounded-full">Verified User</span>
              <button onClick={handleLogout} className="text-xs text-red-500 font-bold hover:underline">Logout</button>
            </div>
          ) : (
            <button onClick={handleLogin} className="text-sm font-bold text-blue-700 hover:underline flex items-center gap-1">
              <LogIn className="h-4 w-4" /> Login
            </button>
          )}
        </div>

        {/* SEARCH CONTROLS */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-10">

          {/* HOSPITAL SELECTOR */}
          <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
            <label className="block text-sm font-bold text-blue-800 mb-2 flex items-center gap-2">
              <Hospital className="h-4 w-4" /> Where is the Patient? (Select Hospital)
            </label>
            <select
              value={selectedHospitalId}
              onChange={(e) => setSelectedHospitalId(e.target.value)}
              className="w-full p-3 border border-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Select Hospital to Sort by Distance --</option>
              {HOSPITALS.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
            {selectedHospital && (
              <p className="text-xs text-blue-600 mt-2">
                ⚡ Sorting donors nearest to <strong>{selectedHospital.name}</strong>
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select value={selectedBloodGroup} onChange={(e) => setSelectedBloodGroup(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
                <option value="">Any Blood Group</option>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
                <option value="">Any District</option>
                {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Town Name</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="e.g. Muttar..." value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="w-full pl-10 p-3 border rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        {loading ? <div className="text-center py-10">Loading...</div> : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processedDonors.map((donor) => {
              const phone = revealedPhones[donor.id];

              // --- MASK NAME LOGIC ---
              // If phone is visible, show real name. 
              // If not, show "Donor-XXXX"
              const displayName = phone
                ? donor.name
                : `Donor-${donor.id.substring(0, 5).toUpperCase()}`;

              return (
                <div key={donor.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden p-6 relative transition-all ${phone ? 'border-green-400 ring-1 ring-green-100' : 'border-gray-100'}`}>

                  {/* DISTANCE BADGE */}
                  {donor.distance !== undefined && (
                    <div className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Navigation className="h-3 w-3" />
                      {donor.distance} km away
                    </div>
                  )}

                  <div className="mb-4 pr-16">
                    <h3 className="text-lg font-bold text-gray-900">{displayName}</h3>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" /> {donor.location}, {donor.district}
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm border border-red-100">{donor.bloodGroup}</span>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    {phone ? (
                      <div className="grid grid-cols-2 gap-3 animate-fade-in-up">
                        <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-green-700"><Phone className="h-4 w-4" /> Call</a>
                        <a href={`https://wa.me/91${phone}`} className="flex items-center justify-center gap-2 border border-green-600 text-green-700 py-2 rounded-lg font-bold text-sm hover:bg-green-50"><MessageCircle className="h-4 w-4" /> WhatsApp</a>
                      </div>
                    ) : (
                      <button onClick={() => initiateReveal(donor)} className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 ${currentUser ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-800 text-white hover:bg-gray-900'}`}>
                        {currentUser ? <><Lock className="h-4 w-4" /> View Contact</> : <><LogIn className="h-4 w-4" /> Login to View</>}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CONSENT POPUP */}
        {selectedDonorForConsent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 animate-scale-in">
              <div className="flex items-center gap-3 mb-4 text-red-600"><ShieldAlert className="h-8 w-8" /><h3 className="text-xl font-bold">Legal Warning</h3></div>
              <p className="mb-4">Requesting number for <span className="font-bold">{(selectedDonorForConsent.name || "Donor").substring(0, 10)}...</span></p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-sm text-red-800 mb-6">
                <ul className="list-disc pl-5"><li>I agree to use this for blood donation only.</li><li>My IP Address is logged.</li></ul>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelectedDonorForConsent(null)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
                <button onClick={confirmConsentAndReveal} className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700">I Agree</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;