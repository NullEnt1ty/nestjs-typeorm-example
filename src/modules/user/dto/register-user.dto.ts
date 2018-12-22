import { IsString } from 'class-validator';

export class RegisterUserDto {

  @IsString()
  public readonly firstName: string;

  @IsString()
  public readonly lastName: string;

}
