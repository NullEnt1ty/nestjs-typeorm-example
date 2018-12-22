interface IConfigService {
  load(): void;
  get(key: string): any;
  set(key: string, value: any): boolean;
  save(): Promise<void>;
}

declare const ROOT_DIR: string;
declare const CONFIG: IConfigService;

declare namespace NodeJS {
  interface Global {
    ROOT_DIR: string;
    CONFIG: IConfigService;
  }
}
