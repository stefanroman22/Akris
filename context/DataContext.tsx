import React, { createContext, useContext, useState } from 'react';
import { CalendarEvent } from '@/getData/getCalendarData'; // Import your type

interface DataContextType {
  instagramPosts: any[] | null;
  setInstagramPosts: (posts: any[]) => void;
  events: CalendarEvent[] | null; // Add this
  setEvents: (events: CalendarEvent[]) => void; // Add this
  visitedPaths: Set<string>;
  markPathAsVisited: (path: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [instagramPosts, setInstagramPosts] = useState<any[] | null>(null);
  const [events, setEvents] = useState<CalendarEvent[] | null>(null); // New state
  const [visitedPaths, setVisitedPaths] = useState<Set<string>>(new Set());

  const markPathAsVisited = (path: string) => {
    setVisitedPaths((prev) => new Set(prev).add(path));
  };

  return (
    <DataContext.Provider value={{
      instagramPosts,
      setInstagramPosts,
      events,
      setEvents,
      visitedPaths, 
      markPathAsVisited
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};