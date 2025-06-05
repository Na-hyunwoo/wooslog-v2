// eslint-disable-next-line import/named
import { v2 as cloudinary, UploadApiOptions } from 'cloudinary';

class Cloudinary {
  constructor() {
    const cloudinaryUrl = process.env.CLOUDINARY_URL ?? '';
    const urlRegx = /^cloudinary:\/\/([a-z0-9-_]+):([a-z0-9-_]+)@([a-z0-9-_]+)$/i;
    if (!urlRegx.test(cloudinaryUrl)) {
      throw new Error('Invalid cloudinary url');
    }

    const [, apiKey, apiSecret, cloudName] = urlRegx.exec(cloudinaryUrl) ?? [];

    cloudinary.config({
      api_key: apiKey,
      api_secret: apiSecret,
      cloud_name: cloudName,
      secure: true,
    });
  }

  private async downloadImgToBase64(imgUrl: string) {
    const res = await fetch(imgUrl);
    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return buffer.toString('base64');
  }

  private async uploadImgToCloudinary({
    img,
    options,
  }: {
    img: string;
    options: UploadApiOptions;
  }) {
    try {
      const res = await cloudinary.uploader.upload(img, options);

      return res.secure_url;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  async converToCloudinaryImg({ imgUrl, title }: { imgUrl: string; title: string }) {
    try {
      const folder = process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER;

      if (!folder) {
        throw new Error('Cloudinary folder name is not set');
      }

      const imgBase64 = await this.downloadImgToBase64(imgUrl);
      const url = await this.uploadImgToCloudinary({
        img: `data:image/jpeg;base64,${imgBase64}`,
        options: {
          folder,
          overwrite: true,
          public_id: title,
        },
      });

      return url;
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

export const cloudinaryApi = new Cloudinary();
