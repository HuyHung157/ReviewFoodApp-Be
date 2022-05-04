import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender } from './enums/gender.enum';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: true })
  gender: Gender;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;
}
