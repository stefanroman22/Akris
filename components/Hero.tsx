import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { FadeInText } from './FadeInText';
import { SlideInFromTop } from './SlideInFromTop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import "./Hero.css"
import { useNavigate } from 'react-router-dom';
import { SlideIn } from './SlideIn';
import { client } from '../sanityClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

interface HeroData {
  heading: string;
  description: string;
}

const Hero: React.FC = () => {
  const navigate = useNavigate();

  // Destructure isLoading and error to handle the lifecycle
  const { data, isLoading, error, refetch } = useSuspenseQuery({
    queryKey: ['hero-content'],
    queryFn: getHeroContent,
  });

  // PROFESSIONAL CHECK: If loading, don't render the content yet
 

  // Handle errors or missing data gracefully
  if (error || !data) {
    console.error("Sanity Fetch Error:", error);
    return null;
  }



  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">

      

      {/* Background Image */}
      <div

        className="absolute inset-0 z-0 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: "url('/images/akris-background.png')",
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-background-dark/80 via-background-dark/60 to-background-dark" />
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-background-dark/90 to-transparent" />

      <div className="relative z-20 flex w-full max-w-[1200px] flex-col px-6 md:px-10 pt-5 sm:pt-20">
        <div className="max-w-3xl">

          {/* --- FIX: Added opacity-0 class --- */}
          <SlideIn delay={3.5}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm ">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wide text-primary">
                Radboud University Exclusive
              </span>
            </div>
          </SlideIn>
          

          <FadeInText
            text={data.heading}
            // Added: gap-x-3 (mobile) and md:gap-x-5 (desktop)
            className="font-display text-4xl font-black leading-[1.1] tracking-tighter text-white md:text-7xl lg:text-8xl pb-4 gap-x-1 md:gap-x-5"
          />
          <FadeInText
            text={data.description}
            className="mt-4 max-w-lg text-lg text-gray-300 md:text-xl font-light leading-relaxed gap-x-1"
          />


          <div className="mt-4 flex flex-wrap gap-4">

            {/* --- FIX: Added opacity-0 to wrapper --- */}
            <SlideIn direction="bottom" delay={3}>
              <div className="hero-btn-wrapper ">
                <button className="group relative flex h-14 items-center justify-center overflow-hidden rounded-full bg-primary px-8 text-base font-bold text-background-dark transition-all hover:bg-white hover:scale-105 active:scale-95" onClick={() => navigate("/join-us")}>
                  <span className="relative z-10">Join Us Now</span>
                  <div className="absolute inset-0 -z-10 translate-y-[100%] bg-white transition-transform duration-300 group-hover:translate-y-0"></div>
                </button>
              </div>
            </SlideIn>
          </div>
        </div>
      </div>

     

      <div
        onClick={() => {
          const section = document.getElementById("about");
          if (section) {

            const yOffset = -80;
            const y = section.getBoundingClientRect().top + window.scrollY + yOffset;

            // 2. Scroll there smoothly
            window.scrollTo({ top: y, behavior: "smooth" });
          }
        }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce z-20 text-white/50 cursor-pointer hover:text-white transition-colors scroll-down-arrow"
      >
        <FontAwesomeIcon icon={faArrowDown} />
      </div>

      
    </section>
  );
};

const getHeroContent = async () => {
  const query = '*[_type == "hero"][0]{ heading, description }';
  return await client.fetch(query);
}

export default Hero;