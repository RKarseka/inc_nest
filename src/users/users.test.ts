import { UsersService } from './users.service';
import { User, UserSchema } from './users-schema';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const usersArray = [
  {
    name: 'Cat #1',
    breed: 'Breed #1',
    age: 4,
  },
  {
    name: 'Cat #2',
    breed: 'Breed #2',
    age: 2,
  },
];

const newUser = {
  login: 'User1',
  email: 'e.mail.com',
  password: 'new password',
};

let mongoMemoryServer: MongoMemoryServer;

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongoMemoryServer = await MongoMemoryServer.create();
      const mongoUri = mongoMemoryServer.getUri();
      return { uri: mongoUri, ...options };
    },
  });

export const closeInMongodConnection = async () => {
  if (mongoMemoryServer) await mongoMemoryServer.stop();
};

describe('integration test for Users', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UsersService],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create User', () => {
    it('should return', async () => {
      const result = await userService.createUser(newUser);
      expect(Object.keys(result).length).toBe(4);
      expect(result.email).toBe('e.mail.com');
      expect(result.login).toBe('User1');
      // console.log('const result = ', result);
    });
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });
});
