export interface IUrlMap {
  [key: string]: string;
}

class UrlModel {
  urlMap: IUrlMap | undefined;

  constructor() {
    this.urlMap = {};
  }

  get = (key: string): string | undefined => {
    if (!this.urlMap) {
      return undefined;
    }

    return this.urlMap[key];
  };

  add = (key: string, url: string) => {
    if (this.urlMap) {
      this.urlMap[key] = url;
    }
  };

  getCount = (): number => {
    if (!this.urlMap) {
      return 0;
    }

    return Object.keys(this.urlMap).length;
  };
}

export default UrlModel;
