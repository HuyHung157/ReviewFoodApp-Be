import { PartialType } from '@nestjs/swagger';
import { CreateReviewShopDTO } from './create-review.dto';

export class UpdateReviewShopDTO extends PartialType(CreateReviewShopDTO) {}
