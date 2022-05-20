import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { CreateBookMarkDTO } from './dto/create-bookmark.dto';
import { UpdateBookMarkDTO } from './dto/update-bookmark.dto';

@ApiTags('bookmark')
@Controller('bookmark')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}

  @Post()
  @ApiOperation({ summary: 'Create bookmark' })
  createBookmark(@Body() createBookMarkDTO: CreateBookMarkDTO) {
    return this.bookmarkService.createBookMark(createBookMarkDTO);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get list bookmark' })
  getListBookMarkByUserId(@Param('userId') id: string) {
    return this.bookmarkService.getListBookMarkByUserId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update bookmark' })
  updateBookMarkByUserId(
    @Param('id') id: string,
    @Body() updateBookMarkDTO: UpdateBookMarkDTO,
  ) {
    return this.bookmarkService.updateBookMarkById(id, updateBookMarkDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete bookmark' })
  removeBookMarkById(@Param('id') id: string) {
    return this.bookmarkService.removeBookMarkById(id);
  }
}
