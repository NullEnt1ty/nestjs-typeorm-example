import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { AUTH_SERVICE, IAuthService } from '../auth';
import { IUserService } from './contracts';
import { RegisterUserDto, UserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService implements IUserService {

  private userRepository: Repository<User>;
  private authService: IAuthService;

  constructor(@InjectRepository(User) userRepository: Repository<User>,
              @Inject(AUTH_SERVICE) authService: IAuthService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async signUp(user: RegisterUserDto): Promise<UserDto> {
    const passwordHash = await this.authService.hashPassword(user.password);
    user.password = passwordHash;

    const userEntity = this.userRepository.create(user);
    const createdUserEntity = await this.userRepository.save(userEntity);
    const createdUser = plainToClass(UserDto, createdUserEntity);

    return createdUser;
  }

}
