import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    // 요청 본문에서 시크릿 키 가져오기
    const { revalidateKey } = await request.json();

    // 시크릿 키 검증 (보안을 위해 필수)
    if (revalidateKey !== process.env.REVALIDATION_KEY) {
      return NextResponse.json({ message: '유효하지 않은 토큰' }, { status: 401 });
    }

    // 모든 페이지 캐시 무효화
    revalidatePath('/', 'layout');

    return NextResponse.json({
      revalidated: true,
      message: '홈페이지와 모든 포스트 페이지의 캐시가 성공적으로 무효화되었습니다',
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: '캐시 무효화 중 오류가 발생했습니다',
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
};
