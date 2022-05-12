import { ShopEntity } from 'src/shop/shop.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'review' })
export class ReviewEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  imgUrl: string;

  @Column({ name: 'totalLike', default: 0, nullable: true })
  totalLike: number;

  @Column({ name: 'totalDislike', default: 0, nullable: true })
  totalDislike: number;

  @CreateDateColumn({
    name: 'createdAt',
    type: 'timestamp without time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt?: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({
    name: 'shopId',
    type: 'uuid',
  })
  shopId: string;

  @Column({
    name: 'userId',
    type: 'uuid',
  })
  userId: string;

  @ManyToOne(() => ShopEntity, (shop) => shop.reviews)
  @JoinColumn({ name: 'shopId' })
  shop: ShopEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
