import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersRepository {
  findUsers(term: string) {
    return term;
  }
}
