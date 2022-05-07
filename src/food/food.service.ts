import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { FoodEntity } from './food.entity';

@Injectable()
export class FoodService {
  constructor(
    @Inject('FOOD_REPOSITORY')
    private readonly foodRepository: Repository<FoodEntity>,
  ) {}

}
