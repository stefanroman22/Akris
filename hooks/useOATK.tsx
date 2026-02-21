
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { client } from '@/sanityClient';

export interface OATKData {
  title: string;
  content: any; // Portable Text arrives as an array of blocks
}

export const useOATK = () => {
  return useSuspenseQuery<OATKData>({
    queryKey: ['oatk-content'],
    queryFn: async () => {
      return await client.fetch(`*[_type == "oatk"][0]{
        title,
        content
      }`);
    },
    staleTime: 1000 * 60 * 60, // Cache for 1 hour (OATK info rarely changes)
  });
};