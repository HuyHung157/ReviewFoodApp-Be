import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
  ) { }

  @Post()
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.userService.createUser(createUserDTO);
  }

  @Get()
  @ApiOkResponse({ description: 'List all users' })
  async getUserList() {
    return await this.userService.getUserList();
  }

  @Get(':id')
  getDetailUser(@Param('id') id: string) {
    return this.userService.getDetailUser(id);
  }

  @Put(':id')
  updateUserById(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUserById(id, updateUserDto);
  }

  @Delete(':id')
  removeUserById(@Param('id') id: string) {
    return this.userService.removeUserById(id);
  }
}