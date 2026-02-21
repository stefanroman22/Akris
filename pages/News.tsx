import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAllNews } from '@/hooks/useNews';

const News: React.FC = () => {
  const { data: articles } = useAllNews();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const filteredArticles = articles?.filter((article) =>
    article.title.toLowerCase().includes(searchQuery)
  );

  return (
    <section className="bg-[#0e1210] min-h-screen py-32 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-20 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4">
            {searchQuery ? `Results for: ${searchQuery}` : 'Latest News'}
          </h1>
          <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles?.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="col-span-full py-20 flex flex-col items-center justify-center border border-white/5 bg-white/[0.01] rounded-[2rem] text-center"
            >
              {/* Visual Element */}
              <div className="mb-6 relative">
                <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                <div className="relative h-24 w-24 rounded-full border border-primary/30 flex items-center justify-center bg-[#0e1210]">
                  <span className="material-symbols-outlined text-4xl text-primary animate-pulse">
                    search_off
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <h3 className="text-2xl font-bold text-white mb-2">No news found</h3>
              <p className="text-gray-400 max-w-md px-6 leading-relaxed">
                We couldn't find any articles matching <span className="text-primary">"{searchQuery}"</span>.
                Try checking your spelling or using different keywords.
              </p>

              {/* Action Button */}
              <button
                onClick={() => {
                  setSearchParams({});
                }}
                className="mt-8 px-8 py-3 rounded-full bg-primary text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-all duration-300 active:scale-95"
              >
                View All News
              </button>
            </motion.div>
          )}
          {filteredArticles.map((article) => (
            <Link key={article._id} to={`/news/${article.slug.current}`}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group cursor-pointer h-full border border-white/10 bg-white/[0.02] rounded-3xl p-4 transition-colors hover:border-primary/50"
              >
                {/* Image Container - Now inside the card with padding */}
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 mb-6">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Text Content - Padded relative to the card border */}
                <div className="px-2 pb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors leading-tight">
                    {article.title}
                  </h3>
                  {/* Optional: Add the date to fill the card nicely */}
                  <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-500">
                    {new Date(article.publishedAt).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default News;