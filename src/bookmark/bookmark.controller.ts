import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { CreateBookMarkDTO } from './dto/create-bookmark.dto';
import { UpdateBookMarkDTO } from './dto/update-bookmark.dto';

@ApiTags('bookmark')
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  createBookmark(@Body() createBookMarkDTO: CreateBookMarkDTO) {
    return this.bookmarkService.createBookMark(createBookMarkDTO);
  }

  @Get(':userId')
  getListBookMarkByUserId(@Param('userId') id: string) {
    return this.bookmarkService.getListBookMarkByUserId(id);
  }

  @Put(':id')
  updateBookMarkByUserId(
    @Param('id') id: string,
    @Body() updateBookMarkDTO: UpdateBookMarkDTO,
  ) {
    return this.bookmarkService.updateBookMarkById(id, updateBookMarkDTO);
  }

  @Delete(':id')
  removeBookMarkById(@Param('id') id: string) {
    return this.bookmarkService.removeBookMarkById(id);
  }
}
