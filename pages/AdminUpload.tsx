import React, { useState } from 'react';
import Papa from 'papaparse';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { Upload, Loader2 } from 'lucide-react';

const AdminUpload: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  // CONFIGURATION: Force these values for every donor in the file
  const TARGET_DISTRICT = "Alappuzha";
  const TARGET_LOCATION = "Muttar";

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setLogs(['Reading file...']);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        setLogs(prev => [...prev, `Found ${results.data.length} rows. Starting upload...`]);
        await processRows(results.data);
        setLoading(false);
      },
      error: (error) => {
        setLogs(prev => [...prev, `Error: ${error.message}`]);
        setLoading(false);
      }
    });
  };

  const processRows = async (rows: any[]) => {
    let successCount = 0;
    let failCount = 0;
    let duplicateCount = 0;

    for (const row of rows) {
      // 1. MAP CSV COLUMNS
      const name = row['Name ']?.trim() || row['Name']?.trim(); 
      const phone = row['Mobile number']?.toString().replace(/[^0-9]/g, ''); 
      const bloodGroup = row['Blood group']?.trim();
      
      // 2. VALIDATION
      if (!name || !phone || !bloodGroup) {
        continue; // Skip empty rows
      }

      // 3. DUPLICATE CHECK (Check if phone already exists)
      const q = query(collection(db, "donors"), where("phone", "==", phone));
      const snapshot = await getDocs(q);
      
      if (!snapshot.empty) {
        setLogs(prev => [...prev, `Skipped (Already Exists): ${name}`]);
        duplicateCount++;
        continue;
      }

      // 4. UPLOAD TO FIREBASE
      try {
        await addDoc(collection(db, "donors"), {
          name: name,
          phone: phone,
          bloodGroup: bloodGroup,
          district: TARGET_DISTRICT,  // Alappuzha
          location: TARGET_LOCATION,  // Muttar
          lastDonationDate: null, 
          createdAt: serverTimestamp()
        });
        successCount++;
      } catch (err) {
        console.error(err);
        failCount++;
      }
    }
    setLogs(prev => [...prev, `FINISHED! ✅ Added: ${successCount} | ⚠️ Duplicates: ${duplicateCount} | ❌ Errors: ${failCount}`]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-2">Bulk Upload Donors</h1>
        <div className="flex space-x-4 mb-6 text-sm text-gray-600">
           <p>District: <span className="font-bold text-brand-600">{TARGET_DISTRICT}</span></p>
           <p>Location: <span className="font-bold text-brand-600">{TARGET_LOCATION}</span></p>
        </div>
        
        {/* File Input */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center mb-6 hover:bg-gray-50 transition-colors">
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
          <p className="text-sm text-gray-500 mb-4">Select your <b>Youth Survey</b> CSV file</p>
          <input 
            type="file" 
            accept=".csv"
            onChange={handleFileUpload}
            disabled={loading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100 cursor-pointer"
          />
        </div>

        {/* Logs Area */}
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-80 overflow-y-auto text-xs font-mono shadow-inner">
          {logs.length === 0 ? (
            <div className="text-gray-500 italic">Waiting for file...</div>
          ) : (
            logs.map((log, i) => (
              <div key={i} className="mb-1 border-b border-gray-800 pb-1 last:border-0">
                {log}
              </div>
            ))
          )}
          {loading && (
            <div className="mt-4 flex items-center text-yellow-400 animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin mr-2"/> Processing file... Do not close window.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUpload;