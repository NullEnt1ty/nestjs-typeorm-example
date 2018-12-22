import { Column, Entity, Generated, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryColumn()
  @Generated('uuid')
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

}
