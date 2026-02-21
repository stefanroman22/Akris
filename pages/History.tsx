import React from 'react';
import { motion } from 'framer-motion';
import { useHistory } from '@/hooks/useHistory';


const History: React.FC = () => {
  const { data, isError } = useHistory();

 
  if (isError || !data) return null;

  return (
    <section className="bg-[#0e1210] py-32 px-4 md:px-10 min-h-screen">
      <div className="mx-auto max-w-[900px]">
        
        {/* --- HEADER --- */}
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

        {/* --- TABLES LIST --- */}
        <div className="space-y-24">
          {data.tables.map((table, tableIndex) => (
            <motion.div
              key={tableIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: tableIndex * 0.1 }}
            >
              {/* Table Heading */}
              <h2 className="text-xl md:text-2xl font-bold text-primary uppercase tracking-widest mb-6 flex items-center gap-4">
                <span className="h-[1px] flex-grow bg-white/10" />
                {table.heading}
                <span className="h-[1px] flex-grow bg-white/10" />
              </h2>

              {/* Glassmorphism Table Container */}
              <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm">
                <table className="w-full text-left border-collapse table-fixed">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.03]">
                      <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest text-gray-500 w-100">
                        Season
                      </th>
                      <th className="py-5 px-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {table.rows.map((row, rowIndex) => (
                      <tr 
                        key={rowIndex} 
                        className="group hover:bg-primary/[0.03] transition-colors"
                      >
                        <td className="py-4 px-6 font-mono text-sm text-white/70 group-hover:text-primary transition-colors">
                          {row.season}
                        </td>
                        <td className="py-4 px-6 text-base text-gray-300 group-hover:text-white transition-colors">
                          {row.name}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default History;