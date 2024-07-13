import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductDto } from './product.dto';
import { ProductService } from './product.service';
import mongoose from 'mongoose';

@Controller('product')
export class ProductController {
  constructor(private service: ProductService) {}
  @Get()
  getProducts() {
    return this.service.getProducts();
  }

  @Post()
  createProduct(@Body() product: ProductDto) {
    return this.service.createProduct(product);
  }

  @Put(':id')
  updateProduct(@Param('id') id: string, @Body() product: ProductDto) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const productUpdate = this.service.updateProduct(id, product);
    if (!productUpdate) {
      throw new HttpException('Product not found', 404);
    }
    return productUpdate;
  }
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const productDelete = this.service.deleteProduct(id);
    if (!productDelete) {
      throw new HttpException('Product not found', 404);
    }
    return productDelete;
  }
}
