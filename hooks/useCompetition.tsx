import { useSuspenseQuery } from '@tanstack/react-query';

export interface CompetitionData {
  data: any;
  players: { name: string; team: string; rating: string; win_percentage: string }[];
  team: {
    name: string;
    poule: string;
    players: string[];
    standings: { team: string; rating: string; played: number; points: number }[];
  }[];
}

const API_URL = import.meta.env.VITE_API_URL;

export const useCompetition = () => {
  return useSuspenseQuery<CompetitionData>({
    queryKey: ['competition-data'],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/competition/api/`);
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    },
    staleTime: 1000 * 60 * 15, // Cache for 15 minutes
  });
};