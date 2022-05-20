import { PartialType } from '@nestjs/swagger';
import { CreateBookMarkDTO } from './create-bookmark.dto';

export class UpdateBookMarkDTO extends PartialType(CreateBookMarkDTO) {}
