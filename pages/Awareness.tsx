import React, { useState, useEffect } from 'react';
import { Heart, Activity, CheckCircle, AlertTriangle, Users, Droplet, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Awareness: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    // --- SLIDES DATA ---
    const slides = [
        {
            id: 0,
            image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            overlay: "bg-gradient-to-r from-red-900/90 to-red-800/80", // Dark Red Overlay
            content: (
                <div className="text-center text-white px-4 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold mb-8 border border-white/30">
                        <Heart className="h-4 w-4 fill-white text-white animate-pulse" /> ജീവൻ രക്ഷിക്കൂ
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                        രക്തദാനം <br className="md:hidden" /> <span className="text-yellow-400">മഹാദാനം</span>
                    </h1>
                    <p className="text-xl md:text-3xl text-red-100 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
                        "നിങ്ങളുടെ ഒരു തുള്ളി രക്തം, മറ്റൊരാളുടെ <br />
                        ജീവിതത്തിലെ ഏറ്റവും വലിയ പ്രതീക്ഷയാണ്."
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="px-10 py-4 bg-white text-red-700 font-bold rounded-full shadow-xl hover:scale-105 transition-transform">
                            ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യൂ
                        </Link>
                    </div>
                </div>
            )
        },
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            overlay: "bg-white/95", // White Overlay (so dark text is visible)
            content: (
                <div className="max-w-6xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">എന്തുകൊണ്ട് രക്തദാനം?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-red-500 hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-red-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Users className="h-10 w-10 text-red-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">ജീവൻ രക്ഷിക്കാൻ</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                അപകടങ്ങൾ, ശസ്ത്രക്രിയകൾ എന്നിവയ്ക്ക് രക്തം അത്യന്താപേക്ഷിതമാണ്. കൃത്യസമയത്ത് ലഭിക്കുന്ന രക്തം ഒരു ജീവൻ നിലനിർത്തുന്നു.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-blue-500 hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Activity className="h-10 w-10 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">ആരോഗ്യഗുണങ്ങൾ</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                രക്തദാനം ഹൃദയാഘാത സാധ്യത കുറയ്ക്കാനും പുതിയ രക്തകോശങ്ങളുടെ ഉത്പാദനം വർദ്ധിപ്പിക്കാനും സഹായിക്കുന്നു.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-green-500 hover:-translate-y-2 transition-transform duration-300">
                            <div className="bg-green-50 w-20 h-20 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Droplet className="h-10 w-10 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-gray-800">സാമൂഹിക കടമ</h3>
                            <p className="text-gray-600 leading-relaxed text-sm">
                                ഇത് വെറുമൊരു സേവനമല്ല, മറിച്ച് നമ്മുടെ കടമയാണ്. ആർക്കും എപ്പോൾ വേണമെങ്കിലും രക്തം ആവശ്യമായി വന്നേക്കാം.
                            </p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            overlay: "bg-slate-900/90", // Dark Blue Overlay
            content: (
                <div className="max-w-5xl mx-auto px-6 w-full">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">ആർക്കൊക്കെ ദാനം ചെയ്യാം?</h2>
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* YES */}
                        <div className="flex-1 bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/20 pb-4">
                                <CheckCircle className="h-8 w-8 text-green-400" />
                                <h3 className="text-2xl font-bold text-white">Eligible</h3>
                            </div>
                            <ul className="space-y-4 text-gray-200 text-lg">
                                <li className="flex gap-3"><span className="text-green-400">✔</span> പ്രായം: 18 - 65 വയസ്സ്.</li>
                                <li className="flex gap-3"><span className="text-green-400">✔</span> ഭാരം: 45kg ൽ കൂടുതൽ.</li>
                                <li className="flex gap-3"><span className="text-green-400">✔</span> നല്ല ആരോഗ്യമുള്ളവർ.</li>
                                <li className="flex gap-3"><span className="text-green-400">✔</span> ഹീമോഗ്ലോബിൻ: 12.5g+</li>
                            </ul>
                        </div>

                        {/* NO */}
                        <div className="flex-1 bg-red-900/40 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30">
                            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
                                <AlertTriangle className="h-8 w-8 text-red-500" />
                                <h3 className="text-2xl font-bold text-white">Not Eligible</h3>
                            </div>
                            <ul className="space-y-4 text-gray-300 text-lg">
                                <li className="flex gap-3"><span className="text-red-500">✘</span> കഴിഞ്ഞ 3 മാസത്തിനുള്ളിൽ രക്തം നൽകിയവർ.</li>
                                <li className="flex gap-3"><span className="text-red-500">✘</span> മദ്യപിച്ചവർ (കഴിഞ്ഞ 24 മണിക്കൂറിൽ).</li>
                                <li className="flex gap-3"><span className="text-red-500">✘</span> ഗർഭിണികൾ / മുലയൂട്ടുന്ന അമ്മമാർ.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
            overlay: "bg-white/90", // Light Overlay
            content: (
                <div className="text-center px-4 max-w-4xl mx-auto">
                    <div className="inline-block p-6 rounded-full bg-red-100 mb-8 animate-bounce-slow shadow-lg">
                        <Heart className="h-16 w-16 text-red-600 fill-red-600" />
                    </div>
                    <h2 className="text-8xl font-black text-red-600 mb-4 tracking-tighter">3</h2>
                    <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8">ജീവനുകൾ രക്ഷിക്കാം</h3>
                    <p className="text-xl text-gray-700 mb-12 leading-relaxed font-medium">
                        നിങ്ങൾ നൽകുന്ന <strong>ഒരു യൂണിറ്റ്</strong> രക്തം വേർതിരിച്ച് പ്ലാസ്മ, പ്ലേറ്റ്‌ലെറ്റ്, ചുവന്ന രക്താണുക്കൾ എന്നിങ്ങനെ മാറ്റാം.
                        അതുകൊണ്ട് ഒരൊറ്റ തവണ കൊണ്ട് മൂന്ന് പേർക്ക് പുതുജീവൻ നൽകാം.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-3 px-10 py-5 bg-gray-900 text-white text-xl font-bold rounded-xl hover:bg-black transition-all shadow-xl hover:scale-105">
                        <Play className="h-5 w-5 fill-current" /> ഞാനും പങ്കാളിയാകുന്നു
                    </Link>
                </div>
            )
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-900 group">

            {/* SLIDES CONTAINER */}
            <div
                className="h-full w-full transition-transform duration-700 ease-in-out flex"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {slides.map((slide) => (
                    <div key={slide.id} className="min-w-full h-full relative flex items-center justify-center pt-10 pb-20">

                        {/* 1. BACKGROUND IMAGE */}
                        <img
                            src={slide.image}
                            alt="Slide Background"
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* 2. OVERLAY (Makes text readable) */}
                        <div className={`absolute inset-0 ${slide.overlay}`}></div>

                        {/* 3. CONTENT (On top) */}
                        <div className="relative z-10 w-full">
                            {slide.content}
                        </div>

                    </div>
                ))}
            </div>

            {/* ARROWS (Show on Hover) */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
                <ChevronLeft className="h-8 w-8" />
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-md p-3 rounded-full text-white transition-all opacity-0 group-hover:opacity-100 hidden md:block"
            >
                <ChevronRight className="h-8 w-8" />
            </button>

            {/* BOTTOM DOTS */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-3 rounded-full transition-all duration-300 shadow-sm
              ${currentSlide === index ? 'w-10 bg-red-600' : 'w-3 bg-white/50 hover:bg-white'}`}
                    />
                ))}
            </div>

        </div>
    );
};

export default Awareness;