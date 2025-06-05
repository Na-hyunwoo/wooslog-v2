import { DATABASE_ID, URL } from '../../../../const';
import { cloudinaryApi } from '../../../../lib/cloudinary';
import { getNotionHeaders } from '../../../../lib/notion';
import {
  BlockInterface,
  BlockStructureInterface,
  DatabaseResultType,
  ImageBlock,
  PageInterface,
  UpdateBlockParams,
} from '../../../../types/blocks';

export const getBlocks = async (
  id: string,
  nextCursor: string | null = null
): Promise<{
  results: BlockInterface[];
  next_cursor: string | null;
  has_more: boolean;
}> => {
  try {
    const res = await fetch(URL.BLOCKS_CHILDREN(id, nextCursor), {
      headers: getNotionHeaders(),
      method: 'GET',
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(`Failed to fetch blocks. ${error.status}: ${error.message}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      has_more: false,
      next_cursor: null,
      results: [],
    };
  }
};

export const getAllBlocks = async (id: string): Promise<BlockInterface[]> => {
  const blocks: BlockInterface[] = [];
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

export const getPage = async (id: string): Promise<PageInterface> => {
  try {
    const res = await fetch(URL.PAGE(id), {
      headers: getNotionHeaders(),
      method: 'GET',
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(`Failed to fetch page. ${error.status}: ${error.message}`);
    }

    return res.json();
  } catch (error) {
    console.error(error);
    return {
      created_time: '',
      last_edited_time: '',
      properties: {
        설명: { rich_text: [] },
        이름: { title: [] },
        이미지: { files: [] },
      },
    };
  }
};

export const updateBlock = async ({ id, body }: UpdateBlockParams) => {
  try {
    const res = await fetch(URL.BLOCKS(id), {
      body: JSON.stringify(body),
      headers: getNotionHeaders(),
      method: 'PATCH',
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(`Failed to patch blocks. ${error.status}: ${error.message}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const updatePage = async ({
  id,
  body,
}: {
  id: string;
  body: {
    properties: {
      이미지: { files: [{ external: { url: string } }] };
    };
  };
}) => {
  try {
    const res = await fetch(URL.PAGE(id), {
      body: JSON.stringify(body),
      headers: getNotionHeaders(),
      method: 'PATCH',
    });

    if (!res.ok) {
      const error = await res.json();

      throw new Error(`Failed to patch page. ${error.status}: ${error.message}`);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const addExternalUrlToAllImageBlocks = async (id: string) => {
  const blocks = await getAllBlocks(id);
  const imgBlocks = blocks.filter(
    (block): block is BlockStructureInterface & ImageBlock =>
      block.type === 'image' && block.image.type === 'file'
  );

  if (imgBlocks.length === 0) {
    return;
  }

  const updatePromises = imgBlocks.map(async (block, index) => {
    const url = block.image.file?.url;
    if (!url) {
      return null;
    }

    try {
      const convertedUrl = await cloudinaryApi.converToCloudinaryImg({
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

export const addExternalUrlToAllPageProperties = async (id: string) => {
  const res = await fetch(URL.DATABASES(DATABASE_ID.POST), {
    headers: getNotionHeaders(),
    method: 'POST',
  });

  const { results = [] }: { results?: DatabaseResultType[] } = await res.json();
  const filteredResults = results.filter((result) => result.properties.이미지.files[0]?.file?.url);

  if (filteredResults.length === 0) {
    return;
  }

  const updatePromises = filteredResults.map(async (result, index) => {
    const imgUrl = result.properties.이미지.files[0].file?.url;
    if (!imgUrl) {
      return null;
    }

    const convertedUrl = await cloudinaryApi.converToCloudinaryImg({
      imgUrl,
      title: `homde_${id}_${index}`,
    });

    if (!convertedUrl) {
      return null;
    }

    return updatePage({
      body: {
        properties: {
          이미지: { files: [{ external: { url: convertedUrl } }] },
        },
      },
      id: result.id,
    });
  });

  await Promise.all(updatePromises);
};
