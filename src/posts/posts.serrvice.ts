import { Injectable } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { IGetParams, paginatedResponse } from '../helpers/types';
import { CreatePostInputModel, UpdatePostInputModel } from './posts.controller';
import { UpdateBlogInputModel } from '../blogs/blogs.controller';

const post = {
  id: 'string',
  title: 'string',
  shortDescription: 'string',
  content: 'string',
  blogId: 'string',
  blogName: 'string',
  createdAt: '2024-03-24T17:44:44.327Z',
  extendedLikesInfo: {
    likesCount: 0,
    dislikesCount: 0,
    myStatus: 'None',
    newestLikes: [
      {
        addedAt: '2024-03-24T17:44:44.327Z',
        userId: 'string',
        login: 'string',
      },
    ],
  },
};
@Injectable()
export class PostsService {
  constructor(protected postsRepository: PostsRepository) {}
  getPosts(queryParams: IGetParams) {
    return { ...paginatedResponse, items: [post] };
  }

  getPost(postId: string) {
    return post;
  }

  createPost(inputModel: CreatePostInputModel) {
    return post;
  }

  updatePost(postId: string, inputModel: UpdatePostInputModel) {
    return post;
  }

  deletePost(postId: string) {
    return true;
  }
}