import { Injectable } from '@nestjs/common';
import { ISearchFields, responsePaginated } from '../helpers/types';
import { CreateBlogInputModel, UpdateBlogInputModel } from './blogs.controller';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog, BlogDocument } from './blog.schema';
import { ParsedQs } from 'qs';
import {
  getAllFromCollectionPaginated,
  makeGetAllParams,
} from '../helpers/forMongoose';

const blog = {
  description: 'string',
  websiteUrl: 'string',
  createdAt: '2024-03-24T16:30:56.671Z',
  isMembership: true,
};
@Injectable()
export class BlogsService {
  constructor(
    @InjectModel(Blog.name) private readonly blogModel: Model<BlogDocument>,
  ) {}
  async getBlogs(query: ParsedQs) {
    const searchFields: Array<ISearchFields<Blog>> = [];
    const params = makeGetAllParams(query, searchFields);
    return await getAllFromCollectionPaginated<Blog>(params, this.blogModel);
    // return await this.blogModel
    //   .find(filter)
    //   .exec()
    //   .then((blogs: Blog[]) => {
    //     return blogs.map((blog: BlogDocument) =>
    //       blog.toObject({ versionKey: false }),
    //     );
    //   });
  }

  async getBlog(blogId: string) {
    return await this.blogModel.findOne({ _id: blogId }).exec();
  }
  async createBlog(inputModel: CreateBlogInputModel): Promise<BlogDocument> {
    const createdAt = new Date().toISOString();
    const isMembership = false;
    const newBlog = { ...inputModel, createdAt, isMembership };
    const createdBlog = await this.blogModel.create(newBlog);
    return createdBlog.toObject({ versionKey: false });
  }

  async updateBlog(blogId: string, inputModel: UpdateBlogInputModel) {
    const blog = await this.getBlog(blogId);
    const newBlog = { ...blog, ...inputModel };
    const result = await this.blogModel.updateOne({ _id: blogId }, newBlog);
    return result;
  }

  deleteBlog(blogId: string) {
    return true;
  }
}

export interface IBlog {
  id: string;
  name: string;
  description: string;
  websiteUrl: string;
  createdAt: string;
  isMembership: boolean;
}

// @ts-ignore
export interface IBlogs extends responsePaginated {
  items: IBlog[];
}
