import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: 'l9j6iqm8', 
  dataset: 'production',
  useCdn: true, 
  apiVersion: '2023-05-03', 
});