import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Author } from 'src/schema/Author.Schema';
import { Book } from 'src/schema/Book.Schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private bookModel: Model<Book>,
    @InjectModel(Author.name) private authorModel: Model<Author>,
  ) {}
  async getBooks(): Promise<Book[]> {
    return this.bookModel
      .find()
      .populate({
        path: 'author',
        populate: {
          path: 'books',
          model: 'Book',
        },
      })
      .exec();
  }
  async createBook({ authorId, ...book }): Promise<Book> {
    const findAuthor = await this.authorModel.findById(authorId).exec();
    if (!findAuthor) {
      throw new HttpException('Author not found', 404);
    }
    const newBook = await this.bookModel.create({ ...book, author: authorId });
    await findAuthor.updateOne({ $push: { books: newBook._id } }).exec();
    return newBook.save();
  }

  async getBookById(id: string): Promise<Book> {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const findBook = await this.bookModel
      .findById(id)
      .populate('author')
      .exec();
    if (!findBook) {
      throw new HttpException('Book not found', 404);
    }
    return findBook;
  }

  async updateBook(id: string, book): Promise<Book> {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, book, { new: true })
      .exec();
    if (!updatedBook) {
      throw new HttpException('Book not found', 404);
    }
    return updatedBook;
  }

  async deleteBook(id: string): Promise<Book> {
    const validId = mongoose.Types.ObjectId.isValid(id);
    if (!validId) {
      throw new HttpException('Invalid ID', 404);
    }
    const deleteBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deleteBook) {
      throw new HttpException('Book not found', 404);
    }
    return deleteBook;
  }
}
