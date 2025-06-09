/* eslint-disable sort-keys */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
} as const;

export const URL = {
  BLOCKS_CHILDREN: (id: string, cursor: string | null = null) => {
    const url = `https://api.notion.com/v1/blocks/${id}/children`;

    return cursor ? `${url}?start_cursor=${cursor}` : url;
  },
  BLOCKS: (id: string) => `https://api.notion.com/v1/blocks/${id}`,
  DATABASES: (id: string) => `https://api.notion.com/v1/databases/${id}/query`,
  PAGE: (id: string) => `https://api.notion.com/v1/pages/${id}`,
} as const;

export const DATABASE_ID = {
  ARCHIVE: '1caec025bcc180798009d8150ebfa3ec',
  POST: '1bcec025bcc18029b02ff6f3cd44195d',
  POST_V2: '20dec025bcc1808d808dde52e9387fdf',
} as const;

export const ON_THE_FIRST_SCREEN = 6;

export const BASE_URL = 'https://devna.xyz';

export const DEPLOYMENT_STATUS = {
  PENDING: 'PENDING',
  INPROGRESS: 'INPROGRESS',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
} as const;
