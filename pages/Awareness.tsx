import React from 'react';
import { Heart, Activity, CheckCircle, AlertTriangle, Users, Droplet } from 'lucide-react';
import { Link } from 'react-router-dom';

const Awareness: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            {/* --- HERO SECTION --- */}
            <div className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-24 px-6 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')]"></div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-white/30 animate-fade-in">
                        <Heart className="h-4 w-4 fill-white text-white" /> ജീവൻ രക്ഷിക്കൂ
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        രക്തദാനം <br className="md:hidden" /> <span className="text-yellow-300">മഹാദാനം</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto leading-relaxed">
                        നിങ്ങളുടെ ഒരു തുള്ളി രക്തം, മറ്റൊരാളുടെ <br />
                        ജീവിതത്തിലെ ഏറ്റവും വലിയ പ്രതീക്ഷയാണ്.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="px-8 py-4 bg-white text-red-700 font-bold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                            ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യൂ
                        </Link>
                        <Link to="/search" className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all">
                            രക്തദാതാവിനെ തിരയൂ
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- WHY DONATE SECTION --- */}
            <div className="max-w-6xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">എന്തുകൊണ്ട് രക്തദാനം?</h2>
                    <div className="w-20 h-1.5 bg-red-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-red-200 transition-all hover:shadow-xl group">
                        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                            <Users className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">ജീവൻ രക്ഷിക്കാൻ</h3>
                        <p className="text-gray-600 leading-relaxed">
                            അപകടങ്ങൾ, ശസ്ത്രക്രിയകൾ, ക്യാൻസർ ചികിത്സകൾ എന്നിവയ്ക്ക് രക്തം അത്യന്താപേക്ഷിതമാണ്. കൃത്യസമയത്ത് ലഭിക്കുന്ന രക്തം ഒരു ജീവൻ നിലനിർത്തുന്നു.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-red-200 transition-all hover:shadow-xl group">
                        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                            <Activity className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">ആരോഗ്യഗുണങ്ങൾ</h3>
                        <p className="text-gray-600 leading-relaxed">
                            രക്തദാനം ചെയ്യുന്നത് ഹൃദയാഘാത സാധ്യത കുറയ്ക്കാനും, പുതിയ രക്തകോശങ്ങളുടെ ഉത്പാദനം വർദ്ധിപ്പിക്കാനും സഹായിക്കുന്നു.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-red-200 transition-all hover:shadow-xl group">
                        <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
                            <Droplet className="h-8 w-8 text-red-600" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">സമൂഹത്തിന് വേണ്ടി</h3>
                        <p className="text-gray-600 leading-relaxed">
                            ഇത് വെറുമൊരു സേവനമല്ല, മറിച്ച് നമ്മുടെ കടമയാണ്. ആർക്കും എപ്പോൾ വേണമെങ്കിലും രക്തം ആവശ്യമായി വന്നേക്കാം.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- ELIGIBILITY SECTION (Who can donate) --- */}
            <div className="bg-gray-900 text-white py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                        <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-6 text-red-400">ആർക്കൊക്കെ രക്തം ദാനം ചെയ്യാം?</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                                    <span className="text-lg">പ്രായം: 18 മുതൽ 65 വയസ്സ് വരെ.</span>
                                </li>
                                <li className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                                    <span className="text-lg">ശരീരഭാരം: 45 കിലോയിൽ കൂടുതൽ.</span>
                                </li>
                                <li className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                                    <span className="text-lg">ഹീമോഗ്ലോബിൻ: 12.5 ഗ്രാമിൽ കൂടുതൽ.</span>
                                </li>
                                <li className="flex items-center gap-4 bg-white/10 p-4 rounded-lg">
                                    <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0" />
                                    <span className="text-lg">നല്ല ആരോഗ്യമുള്ളവരായിരിക്കണം.</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex-1 bg-white/5 p-8 rounded-2xl border border-white/10">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-yellow-400">
                                <AlertTriangle className="h-6 w-6" /> ശ്രദ്ധിക്കുക
                            </h3>
                            <p className="text-gray-300 mb-4">താഴെ പറയുന്നവർ രക്തദാനം ഒഴിവാക്കണം:</p>
                            <ul className="space-y-2 text-gray-400 list-disc pl-5">
                                <li>കഴിഞ്ഞ 3 മാസത്തിനുള്ളിൽ രക്തദാനം നടത്തിയവർ.</li>
                                <li>മദ്യപിച്ചവർ (കഴിഞ്ഞ 24 മണിക്കൂറിൽ).</li>
                                <li>ഗുരുതരമായ അസുഖങ്ങൾ ഉള്ളവർ.</li>
                                <li>ഗർഭിണികൾ അല്ലെങ്കിൽ മുലയൂട്ടുന്ന അമ്മമാർ.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- FACT SECTION --- */}
            <div className="py-20 px-6 bg-red-50 text-center">
                <div className="max-w-3xl mx-auto">
                    <div className="text-5xl font-bold text-red-600 mb-2">3</div>
                    <p className="text-2xl font-bold text-gray-800 mb-6">ജീവനുകൾ രക്ഷിക്കാം</p>
                    <p className="text-gray-600 text-lg">
                        നിങ്ങൾ നൽകുന്ന ഒരു യൂണിറ്റ് രക്തം വേർതിരിച്ച് പ്ലാസ്മ, പ്ലേറ്റ്‌ലെറ്റ്, ചുവന്ന രക്താണുക്കൾ എന്നിങ്ങനെ മൂന്ന് ഘടകങ്ങളാക്കി മാറ്റാം.
                        അതുകൊണ്ട് ഒരു തവണത്തെ രക്തദാനം മൂന്ന് പേരുടെ ജീവൻ രക്ഷിക്കുന്നു.
                    </p>
                </div>
            </div>

            {/* --- CTA FOOTER --- */}
            <div className="bg-white py-12 text-center border-t">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">ഇന്നുതന്നെ ഒരു മാറ്റത്തിന് തുടക്കമിടൂ</h2>
                <Link to="/register" className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                    <Heart className="h-5 w-5 fill-current" />
                    ഞാൻ രക്തദാനത്തിന് തയ്യാറാണ്
                </Link>
            </div>

        </div>
    );
};

export default Awareness;