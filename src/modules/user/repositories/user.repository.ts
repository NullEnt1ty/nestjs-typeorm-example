import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';

import { IUserRepository } from '../contracts';
import { RegisterUserDto, UserDto } from '../dto';
import { User } from '../entities';

@Injectable()
export class UserRepository implements IUserRepository {

  private userRepository: Repository<User>;

  constructor(@InjectRepository(User) userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }

  public async findUserByUsername(username: string): Promise<UserDto | undefined> {
    const userEntity = await this.userRepository.findOne({ username: username });
    const user = plainToClass(UserDto, userEntity);

    return user;
  }

  public async findUserByEmail(email: string): Promise<UserDto | undefined> {
    const userEntity = await this.userRepository.findOne({ email: email });
    const user = plainToClass(UserDto, userEntity);

    return user;
  }

  public async createUser(user: RegisterUserDto): Promise<UserDto> {
    const userEntity = this.userRepository.create(user);
    const createdUserEntity = await this.userRepository.save(userEntity);
    const createdUser = plainToClass(UserDto, createdUserEntity);

    return createdUser;
  }

}
