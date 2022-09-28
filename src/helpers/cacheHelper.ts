import { CacheObject } from '../Types';

class CacheManager {
  // eslint-disable-next-line no-use-before-define
  private static _instance: CacheManager | undefined;
  private requestHistory: CacheObject[] = [];

  // eslint-disable-next-line no-useless-constructor
  private constructor() {}

  static get instance() {
    if (this._instance !== undefined) return this._instance;
    this._instance = new CacheManager();
    return this._instance;
  }

  pushToHistory(obj: CacheObject) {
    this.requestHistory.push(obj);
  }

  includes(obj: CacheObject) {
    return this.requestHistory.some((element) => {
      if (
        element.endpoint === obj.endpoint &&
        element.filename === obj.filename &&
        element.height === obj.height &&
        element.width === obj.width &&
        element.outputFileLocation === obj.outputFileLocation
      )
        return true;
      return false;
    });
  }
}

export const CacheHelper = CacheManager.instance;
