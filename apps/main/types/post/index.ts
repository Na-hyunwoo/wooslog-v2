import { ConvertedBlock } from '../notion/block-types';
import { PostNavigation } from '../notion/page-types';

/**
 * 포스트 상세 데이터 타입
 */
export type PostDetailData = {
  renderDate: string;
  blocksGroup: ConvertedBlock[];
  prevPost: {
    id: string;
    title: string;
  } | null;
  nextPost: {
    id: string;
    title: string;
  } | null;
  description: string;
  created_time: string;
  imageUrl: string;
  title: string;
};

/**
 * 포스트 네비게이션 속성 타입
 */
export type PostNavigationProps = PostNavigation;
