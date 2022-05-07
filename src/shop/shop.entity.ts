import { FoodEntity } from 'src/food/food.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity({ name: 'shop' })
export class ShopEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  shopName: string;

  @Column()
  logoUrl: string;

  @Column()
  bannerUrl: string;

  @Column()
  address: string;

  @Column({ default: true })
  isDelivery: Boolean;

  @Column({ name: 'totalLike'  , default: 0 })
  totalLike: number;

  @Column({ name: 'totalDislike', default: 0 })
  totalDislike: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany( () => ReviewEntity, review => review.shop, { nullable: true }, )
  reviews?: ReviewEntity[];

  @OneToMany( () => FoodEntity, food => food.shop, { nullable: true }, )
  foods?: FoodEntity[];
}
