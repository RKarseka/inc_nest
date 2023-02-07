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
import { BlogsService } from './blogs.serrvice';

@Controller('blogs')
export class BlogsController {
  constructor(protected blogsService: BlogsService) {}

  @Get()
  getBlogs(
    @Query('searchNameTerm') searchNameTerm: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.blogsService.getUsers({
      searchNameTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    });
  }

  @Get(':id')
  getBlog(@Param('id') blogId: string) {
    return this.blogsService.getBlog(blogId);
  }

  @Post()
  createBlog(@Body() inputModel: CreateBlogInputModel) {
    return this.blogsService.createBlog(inputModel);
  }

  @Delete(':id')
  deleteBlog(@Param('id') blogId: string) {
    return this.blogsService.deleteBlog(blogId);
  }

  @Put(':id')
  updateBlog(
    @Param('id') blogId: string,
    @Body() inputModel: UpdateBlogInputModel,
  ) {
    return this.blogsService.updateBlog(blogId, inputModel);
  }
}

export type CreateBlogInputModel = {
  name: string;
  description: string;
  websiteUrl: string;
};
export type UpdateBlogInputModel = {
  name: string;
  description: string;
  websiteUrl: string;
};
