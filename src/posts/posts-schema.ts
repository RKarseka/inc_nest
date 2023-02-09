import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post {
  @Prop()
  title: string;

  @Prop()
  shortDescription: string;

  @Prop()
  content: string;
  @Prop()
  blogId: string;

  @Prop()
  blogName: string;

  @Prop()
  createdAt: boolean;

  @Prop()
  likes: string;

  @Prop()
  dislikes: string;
}

export const PostsSchema = SchemaFactory.createForClass(Post);
