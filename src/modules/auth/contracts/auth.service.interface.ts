export interface IAuthService {
  hashPassword(password: string): Promise<string>;
}
