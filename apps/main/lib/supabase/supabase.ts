import { createClient } from '@supabase/supabase-js';

// Supabase 클라이언트 생성
// 환경 변수가 undefined일 경우 빈 문자열로 대체 (타입 에러 방지)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Supabase 클라이언트 인스턴스 생성
export const supabase = createClient(supabaseUrl, supabaseKey);
