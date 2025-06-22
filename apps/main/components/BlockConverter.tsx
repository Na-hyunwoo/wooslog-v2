import Image from 'next/image';
import { Fragment } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { twMerge } from 'tailwind-merge';

import { RichTextConverter } from '@/components/RichTextConverter';
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
        <ul className="ml-6 list-disc">
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
        <ol className="ml-6 list-decimal">
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

export const H1 = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <h1 id={id} className={twMerge('mb-6 text-5xl font-bold', className)}>
      {children}
    </h1>
  );
};

export const H2 = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <h2 id={id} className={twMerge('my-6 text-3xl font-bold scroll-mt-20', className)}>
      {children}
    </h2>
  );
};

export const H3 = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <h3 id={id} className={twMerge('mb-6 text-2xl font-bold', className)}>
      {children}
    </h3>
  );
};

export const P = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <p id={id} className={twMerge('mb-3', className)}>
      {children}
    </p>
  );
};

export const Li = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <li id={id} className={twMerge('mb-3', className)}>
      {children}
    </li>
  );
};

export const Blockquote = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <blockquote id={id} className={twMerge('mb-6 rounded-2xl bg-[#f2f4f6] p-4', className)}>
      {children}
    </blockquote>
  );
};

export const Pre = ({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) => {
  return (
    <pre id={id} className={twMerge('mb-6', className)}>
      {children}
    </pre>
  );
};

export const CustomImage = ({
  src,
  alt,
  caption,
  className,
  id,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  id?: string;
}) => {
  return (
    <div id={id} className="mb-6">
      <div className="w-2xl relative aspect-[25/14] overflow-hidden rounded-2xl">
        <Image
          src={src}
          alt={alt}
          fill
          className={twMerge('object-cover', className)}
          sizes="672px"
        />
      </div>
      {caption && <p className="text-center text-sm text-gray-500">{caption}</p>}
    </div>
  );
};
