import { ReviewEntity } from 'src/review/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Gender } from './enums/gender.enum';
import { IsEmail } from 'class-validator';
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
  @IsEmail()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ReviewEntity, (review) => review.user, { nullable: true })
  reviews?: ReviewEntity[];
}
