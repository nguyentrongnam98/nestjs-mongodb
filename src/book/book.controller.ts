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
import { BookService } from './book.service';
import { BookDto } from './book.dto';

@Controller('book')
export class BookController {
  constructor(private service: BookService) {}
  @Get()
  async getBook() {
    return this.service.getBooks();
  }

  @Get(':id')
  async getBookById(@Param('id') id: string) {
    return this.service.getBookById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createBook(@Body() book: BookDto) {
    return this.service.createBook(book);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateBook(@Body() book: BookDto, @Param('id') id: string) {
    return this.service.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string) {
    return this.service.deleteBook(id);
  }
}
