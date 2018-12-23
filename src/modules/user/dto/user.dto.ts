import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {

  @Expose()
  public id: string;

  @Expose()
  public username: string;

  @Expose()
  public email: string;

  public password: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;

  @Expose()
  public aboutMe: string | null;

}
