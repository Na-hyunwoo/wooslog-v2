import * as notionApi from './api';
import * as transformer from './transformer';

import { handleServerError } from '@/lib/errors';
import { convertToCloudinaryImg } from '@/services/cloudinary/api';
import { PostData } from '@/types/notion';
import { PostDetailData } from '@/types/post';

/**
 * 포스트 서비스
 *
 * 포스트 관련 비즈니스 로직을 처리하는 함수들
 */

/**
 * 모든 포스트 데이터 가져오기
 *
 * @returns 포스트 데이터 배열
 */
export const getAllPosts = async (): Promise<PostData[]> => {
  try {
    const pages = await notionApi.getDatabasesResult();
    return transformer.transformPagesToPostsData(pages);
  } catch (error) {
    return handleServerError(error, []) as PostData[];
  }
};

/**
 * 특정 포스트의 모든 이미지 URL을 Cloudinary URL로 변환
 *
 * @param postId 포스트 ID
 */
export const convertAllImagesToCloudinary = async (postId: string): Promise<void> => {
  await convertPagePropertiesToCloudinary(postId);
  await convertImageBlocksToCloudinary(postId);
};

/**
 * 페이지 속성의 이미지 URL을 Cloudinary URL로 변환
 *
 * @param postId 포스트 ID
 */
const convertPagePropertiesToCloudinary = async (postId: string): Promise<void> => {
  const page = await notionApi.getPage(postId);
  const thumbnail = page.properties.thumbnail.files;

  if (thumbnail[0]?.type !== 'file' || !thumbnail[0]?.file?.url) {
    return;
  }

  const convertedUrl = await convertToCloudinaryImg({
    imgUrl: thumbnail[0].file.url,
    title: `thumbnail_${postId}`,
  });

  await notionApi.updatePage({
    body: {
      thumbnail: {
        files: [{ type: 'external', external: { url: convertedUrl } }],
      },
    },
    id: postId,
  });
};

/**
 * 이미지 블록의 URL을 Cloudinary URL로 변환
 *
 * @param postId 포스트 ID
 */
const convertImageBlocksToCloudinary = async (postId: string): Promise<void> => {
  const blocks = await notionApi.getAllBlocks(postId);
  const imgBlocks = blocks.filter((block) => 'type' in block && block.type === 'image');

  if (imgBlocks.length === 0) {
    return;
  }

  const updatePromises = imgBlocks.map(async (block, index) => {
    const url = 'file' in block.image && block.image.file?.url;
    if (!url) {
      return null;
    }

    const convertedUrl = await convertToCloudinaryImg({
      imgUrl: url,
      title: `post_${postId}_${index}`,
    });

    const result = await notionApi.updateBlock({
      body: {
        image: {
          external: {
            url: convertedUrl,
          },
        },
      },
      id: block.id,
    });

    return result;
  });

  await Promise.all(updatePromises);
};

/**
 * 포스트 상세 데이터 가져오기
 *
 * @param postId 포스트 ID
 * @returns 포스트 상세 데이터
 */
export const getPostDetail = async (postId: string): Promise<PostDetailData> => {
  // 이미지 URL을 Cloudinary URL로 변환
  await convertAllImagesToCloudinary(postId);

  // 포스트 데이터 가져오기
  const blocks = await notionApi.getAllBlocks(postId);
  const blocksGroup = transformer.transformBlocks(blocks);
  const page = await notionApi.getPage(postId);

  // 이전/다음 포스트 데이터 가져오기
  const prevPostId = page.properties.prevPostId.rich_text[0]?.plain_text;
  const nextPostId = page.properties.nextPostId.rich_text[0]?.plain_text;

  const prevPage = prevPostId ? await notionApi.getPage(prevPostId) : null;
  const nextPage = nextPostId ? await notionApi.getPage(nextPostId) : null;

  // 포스트 상세 데이터 생성
  const result = transformer.createPostDetailData(page, blocksGroup, prevPage, nextPage);

  return result;
};
