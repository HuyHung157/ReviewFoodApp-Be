import { ShopEntity } from 'src/shop/shop.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'food' })
export class FoodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  foodName: string;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  oldPrice: number;

  @Column({ nullable: true, default: 0 })
  discount: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    name: 'shopId',
    type: 'uuid',
  })
  shopId: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.reviews)
  @JoinColumn({ name: 'shopId' })
  shop: ShopEntity;
}
