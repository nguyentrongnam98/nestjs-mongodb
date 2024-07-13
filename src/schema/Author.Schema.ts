import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Book } from './Book.Schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Author {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  age: number;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }])
  books: Book[];
  @Prop()
  createAt: Date;
  @Prop()
  updateAt: Date;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);
