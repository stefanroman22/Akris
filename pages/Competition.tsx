import React from 'react';
import { useCompetition } from '@/hooks/useCompetition';
import { motion } from 'framer-motion';

const Competition: React.FC = () => {
  const { data } = useCompetition();
  const teams = data?.data?.teams || []; 
  const players = data?.data?.players || [];
  console.log(data);

  return (
    <section className="min-h-screen bg-[#0e1210] py-32 px-4 md:px-10">
      <div className="mx-auto max-w-[1200px]">
        {/* --- TITLE --- */}
        <header className="mb-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-20 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
              Competition
            </h1>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </motion.div>
        </header>

        {/* --- TEAMS SECTIONS --- */}
        <div className="space-y-10 mb-24">
          {teams.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6" // Adds spacing between header and content
            >
              {/* --- SECTION HEADER --- */}
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white">
                  Team Standings <span className="text-primary">&</span> Fixtures
                </h3>
                <div className="h-[1px] flex-grow bg-white/10" />
              </div>
              {/* Team Info Card */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 h-full">
                  <h2 className="text-3xl font-black text-primary mb-1 uppercase italic">{t.name}</h2>
                  <p className="text-gray-400 font-medium mb-6">{t.poule}</p>

                  <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Roster</h4>
                  <div className="flex flex-wrap gap-2">
                    {t.players.map((p) => (
                      <span key={p} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-gray-300">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Standings Table */}
              <div className="lg:col-span-2">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
                  <div className="overflow-x-auto scrollbar-hide">
                    {/* 2. Set a min-width so the columns have room to breathe */}
                    <table className="w-full text-left table-fixed min-w-[500px]">
                      <thead>
                        <tr className="bg-white/5 border-b border-white/10">
                          {/* Adjusted widths for better balance */}
                          <th className="p-4 text-xs font-bold uppercase text-gray-500 w-10">#</th>
                          <th className="p-4 text-xs font-bold uppercase text-gray-500 w-auto">Team</th>
                          <th className="p-4 text-xs font-bold uppercase text-gray-500 w-24 text-center">Rating</th>
                          <th className="p-4 text-xs font-bold uppercase text-gray-500 w-16 text-center">P</th>
                          <th className="p-4 text-xs font-bold uppercase text-gray-500 w-16 text-center">Pts</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {t.standings.map((row, i) => (
                          <tr
                            key={i}
                            className={`hover:bg-primary/5 transition-colors ${row.team.includes('Akris') ? 'bg-primary/10' : ''
                              }`}
                          >
                            <td className="p-4 font-mono text-gray-500 text-sm">{i + 1}</td>
                            {/* 3. Add 'truncate' to prevent overflow and 'whitespace-nowrap' */}
                            <td className={`p-4 font-bold truncate whitespace-nowrap ${row.team.includes('Akris') ? 'text-primary' : 'text-gray-200'
                              }`}>
                              {row.team}
                            </td>
                            <td className="p-4 text-center text-gray-400 text-sm font-mono">{row.rating}</td>
                            <td className="p-4 text-center text-gray-400 text-sm">{row.played}</td>
                            <td className="p-4 text-center font-black text-white">{row.points}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- PLAYER STANDINGS --- */}
        <div className="mt-32">
          <h2 className="text-2xl font-black text-white uppercase mb-8 flex items-center gap-4">
            Individual Performance <div className="h-[1px] flex-grow bg-white/10" />
          </h2>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
            <div className="overflow-x-auto"> {/* Responsive wrapper */}
              <table className="w-full text-left min-w-[600px]">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10">
                    <th className="p-5 text-xs font-bold uppercase text-gray-500">Player</th>
                    <th className="p-5 text-xs font-bold uppercase text-gray-500">Team</th>
                    <th className="p-5 text-xs font-bold uppercase text-gray-500">Rating</th>
                    <th className="p-5 text-xs font-bold uppercase text-gray-500">Win %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {players.map((player, i) => (
                    <tr key={i} className="group hover:bg-white/[0.03] transition-colors">
                      <td className="p-5 text-white font-bold">{player.name}</td>
                      <td className="p-5 text-gray-500 uppercase text-xs tracking-widest">{player.team}</td>
                      <td className="p-5 font-mono text-primary">{player.rating}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <span className="text-white font-bold">{player.win_percentage}</span>
                          <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{ width: player.win_percentage }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Competition;