import { GetBlockResponse } from '@notionhq/client';

import {
  BulletedListItemBlockGroup,
  ConvertedBlockInterface,
  NumberedListItemBlockGroup,
} from '@/types';

export const makeBlocksGroup = (blocks: GetBlockResponse[]) => {
  const results: ConvertedBlockInterface[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const lastPushedBlock = results.at(-1);

    if ('type' in block && block.type === 'bulleted_list_item') {
      if (lastPushedBlock?.type === 'bulleted_list_item_group') {
        (results.at(-1) as BulletedListItemBlockGroup).bulleted_list_item_group.push(block as any);
        continue;
      } else {
        results.push({
          bulleted_list_item_group: [block as any],
          id: block.id,
          type: 'bulleted_list_item_group',
        });
        continue;
      }
    }

    if ('type' in block && block.type === 'numbered_list_item') {
      if (lastPushedBlock?.type === 'numbered_list_item_group') {
        (results.at(-1) as NumberedListItemBlockGroup).numbered_list_item_group.push(block as any);
        continue;
      } else {
        results.push({
          id: block.id,
          numbered_list_item_group: [block as any],
          type: 'numbered_list_item_group',
        });
        continue;
      }
    }

    results.push(block as any);
  }

  return results;
};
