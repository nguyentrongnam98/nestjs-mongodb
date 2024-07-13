import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { AuthorDto } from './author.dto';

@Controller('author')
export class AuthorController {
  constructor(private service: AuthorService) {}
  @Get()
  async getAuthor() {
    return this.service.getAuthor();
  }

  @Get(':id')
  async getAuthorById(id: string) {
    return this.service.getAuthorById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createAuthor(@Body() author: AuthorDto) {
    return this.service.createAuthor(author);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateAuthor(@Body() author: AuthorDto, @Param('id') id: string) {
    return this.service.updateAuthor(id, author);
  }

  @Delete(':id')
  async deleteAuthor(@Param('id') id: string) {
    return this.service.deleteAuthor(id);
  }
}
