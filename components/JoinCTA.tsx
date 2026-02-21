import React from 'react';
import { SlideInFromBottom } from './SlideInFromBottom';
import { SlideInFromTop } from './SlideInFromTop';
import { SlideIn } from './SlideIn';
import { useNavigate } from 'react-router-dom';

const JoinCTA: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-4 bg-background-dark relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="mx-auto max-w-[800px] text-center relative z-10">
        <SlideIn delay={0.4}>
          <span className="material-symbols-outlined text-6xl text-primary mb-6 animate-pulse">
            <img
  src="./images/akris-logo.png"
  className="w-[75px] "
/>
          </span>
        </SlideIn>
        <SlideIn delay={0.5}>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to join the game?
          </h2>
        </SlideIn>
        <SlideIn direction='bottom' delay={0.7}>
          <p className="text-xl text-text-secondary mb-10 max-w-lg mx-auto">
            Become a member of Akris today and get unlimited access to training, competition, and
            social events.
          </p>
        </SlideIn>
        <SlideIn direction='bottom' delay={0.75}>
          <button className="bg-gradient-to-r from-primary to-emerald-400 text-background-dark text-lg font-bold py-4 px-10 rounded-full hover:shadow-[0_0_40px_-10px_rgba(54,226,123,0.5)] transition-all hover:scale-105 active:scale-95" onClick={() => navigate("/join-us")}>
            Join Akris Today
          </button>
        </SlideIn>
      </div>
    </section>
  );
};

export default JoinCTA;