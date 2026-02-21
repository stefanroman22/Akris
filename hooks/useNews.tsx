import { useSuspenseQuery } from '@tanstack/react-query';
import { client } from '@/sanityClient';

export interface NewsArticle {
  _id: string;
  title: string;
  slug: { current: string };
  imageUrl: string;
  content: any;
  publishedAt: string;
}

// Hook for the List
export const useAllNews = () => {
  return useSuspenseQuery<NewsArticle[]>({
    queryKey: ['news-list'],
    queryFn: () => client.fetch(`*[_type == "news"] | order(publishedAt desc) {
      _id, title, slug, "imageUrl": mainImage.asset->url, publishedAt
    }`),
  });
};

// Hook for a Single Article
export const useSingleNews = (slug: string) => {
  return useSuspenseQuery<NewsArticle>({
    queryKey: ['news-article', slug],
    queryFn: () => client.fetch(`*[_type == "news" && slug.current == $slug][0]{
      title, content, "imageUrl": mainImage.asset->url, publishedAt
    }`, { slug }),
  });
};