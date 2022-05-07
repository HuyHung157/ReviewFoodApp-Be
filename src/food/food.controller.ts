import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FoodService } from './food.service';

@ApiTags('food')
@Controller('food')
export class FoodController {
  constructor(private foodService: FoodService) {}

}
