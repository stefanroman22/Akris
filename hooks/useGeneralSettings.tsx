import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { client } from '@/sanityClient';

export interface GeneralSettings {
  yearFounded: number;
  memberCount: number;
  membershipCost: number;
  currentAcademicYear: string;
  coachName: string;
  trainingDays: string[];
}

export const useGeneralSettings = () => {
  return useSuspenseQuery<GeneralSettings>({
    queryKey: ['general-settings'],
    queryFn: async () => {
      return await client.fetch(`*[_type == "general"][0]{
        yearFounded,
        memberCount,
        membershipCost,
        currentAcademicYear,
        coachName,
        trainingDays
      }`);
    },
    staleTime: Infinity, // General settings rarely change, keep them in cache forever
  });
};