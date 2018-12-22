import nconf from 'nconf';

export class ConfigService {

  public load(): void {
    nconf.argv()
      .env({separator: '_'})
      .file({file: `${ROOT_DIR}/config/${this.configFilename}`, search: true});
  }

  // tslint:disable-next-line:no-any
  public get(key: string): any {
    const value = nconf.get(key);

    return value;
  }

  // tslint:disable-next-line:no-any
  public set(key: string, value: any): boolean {
    const success = nconf.set(key, value);

    return success;
  }

  public save(): Promise<void> {
    return new Promise((resolve: Function, reject: Function): void => {
      nconf.save((error: Error) => {
        if (error) {
          reject(error);
        }

        resolve();
      });
    });
  }

  private get configFilename(): string {
    const nodeEnv = process.env.NODE_ENV;

    if (nodeEnv === 'production') {
      return 'config.prod.json';
    }

    return 'config.dev.json';
  }

}
