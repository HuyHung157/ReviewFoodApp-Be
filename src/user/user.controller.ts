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
    return this.userService.createUser(createUserDTO, false);
  }

  @Post('/shop-owner')
  @ApiOperation({ summary: 'Create new shop owner' })
  createShopOwner(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO, true);
  }

  @Get()
  @ApiOperation({ summary: 'Get list user' })
  @ApiOkResponse({ description: 'List all users' })
  async getUserList() {
    return await this.userService.getUserList();
  }

  @Get('/shop-owner')
  @ApiOperation({ summary: 'Get all shop owner' })
  @ApiOkResponse({ description: 'List all shop owner' })
  async getAllShopOwner() {
    return await this.userService.getAllShopOwner();
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
