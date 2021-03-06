import { ReviewEntity } from 'src/review/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Gender } from './enums/gender.enum';
import { IsEmail } from 'class-validator';
import { BookmarkEntity } from 'src/bookmark/bookmark.entity';
import { Role } from './enums/role.enum';
import { ShopOwnerEntity } from 'src/shop/shop-owner.entity';
@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
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

  @Column({ default: Role.USER })
  role: Role;

  @OneToMany(() => ReviewEntity, (review) => review.user, { nullable: true })
  reviews?: ReviewEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.user, {
    nullable: true,
  })
  bookmarks?: BookmarkEntity[];

  @OneToMany(() => ShopOwnerEntity, (shop) => shop.user, {
    nullable: true,
  })
  shop?: ShopOwnerEntity[];
}
