import React from 'react';
import { BoardMember } from '../types';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from '@/sanityClient';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';




const BoardMembers: React.FC = () => {

  const [categoryIndex, setCategoryIndex] = useState(0);


  const { data, isError } = useSuspenseQuery({
    queryKey: ['team-page'],
    queryFn: getTeamData,
  });

  
  if (isError || !data?.sections) return null;

  const sections = data.sections;
  const currentSection = sections[categoryIndex];

  const handleNext = () => {
    if (categoryIndex < sections.length - 1) setCategoryIndex(prev => prev + 1);
  };

  const handlePrev = () => {
    if (categoryIndex > 0) setCategoryIndex(prev => prev - 1);
  };
  return (
    <section className="py-20 px-4 md:px-10 bg-[#0e1210] overflow-hidden" id="board">
      <div className="mx-auto max-w-[1200px]">

        {/* --- HEADER --- */}
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              Meet the Team
            </h2>
            {/* Dynamic Year Display with key for animation */}
            <motion.p
              key={currentSection.categoryName} // Triggers animation on change
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold text-xl mt-2 capitalize"
            >
              {currentSection.categoryName} | 2025-2026
            </motion.p>
          </div>

          {/* --- CONTROLS --- */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={categoryIndex === 0} // Disable if at newest
              className={`h-10 w-10 rounded-full border flex items-center justify-center transition-colors 
                ${categoryIndex === 0
                  ? "border-border-dark text-gray-600 cursor-not-allowed"
                  : "border-border-dark text-white hover:bg-surface-dark hover:border-primary"
                }`}
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={categoryIndex === sections.length - 1} // Disable if at oldest
              className={`h-10 w-10 rounded-full border flex items-center justify-center transition-colors 
                ${categoryIndex === sections.length - 1
                  ? "border-border-dark text-gray-600 cursor-not-allowed"
                  : "border-border-dark text-white hover:bg-surface-dark hover:border-primary"
                }`}
            >
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>

        {/* --- ANIMATED GRID --- */}
        {/* AnimatePresence enables exit animations */}
        <AnimatePresence mode="wait">
          <motion.div
            // Use the actual category name or the index number as the key
            key={currentSection.categoryName}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="flex flex-wrap justify-center gap-6 md:gap-8"
          >
            {currentSection.members?.map((member) => (
              <div key={member._id} className="group flex flex-col items-center w-[160px] md:w-[200px] lg:w-[220px]">

                {/* Image Container */}
                <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden mb-4 bg-surface-dark border border-border-dark group-hover:border-primary/50 transition-colors">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url("${member.imageUrl}")` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />
                  <div className="absolute bottom-3 left-3 transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${member.function === 'Chair' ? 'bg-primary text-background-dark' : 'bg-surface-dark text-white border border-border-dark'}`}>
                      {member.function || 'Member'}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black via-black/90 to-black/40 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <div className="mb-4">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold mb-2 ${member.function === 'Chair' ? 'bg-primary text-background-dark' : 'bg-surface-dark text-white border border-border-dark'}`}>
                        {member.function || 'Member'}
                      </span>
                      <p className="text-white italic text-sm leading-relaxed">{member.quote}</p>
                    </div>
                  </div>
                </div>

                {/* Name & Major */}
                <h3 className="text-white font-bold text-lg leading-tight text-center group-hover:text-primary transition-colors">
                  {member.name}
                </h3>
                <p className="text-text-secondary text-sm text-center">{member.major}</p>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
const getTeamData = async () => {
  const query = `*[_type == "teamPage"][0]{
    sections[]{
      categoryName,
      members[]->{
        _id,
        name,
        function,
        quote,
        "imageUrl": image.asset->url
      }
    }
  }`;
  console.log("Team Querried");
  return await client.fetch(query);
};

export default BoardMembers;