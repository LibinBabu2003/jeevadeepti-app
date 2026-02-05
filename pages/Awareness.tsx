import React, { useState, useEffect } from 'react';
import { Heart, Activity, CheckCircle, AlertTriangle, Users, Droplet, ChevronLeft, ChevronRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Awareness: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 0,
            type: "fade", // Transition Type
            image: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            overlay: "bg-gradient-to-r from-red-900/90 to-red-800/80",
            content: (
                <div className="text-center text-white px-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs md:text-sm font-bold mb-6 border border-white/30 animate-pulse">
                        <Heart className="h-3 w-3 md:h-4 md:w-4 fill-white text-white" /> ജീവൻ രക്ഷിക്കൂ
                    </div>
                    <h1 className="text-4xl md:text-7xl font-extrabold mb-4 leading-tight drop-shadow-lg">
                        രക്തദാനം <br className="md:hidden" /> <span className="text-yellow-400">മഹാദാനം</span>
                    </h1>
                    <p className="text-lg md:text-3xl text-red-100 max-w-3xl mx-auto leading-relaxed mb-8 font-light px-2">
                        "നിങ്ങളുടെ ഒരു തുള്ളി രക്തം, മറ്റൊരാളുടെ <br className="hidden md:block" />
                        ജീവിതത്തിലെ ഏറ്റവും വലിയ പ്രതീക്ഷയാണ്."
                    </p>
                    <div className="flex justify-center pb-8">
                        <Link to="/register" className="px-8 py-3 md:px-10 md:py-4 bg-white text-red-700 font-bold rounded-full shadow-xl hover:scale-105 transition-transform text-sm md:text-base">
                            ഇപ്പോൾ രജിസ്റ്റർ ചെയ്യൂ
                        </Link>
                    </div>
                </div>
            )
        },
        {
            id: 1,
            type: "slide-up", // Transition Type
            image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            overlay: "bg-white/95",
            content: (
                <div className="max-w-6xl mx-auto px-4 text-center pb-12">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-6 md:mb-12 sticky top-0 bg-white/95 backdrop-blur-sm py-2 z-10">എന്തുകൊണ്ട് രക്തദാനം?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
                        {/* Card 1 */}
                        <div className="bg-white p-5 rounded-xl shadow-lg border-b-4 border-red-500">
                            <div className="bg-red-50 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 mx-auto">
                                <Users className="h-6 w-6 md:h-8 md:w-8 text-red-600" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">ജീവൻ രക്ഷിക്കാൻ</h3>
                            <p className="text-gray-600 text-xs md:text-sm">അപകടങ്ങൾ, ശസ്ത്രക്രിയകൾ എന്നിവയ്ക്ക് രക്തം അത്യന്താപേക്ഷിതമാണ്.</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-white p-5 rounded-xl shadow-lg border-b-4 border-blue-500">
                            <div className="bg-blue-50 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 mx-auto">
                                <Activity className="h-6 w-6 md:h-8 md:w-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">ആരോഗ്യഗുണങ്ങൾ</h3>
                            <p className="text-gray-600 text-xs md:text-sm">പുതിയ രക്തകോശങ്ങളുടെ ഉത്പാദനം വർദ്ധിപ്പിക്കാനും സഹായിക്കുന്നു.</p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-white p-5 rounded-xl shadow-lg border-b-4 border-green-500">
                            <div className="bg-green-50 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 mx-auto">
                                <Droplet className="h-6 w-6 md:h-8 md:w-8 text-green-600" />
                            </div>
                            <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-800">സാമൂഹിക കടമ</h3>
                            <p className="text-gray-600 text-xs md:text-sm">ഇത് വെറുമൊരു സേവനമല്ല, മറിച്ച് നമ്മുടെ കടമയാണ്.</p>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 2,
            type: "zoom", // Transition Type
            image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            overlay: "bg-slate-900/90",
            content: (
                <div className="max-w-5xl mx-auto px-6 w-full pb-10">
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 md:mb-12 text-center sticky top-0 bg-slate-900/90 py-2 z-10">ആർക്കൊക്കെ ദാനം ചെയ്യാം?</h2>
                    <div className="flex flex-col gap-4 md:flex-row md:gap-6">
                        {/* Eligible Card */}
                        <div className="flex-1 bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                            <div className="flex items-center gap-3 mb-4 border-b border-white/20 pb-2">
                                <CheckCircle className="h-6 w-6 text-green-400" />
                                <h3 className="text-xl font-bold text-white">Eligible</h3>
                            </div>
                            <ul className="space-y-3 text-gray-200 text-sm md:text-lg">
                                <li className="flex gap-2"><span className="text-green-400">✔</span> പ്രായം: 18 - 65 വയസ്സ്.</li>
                                <li className="flex gap-2"><span className="text-green-400">✔</span> ഭാരം: 45kg ൽ കൂടുതൽ.</li>
                                <li className="flex gap-2"><span className="text-green-400">✔</span> നല്ല ആരോഗ്യമുള്ളവർ.</li>
                            </ul>
                        </div>
                        {/* Not Eligible Card (Added for completeness if space allows) */}
                        <div className="flex-1 bg-red-900/20 backdrop-blur-sm p-6 rounded-2xl border border-red-500/20">
                            <div className="flex items-center gap-3 mb-4 border-b border-red-500/20 pb-2">
                                <AlertTriangle className="h-6 w-6 text-red-400" />
                                <h3 className="text-xl font-bold text-white">Not Eligible</h3>
                            </div>
                            <ul className="space-y-3 text-gray-200 text-sm md:text-lg">
                                <li className="flex gap-2"><span className="text-red-400">✘</span> മദ്യപിച്ചവർ.</li>
                                <li className="flex gap-2"><span className="text-red-400">✘</span> ഗർഭിണികൾ.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        },
        {
            id: 3,
            type: "flip", // Transition Type
            image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60",
            overlay: "bg-white/90",
            content: (
                <div className="text-center px-4 max-w-4xl mx-auto pb-8">
                    <div className="inline-block p-4 md:p-6 rounded-full bg-red-100 mb-6 animate-bounce-slow shadow-lg">
                        <Heart className="h-10 w-10 md:h-16 md:w-16 text-red-600 fill-red-600" />
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-red-600 mb-2 tracking-tighter">3</h2>
                    <h3 className="text-2xl md:text-5xl font-bold text-gray-900 mb-6">ജീവനുകൾ രക്ഷിക്കാം</h3>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium hidden md:block">
                        ഒരൊറ്റ തവണ കൊണ്ട് മൂന്ന് പേർക്ക് പുതുജീവൻ നൽകാം.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-bold rounded-xl hover:bg-black transition-all shadow-xl">
                        <Play className="h-4 w-4 fill-current" /> ഞാനും പങ്കാളിയാകുന്നു
                    </Link>
                </div>
            )
        }
    ];

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, []);

    // --- TRANSITION STYLES ---
    const getTransitionClass = (index: number) => {
        if (index === currentSlide) return "opacity-100 z-10 scale-100 translate-y-0 rotate-0"; // ACTIVE STATE

        // EXIT/HIDDEN STATES BASED ON TYPE
        const type = slides[index].type;
        if (type === "slide-up") return "opacity-0 z-0 translate-y-full";
        if (type === "zoom") return "opacity-0 z-0 scale-50";
        if (type === "flip") return "opacity-0 z-0 rotate-y-90 scale-90";
        return "opacity-0 z-0"; // Default Fade
    };

    return (
        <div className="relative h-[calc(100vh-64px)] w-full overflow-hidden bg-gray-900 group perspective-1000">

            {/* SLIDES RENDERED ABSOLUTELY ON TOP OF EACH OTHER */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out flex items-center justify-center
                        ${getTransitionClass(index)}
                    `}
                >
                    {/* BACKGROUND IMAGE */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        loading={index === 0 ? "eager" : "lazy"}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />

                    {/* OVERLAY */}
                    <div className={`absolute inset-0 ${slide.overlay}`}></div>

                    {/* CONTENT CONTAINER (SCROLLABLE FOR MOBILE) */}
                    <div className="relative z-10 w-full h-full overflow-y-auto flex flex-col justify-center py-16">
                        {slide.content}
                    </div>
                </div>
            ))}

            {/* ARROWS */}
            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hidden md:block z-20 hover:bg-black/50 transition-colors"><ChevronLeft className="h-8 w-8" /></button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hidden md:block z-20 hover:bg-black/50 transition-colors"><ChevronRight className="h-8 w-8" /></button>

            {/* DOTS */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 shadow-sm
                        ${currentSlide === index ? 'w-8 bg-red-600' : 'w-2 bg-gray-400/50 hover:bg-white'}`}
                    />
                ))}
            </div>

        </div>
    );
};

export default Awareness;