import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  category: string;
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Author' })
  author: string;
  @Prop()
  address: string | null;
  @Prop()
  createdAt: Date;
  @Prop()
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
