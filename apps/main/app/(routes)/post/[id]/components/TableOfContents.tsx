import { ConvertedBlockInterface } from '@/types';

export const TableOfContents = ({ blocks }: { blocks: ConvertedBlockInterface[] }) => {
  const h2Blocks = blocks.filter((block) => block.type === 'heading_2');

  return (
    <ul className="flex flex-col gap-1.5 mb-6 text-md">
      {h2Blocks.map((block) => (
        <li key={block.id}>
          <a href={`#${block.id}`} className="underline text-gray-500 hover:text-slate-300">
            {block.heading_2.rich_text.map((t) => t.plain_text).join('')}
          </a>
        </li>
      ))}
    </ul>
  );
};
