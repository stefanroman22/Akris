// src/pages/Home.tsx
import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import BoardMembers from '../components/BoardMembers';
import Events from '../components/Events';
import SocialGallery from '../components/SocialGallery';
import JoinCTA from '../components/JoinCTA';
import { useData } from '@/context/DataContext';
import { useEffect } from 'react';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <BoardMembers />
      <Events />
      <SocialGallery />
      <JoinCTA />
    </>
  );
};

export default Home;