import { Module } from '@nestjs/common';
import { ClassProvider } from '@nestjs/common/interfaces';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth';
import { USER_SERVICE } from './constants';
import { User } from './entities';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userServiceProvider: ClassProvider = {
  provide: USER_SERVICE,
  useClass: UserService,
};

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [userServiceProvider],
  exports: [userServiceProvider],
})
export class UserModule {}
