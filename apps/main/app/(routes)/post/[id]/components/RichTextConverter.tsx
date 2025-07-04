import { ReactNode } from 'react';

import { RichText } from '@/types';

export const RichTextConverter = (richText: RichText) => {
  const text = richText.plain_text;
  const { bold, italic, underline, strikethrough, color, code } = richText.annotations;
  const href = richText.href;

  let content: ReactNode = text;

  if (bold) {
    content = <strong>{content}</strong>;
  }
  if (italic) {
    content = <em>{content}</em>;
  }
  if (strikethrough) {
    content = <del>{content}</del>;
  }
  if (underline) {
    content = <u>{content}</u>;
  }
  if (code) {
    content = <span className="bg-blue-600/50 px-1 font-medium">{content}</span>;
  }
  if (color) {
    content = <span style={{ color }}>{content}</span>;
  }
  if (href) {
    content = (
      <a
        className="underline hover:text-blue-500"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return content;
};
