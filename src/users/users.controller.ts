import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async createUser(@Res() response, @Body() createUserDTO: CreateUserDto) {
    const newUser = await this.usersService.createUser(createUserDTO);
    
    return response.status(HttpStatus.CREATED).json(newUser);
  }

  @Put('/:id')
  async updateUser(
    @Res() response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const existingUser = await this.usersService.updateUser(
      userId,
      updateUserDto,
    );

    return response.status(HttpStatus.OK).json(existingUser);
  }

  @Get('/:id')
  async getUser(@Res() response, @Param('id') userId: string) {
    const existingUser = await this.usersService.getUserById(userId);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'User found successfully', existingUser });
  }

  @Delete('/:id')
  async deleteUser(@Res() response, @Param('id') userId: string) {
    const deleteUser = await this.usersService.deleteUser(userId);

    return response
      .status(HttpStatus.OK)
      .json({ message: 'User deleted successfully', deleteUser });
  }
}
