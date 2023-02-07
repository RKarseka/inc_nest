import { Injectable } from '@nestjs/common';
import { BlogsRepository } from './blogs.repository';
import {
  IGetParams,
  paginatedResponse,
  responsePaginated,
} from '../helpers/types';
import { CreateBlogInputModel, UpdateBlogInputModel } from './blogs.controller';

const blog = {
  id: 'string',
  name: 'string',
  description: 'string',
  websiteUrl: 'string',
  createdAt: '2024-03-24T16:30:56.671Z',
  isMembership: true,
};
@Injectable()
export class BlogsService {
  constructor(protected blogsRepository: BlogsRepository) {}
  getUsers(queryParams: IGetParams): IBlogs {
    return { ...paginatedResponse, items: [blog] };
  }

  getBlog(blogId: string) {
    return blog;
  }
  createBlog(inputModel: CreateBlogInputModel): IBlog {
    return blog;
  }

  updateBlog(blogId: string, inputModel: UpdateBlogInputModel) {
    return blog;
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
