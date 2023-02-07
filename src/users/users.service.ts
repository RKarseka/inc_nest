import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { IGetParams, paginatedResponse } from '../helpers/types';
import { CreatePostInputModel } from '../posts/posts.controller';
import { CreateUserInputModelType } from './users.controller';

const users = [
  { id: 1, name: 'name1' },
  { id: 2, name: 'name2' },
];

const user = {
  id: 'string',
  login: 'string',
  email: 'string',
  createdAt: '2024-03-24T18:24:59.763Z',
};
@Injectable()
export class UsersService {
  constructor(protected usersRepository: UsersRepository) {}
  getUsers({ searchLoginTerm }: IGetParams) {
    users.filter(
      (u) => !searchLoginTerm || u.name.indexOf(searchLoginTerm) > -1,
    );
    return { ...paginatedResponse, items: [user] };
  }

  createUser(inputModel: CreateUserInputModelType) {
    return user;
  }

  deleteUser(userId: string) {
    return true;
  }

  findUser(term: string) {
    return this.usersRepository.findUsers(term);
  }
}
