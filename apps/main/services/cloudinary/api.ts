// eslint-disable-next-line import/named
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

import { handleCloudinaryError } from '@/lib/errors';

/**
 * Cloudinary API 서비스
 *
 * Cloudinary API와의 통신을 담당하는 함수들
 */

// Cloudinary 초기화
const initializeCloudinary = (): void => {
  const cloudinaryUrl = process.env.CLOUDINARY_URL ?? '';
  const [, apiKey, apiSecret, cloudName] =
    cloudinaryUrl.match(/^cloudinary:\/\/([a-z0-9-_]+):([a-z0-9-_]+)@([a-z0-9-_]+)$/i) ?? [];

  cloudinary.config({
    api_key: apiKey,
    api_secret: apiSecret,
    cloud_name: cloudName,
    secure: true,
  });
};

// 초기화 실행
initializeCloudinary();

/**
 * 이미지 URL을 Base64로 다운로드
 *
 * @param imgUrl 이미지 URL
 * @returns Base64 인코딩된 이미지 데이터
 */
export const downloadImgToBase64 = async (imgUrl: string): Promise<string> => {
  try {
    const res = await fetch(imgUrl);

    if (!res.ok) {
      throw new Error(`이미지 다운로드 실패: ${res.status} ${res.statusText}`);
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer.toString('base64');
  } catch (error) {
    throw handleCloudinaryError(error);
  }
};

/**
 * Base64 이미지를 Cloudinary에 업로드
 *
 * @param img Base64 인코딩된 이미지 데이터
 * @param options 업로드 옵션
 * @returns 업로드된 이미지 URL
 */
export const uploadImgToCloudinary = async ({
  img,
  options,
}: {
  img: string;
  options: UploadApiOptions;
}): Promise<string> => {
  try {
    const res = await cloudinary.uploader.upload(img, options);
    return res.secure_url;
  } catch (error) {
    throw handleCloudinaryError(error);
  }
};

/**
 * 이미지 URL을 Cloudinary URL로 변환
 *
 * @param imgUrl 원본 이미지 URL
 * @param title 이미지 제목 (Cloudinary에서 사용할 public_id)
 * @returns Cloudinary URL
 */
export const convertToCloudinaryImg = async ({
  imgUrl,
  title,
}: {
  imgUrl: string;
  title: string;
}): Promise<string> => {
  try {
    const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

    const imgBase64 = await downloadImgToBase64(imgUrl);
    const url = await uploadImgToCloudinary({
      img: `data:image/jpeg;base64,${imgBase64}`,
      options: {
        folder,
        overwrite: true,
        public_id: title,
      },
    });

    return url;
  } catch (error) {
    throw handleCloudinaryError(error);
  }
};
