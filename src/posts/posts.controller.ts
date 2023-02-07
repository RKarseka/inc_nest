import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.serrvice';

@Controller('posts')
export class PostsController {
  constructor(protected postsService: PostsService) {}

  @Get()
  getPosts(
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.postsService.getPosts({
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    });
  }

  @Get(':id')
  getPost(@Param('id') postId: string) {
    return this.postsService.getPost(postId);
  }

  @Post()
  createPost(@Body() inputModel: CreatePostInputModel) {
    return this.postsService.createPost(inputModel);
  }

  @Delete(':id')
  deletePost(@Param('id') postId: string) {
    return this.postsService.deletePost(postId);
  }

  @Put(':id')
  updatePost(
    @Param('id') postId: string,
    @Body() inputModel: UpdatePostInputModel,
  ) {
    return this.postsService.updatePost(postId, inputModel);
  }
}

export type CreatePostInputModel = {
  title: string;
  shortDescription: string;
  content: string;
  blogId: string;
};
export type UpdatePostInputModel = CreatePostInputModel;
