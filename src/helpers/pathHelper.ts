import path from 'path';
import Fs from 'fs';
import { FileInfos } from '../Types';

class PathManager {
  // eslint-disable-next-line no-use-before-define
  private static _instance: PathManager | undefined;
  private _fileInfos: FileInfos = {
    fileName: '',
    filePath: '',
    outputFilePath: '',
  };

  // eslint-disable-next-line no-useless-constructor
  private constructor() {}

  static get instance() {
    if (this._instance !== undefined) return this._instance;
    this._instance = new PathManager();
    return this._instance;
  }

  get fileInfos() {
    return this._fileInfos;
  }

  getFileInfos = (filename: string) => {
    const acceptedExtension = ['jpeg', 'jpg', 'png', 'webp', 'gif', 'avif'];
    const acceptedFileNames = acceptedExtension.map((ext) => `${filename}.${ext}`);
    const fileNames = acceptedFileNames.filter((filename) =>
      Fs.existsSync(path.join(__dirname, `../../assets/full/${filename}`))
    );
    if (fileNames.length === 0) throw new Error('file do not exist or extension is not valid');
    this._fileInfos = {
      fileName: fileNames[0],
      filePath: path.join(__dirname, `../../assets/full/${fileNames[0]}`),
      outputFilePath: path.join(__dirname, `../../assets/thumb/${filename}Re${path.extname(fileNames[0])}`),
    };
  };
}

export const PathHelper = PathManager.instance;
