// src/components/OATK.tsx
import React from 'react';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { useOATK } from '../hooks/useOATK';
import { motion } from 'framer-motion';

const myPortableTextComponents: PortableTextComponents = {
  marks: {
    strong: ({ children }) => <strong className="font-bold text-primary">{children}</strong>,
    em: ({ children }) => <em className="italic text-gray-300">{children}</em>,
    link: ({ value, children }) => (
      <a 
        href={value?.href} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-primary underline decoration-primary/30 underline-offset-4 hover:text-white hover:decoration-white transition-all"
      >
        {children}
      </a>
    ),
  },
  block: {
    normal: ({ children }) => <p className="text-gray-400 leading-relaxed mb-6 text-lg">{children}</p>,
    h2: ({ children }) => <h2 className="text-3xl font-bold text-white mt-12 mb-6 tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold text-white mt-8 mb-4">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-none mb-8 space-y-3">{children}</ul>,
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex items-start gap-3 text-gray-400">
        <span className="text-primary mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
        <span>{children}</span>
      </li>
    ),
  },
};

const OATK: React.FC = () => {
  const { data, isLoading, isError } = useOATK();

  if (isLoading) return <div className="py-20 text-center text-gray-500 animate-pulse">Loading OATK...</div>;
  if (isError || !data) return null;

  return (
    <section className="bg-[#0e1210] py-32 px-6 md:px-10 overflow-hidden" id="oatk">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-[800px] mx-auto"
      >
        {/* Section Header */}
        <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         className="mb-20 text-center"
                       >
                         <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
                           {data.title}
                         </h1>
                         <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
                       </motion.div>

        {/* Rich Text Content */}
        <div className="prose prose-invert prose-primary max-w-none">
          <PortableText value={data.content} components={myPortableTextComponents} />
        </div>
      </motion.div>
    </section>
  );
};

export default OATK;