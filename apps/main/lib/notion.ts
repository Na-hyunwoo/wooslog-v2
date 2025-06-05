export const getNotionHeaders = () => ({
  Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
});
