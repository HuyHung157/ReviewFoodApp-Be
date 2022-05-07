import { ShopEntity } from 'src/shop/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'food' })
export class FoodEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  foodName: string;

  @Column()
  imgUrl: string;

  @Column()
  price: string;

  @Column({ nullable: true })
  oldPrice: string;

  @Column({ nullable: true })
  discount: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    name: 'shopId',
    type: 'uuid',
  })
  shopId: string;

  @ManyToOne( () => ShopEntity, shop => shop.reviews, )
  @JoinColumn({ name: 'shopId' })
  shop: ShopEntity;
}
