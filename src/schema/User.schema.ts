import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSetting } from './UserSetting.schema';
import mongoose from 'mongoose';
import { Product } from './Product.schema';
import { Post } from './Post.schema';
@Schema()
export class User {
  @Prop({ required: true })
  firstName: string;
  @Prop({ required: true })
  lastName: string;
  @Prop({ required: true, unique: true })
  email: string;
  @Prop({ required: true, unique: true })
  address: string;

  @Prop({ type: mongoose.Types.ObjectId, ref: 'UserSetting' })
  settings: UserSetting;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'Product' })
  product: Product;
  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  post: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
