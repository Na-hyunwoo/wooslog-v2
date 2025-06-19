import { GetBlockResponse, ListBlockChildrenResponse } from '@notionhq/client';

import { DATABASE_ID } from '@/const';
import { cloudinaryApi } from '@/lib/cloudinary';
import { notion } from '@/lib/notion';
import type { CustomPageObjectResponse, UpdateBlockParams, UpdatePageParams } from '@/types/blocks';

const getBlocks = async (id: string, nextCursor: string | null = null) => {
  try {
    const res: ListBlockChildrenResponse = await notion.blocks.children.list({
      block_id: id,
      ...(nextCursor && { start_cursor: nextCursor }),
    });

    return res;
  } catch (error) {
    console.error(error);
    return {
      has_more: false,
      next_cursor: '',
      results: [],
    };
  }
};

export const getAllBlocks = async (id: string) => {
  const blocks: GetBlockResponse[] = [];
  let hasMore = true;
  let nextCursor: string | null = null;

  while (hasMore) {
    const { results, next_cursor, has_more } = await getBlocks(id, nextCursor);

    blocks.push(...results);
    nextCursor = next_cursor ?? '';
    hasMore = has_more;
  }

  return blocks;
};

const updateBlock = async ({ id, body }: UpdateBlockParams) => {
  try {
    const res = await notion.blocks.update({ block_id: id, ...body });

    return res;
  } catch (error) {
    console.error(error);
  }
};

export const addExternalUrlToAllImageBlocks = async (id: string) => {
  const blocks = await getAllBlocks(id);
  const imgBlocks = blocks.filter((block) => 'type' in block && block.type === 'image');

  if (imgBlocks.length === 0) {
    return;
  }

  const updatePromises = imgBlocks.map(async (block, index) => {
    const url = 'file' in block.image && block.image.file?.url;
    if (!url) {
      return null;
    }

    try {
      const convertedUrl = await cloudinaryApi.convertToCloudinaryImg({
        imgUrl: url,
        title: `post_${id}_${index}`,
      });

      if (!convertedUrl) {
        return null;
      }

      return updateBlock({
        body: {
          image: {
            external: {
              url: convertedUrl,
            },
          },
        },
        id: block.id,
      });
    } catch (error) {
      console.error(`블록 ${block.id} 처리 실패:`, error);
      return null;
    }
  });

  await Promise.all(updatePromises);
};

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
    console.error(error);
  }
};

export const addExternalUrlToAllPageProperties = async (id: string) => {
  const page = await getPage(id);
  const thumbnail = page.properties.thumbnail.files;

  if (thumbnail[0].type !== 'file' || !thumbnail[0].file?.url) {
    return;
  }

  try {
    const convertedUrl = await cloudinaryApi.convertToCloudinaryImg({
      imgUrl: thumbnail[0].file.url,
      title: `thumbnail_${id}`,
    });

    if (!convertedUrl) {
      return null;
    }

    return updatePage({
      body: {
        thumbnail: {
          files: [{ type: 'external', external: { url: convertedUrl } }],
        },
      },
      id,
    });
  } catch (error) {
    console.error(`블록 ${id} 처리 실패:`, error);
    return null;
  }
};

export const getPage = async (id: string) => {
  try {
    const res = await notion.pages.retrieve({ page_id: id });
    return res as CustomPageObjectResponse;
  } catch (error) {
    console.error(error);
    return {
      created_time: '',
      last_edited_time: '',
      properties: {
        description: { rich_text: [] },
        title: { title: [] },
        thumbnail: { files: [] },
        prevPostId: { rich_text: [] },
        nextPostId: { rich_text: [] },
      },
    };
  }
};

export const getDatabasesResult = async () => {
  try {
    const res = await notion.databases.query({
      database_id: DATABASE_ID.POST_V2,
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
    console.error('Failed to fetch database results:', error);
    return [] as CustomPageObjectResponse[];
  }
};
