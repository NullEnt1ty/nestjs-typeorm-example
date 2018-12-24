import { plainToClass } from 'class-transformer';
import { EntityRepository, Repository } from 'typeorm';

import { IUserRepository } from '../contracts';
import { RegisterUserDto, UserDto } from '../dto';
import { User } from '../entities';

@EntityRepository(User)
export class UserRepository extends Repository<User> implements IUserRepository {

  public async findUserByUsername(username: string): Promise<UserDto | undefined> {
    const userEntity = await this.findOne({ username: username });
    const user = plainToClass(UserDto, userEntity);

    return user;
  }

  public async findUserByEmail(email: string): Promise<UserDto | undefined> {
    const userEntity = await this.findOne({ email: email });
    const user = plainToClass(UserDto, userEntity);

    return user;
  }

  public async createUser(user: RegisterUserDto): Promise<UserDto> {
    const userEntity = this.create(user);
    const createdUserEntity = await this.save(userEntity);
    const createdUser = plainToClass(UserDto, createdUserEntity);

    return createdUser;
  }

}
