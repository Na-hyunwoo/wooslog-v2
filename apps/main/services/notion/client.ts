import { Client } from '@notionhq/client';

// Notion API 키 확인
const notionApiKey = process.env.NOTION_API_KEY || '';

// Notion 클라이언트 인스턴스 생성
export const notion = new Client({ auth: notionApiKey });
