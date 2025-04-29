import {
  BlockInterface,
  BulletedListItemBlockGroup,
  ConvertedBlockInterface,
  NumberedListItemBlockGroup,
} from '../types';

export const makeBlocksGroup = (blocks: BlockInterface[]) => {
  const results: ConvertedBlockInterface[] = [];

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const lastPushedBlock = results.at(-1);

    if (block.type === 'bulleted_list_item') {
      if (lastPushedBlock?.type === 'bulleted_list_item_group') {
        (results.at(-1) as BulletedListItemBlockGroup).bulleted_list_item_group.push(block);
        continue;
      } else {
        results.push({
          bulleted_list_item_group: [block],
          id: block.id,
          type: 'bulleted_list_item_group',
        });
        continue;
      }
    }

    if (block.type === 'numbered_list_item') {
      if (lastPushedBlock?.type === 'numbered_list_item_group') {
        (results.at(-1) as NumberedListItemBlockGroup).numbered_list_item_group.push(block);
        continue;
      } else {
        results.push({
          id: block.id,
          numbered_list_item_group: [block],
          type: 'numbered_list_item_group',
        });
        continue;
      }
    }

    results.push(block);
  }

  return results;
};
