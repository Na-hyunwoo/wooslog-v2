type File = {
  external?: {
    url: string;
  };
  file?: {
    url: string;
  };
};

type Title = {
  plain_text: string;
};

export type RichText = {
  plain_text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    strikethrough: boolean;
    code: boolean;
    color: string;
  };
  href?: string;
};

export interface ParagraphBlock {
  type: 'paragraph';
  paragraph: { rich_text: RichText[] };
}

export interface Heading1Block {
  type: 'heading_1';
  heading_1: { rich_text: RichText[] };
}

export interface Heading2Block {
  type: 'heading_2';
  heading_2: { rich_text: RichText[] };
}

export interface Heading3Block {
  type: 'heading_3';
  heading_3: { rich_text: RichText[] };
}

export interface BulletedListItemBlock {
  type: 'bulleted_list_item';
  bulleted_list_item: { rich_text: RichText[] };
}

export interface NumberedListItemBlock {
  type: 'numbered_list_item';
  numbered_list_item: { rich_text: RichText[] };
}

export interface BulletedListItemBlockGroup {
  id: string;
  type: 'bulleted_list_item_group';
  bulleted_list_item_group: (BulletedListItemBlock & BlockStructureInterface)[];
}

export interface NumberedListItemBlockGroup {
  id: string;
  type: 'numbered_list_item_group';
  numbered_list_item_group: (NumberedListItemBlock & BlockStructureInterface)[];
}

export interface QuoteBlock {
  type: 'quote';
  quote: { rich_text: RichText[] };
}

export interface CodeBlock {
  type: 'code';
  code: { rich_text: RichText[]; language: string };
}

export interface ImageBlock {
  type: 'image';
  image: {
    type: 'file' | 'external';
    file?: { url: string };
    external?: { url: string };
    caption?: { plain_text: string }[];
  };
}

export type DatabaseResultType = {
  id: string;
  created_time: string;
  last_edited_time: string;
  properties: {
    이미지: { files: File[] };
    이름: { title: Title[] };
    설명: {
      rich_text: RichText[];
    };
  };
};

export type BlockType =
  | 'bulleted_list_item'
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'image'
  | 'numbered_list_item'
  | 'code'
  | 'quote';

export interface BlockStructureInterface {
  id: string;
  parent: {
    type: string;
    database_id: string;
  };
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
}

export type BlockInterface = BlockStructureInterface &
  (
    | ParagraphBlock
    | Heading1Block
    | Heading2Block
    | Heading3Block
    | BulletedListItemBlock
    | NumberedListItemBlock
    | QuoteBlock
    | CodeBlock
    | ImageBlock
  );

export type ConvertedBlockInterface =
  | BlockInterface
  | BulletedListItemBlockGroup
  | NumberedListItemBlockGroup;

export type PageInterface = {
  created_time: string;
  last_edited_time: string;
  properties: {
    이름: { title: Title[] };
    이미지: { files: File[] };
    설명: { rich_text: RichText[] };
  };
};

export type UpdateBlockParams = {
  id: string;
  body: {
    image?: {
      external: {
        url: string;
      };
    };
  };
};
