import React, { useEffect } from 'react';
import { FadeInText } from './FadeInText';
import { EventCard } from './EventCard';
import { getUpcomingEvents } from '@/getData/getCalendarData';
import { SlideIn } from './SlideIn';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext'; // Import your hook

const Events: React.FC = () => {
  const { events, setEvents } = useData(); // Use context instead of local state
  const navigate = useNavigate();

  useEffect(() => {
    // Only fetch if we don't already have events in context
    if (!events) {
      // Pass a high number or no argument if getUpcomingEvents supports it to get "all"
      getUpcomingEvents().then(data => setEvents(data));
    }
  }, [events, setEvents]);

  // Handle loading state
  const displayedEvents = events?.slice(0, 3) || [];

  return (
    <section className="py-24 px-4 md:px-10 bg-background-dark">
      <div className="mx-auto max-w-[900px]">
        <div className="text-center mb-16">
          <FadeInText
            text="Upcoming Events & Fixtures"
            className='text-3xl md:text-4xl font-bold text-white mb-4 justify-center' />

          <FadeInText
            text="Don't miss a beat. Check out our upcoming training sessions and matches."
            className='text-text-secondary justify-center' />
        </div>

        <div className="flex flex-col gap-4">
          {displayedEvents.map((event, index) => (
            <SlideIn key={event.id || index} delay={0.2 + 0.2 * index}>
              <EventCard
                event={event}
                className={`flex flex-col p-4 rounded-xl bg-surface-dark border transition-all duration-300 cursor-pointer group ${
                  event.isToday
                    ? 'border-primary/40 hover:border-primary'
                    : 'border-border-dark hover:border-text-secondary'
                }`}
              />
            </SlideIn>
          ))}
        </div>

        <SlideIn delay={0.4} direction='bottom'>
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/calendar")}
              className="inline-block text-primary text-sm font-bold hover:underline underline-offset-4 bg-transparent border-none cursor-pointer"
            >
              View Full Calendar
            </button>
          </div>
        </SlideIn>
      </div>
    </section>
  );
};

export default Events;