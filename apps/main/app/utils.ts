import { CustomPageObjectResponse, PostData } from '@/types/notion';

/**
 * Notion 페이지 객체를 PostData 타입으로 변환하는 함수
 *
 * @param result Notion 페이지 객체
 * @returns PostData 타입의 객체
 */
export const transformPostData = (result: CustomPageObjectResponse): PostData => {
  return {
    id: result.id,
    title: result.properties.title.title[0]?.plain_text || '',
    description: result.properties.description.rich_text[0]?.plain_text || '',
    imageUrl: result.properties.thumbnail.files[0]?.external?.url || '',
    createdTime: result.created_time,
  };
};

/**
 * 여러 Notion 페이지 객체를 PostData 타입 배열로 변환하는 함수
 *
 * @param results Notion 페이지 객체 배열
 * @returns PostData 타입의 객체 배열
 */
export const transformPostsData = (results: CustomPageObjectResponse[]): PostData[] => {
  return results.map(transformPostData);
};
