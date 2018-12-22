import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { IUserService } from './contracts';
import { RegisterUserDto, UserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService implements IUserService {

  private userRepository: Repository<User>;

  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  public async signUp(user: RegisterUserDto): Promise<UserDto> {
    const userEntity = this.userRepository.create(user);
    const createdUserEntity = await this.userRepository.save(userEntity);

    const createdUser = plainToClass(UserDto, createdUserEntity);

    return createdUser;
  }

}
