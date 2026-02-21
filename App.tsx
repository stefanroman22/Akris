// src/App.tsx
import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { DataProvider, useData } from './context/DataContext';

// Pages
import Home from './pages/Home';
import JoinUs from './pages/JoinUs';
import WeeklyCalendar from './pages/WeeklyCalendar';
import { AnimatePresence, motion } from 'framer-motion';
import AboutAkris from './pages/AboutAkris';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoadingScreen from './components/LoadingScreen';
import OATK from './pages/OATK';
import History from './pages/History';
import News from './pages/News';
import NewsDetail from './pages/NewsDetail';
import Competition from './pages/Competition';
import { useCompetition } from './hooks/useCompetition';

if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

// Professional Touch: Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};



const queryClient = new QueryClient();

const AnimationTracker = () => {
  const { pathname } = useLocation();
  const { markPathAsVisited } = useData();

  useEffect(() => {
    // We use a small timeout (e.g., 1000ms) to allow the entry 
    // animations to finish playing before we mark the path as "seen".
    const timer = setTimeout(() => {
      markPathAsVisited(pathname);
    }, 1000);

    return () => clearTimeout(timer);
  }, [pathname, markPathAsVisited]);

  return null;
};

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3, ease: "easeInOut" }}
  >
    {children}
  </motion.div>
);

const AnimatedRoutes = () => {
  const location = useLocation();


  return (
    /* 2. mode="wait" ensures the old page disappears before the new one enters */
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition>
          <Home />
          </PageTransition>} />
        <Route path="/join-us" element={<PageTransition><JoinUs /></PageTransition>} />
        <Route path="/calendar" element={<PageTransition><WeeklyCalendar /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><AboutAkris /></PageTransition>} />
        <Route path="/oatk" element={<PageTransition><OATK /></PageTransition>} />
        <Route path="/history" element={<PageTransition><History /></PageTransition>} />
        <Route path="/news" element={<PageTransition><News /></PageTransition>} />

        <Route path="/news/:slug" element={<PageTransition><NewsDetail /></PageTransition>} />
        <Route path="/competition" element={<PageTransition><Competition/></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
     <Suspense fallback={<LoadingScreen/>}>
    <QueryClientProvider client={queryClient}>
      <DataProvider>
        <Router>
          <div className="relative flex flex-col min-h-screen w-full font-body bg-[#0e1210]">
            <ScrollToTop />
            <AnimationTracker />
            <Navbar />

            <main className="flex-grow">
              <AnimatedRoutes />
            </main>

            <Footer />
          </div>
        </Router>
      </DataProvider>
    </QueryClientProvider>
    </Suspense>
  );
};
export default App;