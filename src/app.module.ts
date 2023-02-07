import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersRepository } from './users/users.repository';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsRepository } from './blogs/blogs.repository';
import { BlogsService } from './blogs/blogs.serrvice';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.serrvice';
import { PostsRepository } from './posts/posts.repository';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.serrvice';
import { CommentsRepository } from './comments/comments.repository';

@Module({
  imports: [],
  controllers: [
    AppController,
    UsersController,
    BlogsController,
    PostsController,
    CommentsController,
  ],
  providers: [
    AppService,
    UsersService,
    UsersRepository,
    BlogsRepository,
    BlogsService,
    PostsService,
    PostsRepository,
    CommentsService,
    CommentsRepository,
  ],
})
export class AppModule {}
