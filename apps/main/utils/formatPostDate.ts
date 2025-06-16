export const formatPostDate = (created: string, modified: string) => {
  const isModify = created !== modified;
  const date = new Date(isModify ? modified : created);
  const formattedDate = date.toLocaleDateString('ko-KR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const renderDate = isModify ? `${formattedDate} (수정됨)` : formattedDate;

  return renderDate;
};
