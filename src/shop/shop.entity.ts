import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isActive: boolean;
}
