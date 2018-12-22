import { RegisterUserDto, UserDto } from '../dto';

export interface IUserService {
  signUp(user: RegisterUserDto): Promise<UserDto>;
}
