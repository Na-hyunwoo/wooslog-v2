import { PageObjectResponse } from '@notionhq/client';

import { DEPLOYMENT_STATUS } from '@/const';

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

export interface BaseImageBlock {
  type: 'image';
  image: {
    type: 'file';
    file: { url: string };
    caption?: { plain_text: string }[];
  };
}

export interface ExternalImageBlock {
  type: 'image';
  image: {
    type: 'external';
    external: { url: string };
    caption?: { plain_text: string }[];
  };
}

export interface CustomPageObjectResponse extends Omit<PageObjectResponse, 'properties'> {
  properties: {
    created_time: {
      created_time: string;
    };
    last_edited_time: {
      last_edited_time: string;
    };
    deployment_status: {
      rich_text: {
        plain_text: (typeof DEPLOYMENT_STATUS)[keyof typeof DEPLOYMENT_STATUS];
      }[];
    };
    thumbnail: {
      files: Array<{
        file?: { url: string };
        external?: { url: string };
        type: 'file' | 'external';
      }>;
    };
    title: {
      title: Array<{
        plain_text: string;
      }>;
    };
    description: {
      rich_text: Array<{
        plain_text: string;
      }>;
    };
    distributable: {
      checkbox: boolean;
    };
    prevPostId: {
      rich_text:
        | Array<{
            plain_text: string;
          }>
        | [];
    };
    nextPostId: {
      rich_text:
        | Array<{
            plain_text: string;
          }>
        | [];
    };
  };
}

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
    | BaseImageBlock
    | ExternalImageBlock
  );

export type ConvertedBlockInterface =
  | BlockInterface
  | BulletedListItemBlockGroup
  | NumberedListItemBlockGroup;

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

export type UpdatePageParams = {
  id: string;
  body: {
    thumbnail: {
      files: Array<{
        type: 'external';
        external: { url: string };
      }>;
    };
  };
};
