export const formatToWon = (price: number) => price.toLocaleString('ko-KR');

export const formatToTimeAgo = (date: string) => {
  const dayInMs = 1000 * 60 * 60 * 24;

  const time = new Date(date).getTime();
  const now = new Date().getTime();

  const formatter = new Intl.RelativeTimeFormat('ko');

  const diff = Math.round((time - now) / dayInMs);

  if (diff === 0) return '오늘';

  return formatter.format(diff, 'days');
};
