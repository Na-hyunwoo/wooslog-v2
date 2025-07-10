import { GetBlockResponse, ListBlockChildrenResponse } from '@notionhq/client';
import { unstable_cache } from 'next/cache';

import { notion } from './client';

import { DATABASE_ID } from '@/const';
import { handleNotionError } from '@/lib/errors';
import { CustomPageObjectResponse, UpdateBlockParams, UpdatePageParams } from '@/types/notion';

/**
 * Notion API 서비스
 *
 * Notion API와의 직접적인 통신을 담당하는 함수들
 */

/**
 * 특정 블록의 하위 블록을 가져오는 함수
 *
 * @param id 블록 ID
 * @param nextCursor 다음 페이지 커서
 * @returns 블록 목록 응답
 */
export const getBlocks = async (
  id: string,
  nextCursor: string | null = null
): Promise<ListBlockChildrenResponse> => {
  return unstable_cache(
    async () => {
      try {
        const res: ListBlockChildrenResponse = await notion.blocks.children.list({
          block_id: id,
          ...(nextCursor && { start_cursor: nextCursor }),
        });

        return res;
      } catch (error) {
        throw handleNotionError(error);
      }
    },
    ['blocks', id, nextCursor ?? ''],
    { tags: ['blocks', id, nextCursor ?? ''], revalidate: 3600 }
  )();
};

/**
 * 특정 블록의 모든 하위 블록을 가져오는 함수 (페이지네이션 처리)
 *
 * @param id 블록 ID
 * @returns 모든 하위 블록 배열
 */
export const getAllBlocks = async (id: string): Promise<GetBlockResponse[]> => {
  const blocks: GetBlockResponse[] = [];
  let hasMore = true;
  let nextCursor: string | null = null;

  while (hasMore) {
    const { results, next_cursor, has_more } = await getBlocks(id, nextCursor);

    blocks.push(...results);
    nextCursor = next_cursor;
    hasMore = has_more;
  }

  return blocks;
};

/**
 * 블록을 업데이트하는 함수
 *
 * @param params 업데이트 파라미터
 * @returns 업데이트된 블록
 */
export const updateBlock = async ({ id, body }: UpdateBlockParams) => {
  try {
    const res = await notion.blocks.update({ block_id: id, ...body });
    return res;
  } catch (error) {
    throw handleNotionError(error);
  }
};

/**
 * 페이지를 업데이트하는 함수
 *
 * @param params 업데이트 파라미터
 * @returns 업데이트된 페이지
 */
export const updatePage = async ({ id, body }: UpdatePageParams) => {
  try {
    const res = await notion.pages.update({
      page_id: id,
      properties: {
        thumbnail: {
          type: 'files',
          files: [
            {
              type: 'external',
              name: 'thumbnail',
              external: { url: body.thumbnail.files[0].external.url },
            },
          ],
        },
      },
    });
    return res;
  } catch (error) {
    throw handleNotionError(error);
  }
};

/**
 * 특정 페이지를 가져오는 함수
 *
 * @param id 페이지 ID
 * @returns 페이지 객체
 */
export const getPage = async (id: string): Promise<CustomPageObjectResponse> => {
  return unstable_cache(
    async () => {
      try {
        const res = await notion.pages.retrieve({ page_id: id });
        return res as CustomPageObjectResponse;
      } catch (error) {
        throw handleNotionError(error);
      }
    },
    ['page', id],
    { tags: ['page', id], revalidate: 3600 }
  )();
};

/**
 * 데이터베이스 결과를 가져오는 함수
 *
 * @returns 데이터베이스 결과 (페이지 객체 배열)
 */
export const getDatabasesResult = async (): Promise<CustomPageObjectResponse[]> => {
  return unstable_cache(
    async () => {
      try {
        const res = await notion.databases.query({
          database_id: DATABASE_ID.POST,
          filter: {
            and: [
              {
                property: 'distributable',
                checkbox: {
                  equals: true,
                },
              },
            ],
          },
          sorts: [
            {
              property: 'created_time',
              direction: 'descending',
            },
          ],
        });
        return (res.results ?? []) as CustomPageObjectResponse[];
      } catch (error) {
        throw handleNotionError(error);
      }
    },
    ['database', DATABASE_ID.POST],
    { tags: ['database', DATABASE_ID.POST], revalidate: 3600 }
  )();
};
