import {
  addExternalUrlToAllImageBlocks,
  addExternalUrlToAllPageProperties,
  getAllBlocks,
  getPage,
} from '@/apis';
import { formatPostDate, makeBlocksGroup } from '@/lib/utils';
import { PostDetailData } from '@/types/post';

/**
 * 포스트 상세 데이터를 가져오는 함수
 *
 * @param pageId 포스트 ID
 * @returns 포스트 상세 데이터
 */
export const getPostDetailData = async (pageId: string): Promise<PostDetailData> => {
  await addExternalUrlToAllPageProperties(pageId);
  await addExternalUrlToAllImageBlocks(pageId);

  const blocks = await getAllBlocks(pageId);
  const blocksGroup = makeBlocksGroup(blocks);
  const { created_time, properties } = await getPage(pageId);
  const prevPostId = properties.prevPostId.rich_text[0]?.plain_text;
  const nextPostId = properties.nextPostId.rich_text[0]?.plain_text;
  const description = properties.description.rich_text[0]?.plain_text || '';
  const imageUrl = properties.thumbnail.files[0]?.external?.url || '';
  const title = properties.title.title[0]?.plain_text || '';
  const { properties: prevPostProperties } = prevPostId
    ? await getPage(prevPostId)
    : { properties: null };
  const { properties: nextPostProperties } = nextPostId
    ? await getPage(nextPostId)
    : { properties: null };

  const renderDate = formatPostDate(created_time);

  return {
    renderDate,
    blocksGroup,
    prevPost: prevPostProperties
      ? {
          id: prevPostId,
          title: prevPostProperties.title.title[0]?.plain_text || '',
        }
      : null,
    nextPost: nextPostProperties
      ? {
          id: nextPostId,
          title: nextPostProperties.title.title[0]?.plain_text || '',
        }
      : null,
    description,
    created_time,
    imageUrl,
    title,
  };
};
