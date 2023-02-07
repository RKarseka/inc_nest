import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

const comment = {
  id: 'string',
  content: 'string',
  commentatorInfo: {
    userId: 'string',
    userLogin: 'string',
  },
  createdAt: '2024-03-24T17:38:39.631Z',
  likesInfo: {
    likesCount: 0,
    dislikesCount: 0,
    myStatus: 'None',
  },
};

@Injectable()
export class CommentsService {
  constructor(protected commentsRepository: CommentsRepository) {}

  getComment(commentId: string) {
    return comment;
  }
}
