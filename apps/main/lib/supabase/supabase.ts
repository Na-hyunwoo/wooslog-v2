import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
// 환경 변수가 undefined일 경우 빈 문자열로 대체 (타입 에러 방지)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// 타입스크립트에서 환경 변수가 정의되지 않았을 때 기본값 처리
if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL 또는 Anon Key가 정의되지 않았습니다. 환경 변수를 확인하세요.');
}

// Supabase 클라이언트 인스턴스 생성
export const supabase = createClient(supabaseUrl, supabaseKey);
