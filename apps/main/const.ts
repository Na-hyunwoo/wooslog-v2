/* eslint-disable sort-keys */
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
} as const;

export const URL = {
  BLOCKS: (id: string) => `https://api.notion.com/v1/blocks/${id}/children`,
  DATABASES: (id: string) => `https://api.notion.com/v1/databases/${id}/query`,
  PAGE: (id: string) => `https://api.notion.com/v1/pages/${id}`,
} as const;

export const DATABASE_ID = {
  ARCHIVE: '1caec025bcc180798009d8150ebfa3ec',
  POST: '1bcec025bcc18029b02ff6f3cd44195d',
} as const;

export const ON_THE_FIRST_SCREEN = 6;
