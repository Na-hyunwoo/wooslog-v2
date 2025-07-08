import { PageObjectResponse } from '@notionhq/client';

import { DEPLOYMENT_STATUS } from '@/const';

/**
 * Notion API에서 반환하는 RichText 타입
 */
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

/**
 * Notion API 블록의 기본 구조 인터페이스
 */
export type BlockStructure = {
  id: string;
  parent: {
    type: string;
    database_id: string;
  };
  created_time: string;
  last_edited_time: string;
  has_children: boolean;
};

/**
 * 파일 타입 (내부 또는 외부)
 */
export type FileObject = {
  file?: { url: string };
  external?: { url: string };
  type: 'file' | 'external';
};

/**
 * 커스텀 페이지 객체 응답 타입
 */
export type CustomPageObjectResponse = Omit<PageObjectResponse, 'properties'> & {
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
      files: Array<FileObject>;
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
};

/**
 * 블록 업데이트 파라미터
 */
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

/**
 * 페이지 업데이트 파라미터
 */
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
