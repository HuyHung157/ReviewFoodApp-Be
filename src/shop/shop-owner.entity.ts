import { FoodEntity } from 'src/food/food.entity';
import { ReviewEntity } from 'src/review/review.entity';
import { UserEntity } from 'src/user/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { ShopEntity } from './shop.entity';

@Entity({ name: 'shop-owner' })
export class ShopOwnerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ name: 'userId' })
  userId: string;

  @Column({ name: 'shopId' })
  shopId: string;

  @ManyToOne(() => UserEntity, (user) => user.shop, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => ShopEntity, (shop) => shop.owner, { nullable: true })
  @JoinColumn({ name: 'shopId' })
  shop: ShopEntity;
}
