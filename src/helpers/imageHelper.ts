import sharp from 'sharp';
import { RequestObject } from '../Types';
import { PathHelper } from './pathHelper';

export const resize = async (obj: RequestObject) => {
  try {
    const imagePath = PathHelper.fileInfos.filePath;
    const { width, height } = obj;
    const output = PathHelper.fileInfos.outputFilePath;
    await sharp(imagePath)
      .resize(width, height, {
        kernel: sharp.kernel.nearest,
        fit: 'cover',
        position: 'centre',
        background: { r: 255, g: 255, b: 255, alpha: 0.5 },
      })
      .trim()
      .toFile(output);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
