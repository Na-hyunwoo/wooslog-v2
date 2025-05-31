/**
 * 브라우저에서만 실행되도록 하는 가드
 */
export const isBrowser = () => typeof window !== 'undefined';
