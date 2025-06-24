import { Fragment } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Blockquote } from './BlockQuote';
import { CustomImage } from './CustomImage';
import { H1 } from './H1';
import { H2 } from './H2';
import { H3 } from './H3';
import { Li } from './Li';
import { P } from './P';
import { Pre } from './Pre';
import { RichTextConverter } from './RichTextConverter';

import type { ConvertedBlockInterface } from '@/types';

export const BlockConverter = (block: ConvertedBlockInterface) => {
  switch (block.type) {
    case 'paragraph':
      return (
        <P id={block.id}>
          {block.paragraph.rich_text.map((t) => (
            <Fragment key={t.plain_text}>{RichTextConverter(t)}</Fragment>
          ))}
        </P>
      );
    case 'heading_1':
      return <H1 id={block.id}>{block.heading_1.rich_text.map((t) => t.plain_text).join('')}</H1>;
    case 'heading_2':
      return <H2 id={block.id}>{block.heading_2.rich_text.map((t) => t.plain_text).join('')}</H2>;
    case 'heading_3':
      return <H3 id={block.id}>{block.heading_3.rich_text.map((t) => t.plain_text).join('')}</H3>;
    case 'bulleted_list_item_group':
      return (
        <ul className="ml-6 mb-3 list-disc flex flex-col gap-1.5">
          {block.bulleted_list_item_group.map((t) => (
            <Li id={t.id} key={t.id}>
              {t.bulleted_list_item.rich_text.map((t) => (
                <Fragment key={t.plain_text}>{RichTextConverter(t)}</Fragment>
              ))}
            </Li>
          ))}
        </ul>
      );
    case 'numbered_list_item_group':
      return (
        <ol className="ml-6 mb-3 list-decimal flex flex-col gap-1.5">
          {block.numbered_list_item_group.map((t) => (
            <Li id={t.id} key={t.id}>
              {t.numbered_list_item.rich_text.map((t) => (
                <Fragment key={t.plain_text}>{RichTextConverter(t)}</Fragment>
              ))}
            </Li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <Blockquote id={block.id}>
          {block.quote.rich_text.map((t) => (
            <Fragment key={t.plain_text}>{RichTextConverter(t)}</Fragment>
          ))}
        </Blockquote>
      );
    case 'code':
      return (
        <Pre id={block.id}>
          <SyntaxHighlighter
            language={block.code.language}
            showLineNumbers
            style={a11yLight}
            customStyle={{
              backgroundColor: 'white',
              border: '1px solid #efefef',
              borderRadius: '8px',
              fontSize: '13px',
              padding: '10px',
            }}
            lineNumberStyle={{
              color: '#545454',
            }}
          >
            {block.code.rich_text.map((t) => t.plain_text).join('')}
          </SyntaxHighlighter>
        </Pre>
      );
    case 'image':
      return (
        <CustomImage
          id={block.id}
          src={'external' in block.image ? block.image.external.url : block.image.file.url}
          alt={block.image.caption?.map((t) => t.plain_text).join('') ?? ''}
          caption={block.image.caption?.map((t) => t.plain_text).join('') ?? ''}
        />
      );
    default:
      return <p>Unsupported block type</p>;
  }
};
