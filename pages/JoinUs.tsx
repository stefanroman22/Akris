// src/pages/JoinUs.tsx
import React from 'react';
import { FadeInText } from '../components/FadeInText'; // Assuming you have this
import { RegistrationForm } from '@/components/RegistrationForm';

const JoinUs: React.FC = () => {
  return (
    <section className="pt-32 pb-20 px-4 md:px-10 bg-[#0e1210] min-h-screen flex flex-col items-center">
     <RegistrationForm/>
    </section>
  );
};

export default JoinUs;