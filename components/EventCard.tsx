import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EventItem } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';

interface EventCardProps {
  event: EventItem;
  className?: string; // We accept className to allow the parent to pass layout styles
}

export const EventCard: React.FC<EventCardProps> = ({ event, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currentMonth = new Date().toLocaleString('en-US', { month: 'short' });
  const currentday = new Date().toLocaleString('en-US', { day: '2-digit' });
  const isToday = event.date.month === currentMonth.toUpperCase() && event.date.day === currentday;

  return (
    <motion.div
      layout // 1. 'layout' prop makes the Border/Background resize smoothly
      onClick={() => setIsExpanded(!isExpanded)}
      className={className} // Tailwind classes passed from parent
    >
      {/* --- TOP SECTION (Always Visible) --- */}
      <motion.div layout="position" className="flex flex-col md:flex-row gap-4 w-full">

        <div
          className={`flex flex-row md:flex-col items-center justify-center md:w-24 rounded-lg p-3 shrink-0 gap-2 md:gap-0 ${isToday
            ? 'bg-primary'
            : 'bg-background-dark border border-border-dark'
            }`}
        >
          <span className={`font-bold text-sm uppercase ${isToday ? 'text-background-dark' : 'text-text-secondary'}`}>
            {event.date.month}
          </span>
          <span className={`font-black text-2xl ${isToday ? 'text-background-dark' : 'text-white'}`}>
            {event.date.day}
          </span>
        </div>

        {/* Title & Info */}
        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-1">
            <h3 className={`font-bold text-lg transition-colors ${isToday ? 'text-white group-hover:text-primary' : 'text-white group-hover:text-white'}`}>
              {event.title}
            </h3>
            {isToday && (
              <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-bold border border-primary/20">
                Today
              </span>
            )}
          </div>
          <p className="text-text-secondary text-sm flex items-center gap-2 flex-wrap">
            <FontAwesomeIcon icon={faClock}/> {event.time}
            <span className="mx-1 text-border-dark">|</span>
            <div className="flex flex-row gap-2">
              <FontAwesomeIcon icon={faLocationDot}/>
              {event.location}
            </div>
          </p>
        </div>

        {/* Arrow Button */}
        <div className="flex items-center justify-end">
          <button
            className={`h-10 w-10 rounded-full flex items-center justify-center border border-border-dark transition-colors ${isToday
              ? 'bg-background-dark text-primary group-hover:bg-primary group-hover:text-background-dark'
              : 'bg-background-dark text-text-secondary group-hover:bg-white group-hover:text-background-dark'
              }`}
          >
            {/* 2. Rotate the icon based on state */}
            <motion.span
              className="material-symbols-outlined"
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
            >
              chevron_right
            </motion.span>
          </button>
        </div>
      </motion.div>


      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className={`mt-4 pt-4 border-t ${isToday ? 'border-primary/20' : 'border-border-dark'}`}>
            {event.description === "" && <p  className="text-text-secondary leading-relaxed text-sm">No description found</p>}
              <p className="text-text-secondary leading-relaxed text-sm">

                
                {event.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};