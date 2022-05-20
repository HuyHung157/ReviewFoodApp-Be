import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get list user' })
  @ApiOkResponse({ description: 'List all users' })
  async getUserList() {
    return await this.userService.getUserList();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detail user' })
  getDetailUser(@Param('id') id: string) {
    return this.userService.getDetailUser(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  updateUserById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDTO,
  ) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  removeUserById(@Param('id') id: string) {
    return this.userService.removeUserById(id);
  }
}
