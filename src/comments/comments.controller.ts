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
import { CommentsService } from './comments.serrvice';

@Controller('comments')
export class CommentsController {
  constructor(protected commentsService: CommentsService) {}

  @Get()
  getComments(@Query('q') term: string) {}

  @Get(':id')
  getComment(@Param('id') commentId: string) {
    return this.commentsService.getComment(commentId);
  }

  @Post()
  createComment(@Body() inputModel: CreateCommentInputModel) {
    return;
  }

  @Delete(':id')
  deleteComment(@Param('id') commentId: string) {
    return commentId;
  }

  @Put(':id')
  updateComment(
    @Param('id') commentId: string,
    @Body() inputModel: UpdateCommentInputModel,
  ) {
    return commentId;
  }
}

type CreateCommentInputModel = {};
type UpdateCommentInputModel = {};
