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
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(protected usersService: UsersService) {}

  @Get()
  getUsers(
    @Query('searchLoginTerm') searchLoginTerm: string,
    @Query('searchEmailTerm') searchEmailTerm: string,
    @Query('sortBy') sortBy: string,
    @Query('sortDirection') sortDirection: string,
    @Query('pageNumber') pageNumber: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.usersService.getUsers({
      searchLoginTerm,
      searchEmailTerm,
      sortBy,
      sortDirection,
      pageNumber,
      pageSize,
    });
  }

  @Get(':id')
  getUser(@Param('id') userid: string) {
    return this.usersService.findUser(userid);
  }

  @Post()
  createUser(@Body() inputModel: CreateUserInputModelType) {
    return this.usersService.createUser(inputModel);
  }
  @Delete(':id')
  deleteUser(@Param('id') userid: string) {
    return this.usersService.deleteUser(userid);
  }

  @Put(':id')
  updateUser(
    @Param('id') userid: string,
    @Body() inputModel: CreateUserInputModelType,
  ) {
    return userid;
  }
}

export type CreateUserInputModelType = {
  login: string;
  password: string;
  email: string;
};
