import { getDatabasesResult } from '@/apis';

export const generatePostStaticParams = async () => {
  try {
    const results = await getDatabasesResult();

    return results.map((result) => ({
      id: result.id,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
};
