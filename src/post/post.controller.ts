import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { PostService } from './post.service';
import { PostDto } from './post.dto';

@Controller('post')
export class PostController {
  constructor(private service: PostService) {}
  @Get()
  async getAllPosts() {
    return this.service.getAllPosts();
  }
  @Post()
  @UsePipes(new ValidationPipe())
  async createPost(@Body() post: PostDto) {
    return this.service.createPost(post);
  }
}
