import { ConfigurationError } from '../errors/custom-errors';

/**
 * 환경 변수 검증 유틸리티
 *
 * 애플리케이션에서 사용하는 모든 환경 변수를 검증하고 누락된 경우 에러를 던집니다.
 */

type EnvVar = {
  key: string;
  required: boolean;
};

/**
 * 환경 변수 목록 정의
 */
const ENV_VARS: EnvVar[] = [
  { key: 'NOTION_API_KEY', required: true },
  { key: 'CLOUDINARY_URL', required: true },
  { key: 'NEXT_PUBLIC_CLOUDINARY_FOLDER', required: true },
  { key: 'NEXT_PUBLIC_SUPABASE_URL', required: true },
  { key: 'NEXT_PUBLIC_SUPABASE_ANON_KEY', required: true },
  { key: 'REVALIDATION_KEY', required: true },
];

/**
 * 모든 환경 변수를 검증하는 함수
 * 필수 환경 변수가 누락된 경우 에러를 던집니다.
 */
export const validateEnv = (): void => {
  const missingVars: string[] = [];

  ENV_VARS.forEach((envVar) => {
    const value = process.env[envVar.key];

    if (envVar.required && !value) {
      missingVars.push(envVar.key);
    }
  });

  if (missingVars.length > 0) {
    throw new ConfigurationError(`필수 환경 변수가 누락되었습니다: ${missingVars.join(', ')}`);
  }

  // Cloudinary URL 형식 검증
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (cloudinaryUrl) {
    const urlRegx = /^cloudinary:\/\/([a-z0-9-_]+):([a-z0-9-_]+)@([a-z0-9-_]+)$/i;
    if (!urlRegx.test(cloudinaryUrl)) {
      throw new ConfigurationError(
        'CLOUDINARY_URL 형식이 올바르지 않습니다. 예상 형식: cloudinary://{API_KEY}:{API_SECRET}@{CLOUD_NAME}'
      );
    }
  }
};
