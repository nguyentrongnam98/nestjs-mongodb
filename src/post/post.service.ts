import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/schema/Post.schema';
import { PostDto } from './post.dto';
import { User } from 'src/schema/User.schema';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  getAllPosts() {
    return this.postModel.find().exec();
  }

  async createPost({ userId, ...post }: PostDto) {
    const findUser = await this.userModel.findById(userId).exec();
    if (!findUser) {
      throw new HttpException('User not found', 404);
    }
    const newPost = await this.postModel.create({ ...post, user: userId });
    await findUser.updateOne({ $push: { post: newPost._id } }).exec();
    return newPost.save();
  }
}
