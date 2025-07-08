export const formatPostDate = (created: string) => {
  const date = new Date(created);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return formattedDate;
};
