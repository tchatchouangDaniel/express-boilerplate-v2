export type RequestObject = {
  width: number;
  height: number;
};

export type CacheObject = {
  filename: string;
  width: number;
  height: number;
  endpoint: string;
  outputFileLocation: string;
};

export type FileInfos = {
  fileName: string;
  filePath: string;
  outputFilePath: string;
};
