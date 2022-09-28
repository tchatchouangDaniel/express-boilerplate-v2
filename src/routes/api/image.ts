import express, { Request, Response } from 'express';
import NodeCache from 'node-cache';
import { resize } from '../../helpers/imageHelper';
import { PathHelper } from '../../helpers/pathHelper';
import { RequestObject } from '../../Types';

const image = express.Router();
const imageCache = new NodeCache({ stdTTL: 100, checkperiod: 120 });

image.get('/', async (_req: Request, res: Response) => {
  try {
    const { filename, width, height } = _req.query;
    if (filename === undefined || width === undefined || height === undefined) {
      throw new Error('query params cannot be undefined');
    }
    if (imageCache.has(filename as string)) {
      return res.status(200).sendFile(imageCache.get(filename as string) as string);
    } else {
      PathHelper.getFileInfos(filename as string);

      const requestObj: RequestObject = {
        width: Number(width),
        height: Number(height),
      };

      const resizedResult = await resize(requestObj);
      console.error('not cached');

      if (resizedResult) {
        imageCache.set(filename as string, PathHelper.fileInfos.outputFilePath);
        res.status(200).sendFile(PathHelper.fileInfos.outputFilePath);
      } else {
        res.status(401).send('unable to resize');
      }
    }
  } catch (error) {
    console.error(error);
  }
});

export = image;
