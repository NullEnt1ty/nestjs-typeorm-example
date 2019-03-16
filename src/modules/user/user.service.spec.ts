import { ConflictException } from '@nestjs/common';
import { ValueProvider } from '@nestjs/common/interfaces';
import { Test, TestingModule } from '@nestjs/testing';

import { AUTH_SERVICE, AuthModule, IAuthService } from '../auth';
import { USER_REPOSITORY } from './constants';
import { IUserRepository } from './contracts';
import { RegisterUserDto, UserDto } from './dto';
import { UserService } from './user.service';

function createMockUserRepository(): IUserRepository {
  const mockUserRepository: IUserRepository = {
    findUserByUsername: (username: string): Promise<UserDto | undefined> => {
      throw new Error('Unmocked method called.');
    },

    findUserByEmail: (email: string): Promise<UserDto | undefined> => {
      throw new Error('Unmocked method called.');
    },

    createUser: (user: RegisterUserDto): Promise<UserDto> => {
      throw new Error('Unmocked method called.');
    },
  };

  return mockUserRepository;
}

function createMockAuthService(): IAuthService {
  const mockAuthService: IAuthService = {
    hashPassword: async (password: string): Promise<string> => {
      throw new Error('Unmocked method called.');
    },
  };

  return mockAuthService;
}

describe('UserService', () => {
  let userService: UserService;
  let userRepository: IUserRepository;
  let authService: IAuthService;

  beforeAll(async () => {
    userRepository = createMockUserRepository();
    authService = createMockAuthService();

    const repositoryProvider: ValueProvider = {
      provide: USER_REPOSITORY,
      useValue: userRepository,
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [
        UserService,
        repositoryProvider,
      ],
    })
      .overrideProvider(AUTH_SERVICE)
      .useValue(authService)
      .compile();

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should sign up the user', async () => {
    const userToBeCreated = {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret',
      username: 'johndoe',
    };

    const createdUser = {
      id: '50da10a8-f77c-4fc4-bf53-f9d9b52e2df0',
      aboutMe: null,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret',
      username: 'johndoe',
    };

    jest.spyOn(userRepository, 'createUser').mockReturnValue(Promise.resolve(createdUser));
    jest.spyOn(userRepository, 'findUserByEmail').mockReturnValue(Promise.resolve(undefined));
    jest.spyOn(userRepository, 'findUserByUsername').mockReturnValue(Promise.resolve(undefined));
    jest.spyOn(authService, 'hashPassword').mockReturnValue(Promise.resolve('password hash'));

    expect(await userService.signUp(userToBeCreated)).toBe(createdUser);
  });

  it('should say the username is already taken', async () => {
    const userToBeCreated = {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret',
      username: 'johndoe',
    };

    const existingUser = {
      id: '50da10a8-f77c-4fc4-bf53-f9d9b52e2df0',
      aboutMe: null,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret',
      username: 'johndoe',
    };

    jest.spyOn(userRepository, 'findUserByUsername').mockReturnValue(Promise.resolve(existingUser));

    try {
      await userService.signUp(userToBeCreated);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message.message).toBe('Username is already taken.');
    }
  });

  it('should say the email address is already taken', async () => {
    const userToBeCreated = {
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret',
      username: 'johndoe',
    };

    const existingUser = {
      id: '50da10a8-f77c-4fc4-bf53-f9d9b52e2df0',
      aboutMe: null,
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      password: 'secret',
      username: 'user123',
    };

    jest.spyOn(userRepository, 'findUserByUsername').mockReturnValue(Promise.resolve(undefined));
    jest.spyOn(userRepository, 'findUserByEmail').mockReturnValue(Promise.resolve(existingUser));

    try {
      await userService.signUp(userToBeCreated);
      fail();
    } catch (error) {
      expect(error).toBeInstanceOf(ConflictException);
      expect(error.message.message).toBe('Email address is already taken.');
    }
  });
});
