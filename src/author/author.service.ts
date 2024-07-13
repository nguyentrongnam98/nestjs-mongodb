import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Author } from 'src/schema/Author.Schema';
import { AuthorDto } from './author.dto';

@Injectable()
export class AuthorService {
  constructor(@InjectModel(Author.name) private authorModel: Model<Author>) {}
  async getAuthor(): Promise<Author[]> {
    return await this.authorModel.find().populate('books').exec();
  }

  async createAuthor(author: AuthorDto): Promise<Author> {
    const newAuth = await this.authorModel.create(author);
    return newAuth.save();
  }

  async getAuthorById(id: string): Promise<Author> {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const findAuthor = await this.authorModel.findById(id).exec();
    if (!findAuthor) {
      throw new HttpException('Author not found', 404);
    }
    return findAuthor;
  }

  async updateAuthor(id: string, author: AuthorDto): Promise<Author> {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const updatedAuthor = await this.authorModel
      .findByIdAndUpdate(id, author, { new: true })
      .exec();
    if (!updatedAuthor) {
      throw new HttpException('Author not found', 404);
    }
    return updatedAuthor;
  }

  async deleteAuthor(id: string): Promise<Author> {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const deleteAuthor = await this.authorModel.findByIdAndDelete(id).exec();
    if (!deleteAuthor) {
      throw new HttpException('Author not found', 404);
    }
    return deleteAuthor;
  }
}
