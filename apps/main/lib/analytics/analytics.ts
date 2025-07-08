import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/lib/supabase';
import { isBrowser } from '@/lib/utils/isBrowser';

// 세션 ID 저장용 쿠키 이름
const SESSION_COOKIE_NAME = 'devna_session';

/**
 * 세션 ID 가져오기 또는 생성하기
 *
 * 브라우저의 sessionStorage에서 세션 ID를 가져오거나,
 * 없는 경우 새로 생성하고 저장합니다.
 */
export const getOrCreateSessionId = (): string => {
  if (!isBrowser()) {
    return '';
  }

  // sessionStorage에서 기존 세션 ID 확인
  let sessionId = sessionStorage.getItem(SESSION_COOKIE_NAME);

  // 세션 ID가 없으면 새로 생성
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem(SESSION_COOKIE_NAME, sessionId);

    // 새 세션 생성 시 Supabase에 세션 정보 저장
    recordNewSession(sessionId);
  }

  return sessionId;
};

/**
 * 새 세션 정보를 Supabase에 기록
 */
const recordNewSession = async (sessionId: string) => {
  try {
    const userAgent = navigator.userAgent;

    // Supabase에 세션 데이터 삽입
    const { error } = await supabase.from('sessions').insert({
      session_id: sessionId,
      user_agent: userAgent,
    });

    if (error) {
      console.error('세션 기록 중 오류 발생:', error);
    }
  } catch (err) {
    console.error('세션 기록 중 예외 발생:', err);
  }
};

/**
 * 페이지 조회 기록
 *
 * @param pageType 페이지 유형 ('home', 'post', 'about')
 * @param pageId 페이지 ID (post 타입일 경우에만 사용)
 */
export const trackPageView = async (pageType: 'home' | 'post' | 'about', pageId?: string) => {
  if (!isBrowser()) return;

  try {
    const sessionId = getOrCreateSessionId();

    if (!sessionId) {
      console.error('세션 ID를 가져올 수 없습니다.');
      return;
    }

    // Supabase에 페이지 조회 데이터 삽입
    const { error } = await supabase.from('page_views').insert({
      page_id: pageId || null,
      page_type: pageType,
      session_id: sessionId,
    });

    if (error) {
      console.error('페이지 조회 기록 중 오류 발생:', error);
    }
  } catch (err) {
    console.error('페이지 조회 기록 중 예외 발생:', err);
  }
};
