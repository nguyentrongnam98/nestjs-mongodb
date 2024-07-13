import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  HttpException,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';
import mongoose from 'mongoose';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  createUser(@Body() user: UserDto) {
    return this.service.createUser(user);
  }

  @Get()
  getUsers() {
    return this.service.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('User not found', 404);
    }
    const user = await this.service.getUserById(id);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    return user;
  }

  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() user: UserDto) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const updatedUser = await this.service.updateUser(id, user);
    if (!updatedUser) {
      throw new HttpException('User not found', 404);
    }
    return updatedUser;
  }

  @Delete(':id')
  @HttpCode(200)
  async deleteUser(@Param('id') id: string) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const deletedUser = await this.service.deleteUser(id);
    if (!deletedUser) {
      throw new HttpException('User not found', 404);
    }
    return deletedUser;
  }
}
