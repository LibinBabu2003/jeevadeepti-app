import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy, doc, getDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { db, auth } from '../firebase'; // Import auth
import { Search as SearchIcon, Phone, MapPin, MessageCircle, CalendarOff, ShieldAlert, LogIn, Lock } from 'lucide-react';
import { KERALA_DISTRICTS, BLOOD_GROUPS } from '../constants';

// --- INTERFACES ---
interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  location: string;
  lastDonationDate?: string;
  dob?: string;
}

const Search: React.FC = () => {
  // --- STATE ---
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchLocation, setSearchLocation] = useState('');

  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  // SECURITY STATE
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [revealedPhones, setRevealedPhones] = useState<Record<string, string>>({});
  const [selectedDonorForConsent, setSelectedDonorForConsent] = useState<Donor | null>(null);

  // 1. LISTEN FOR LOGIN STATUS
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // 2. FETCH PUBLIC DATA (Names only, NO PHONES)
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "donors"), orderBy("name")); // Queries public list
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donorList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Donor));
      setDonors(donorList);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // --- ACTIONS ---

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Check your internet connection.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setRevealedPhones({}); // Hide numbers immediately on logout
  };

  const initiateReveal = (donor: Donor) => {
    if (!currentUser) {
      const confirmLogin = window.confirm("🔒 Security Alert\n\nTo prevent misuse, you must sign in with Google to view donor contacts.");
      if (confirmLogin) handleLogin();
      return;
    }
    setSelectedDonorForConsent(donor);
  };

  // --- THE LEGAL LOGGING FUNCTION ---
  const confirmConsentAndReveal = async () => {
    if (!selectedDonorForConsent || !currentUser) return;
    const donor = selectedDonorForConsent;

    try {
      // 1. GET USER'S IP ADDRESS
      let userIp = "Unknown";
      try {
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();
        userIp = ipData.ip;
      } catch (e) { console.warn("IP Fetch failed"); }

      // 2. SAVE THE LEGAL LOG (Mapping all details)
      await addDoc(collection(db, "secure_access_logs"), {
        seeker_email: currentUser.email,       // GMAIL
        seeker_name: currentUser.displayName,  // NAME
        seeker_uid: currentUser.uid,           // ID
        seeker_ip: userIp,                     // IP ADDRESS
        target_donor_id: donor.id,             // FETCHED DETAIL ID
        target_donor_name: donor.name,         // FETCHED DETAIL NAME
        action: "VIEWED_PHONE",
        timestamp: serverTimestamp(),          // FETCHED TIME
        device: navigator.userAgent            // BROWSER/DEVICE INFO
      });

      // 3. FETCH THE PHONE NUMBER FROM SECURE VAULT
      // (This assumes you completed Step 1: Splitting the DB)
      // If you haven't split the DB yet, we can fallback to the public doc for now:
      // const privateData = donor; // FALLBACK if not split

      // CORRECT WAY (If DB is split):
      const privateDocRef = doc(db, "donors_sensitive", donor.id);
      const privateSnap = await getDoc(privateDocRef);

      if (privateSnap.exists()) {
        const privateData = privateSnap.data();
        setRevealedPhones(prev => ({ ...prev, [donor.id]: privateData.phone }));
      } else {
        // Fallback for old data or if not split yet
        // If the phone is still in the public doc (old data), use it:
        // @ts-ignore
        if (donor.phone) setRevealedPhones(prev => ({ ...prev, [donor.id]: donor.phone }));
        else alert("Contact details not found in secure vault.");
      }

    } catch (error) {
      console.error("Security Error:", error);
      alert("Verification failed.");
    }

    setSelectedDonorForConsent(null);
  };

  // --- FILTERS ---
  const isEligibleToDonate = (lastDate?: string) => {
    if (!lastDate) return true;
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return new Date(lastDate) < threeMonthsAgo;
  };

  const isOver18 = (dobString?: string) => {
    if (!dobString) return true;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age >= 18;
  };

  const filteredDonors = donors.filter(donor => {
    if (!isOver18(donor.dob)) return false;
    if (selectedBloodGroup && donor.bloodGroup !== selectedBloodGroup) return false;
    if (selectedDistrict && donor.district !== selectedDistrict) return false;
    if (searchLocation && !donor.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* TOP BAR: USER IDENTITY */}
        <div className="flex justify-end mb-6">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-green-100">
              <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold text-gray-700">Verified: {currentUser.displayName}</span>
              <button onClick={handleLogout} className="text-xs text-red-500 font-bold hover:underline ml-2">Logout</button>
            </div>
          ) : (
            <button onClick={handleLogin} className="flex items-center gap-2 text-sm font-bold text-blue-700 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 border border-blue-100 transition-all">
              <LogIn className="h-4 w-4" /> Login to Access Contacts
            </button>
          )}
        </div>

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find a <span className="text-red-600">Life Saver</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">Secure & Verified Blood Donation Platform</p>
        </div>

        {/* SEARCH CONTROLS */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-10">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Town / City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="e.g. Muttar..." value={searchLocation} onChange={(e) => setSearchLocation(e.target.value)} className="w-full pl-10 p-3 border rounded-lg" />
              </div>
            </div>
          </div>
        </div>

        {/* RESULTS GRID */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading secure database...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDonors.map((donor) => {
              const available = isEligibleToDonate(donor.lastDonationDate);
              const phone = revealedPhones[donor.id];

              // MASKED NAME LOGIC: Show "Donor-XXXX" until revealed
              const displayName = phone ? donor.name : `Donor-${donor.id.substring(0, 4).toUpperCase()}`;

              return (
                <div key={donor.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden p-6 ${!available ? 'opacity-75 bg-gray-50' : 'border-red-100'}`}>

                  {/* CARD HEADER */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        {displayName}
                        {phone && <span className="bg-green-100 text-green-800 text-[10px] px-2 py-0.5 rounded-full">VERIFIED</span>}
                      </h3>
                      <div className="flex items-center text-gray-500 text-sm mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" /> {donor.location}, {donor.district}
                      </div>
                    </div>
                    <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm border border-red-100">
                      {donor.bloodGroup}
                    </span>
                  </div>

                  {/* ACTION AREA */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    {available ? (
                      phone ? (
                        // STATE 3: REVEALED (Show Numbers)
                        <div className="grid grid-cols-2 gap-3 animate-fade-in">
                          <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg font-bold text-sm hover:bg-green-700">
                            <Phone className="h-4 w-4" /> Call
                          </a>
                          <a href={`https://wa.me/91${phone}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 border border-green-600 text-green-700 py-2 rounded-lg font-bold text-sm hover:bg-green-50">
                            <MessageCircle className="h-4 w-4" /> WhatsApp
                          </a>
                        </div>
                      ) : (
                        // STATE 2: HIDDEN (Show Button)
                        <button
                          onClick={() => initiateReveal(donor)}
                          className={`w-full py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all
                            ${currentUser ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md' : 'bg-gray-800 text-white hover:bg-gray-900'}`}
                        >
                          {currentUser ? <><Lock className="h-4 w-4" /> View Contact</> : <><LogIn className="h-4 w-4" /> Login to View</>}
                        </button>
                      )
                    ) : (
                      <div className="text-center text-xs text-gray-400 font-medium bg-gray-100 py-2 rounded">
                        <CalendarOff className="h-3 w-3 inline mr-1" /> Not Available
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* --- CONSENT MODAL --- */}
        {selectedDonorForConsent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <ShieldAlert className="h-8 w-8" />
                <h3 className="text-xl font-bold">Legal Warning</h3>
              </div>
              <p className="text-gray-700 font-medium mb-4">
                You are requesting the private number of <span className="font-bold text-black">{selectedDonorForConsent.name}</span>.
              </p>
              <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-sm text-red-800 mb-6">
                <p className="font-bold mb-1">⚠️ Terms of Acceptable Use:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>I agree to use this number <strong>ONLY</strong> for blood donation.</li>
                  <li>I will <strong>NOT</strong> share this number with marketing agencies.</li>
                  <li>I understand my <strong>IP Address & ID</strong> are being logged for security.</li>
                </ul>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setSelectedDonorForConsent(null)} className="flex-1 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
                <button onClick={confirmConsentAndReveal} className="flex-1 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-lg">I Agree & Reveal</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Search;