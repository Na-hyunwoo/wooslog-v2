import { Client } from '@notionhq/client';

// Notion API 키 확인
const notionApiKey = process.env.NOTION_API_KEY || '';

// 환경 변수 검증
if (!notionApiKey) {
  console.warn('Notion API Key가 정의되지 않았습니다. 환경 변수를 확인하세요.');
}

// Notion 클라이언트 인스턴스 생성
export const notion = new Client({ auth: notionApiKey });
