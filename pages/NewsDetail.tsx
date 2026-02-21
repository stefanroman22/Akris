import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PortableText } from '@portabletext/react';
import { useSingleNews } from '@/hooks/useNews';
import { akrisComponents } from '@/converters/portableTextStyles';

const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: article } = useSingleNews(slug!);

  return (
    <article className="bg-[#0e1210] min-h-screen py-32 px-6">
      <div className="max-w-[800px] mx-auto">
        <Link to="/news" className="text-primary text-sm font-bold uppercase tracking-widest mb-8 inline-block hover:text-white transition-colors">
          ← Back to News
        </Link>

        <h1 className="text-4xl md:text-5xl font-black text-white mb-8 leading-tight">
          {article.title}
        </h1>

        <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 border border-white/10">
          <img src={article.imageUrl} className="w-full h-full object-cover" alt="" />
        </div>

        <div className="prose prose-invert prose-primary max-w-none">
          <PortableText value={article.content} components={akrisComponents} />
        </div>
                <p className="mt-3 text-xs font-bold uppercase tracking-widest text-gray-500">
          {new Date(article.publishedAt).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </p>
      </div>
    </article>
  );
};

export default NewsDetail;