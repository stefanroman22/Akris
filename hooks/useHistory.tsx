import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { client } from '@/sanityClient';

export interface HistoryRow {
  season: string;
  name: string;
}

export interface HistoryTable {
  heading: string;
  rows: HistoryRow[];
}

export interface HistoryPageData {
  title: string;
  tables: HistoryTable[];
}

export const useHistory = () => {
  return useSuspenseQuery<HistoryPageData>({
    queryKey: ['history-page'],
    queryFn: async () => {
      return await client.fetch(`*[_type == "historyPage"][0]{
        title,
        tables[]{
          heading,
          rows[]{ season, name }
        }
      }`);
    },
    staleTime: Infinity, // History data almost never changes
  });
};