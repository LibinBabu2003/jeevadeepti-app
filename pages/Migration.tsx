import React, { useState } from 'react';
import { collection, getDocs, doc, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

const Migration: React.FC = () => {
    const [status, setStatus] = useState("Ready to migrate.");
    const [loading, setLoading] = useState(false);

    const startMigration = async () => {
        if (!window.confirm("Are you sure? This will move ALL phone numbers to the secure vault.")) return;

        setLoading(true);
        setStatus("Starting migration... Please wait.");

        try {
            // 1. Get ALL Donors from the Public List
            const querySnapshot = await getDocs(collection(db, "donors"));
            let count = 0;
            let skipped = 0;

            // 2. Loop through every single donor
            for (const donorDoc of querySnapshot.docs) {
                const data = donorDoc.data();
                const donorId = donorDoc.id;

                // Check if this donor actually HAS a phone number in the public area
                // (If they are already fixed, 'phone' will be missing or empty)
                if (data.phone) {

                    // A. Copy phone to "donors_sensitive" (The Vault)
                    await setDoc(doc(db, "donors_sensitive", donorId), {
                        phone: data.phone
                    });

                    // B. Delete phone from "donors" (Public Area)
                    await updateDoc(doc(db, "donors", donorId), {
                        phone: deleteField() // This removes the field entirely
                    });

                    count++;
                    setStatus(`Migrated: ${data.name}...`);
                } else {
                    skipped++;
                }
            }

            setStatus(`✅ SUCCESS! Moved ${count} donors to Vault. Skipped ${skipped} (already safe).`);

        } catch (error) {
            console.error(error);
            setStatus("❌ ERROR: Check console. Did you set Firestore Rules to 'allow write: if true'?");
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-yellow-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-xl border border-yellow-200 text-center max-w-lg">
                <div className="bg-yellow-100 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="h-10 w-10 text-yellow-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Data Migration Tool</h1>
                <p className="text-gray-600 mb-6">
                    This tool will scan your database, find old donors with exposed phone numbers,
                    copy them to the secure vault, and clean up the public list.
                </p>

                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm font-mono mb-6 min-h-[60px]">
                    {status}
                </div>

                <button
                    onClick={startMigration}
                    disabled={loading}
                    className={`w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2
            ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg'}`}
                >
                    {loading ? "Working..." : <><ShieldCheck /> Fix Database Now</>}
                </button>
            </div>
        </div>
    );
};

export default Migration;