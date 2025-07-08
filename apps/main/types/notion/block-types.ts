import { BlockStructure, RichText } from './api-types';

/**
 * 단락 블록 타입
 */
export type ParagraphBlock = {
  type: 'paragraph';
  paragraph: { rich_text: RichText[] };
};

/**
 * 제목1 블록 타입
 */
export type Heading1Block = {
  type: 'heading_1';
  heading_1: { rich_text: RichText[] };
};

/**
 * 제목2 블록 타입
 */
export type Heading2Block = {
  type: 'heading_2';
  heading_2: { rich_text: RichText[] };
};

/**
 * 제목3 블록 타입
 */
export type Heading3Block = {
  type: 'heading_3';
  heading_3: { rich_text: RichText[] };
};

/**
 * 글머리 기호 목록 아이템 블록 타입
 */
export type BulletedListItemBlock = {
  type: 'bulleted_list_item';
  bulleted_list_item: { rich_text: RichText[] };
};

/**
 * 번호 매기기 목록 아이템 블록 타입
 */
export type NumberedListItemBlock = {
  type: 'numbered_list_item';
  numbered_list_item: { rich_text: RichText[] };
};

/**
 * 인용구 블록 타입
 */
export type QuoteBlock = {
  type: 'quote';
  quote: { rich_text: RichText[] };
};

/**
 * 코드 블록 타입
 */
export type CodeBlock = {
  type: 'code';
  code: { rich_text: RichText[]; language: string };
};

/**
 * 내부 이미지 블록 타입
 */
export type BaseImageBlock = {
  type: 'image';
  image: {
    type: 'file';
    file: { url: string };
    caption?: { plain_text: string }[];
  };
};

/**
 * 외부 이미지 블록 타입
 */
export type ExternalImageBlock = {
  type: 'image';
  image: {
    type: 'external';
    external: { url: string };
    caption?: { plain_text: string }[];
  };
};

/**
 * 글머리 기호 목록 아이템 그룹 블록 타입
 */
export type BulletedListItemBlockGroup = {
  id: string;
  type: 'bulleted_list_item_group';
  bulleted_list_item_group: Array<BulletedListItemBlock & BlockStructure>;
};

/**
 * 번호 매기기 목록 아이템 그룹 블록 타입
 */
export type NumberedListItemBlockGroup = {
  id: string;
  type: 'numbered_list_item_group';
  numbered_list_item_group: Array<NumberedListItemBlock & BlockStructure>;
};

/**
 * 기본 블록 타입 (Notion API에서 반환되는 블록)
 */
export type Block = BlockStructure &
  (
    | ParagraphBlock
    | Heading1Block
    | Heading2Block
    | Heading3Block
    | BulletedListItemBlock
    | NumberedListItemBlock
    | QuoteBlock
    | CodeBlock
    | BaseImageBlock
    | ExternalImageBlock
  );

/**
 * 변환된 블록 타입 (내부 처리용)
 */
export type ConvertedBlock = Block | BulletedListItemBlockGroup | NumberedListItemBlockGroup;
