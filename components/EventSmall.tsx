
import { CalendarEvent } from '@/types';
import { faClock, faLocation, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useRef, useEffect } from 'react';

interface EventSmallProps {
  event: CalendarEvent;
}

const EventSmall: React.FC<EventSmallProps> = ({ event }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState<number | undefined>(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  

  return (
    <div 
      className={`group flex flex-col bg-background-dark border border-border-dark rounded-lg shadow-sm hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer overflow-hidden ${
        isOpen ? 'ring-2 ring-primary/50' : ''
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex flex-col p-3 min-h-[140px]">
        
        <div className="flex items-atart justify-between">
          <h4 className="font-bold text-white group-hover:text-primary text-sm leading-tight mb-2 group-hover:text-primary-dark transition-colors">
          {event.title}
        </h4>
          <span 
            className={`material-symbols-outlined text-slate-400 transition-transform duration-300 ${
              isOpen ? 'rotate-90' : 'rotate-0'
            }`}
          >
            chevron_right
          </span>
        </div>
        
        

        <div className=" flex flex-row gap-1 justify-start align-center mt-auto space-y-1">
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <FontAwesomeIcon icon={faClock} className='mt-[3px]'/>
            <span>{event.time}</span>
          </div>
           <span className="mx-1 text-border-dark">|</span>
          <div className="flex items-center gap-1.5 text-slate-500 text-xs">
            <FontAwesomeIcon icon={faLocationDot}/>
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      <div 
        className="transition-all duration-300 ease-in-out px-3 overflow-hidden"
        style={{ height: isOpen ? contentHeight : 0 }}
      >
        <div ref={contentRef} className="pb-3">
          <div className="border-t border-primary/20 pt-2 mt-1">
           {event.description === "" && <p  className="text-text-secondary leading-relaxed text-sm">No description found</p>}
            <p className="text-xs text-slate-400 leading-relaxed">
              {event.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventSmall;
