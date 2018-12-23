import { Module } from '@nestjs/common';
import { ClassProvider } from '@nestjs/common/interfaces';

import { AuthService } from './auth.service';
import { AUTH_SERVICE } from './constants';

const authServiceProvider: ClassProvider = {
  provide: AUTH_SERVICE,
  useClass: AuthService,
};

@Module({
  providers: [authServiceProvider],
  exports: [authServiceProvider],
})
export class AuthModule {}
