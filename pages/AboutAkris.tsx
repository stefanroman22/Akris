import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SlideIn } from '@/components/SlideIn';
import { useGeneralSettings } from '@/hooks/useGeneralSettings';

const AboutAkris: React.FC = () => {
  const navigate = useNavigate();
  const {data} = useGeneralSettings();
  return (
    <section className="py-32 px-4 md:px-10 bg-[#0e1210] text-white pb-12">
      <div className="mx-auto max-w-[900px]">

        <SlideIn delay={0.2}>
        <div

          className="mb-16 border-l-4 border-primary pl-6 md:pl-10"
        >
          <h1 className="text-3xl md:text-3xl font-bold mb-6 tracking-tight">
            Welcome to Akris
          </h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            We are the only student table tennis club in Nijmegen, currently holding about
            <span className="text-primary font-bold"> {data.memberCount} members</span>.
            We train weekly, host our own yearly tournament (the OATK), and compete
            in the Dutch national league with several teams.
          </p>
          <p className="mt-4 text-slate-400 italic">
            Akris isn’t all about table tennis. From go-karts and bowling to drinks at our
            favorite café, there are no obligations—just a lot to offer.
          </p>
        </div> 
        </SlideIn>

        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <SlideIn direction='left' delay={0.5}>
            <div

              className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors h-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">sports_tennis</span>
                <h2 className="text-2xl font-bold">Training</h2>
              </div>
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>
                  Located at the <span className="text-white">Radboud Sports Centre (RSC)</span>,
                  practice takes place weekly on Tuesdays and Thursdays. Sessions are led by our trainer
                  <span className="text-white"> {data.coachName}</span>.
                </p>
                <p>
                  The skill level of our members differs, so there will always be someone
                  playing at your level. After practice, we usually head to the RSC bar
                  or our favorite café for a drink.
                </p>
                <div className="pt-2 border-t border-white/5 mt-4">
                  <p className="font-medium text-white mb-1">Beginners Course</p>
                  <p>The RSC offers courses for beginners ahead of our weekly practice.
                    Check their website for details.</p>
                </div>
              </div>
            </div>
          </SlideIn>

          <SlideIn direction='right' delay={0.6}>
          <div

            className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors flex flex-col h-full"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">badge</span>
              <h2 className="text-2xl font-bold">Membership</h2>
            </div>
            <div className="space-y-4 text-slate-400 text-sm leading-relaxed flex-grow">
              <p>
                Interested in joining? Basic membership costs only
                <span className="text-white font-bold"> {data.membershipCost} euros</span>.
              </p>
              <div className="bg-primary/10 border border-primary/20 p-4 rounded-xl">
                <p className="text-primary-light font-bold mb-1 flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">info</span>
                  Take Note
                </p>
                <p className="text-xs text-slate-300">
                  You must possess an RSC Sports Card to join any student sport club in Nijmegen.
                  This card grants access to fitness, tennis, squash, and more.
                </p>
              </div>
            </div>
            

            <button className="mt-8 w-full py-3 bg-primary hover:bg-primary-dark text-background-dark font-bold rounded-lg transition-all active:scale-95" onClick={() => navigate("/join-us")}>
              Join Akris Now
            </button>
          </div>
          </SlideIn>

        </div>

        {/* --- FOOTER CONTACT --- */}
        <div
          className="mt-16 text-center space-y-4"
        >
          <p className="text-slate-500 text-sm">
            Questions? Email us at:
            <a href="mailto:nsttvakris@gmail.com" className="text-primary hover:underline ml-1">
              nsttvakris@gmail.com
            </a>
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://ru.nl/rsc" target="_blank" className="text-[10px] uppercase tracking-widest text-slate-500 hover:text-white transition-colors">
              Visit RSC Website
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutAkris;