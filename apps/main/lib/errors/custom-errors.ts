/**
 * 커스텀 에러 클래스들
 *
 * 애플리케이션에서 발생하는 다양한 에러를 분류하고 처리하기 위한 커스텀 에러 클래스들
 */

/**
 * 기본 애플리케이션 에러 클래스
 */
export abstract class AppError extends Error {
  abstract readonly code: string;
  abstract readonly statusCode: number;
  abstract readonly isOperational: boolean;

  constructor(
    message: string,
    public readonly context?: Record<string, unknown>
  ) {
    super(message);
    this.name = this.constructor.name;

    // V8 엔진에서 스택 트레이스 캡처
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      statusCode: this.statusCode,
      context: this.context,
      stack: this.stack,
    };
  }
}

/**
 * Notion API 관련 에러
 */
export class NotionAPIError extends AppError {
  readonly code = 'NOTION_API_ERROR';
  readonly statusCode = 503;
  readonly isOperational = true;

  constructor(message: string, context?: Record<string, unknown>) {
    super(`Notion API 에러: ${message}`, context);
  }
}

/**
 * Cloudinary API 관련 에러
 */
export class CloudinaryError extends AppError {
  readonly code = 'CLOUDINARY_ERROR';
  readonly statusCode = 503;
  readonly isOperational = true;

  constructor(message: string, context?: Record<string, unknown>) {
    super(`Cloudinary 에러: ${message}`, context);
  }
}

/**
 * 데이터베이스 관련 에러
 */
export class DatabaseError extends AppError {
  readonly code = 'DATABASE_ERROR';
  readonly statusCode = 503;
  readonly isOperational = true;

  constructor(message: string, context?: Record<string, unknown>) {
    super(`데이터베이스 에러: ${message}`, context);
  }
}

/**
 * 데이터 검증 에러
 */
export class ValidationError extends AppError {
  readonly code = 'VALIDATION_ERROR';
  readonly statusCode = 400;
  readonly isOperational = true;

  constructor(message: string, context?: Record<string, unknown>) {
    super(`검증 에러: ${message}`, context);
  }
}

/**
 * 리소스를 찾을 수 없는 에러
 */
export class NotFoundError extends AppError {
  readonly code = 'NOT_FOUND_ERROR';
  readonly statusCode = 404;
  readonly isOperational = true;

  constructor(resource: string, identifier?: string) {
    const message = identifier
      ? `${resource}(${identifier})를 찾을 수 없습니다.`
      : `${resource}를 찾을 수 없습니다.`;

    super(message, { resource, identifier });
  }
}

/**
 * 환경 설정 에러
 */
export class ConfigurationError extends AppError {
  readonly code = 'CONFIGURATION_ERROR';
  readonly statusCode = 500;
  readonly isOperational = false;

  constructor(message: string, context?: Record<string, unknown>) {
    super(`설정 에러: ${message}`, context);
  }
}

/**
 * 외부 서비스 연결 에러
 */
export class ExternalServiceError extends AppError {
  readonly code = 'EXTERNAL_SERVICE_ERROR';
  readonly statusCode = 503;
  readonly isOperational = true;

  constructor(service: string, message: string, context?: Record<string, unknown>) {
    super(`${service} 서비스 에러: ${message}`, { service, ...context });
  }
}

/**
 * 에러에서 안전한 메시지 추출
 */
export const getSafeErrorMessage = (error: unknown): string => {
  if (error instanceof AppError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'string') {
    return error;
  }

  return '알 수 없는 에러가 발생했습니다.';
};

/**
 * 에러 타입 가드들
 */
export const isAppError = (error: unknown): error is AppError => {
  return error instanceof AppError;
};

export const isNotionAPIError = (error: unknown): error is NotionAPIError => {
  return error instanceof NotionAPIError;
};

export const isCloudinaryError = (error: unknown): error is CloudinaryError => {
  return error instanceof CloudinaryError;
};

export const isDatabaseError = (error: unknown): error is DatabaseError => {
  return error instanceof DatabaseError;
};

export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};

export const isNotFoundError = (error: unknown): error is NotFoundError => {
  return error instanceof NotFoundError;
};

export const isConfigurationError = (error: unknown): error is ConfigurationError => {
  return error instanceof ConfigurationError;
};
