import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; // Removed 'where' as we filter locally
import { db } from '../firebase';
import { Search as SearchIcon, Phone, MapPin, Droplet, MessageCircle, CalendarOff } from 'lucide-react';
import { KERALA_DISTRICTS, BLOOD_GROUPS } from '../constants';

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  district: string;
  location: string;
  phone: string;
  lastDonationDate?: string;
}

const Search: React.FC = () => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchLocation, setSearchLocation] = useState(''); // New: Local Town Search
  
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch ALL donors once, then filter locally (Better for small/medium apps)
  useEffect(() => {
    setLoading(true);
    const q = query(collection(db, "donors"), orderBy("name"));
    
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

  // --- HELPER: CHECK ELIGIBILITY ---
  const isEligible = (lastDate?: string) => {
    if (!lastDate) return true; // No date = Eligible
    const donationDate = new Date(lastDate);
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    return donationDate < threeMonthsAgo;
  };

  // --- FILTER LOGIC ---
  const filteredDonors = donors.filter(donor => {
    // 1. Filter by Blood Group (if selected)
    if (selectedBloodGroup && donor.bloodGroup !== selectedBloodGroup) return false;
    
    // 2. Filter by District (if selected)
    if (selectedDistrict && donor.district !== selectedDistrict) return false;

    // 3. Filter by Location Name (Matches text typed by user)
    if (searchLocation && !donor.location.toLowerCase().includes(searchLocation.toLowerCase())) return false;

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Find a <span className="text-brand-600">Life Saver</span>
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Search by blood group, district, and local town.
          </p>
        </div>

        {/* SEARCH CONTROLS */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
              <select
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="">Any Blood Group</option>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">District</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 bg-white"
              >
                <option value="">Any District</option>
                {KERALA_DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            {/* Location Text Search (New!) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Town / City</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="e.g. Muttar, Aluva..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500"
                />
              </div>
            </div>

          </div>
        </div>

        {/* RESULTS GRID */}
        {loading ? (
          <div className="text-center py-10 text-gray-500">Loading live donors...</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDonors.length > 0 ? (
              filteredDonors.map((donor) => {
                const available = isEligible(donor.lastDonationDate);
                return (
                  <div key={donor.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow ${!available ? 'opacity-75 bg-gray-50' : 'border-brand-100'}`}>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            {donor.name}
                            {!available && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-orange-100 text-orange-800">
                                <CalendarOff className="w-3 h-3 mr-1"/> Resting
                              </span>
                            )}
                          </h3>
                          <div className="flex items-center text-gray-500 mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span className="text-sm">{donor.location}, {donor.district}</span>
                          </div>
                        </div>
                        <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-red-50 text-brand-600 font-bold text-lg border border-red-100">
                          {donor.bloodGroup}
                        </span>
                      </div>
                      
                      {/* ACTION BUTTONS */}
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        {available ? (
                          <>
                            <a
                              href={`tel:${donor.phone}`}
                              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-brand-600 hover:bg-brand-700"
                            >
                              <Phone className="h-4 w-4 mr-2" /> Call
                            </a>
                            <a
                              href={`https://wa.me/91${donor.phone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                            >
                              <MessageCircle className="h-4 w-4 mr-2" /> WhatsApp
                            </a>
                          </>
                        ) : (
                          <div className="col-span-2 text-center text-sm text-gray-500 bg-gray-100 py-2 rounded-lg">
                            Donated recently. Available later.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="mx-auto h-12 w-12 text-gray-400">
                   <SearchIcon className="h-12 w-12" />
                </div>
                <h3 className="mt-2 text-lg font-medium text-gray-900">No donors found</h3>
                <p className="mt-1 text-gray-500">Try changing the district or blood group.</p>
              </div>
            )}
          </div>
        )}

        {/* Safety Disclaimer */}
        <div className="mt-10 text-center">
           <p className="text-xs text-gray-400 max-w-2xl mx-auto">
             Disclaimer: Jeevadeepti connects donors with seekers. We do not verify medical eligibility directly. 
             Please verify donor details before proceeding.
           </p>
        </div>

      </div>
    </div>
  );
};

export default Search;
