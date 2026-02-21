import React, { useMemo, useState } from 'react';
import { useData } from '@/context/DataContext';
import EventSmall from '@/components/EventSmall';
import { motion, AnimatePresence } from 'framer-motion';

// Helper to check if two dates are the same calendar day
const isSameDay = (date1: Date, date2: Date) => {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};

const getMonday = (d: Date) => {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(date.setDate(diff));
  monday.setHours(0, 0, 0, 0); // Reset time for accurate comparison
  return monday;
};

const formatDateRange = (monday: Date) => {
  // 1. Create a completely new instance of Monday to avoid mutating the original
  const startDate = new Date(monday.getTime());

  // 2. Create a completely new instance for Sunday
  const endDate = new Date(monday.getTime());
  endDate.setDate(startDate.getDate() + 6);

  const pad = (n: number) => n.toString().padStart(2, '0');

  const format = (d: Date) =>
    `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;

  // This will now correctly show "22.12.2025 - 28.12.2025"
  return `${format(startDate)} - ${format(endDate)}`;
};

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const WeeklyCalendar: React.FC = () => {
  const { events } = useData();

  // 1. Establish the absolute "Floor" (Current Week's Monday)
  const minMonday = useMemo(() => getMonday(new Date()), []);

  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(minMonday);

  // 2. Navigation Logic with "Back in Time" protection
  const isAtMinWeek = currentWeekStart.getTime() <= minMonday.getTime();

  const [direction, setDirection] = useState(0);

  const handlePrevWeek = () => {
    if (isAtMinWeek) return; // Block going back
    const prev = new Date(currentWeekStart);
    prev.setDate(prev.getDate() - 7);
    setCurrentWeekStart(prev);
  };

  const handleNextWeek = () => {
    const next = new Date(currentWeekStart);
    next.setDate(next.getDate() + 7);
    setCurrentWeekStart(next);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0,
    }),
  };

  const weekDays = useMemo(() => {
    return DAYS_OF_WEEK.map((name, index) => {
      const date = new Date(currentWeekStart);
      date.setDate(currentWeekStart.getDate() + index);

      const daysEvents = events?.filter(event =>
        isSameDay(new Date(event.startDate), date)
      ) || [];

      return {
        dayName: name,
        dayNumber: date.getDate(),
        date,
        events: daysEvents
      };
    });
  }, [currentWeekStart, events]);

  return (
    <div className="w-full flex flex-col justify-center pt-32 pb-20 px-4 md:px-10">

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10">
        {/* Previous Button - Disabled if at current week */}
        <button
          onClick={handlePrevWeek}
          disabled={isAtMinWeek}
          className={`group flex items-center px-2.5 py-2.5 rounded-full border transition-all 
            ${isAtMinWeek
              ? 'opacity-20 cursor-not-allowed border-white/5'
              : 'border-white/10 bg-white/5 hover:bg-white/10 text-white active:scale-95 hover:-translate-y-[3px]'
            }`}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>

        <div className="flex items-center gap-3 px-6 md:px-8 py-3 rounded-xl bg-black/20 backdrop-blur-sm border border-white/5 shadow-inner min-w-fit md:min-w-[400px] justify-center">
          <span className="material-symbols-outlined text-primary shrink-0">calendar_today</span>

          {/* 1. Removed h-7 and overflow-hidden to let it breathe */}
          <div className="relative flex justify-center items-center">
            <AnimatePresence mode="popLayout" custom={direction} initial={false}>
              <motion.h3
                key={currentWeekStart.toISOString()}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
                // 2. Removed 'absolute'. Added 'whitespace-nowrap' to prevent wrapping.
                className="text-lg md:text-xl font-bold text-white tracking-wide whitespace-nowrap"
              >
                {formatDateRange(currentWeekStart)}
              </motion.h3>
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={handleNextWeek}
          className="group flex items-center px-2.5 py-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all active:scale-95 hover:-translate-y-[3px]"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      <div className="relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentWeekStart.toISOString()}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 items-start"
          >
            {weekDays.map((day) => (
              <div key={day.date.toISOString()} className="flex flex-col gap-4 min-h-[240px] group/col">
                <div className="text-center pb-2 border-b border-white/10 group-hover/col:border-primary/50 transition-colors">
                  <span className="block text-emerald-200/60 text-xs font-bold uppercase tracking-wider">
                    {day.dayName}
                  </span>
                  <span className="block text-white text-xl font-bold">
                    {day.dayNumber}
                  </span>
                </div>

                <div className="flex flex-col gap-3 h-full">
                  {day.events.length > 0 ? (
                    day.events.map((event) => (
                      <EventSmall key={event.id} event={event} />
                    ))
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[140px] rounded-lg border-2 border-dashed border-white/5 bg-white/0">
                      <span className="text-white/20 text-xs font-medium">No events</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WeeklyCalendar;