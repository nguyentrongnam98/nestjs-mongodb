import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop({ required: true, minlength: 3, maxlength: 30 })
  name: string;
  @Prop({ required: true, minlength: 10, maxlength: 100 })
  description: string;
  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
