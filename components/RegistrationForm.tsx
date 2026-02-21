
import React, { useState, useEffect, useCallback } from 'react';
import { FormData, INITIAL_FORM_DATA } from '../types';
import { Alert } from './Alert';
import { SlideInFromTop } from './SlideInFromTop';
import emailjs from '@emailjs/browser';
import { form } from 'framer-motion/m';
import { SlideIn } from './SlideIn';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';

const SUBMISSION_KEY = 'akris_form_submitted';

export const RegistrationForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [isAnimatingSuccess, setIsAnimatingSuccess] = useState<boolean>(false);

    const EMAIL_SERVICE_ID = process.env.EMAIL_SERVICE_ID;
    const EMAIL_TEMPLATE_ID = process.env.EMAIL_TEMPLATE_ID;
    const EMAIL_API_KEY = process.env.EMAIL_API_KEY;

    console.log(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID, EMAIL_API_KEY);

    const {data} = useGeneralSettings();

    // Check if already submitted on mount
    useEffect(() => {
        const saved = localStorage.getItem(SUBMISSION_KEY);
        if (saved === 'true') {
            setIsSubmitted(true);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: val
        }));
    };

    const validate = (): boolean => {
        const required: (keyof FormData)[] = [
            'fullName', 'initials', 'birthDate', 'address', 'postalCode', 'city',
            'email', 'phone', 'university', 'hasSportsCard',
            'interestedInCompetition', 'iban'
        ];

        for (const key of required) {
            if (!formData[key]) return false;
        }

        if (formData.university === 'other' && !formData.otherUniversity) return false;
        if (formData.hasSportsCard === "yes" && !formData.rscNumber) return false;
        if (!formData.agreedToData || !formData.agreedToPermission) return false;

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            setError(null);
            setIsAnimatingSuccess(true);

            try {
                
                await emailjs.send(
                    EMAIL_SERVICE_ID,
                    EMAIL_TEMPLATE_ID,
                    {
                        ...formData, 
                        to_email: 'nsttvakris@gmail.com', 
                    },
                    EMAIL_API_KEY
                );

                setTimeout(() => {
                    localStorage.setItem(SUBMISSION_KEY, 'true');
                    setIsSubmitted(true);
                    setIsAnimatingSuccess(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 1000);
            } catch (error) {
                console.error('Email send failed:', error);
                setError('Submission failed. Please try again.');
                setIsAnimatingSuccess(false);
            }
        } else {
            setError('Please fill in all required fields and accept the agreements.');
        }
    };
    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto text-center py-16 px-8 bg-gradient-to-b from-[#1c221f] to-[#111614] rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] border border-white/10 animate-fade-in">
                <div className="mb-6 flex justify-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
                        <span className="material-symbols-outlined text-primary text-6xl">verified</span>
                    </div>
                </div>
                <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Form Completed!</h2>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-md mx-auto">
                    It looks like you've already registered from this browser. Please check your email inbox for a response from our team.
                </p>
                <div className="p-5 bg-white/5 rounded-2xl inline-block border border-white/5">
                    <p className="text-sm text-slate-400 font-medium">Questions? Reach out to <a href="mailto:nsttvakris@gmail.com" className="text-primary hover:text-white transition-colors  decoration-primary/30">nsttvakris@gmail.com</a></p>
                </div>
                <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        `}</style>
            </div>
        );
    }

    // Input common styles for dark theme
    const inputBaseClasses = `
  w-full rounded-xl px-4 py-3 text-white shadow-inner
  bg-[#252e2a] 
  border border-white/10 
  placeholder-slate-500 
  
  /* The Modern Interaction Stuff */
  outline-none
  transition-all duration-300 ease-out
  
  /* Focus State */
  focus:border-primary 
  focus:bg-[#2b3530] 
  focus:ring-4 focus:ring-primary/10 
`;
    const labelBaseClasses = "block text-sm font-semibold text-slate-300 mb-2";

    return (
        <div className="max-w-3xl mx-auto relative">
            {isAnimatingSuccess && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background-dark/80 backdrop-blur-xl">
                    <div className="text-center">
                        <div className="success-loader mb-6 mx-auto"></div>
                        <h2 className="text-2xl font-black text-white animate-pulse">Processing Your Data...</h2>
                        <p className="text-slate-400 mt-2">Connecting to our systems...</p>
                    </div>
                    <style>{`
            .success-loader {
              width: 80px;
              height: 80px;
              border: 6px solid rgba(54, 226, 123, 0.1);
              border-top: 6px solid #36e27b;
              border-radius: 50%;
              animation: spin 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
            }
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
                </div>
            )}

            {error && <Alert message={error} onClose={() => setError(null)} />}


            <div className="text-center mb-10">
                <SlideIn delay={0.4}>
                    <span className="inline-block py-1 px-4 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-4 border border-primary/20">Membership {data.currentAcademicYear}</span>
                </SlideIn>
                <SlideIn delay={0.6}>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-200 mb-4 tracking-tight">Join <span className="text-primary">Akris</span></h1>
                </SlideIn>
                <SlideIn delay={0.8}>
                    <p className="text-lg text-slate-400 max-w-lg mx-auto leading-relaxed">Fill out the form below to join Nijmegen's most active student table tennis association.</p>
                </SlideIn>
            </div>

            <SlideIn delay={1}>
                <div className="bg-gradient-to-b from-[#1c221f] to-[#111614] rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] p-8 md:p-12 border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary/50"></div>

                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Section: Personal Information */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 pb-3 border-b border-white/5">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">person</span>
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                                <div className="md:col-span-4">
                                    <label className={labelBaseClasses}>Full Name <span className="text-primary">*</span></label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="e.g. John Doe"
                                        className={inputBaseClasses}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelBaseClasses}>Initials <span className="text-primary">*</span></label>
                                    <input
                                        type="text"
                                        name="initials"
                                        value={formData.initials}
                                        onChange={handleChange}
                                        placeholder="e.g. J.A."
                                        className={inputBaseClasses}
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <label className={labelBaseClasses}>Birth Date <span className="text-primary">*</span></label>
                                    <input
                                        type="date"
                                        name="birthDate"
                                        value={formData.birthDate}
                                        onChange={handleChange}
                                        className={`${inputBaseClasses} [color-scheme:dark]`}
                                    />
                                </div>
                                <div className="md:col-span-6">
                                    <label className={labelBaseClasses}>Address <span className="text-primary">*</span></label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Streetname 123"
                                        className={inputBaseClasses}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelBaseClasses}>Postal Code <span className="text-primary">*</span></label>
                                    <input
                                        type="text"
                                        name="postalCode"
                                        value={formData.postalCode}
                                        onChange={handleChange}
                                        placeholder="1234 AB"
                                        className={inputBaseClasses}
                                    />
                                </div>
                                <div className="md:col-span-4">
                                    <label className={labelBaseClasses}>City <span className="text-primary">*</span></label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Nijmegen"
                                        className={inputBaseClasses}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section: Contact & Details */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 pb-3 border-b border-white/5">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">alternate_email</span>
                                Contact & Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={labelBaseClasses}>Email Address <span className="text-primary">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="student@ru.nl"
                                        className={inputBaseClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelBaseClasses}>Phone Number <span className="text-primary">*</span></label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+31 6 12345678"
                                        className={inputBaseClasses}
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className={labelBaseClasses}>NTTB Number <span className="text-slate-500 font-normal ml-1">(Optional)</span></label>
                                    <input
                                        type="text"
                                        name="nttbNumber"
                                        value={formData.nttbNumber}
                                        onChange={handleChange}
                                        placeholder="Bond number"
                                        className={inputBaseClasses}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Section: Study Information */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 pb-3 border-b border-white/5">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">school</span>
                                Study Information
                            </h2>
                            <div className="space-y-4">
                                <label className={labelBaseClasses}>Where do you study? <span className="text-primary">*</span></label>
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                    {['radboud', 'han', 'other'].map(opt => (
                                        <label key={opt} className={`relative flex cursor-pointer rounded-xl border p-4 shadow-sm transition-all ${formData.university === opt
                                            ? 'border-primary bg-primary/10 ring-1 ring-primary'
                                            : 'border-white/5 bg-[#252e2a] hover:border-white/20'
                                            }`}>
                                            <input
                                                type="radio"
                                                name="university"
                                                value={opt}
                                                className="sr-only"
                                                onChange={handleChange}
                                                checked={formData.university === opt}
                                            />
                                            <span className="flex flex-1">
                                                <span className="flex flex-col">
                                                    <span className={`block text-sm font-medium capitalize transition-colors ${formData.university === opt ? 'text-white' : 'text-slate-400'
                                                        }`}>
                                                        {opt === 'radboud' ? 'Radboud University' : opt === 'han' ? 'HAN' : 'Other'}
                                                    </span>
                                                </span>
                                            </span>
                                            {formData.university === opt && (
                                                <span className="material-symbols-outlined text-primary absolute top-4 right-4 text-sm scale-110">check_circle</span>
                                            )}
                                        </label>
                                    ))}
                                </div>
                                <div
                                    className={`
            grid transition-all duration-300 ease-in-out
            ${formData.university === 'other'
                                            ? 'grid-rows-[1fr] opacity-100 mt-4'  // OPEN State
                                            : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none' // CLOSED State
                                        }
        `}
                                >
                                    {/* The overflow-hidden wrapper is essential for the slide effect */}
                                    <div className="overflow-hidden">
                                        <label className={labelBaseClasses}>Institution Name</label>
                                        <input
                                            type="text"
                                            name="otherUniversity"
                                            value={formData.otherUniversity}
                                            onChange={handleChange}
                                            placeholder="Specify your university"
                                            className={inputBaseClasses}
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Sports Center */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 pb-3 border-b border-white/5">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">fitness_center</span>
                                Sports Center
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <label className={labelBaseClasses}>Do you have a sports subscription at RSC? <span className="text-primary">*</span></label>
                                    <div className="flex gap-8 mt-2">
                                        {['yes', 'no'].map(val => (
                                            <label key={val} className="flex items-center gap-3 cursor-pointer group">
                                                <div className="relative flex items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name="hasSportsCard"
                                                        value={val}
                                                        checked={formData.hasSportsCard === val}
                                                        onChange={handleChange}
                                                        className="peer sr-only"
                                                    />
                                                    <div className="w-6 h-6 border-2 border-white/10 rounded-full bg-[#252e2a] peer-checked:border-primary peer-checked:bg-primary/20 transition-all"></div>
                                                    <div className="absolute w-2.5 h-2.5 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                                                </div>
                                                <span className="text-slate-300 group-hover:text-white transition-colors capitalize font-medium">{val}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                                <div
                                    className={`
    grid transition-all duration-300 ease-in-out
    ${formData.hasSportsCard === 'yes'
                                            ? 'grid-rows-[1fr] opacity-100 mt-4'
                                            : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                                        }
  `}
                                >
                                    {/* Inner container must have overflow-hidden for the collapse to work */}
                                    <div className="overflow-hidden">
                                        <label className={labelBaseClasses}>
                                            RSC Subscription Number <span className="text-primary">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="rscNumber" // Make sure you add this to your formData state
                                            value={formData.rscNumber || ''}
                                            onChange={handleChange}
                                            placeholder="e.g., 1234567"
                                            className={inputBaseClasses}
                                        />
                                        <p className="text-xs text-slate-500 mt-2">
                                            Found on the back of your student card or in the RSC app.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section: Competition */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 pb-3 border-b border-white/5">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">emoji_events</span>
                                Competition
                            </h2>
                            <div className="space-y-3">
                                <label className={labelBaseClasses}>Interested in playing for our teams? <span className="text-primary">*</span></label>
                                <div className="flex gap-8 mt-2">
                                    {['yes', 'no'].map(val => (
                                        <label key={val} className="flex items-center gap-3 cursor-pointer group">
                                            <div className="relative flex items-center justify-center">
                                                <input
                                                    type="radio"
                                                    name="interestedInCompetition"
                                                    value={val}
                                                    checked={formData.interestedInCompetition === val}
                                                    onChange={handleChange}
                                                    className="peer sr-only"
                                                />
                                                <div className="w-6 h-6 border-2 border-white/10 rounded-full bg-[#252e2a] peer-checked:border-primary peer-checked:bg-primary/20 transition-all"></div>
                                                <div className="absolute w-2.5 h-2.5 bg-primary rounded-full scale-0 peer-checked:scale-100 transition-transform"></div>
                                            </div>
                                            <span className="text-slate-300 group-hover:text-white transition-colors capitalize font-medium">{val}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Section: Payment */}
                        <section>
                            <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-3 pb-3 border-b border-white/5">
                                <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">account_balance_wallet</span>
                                Payment
                            </h2>
                            <div>
                                <label className={labelBaseClasses}>Account Number (IBAN) <span className="text-primary">*</span></label>
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 pointer-events-none">
                                        <span className="material-symbols-outlined text-lg">payments</span>
                                    </span>
                                    <input
                                        type="text"
                                        name="iban"
                                        value={formData.iban}
                                        onChange={handleChange}
                                        placeholder="NL00 BANK 0000 0000 00"
                                        className={`${inputBaseClasses} pl-11 font-mono uppercase tracking-wider`}
                                    />
                                </div>
                            </div>
                        </section>

                        {/* Agreements */}
                        <div className="pt-8 space-y-5">
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div className="relative flex items-center pt-1">
                                    <input
                                        type="checkbox"
                                        name="agreedToData"
                                        checked={formData.agreedToData}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />
                                    <div className="w-6 h-6 border-2 border-white/10 rounded-lg bg-[#252e2a] peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                                    <span className="material-symbols-outlined absolute inset-0 text-background-dark text-lg font-bold scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center">check</span>
                                </div>
                                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                                    I agree that Akris saves and uses my data for registration purposes <span className="text-primary">*</span>
                                </span>
                            </label>
                            <label className="flex items-start gap-4 cursor-pointer group">
                                <div className="relative flex items-center pt-1">
                                    <input
                                        type="checkbox"
                                        name="agreedToPermission"
                                        checked={formData.agreedToPermission}
                                        onChange={handleChange}
                                        className="peer sr-only"
                                    />
                                    <div className="w-6 h-6 border-2 border-white/10 rounded-lg bg-[#252e2a] peer-checked:border-primary peer-checked:bg-primary transition-all"></div>
                                    <span className="material-symbols-outlined absolute inset-0 text-background-dark text-lg font-bold scale-0 peer-checked:scale-100 transition-transform flex items-center justify-center">check</span>
                                </div>
                                <span className="text-sm text-slate-400 group-hover:text-slate-200 transition-colors leading-relaxed">
                                    I agree with the association permission statement <span className="text-primary">*</span>
                                </span>
                            </label>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-primary-dark to-primary hover:from-primary hover:to-primary-dark text-background-dark font-black text-xl py-5 px-8 rounded-2xl shadow-[0_10px_20px_-5px_rgba(54,226,123,0.4)] hover:shadow-[0_15px_30px_-5px_rgba(54,226,123,0.5)] transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-1 group"
                            >
                                <span>Submit</span>
                                <span className="material-symbols-outlined group-hover:translate-x-1.5 transition-transform text-2xl">send</span>
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-6 font-medium tracking-widest uppercase">Secured & Encrypted Form Environment</p>
                        </div>
                    </form>
                </div>
            </SlideIn>

            <style>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }
        
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1) hue-rotate(90deg) brightness(0.8);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};
