import { Injectable } from '@nestjs/common';
import { IGetParams } from '../helpers/types';
import { CreateUserInputModelType } from './users.controller';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users-schema';

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
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  async getUsers({ searchLoginTerm }: IGetParams): Promise<User[]> {
    // users.filter(
    //   (u) => !searchLoginTerm || u.name.indexOf(searchLoginTerm) > -1,
    // );
    // return { ...paginatedResponse, items: [user] };

    return await this.userModel.find().exec();
  }

  async createUser(inputModel: CreateUserInputModelType): Promise<User> {
    const createdAt = new Date().toISOString();
    const newUser = { ...inputModel, createdAt };
    const createdUser = await this.userModel.create(newUser);
    return createdUser;
  }

  async deleteUser(userId: string) {
    return await this.userModel.findByIdAndDelete({ _id: userId }).exec();
  }

  findUser(term: string) {
    // return this.usersRepository.findUsers(term);
  }
}
