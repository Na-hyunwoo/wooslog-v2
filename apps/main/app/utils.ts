import { CustomPageObjectResponse } from '@/types';

export interface PostData {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdTime: string;
}
export const transformPostData = (result: CustomPageObjectResponse): PostData => {
  return {
    id: result.id,
    title: result.properties.title.title[0]?.plain_text || '',
    description: result.properties.description.rich_text[0]?.plain_text || '',
    imageUrl: result.properties.thumbnail.files[0]?.external?.url || '',
    createdTime: result.created_time,
  };
};

export const transformPostsData = (results: CustomPageObjectResponse[]): PostData[] => {
  return results.map(transformPostData);
};
