import React from 'react';
import { Shield, Lock, Eye, FileText, Server } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-200">

                {/* HEADER */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-red-100 rounded-full mb-4">
                        <Shield className="h-8 w-8 text-red-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
                    <p className="text-gray-500 mt-2">Last Updated: February 2026</p>
                </div>

                <div className="prose prose-red max-w-none space-y-8 text-gray-700">

                    {/* SECTION 1 */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <Eye className="h-5 w-5 text-red-600" /> 1. Information We Collect
                        </h2>
                        <p>
                            We collect information to facilitate the life-saving connection between blood donors and seekers.
                        </p>
                        <ul className="list-disc pl-5 space-y-2 mt-2">
                            <li><strong>For Donors:</strong> Name, Phone Number, Blood Group, District, and Local Town.</li>
                            <li><strong>For Seekers:</strong> Google Account Details (Name, Email) and IP Address.</li>
                            <li><strong>Technical Data:</strong> Device type, browser version, and timestamp of access.</li>
                        </ul>
                    </section>

                    {/* SECTION 2 (CRITICAL FOR YOUR LEGAL SAFETY) */}
                    <section className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <Server className="h-5 w-5 text-yellow-700" /> 2. Security & Access Logs
                        </h2>
                        <p className="font-medium text-gray-900 mb-2">
                            To prevent misuse of donor data, we implement strict surveillance measures:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li>
                                <strong>Audit Trails:</strong> Every time a user views a donor's contact number, we record the user's
                                <span className="font-bold"> IP Address, Email ID, and Time</span> in a permanent security log.
                            </li>
                            <li>
                                <strong>Identity Verification:</strong> Access to contact details is restricted to users who sign in via Google Authentication.
                            </li>
                            <li>
                                <strong>Legal Compliance:</strong> These logs may be shared with Cyber Cell authorities in case of harassment or data misuse complaints.
                            </li>
                        </ul>
                    </section>

                    {/* SECTION 3 */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <Lock className="h-5 w-5 text-red-600" /> 3. How We Use Your Data
                        </h2>
                        <p>
                            <strong>Public Visibility:</strong> Donor names and blood groups are visible to the public. Phone numbers are hidden and only revealed to verified logged-in users who explicitly consent to our terms.
                        </p>
                        <p className="mt-2">
                            <strong>No Marketing:</strong> We never sell your data. It is used strictly for blood donation purposes.
                        </p>
                    </section>

                    {/* SECTION 4 */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-3">
                            <FileText className="h-5 w-5 text-red-600" /> 4. Data Deletion (Right to be Forgotten)
                        </h2>
                        <p>
                            Donors have the absolute right to remove their data. If you wish to delete your account:
                        </p>
                        <div className="mt-3 bg-gray-100 p-4 rounded-lg text-center font-medium">
                            Contact Admin: <a href="mailto:libinbabukalapurackal@gmail.com" className="text-blue-600 hover:underline">jeevadeepti@admin.com</a>
                        </div>
                    </section>

                    <section className="border-t pt-8 text-sm text-gray-500 text-center">
                        <p>
                            By using Jeevadeepti, you acknowledge that you have read and understood this policy.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;