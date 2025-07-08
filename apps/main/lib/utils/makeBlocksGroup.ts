import { GetBlockResponse } from '@notionhq/client';

import {
  BulletedListItemBlockGroup,
  ConvertedBlock,
  NumberedListItemBlockGroup,
  BlockStructure,
} from '@/types/notion';

/**
 * Notion API에서 가져온 블록들을 그룹화하는 함수
 *
 * 연속된 bulleted_list_item과 numbered_list_item을 그룹화하여 렌더링을 용이하게 함
 *
 * @param blocks Notion API에서 가져온 블록 배열
 * @returns 그룹화된 블록 배열
 */
export const makeBlocksGroup = (blocks: GetBlockResponse[]): ConvertedBlock[] => {
  const results: ConvertedBlock[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const lastPushedBlock = results.at(-1);

    if ('type' in block && block.type === 'bulleted_list_item') {
      if (lastPushedBlock?.type === 'bulleted_list_item_group') {
        (results.at(-1) as BulletedListItemBlockGroup).bulleted_list_item_group.push({
          ...block,
          type: 'bulleted_list_item',
          bulleted_list_item: block.bulleted_list_item,
        } as any);
        continue;
      } else {
        results.push({
          bulleted_list_item_group: [
            {
              ...block,
              type: 'bulleted_list_item',
              bulleted_list_item: block.bulleted_list_item,
            } as any,
          ],
          id: block.id,
          type: 'bulleted_list_item_group',
        });
        continue;
      }
    }

    if ('type' in block && block.type === 'numbered_list_item') {
      if (lastPushedBlock?.type === 'numbered_list_item_group') {
        (results.at(-1) as NumberedListItemBlockGroup).numbered_list_item_group.push({
          ...block,
          type: 'numbered_list_item',
          numbered_list_item: block.numbered_list_item,
        } as any);
        continue;
      } else {
        results.push({
          id: block.id,
          numbered_list_item_group: [
            {
              ...block,
              type: 'numbered_list_item',
              numbered_list_item: block.numbered_list_item,
            } as any,
          ],
          type: 'numbered_list_item_group',
        });
        continue;
      }
    }

    results.push(block as any);
  }

  return results;
};
