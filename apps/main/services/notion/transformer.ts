import { GetBlockResponse } from '@notionhq/client';

import { formatPostDate } from '@/lib/utils';
import { makeBlocksGroup } from '@/lib/utils/makeBlocksGroup';
import { ConvertedBlock, CustomPageObjectResponse, PostData } from '@/types/notion';
import { PostDetailData } from '@/types/post';

/**
 * Notion 데이터 변환 서비스
 *
 * Notion API에서 가져온 데이터를 애플리케이션에서 사용하기 적합한 형태로 변환하는 함수들
 */

/**
 * Notion 블록을 그룹화하여 변환
 *
 * @param blocks Notion API에서 가져온 블록 배열
 * @returns 변환된 블록 배열
 */
export const transformBlocks = (blocks: GetBlockResponse[]): ConvertedBlock[] => {
  return makeBlocksGroup(blocks);
};

/**
 * Notion 페이지 객체를 PostData 타입으로 변환
 *
 * @param page Notion 페이지 객체
 * @returns PostData 객체
 */
export const transformPageToPostData = (page: CustomPageObjectResponse): PostData => {
  return {
    id: page.id,
    title: page.properties.title.title[0]?.plain_text || '',
    description: page.properties.description.rich_text[0]?.plain_text || '',
    imageUrl: page.properties.thumbnail.files[0]?.external?.url || '',
    createdTime: page.created_time,
  };
};

/**
 * 여러 Notion 페이지 객체를 PostData 타입 배열로 변환
 *
 * @param pages Notion 페이지 객체 배열
 * @returns PostData 객체 배열
 */
export const transformPagesToPostsData = (pages: CustomPageObjectResponse[]): PostData[] => {
  return pages.map(transformPageToPostData);
};

/**
 * 포스트 상세 데이터 생성
 *
 * @param page 포스트 페이지 객체
 * @param blocks 포스트 블록 배열
 * @param prevPage 이전 포스트 페이지 객체 (없을 수 있음)
 * @param nextPage 다음 포스트 페이지 객체 (없을 수 있음)
 * @returns 포스트 상세 데이터
 */
export const createPostDetailData = (
  page: CustomPageObjectResponse,
  blocks: ConvertedBlock[],
  prevPage: CustomPageObjectResponse | null,
  nextPage: CustomPageObjectResponse | null
): PostDetailData => {
  const renderDate = formatPostDate(page.created_time);
  const description = page.properties.description.rich_text[0]?.plain_text || '';
  const imageUrl = page.properties.thumbnail.files[0]?.external?.url || '';
  const title = page.properties.title.title[0]?.plain_text || '';

  return {
    renderDate,
    blocksGroup: blocks,
    prevPost: prevPage
      ? {
          id: prevPage.id,
          title: prevPage.properties.title.title[0]?.plain_text || '',
        }
      : null,
    nextPost: nextPage
      ? {
          id: nextPage.id,
          title: nextPage.properties.title.title[0]?.plain_text || '',
        }
      : null,
    description,
    created_time: page.created_time,
    imageUrl,
    title,
  };
};
