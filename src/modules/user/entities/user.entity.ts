import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryColumn()
  @Generated('uuid')
  public id: string;

  @Column({
    unique: true,
  })
  public username: string;

  @Column({
    unique: true,
  })
  public email: string;

  @Column({
    select: false,
  })
  public password: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  public aboutMe: string | null;

}
