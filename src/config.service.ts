import fs from 'fs';
import yaml from 'js-yaml';
import nconf from 'nconf';

export class ConfigService {

  public load(): void {
    const pathToConfigFile = `${ROOT_DIR}/config/${this.configFilename}`;
    const configFileDoesNotExist = fs.existsSync(pathToConfigFile) === false;

    if (configFileDoesNotExist) {
      throw new Error(`Config file at '${pathToConfigFile}' does not exist.`);
    }

    nconf.argv()
      .env({separator: '_'})
      .file({
        file: pathToConfigFile,
        search: true,
        format: {
          parse: yaml.safeLoad,
          stringify: yaml.safeDump,
        },
      });
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
      return 'config.prod.yaml';
    }

    return 'config.dev.yaml';
  }

}
