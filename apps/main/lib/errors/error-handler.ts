import { NextResponse } from 'next/server';

import {
  AppError,
  CloudinaryError,
  ConfigurationError,
  DatabaseError,
  NotFoundError,
  NotionAPIError,
  ValidationError,
  getSafeErrorMessage,
  isAppError,
} from './custom-errors';

/**
 * 에러 처리 핸들러
 *
 * 애플리케이션에서 발생하는 모든 에러를 중앙 집중식으로 처리
 */

/**
 * API 라우트용 에러 핸들러
 */
export const handleAPIError = (error: unknown): NextResponse => {
  if (isAppError(error)) {
    return NextResponse.json(
      {
        error: {
          code: error.code,
          message: error.message,
          ...(process.env.NODE_ENV === 'development' && { context: error.context }),
        },
      },
      { status: error.statusCode }
    );
  }

  // 알 수 없는 에러
  return NextResponse.json(
    {
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: '서버 내부 에러가 발생했습니다.',
      },
    },
    { status: 500 }
  );
};

/**
 * 서버 컴포넌트용 에러 핸들러
 */
export const handleServerError = (error: unknown, fallbackData?: unknown): unknown => {
  // 운영 환경에서는 에러를 던지지 않고 fallback 데이터 반환
  if (process.env.NODE_ENV === 'production' && fallbackData !== undefined) {
    return fallbackData;
  }

  // 개발 환경에서는 에러를 다시 던져서 개발자가 확인할 수 있도록 함
  throw error;
};

/**
 * 클라이언트 사이드 에러 핸들러
 */
export const handleClientError = (error: unknown): void => {
  const message = getSafeErrorMessage(error);

  // 사용자에게 적절한 에러 메시지 표시
  // 실제 구현에서는 toast, modal 등을 사용할 수 있음
  console.error('에러가 발생했습니다:', message);
};

/**
 * 특정 에러 타입별 처리 함수들
 */
export const handleNotionError = (error: unknown): NotionAPIError => {
  if (error instanceof NotionAPIError) {
    return error;
  }

  // Notion API 특정 에러 패턴 감지
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes('unauthorized')) {
      return new NotionAPIError('인증에 실패했습니다. API 키를 확인해주세요.', {
        originalError: error.message,
      });
    }

    if (message.includes('not_found')) {
      return new NotionAPIError('요청한 리소스를 찾을 수 없습니다.', {
        originalError: error.message,
      });
    }

    if (message.includes('rate_limited')) {
      return new NotionAPIError('요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.', {
        originalError: error.message,
      });
    }
  }

  return new NotionAPIError(getSafeErrorMessage(error), {
    originalError: error,
  });
};

export const handleCloudinaryError = (error: unknown): CloudinaryError => {
  if (error instanceof CloudinaryError) {
    return error;
  }

  return new CloudinaryError(getSafeErrorMessage(error), {
    originalError: error,
  });
};

export const handleDatabaseError = (error: unknown): DatabaseError => {
  if (error instanceof DatabaseError) {
    return error;
  }

  return new DatabaseError(getSafeErrorMessage(error), {
    originalError: error,
  });
};

/**
 * 에러 컨텍스트 정보 수집
 */
export const getErrorContext = (): Record<string, unknown> => {
  return {
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : undefined,
    url: typeof window !== 'undefined' ? window.location?.href : undefined,
    nodeEnv: process.env.NODE_ENV,
  };
};

/**
 * 에러 정규화 함수
 */
export const normalizeError = (error: unknown): AppError => {
  if (isAppError(error)) {
    return error;
  }

  if (error instanceof Error) {
    // 특정 에러 패턴에 따라 적절한 커스텀 에러로 변환
    const message = error.message.toLowerCase();

    if (message.includes('validation') || message.includes('invalid')) {
      return new ValidationError(error.message);
    }

    if (message.includes('not found') || message.includes('404')) {
      return new NotFoundError('리소스');
    }

    if (message.includes('config') || message.includes('environment')) {
      return new ConfigurationError(error.message);
    }
  }

  // 기본 에러 타입
  return new (class extends AppError {
    readonly code = 'UNKNOWN_ERROR';
    readonly statusCode = 500;
    readonly isOperational = false;
  })(getSafeErrorMessage(error), { originalError: error });
};
