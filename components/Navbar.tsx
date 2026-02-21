import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NAVBAR_LINKS } from '@/navbar.config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableTennis } from '@fortawesome/free-solid-svg-icons';
import { SlideIn } from './SlideIn';
import "./NavBar.css";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // 1. State for search
  const navigate = useNavigate();

  // 2. Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/news?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false); // Close mobile menu if open
      setSearchQuery('');    // Clear input after search
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 py-4 md:px-6 pointer-events-none">
      <div className="flex w-full max-w-[1200px] items-center justify-between rounded-full border border-border-dark/60 bg-background-dark/80 backdrop-blur-md px-6 py-3 shadow-lg pointer-events-auto">
        <SlideIn delay={0}>
          <img
            src="./images/akris-logo.png"
            className="logo cursor-pointer"
            onClick={() => navigate("/")}
            alt="Akris Logo"
          />
        </SlideIn>

        <nav className="desktop-navbar hidden md:flex items-center gap-8">
          {NAVBAR_LINKS.quickLinks.map((item, index) => (
            <SlideIn key={item.label} delay={0.1 + index * 0.3}>
              <a
                onClick={() => navigate(item.path)}
                className="text-sm font-medium text-white hover:text-primary transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            </SlideIn>
          ))}
        </nav>

        <SlideIn delay={2}>
          <div className="flex items-center gap-4">
            {/* DESKTOP SEARCH */}
            <form onSubmit={handleSearch} className="desktop-search-bar md:flex relative group cursor-text hidden">
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary transition-colors hover:scale-110 transition-transform">
                <FontAwesomeIcon icon={faTableTennis} className="text-primary"/>
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="h-9 w-40 rounded-full border border-border-dark bg-surface-dark py-1 pl-10 pr-4 text-sm text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300 focus:w-56"
              />
            </form>

            <button
              className="hamburger-menu flex md:hidden items-center justify-center text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
        </SlideIn>
      </div>

      {/* MOBILE MENU */}
      <div
        style={{ background: 'linear-gradient(to bottom, #0a2e18, #050505)' }}
        className={`fixed top-0 right-0 h-screen w-[60vw]
          border-l border-green-500/20 shadow-2xl 
          transition-all duration-300 ease-in-out pointer-events-auto z-[70] 
          ${isMenuOpen ? 'translate-x-0 opacity-100 visible' : 'translate-x-full opacity-0 invisible'}`}
      >
        <div className="flex flex-col h-full p-6 pt-5">
          <div className="flex items-center justify-between mb-10">
            <img src="./images/akris-logo.png" className="logo" alt="Logo" />
            <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-primary transition-colors p-2">
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          <nav className="flex flex-col gap-6">
            {NAVBAR_LINKS.quickLinks.map((item) => (
              <a
                key={item.label}
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate(item.path);
                }}
                className="text-lg font-medium text-white/90 hover:text-primary hover:pl-2 transition-all duration-200 border-b border-white/5 pb-2"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* MOBILE SEARCH */}
          <div className="mt-6 pt-6">
            <form onSubmit={handleSearch} className="flex relative group">
              <button type="submit" className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-primary">
                <FontAwesomeIcon icon={faTableTennis} className="text-primary"/>
              </button>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Akris..."
                className="h-10 w-full rounded-full border border-border-dark bg-black/20 py-1 pl-10 pr-4 text-sm text-white placeholder-text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;