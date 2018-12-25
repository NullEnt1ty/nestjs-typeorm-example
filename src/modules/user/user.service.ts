import { ConflictException, Inject, Injectable } from '@nestjs/common';

import { AUTH_SERVICE, IAuthService } from '../auth';
import { USER_REPOSITORY } from './constants';
import { IUserRepository, IUserService } from './contracts';
import { RegisterUserDto, UserDto } from './dto';

@Injectable()
export class UserService implements IUserService {

  private userRepository: IUserRepository;
  private authService: IAuthService;

  constructor(@Inject(USER_REPOSITORY) userRepository: IUserRepository,
              @Inject(AUTH_SERVICE) authService: IAuthService) {
    this.userRepository = userRepository;
    this.authService = authService;
  }

  public async signUp(user: RegisterUserDto): Promise<UserDto> {
    if (await this.usernameIsTaken(user.username)) {
      throw new ConflictException('Username is already taken.');
    }

    if (await this.emailIsTaken(user.email)) {
      throw new ConflictException('Email address is already taken.');
    }

    const passwordHash = await this.authService.hashPassword(user.password);
    user.password = passwordHash;

    const createdUser = await this.userRepository.createUser(user);

    return createdUser;
  }

  private async usernameIsTaken(username: string): Promise<boolean> {
    const user = await this.userRepository.findUserByUsername(username);

    if (user === undefined) {
      return false;
    }

    return true;
  }

  private async emailIsTaken(email: string): Promise<boolean> {
    const user = await this.userRepository.findUserByEmail(email);

    if (user === undefined) {
      return false;
    }

    return true;
  }

}
