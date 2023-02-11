import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BlogDocument = HydratedDocument<Blog>;

@Schema({
  timestamps: true,
  toObject: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.updatedAt;
    },
  },
})
export class Blog {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  websiteUrl: string;

  // @Prop()
  // createdAt: string;

  @Prop()
  isMembership: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
