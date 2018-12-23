import { Injectable } from '@nestjs/common';

import bcrypt from 'bcrypt';

import { IAuthService } from './contracts';

@Injectable()
export class AuthService implements IAuthService {

  private readonly bcryptRounds: number = 12;

  public async hashPassword(password: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(password, this.bcryptRounds);

    return hashedPassword;
  }

}
