import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  public username: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

  @IsString()
  @IsOptional()
  public readonly aboutMe: string | null | undefined;

}
