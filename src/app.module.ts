import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersRepository } from './users/users.repository';
import { BlogsController } from './blogs/blogs.controller';
import { BlogsRepository } from './blogs/blogs.repository';
import { BlogsService } from './blogs/blogs.serrvice';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.serrvice';
import { CommentsRepository } from './comments/comments.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { BlogsModule } from './blogs/blogs.module';

const MONGO_URI =
  'mongodb+srv://admin:admin@cluster0.batsw9f.mongodb.net/?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI, { dbName: 'forNestDb' }),
    UsersModule,
    PostsModule,
    BlogsModule,
  ],

  controllers: [AppController, CommentsController],

  providers: [AppService, CommentsService, CommentsRepository],
})
export class AppModule {}
