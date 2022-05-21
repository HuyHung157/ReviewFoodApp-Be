import { BookmarkEntity } from 'src/bookmark/bookmark.entity';
import { FoodEntity } from 'src/food/food.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ShopOwnerEntity } from './shop-owner.entity';

@Entity({ name: 'shop' })
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shopName: string;

  @Column({ nullable: true })
  logoUrl: string;

  @Column({ nullable: true })
  bannerUrl: string;

  @Column()
  address: string;

  @Column({ nullable: true, default: true })
  isDelivery: boolean;

  @Column({ name: 'totalLike', default: 0 })
  totalLike: number;

  @Column({ name: 'totalDislike', default: 0 })
  totalDislike: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => ReviewEntity, (review) => review.shop, { nullable: true })
  reviews?: ReviewEntity[];

  @OneToMany(() => FoodEntity, (food) => food.shop, { nullable: true })
  foods?: FoodEntity[];

  @OneToMany(() => ShopOwnerEntity, (owner) => owner.shop, { nullable: true })
  owner?: ShopOwnerEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.user, {
    nullable: true,
  })
  bookmarks?: BookmarkEntity[];
}
