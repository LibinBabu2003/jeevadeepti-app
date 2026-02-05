import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, User, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { Upload, CheckCircle, LogIn, AlertTriangle } from 'lucide-react';

const CATEGORIES = ['Ambulance', 'Hospital', 'Palliative', 'Police', 'Fire Force', 'Other'];

const AdminUpload: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [textInput, setTextInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[3]);
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) setLogs(["🔒 LOCKED: You must Login first."]);
      else setLogs(["✅ READY: Logged in as " + currentUser.email]);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try { await signInWithPopup(auth, provider); } catch (error) { alert("Login failed"); }
  };

  const handlePasteUpload = async () => {
    if (!user) { alert("Please Login first."); return; }
    if (!textInput.trim()) { alert("Paste data first!"); return; }

    setLoading(true);
    setLogs(prev => [...prev, "🚀 Starting Smart Upload..."]);

    const rows = textInput.split('\n').filter(line => line.trim() !== '');
    let successCount = 0;
    let duplicateCount = 0;
    let failCount = 0;
    const directoryRef = collection(db, "contacts");

    for (const row of rows) {
      const cleanRow = row.replace(/"/g, '');
      const parts = cleanRow.split(',');

      if (parts[0]?.toLowerCase() === 'name') continue;
      if (parts.length < 2) continue;

      const name = parts[0].trim();
      const phone = parts[1].trim();
      const location = parts[2] ? parts[2].trim() : "Alappuzha";

      try {
        // 1. CHECK FOR DUPLICATES
        const q = query(directoryRef, where("phone", "==", phone));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setLogs(prev => [...prev, `⚠️ Skipped Duplicate: ${name}`]);
          duplicateCount++;
          continue;
        }

        // 2. SAVE IF NEW
        await addDoc(directoryRef, {
          name: name,
          phone: phone,
          category: selectedCategory,
          location: location,
          createdAt: serverTimestamp(),
          uploadedBy: user.email
        });
        setLogs(prev => [...prev, `✅ Added: ${name}`]);
        successCount++;

      } catch (error: any) {
        setLogs(prev => [...prev, `❌ Error: ${name} - ${error.message}`]);
        failCount++;
      }
    }

    setLoading(false);
    setLogs(prev => [...prev, `🏁 DONE! Added: ${successCount} | Duplicates: ${duplicateCount} | Errors: ${failCount}`]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">

        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Smart Data Paste</h1>
            <p className="text-sm text-gray-500">Auto-skips duplicates. Safe to re-upload.</p>
          </div>
          {!user ? (
            <button onClick={handleLogin} className="bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-bold animate-pulse">
              <LogIn className="w-4 h-4" /> Login Required
            </button>
          ) : (
            <div className="text-green-600 font-bold text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4" /> Admin Access
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">1. Select Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 font-bold"
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">2. Paste Data Here</label>
              <textarea
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={`Name,Phone,Location\nName,Phone,Location...`}
                className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handlePasteUpload}
              disabled={loading || !user}
              className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all flex items-center justify-center gap-2
                ${loading || !user ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {loading ? "Checking & Uploading..." : "UPLOAD SAFELY"} <Upload className="w-5 h-5" />
            </button>
          </div>

          <div className="bg-gray-900 rounded-xl p-4 h-[500px] overflow-y-auto font-mono text-xs border border-gray-800 shadow-inner">
            <h3 className="text-gray-400 font-bold mb-2 border-b border-gray-700 pb-2">Activity Log</h3>
            {logs.map((log, i) => (
              <div key={i} className={`mb-1 break-all ${log.includes('❌') ? 'text-red-400' : log.includes('✅') ? 'text-green-400' : log.includes('⚠️') ? 'text-yellow-400' : 'text-gray-300'}`}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;