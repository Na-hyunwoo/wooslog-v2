import { CustomPageObjectResponse } from './api-types';

/**
 * 포스트 데이터 타입
 */
export type PostData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdTime: string;
};

/**
 * 포스트 네비게이션 타입
 */
export type PostNavigation = {
  prevPost: {
    id: string;
    title: string;
  } | null;
  nextPost: {
    id: string;
    title: string;
  } | null;
};

/**
 * 네비게이션 버튼 속성 타입
 */
export type NavigationButtonProps = {
  post: { id: string; title: string };
  direction: 'prev' | 'next';
};

/**
 * 포스트 데이터를 변환하는 함수 타입
 */
export type PostDataTransformer = (result: CustomPageObjectResponse) => PostData;

/**
 * 여러 포스트 데이터를 변환하는 함수 타입
 */
export type PostsDataTransformer = (results: CustomPageObjectResponse[]) => PostData[];
