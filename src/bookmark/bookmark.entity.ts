import { ShopEntity } from 'src/shop/shop.entity';
import { UserEntity } from 'src/user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'bookmark' })
export class BookmarkEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  content: string;

  @Column({ nullable: true })
  description: string;

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

  @OneToOne(() => ShopEntity, (shop) => shop.id)
  @JoinColumn({ name: 'shopId' })
  shop: ShopEntity;

  @ManyToOne(() => UserEntity, (user) => user.reviews)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
