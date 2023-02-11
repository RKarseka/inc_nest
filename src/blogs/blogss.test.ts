import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { BlogsService } from './blogs.serrvice';
import { Blog, BlogSchema } from './blog.schema';
import { compareObjectsProperties } from '../helpers/forMongoose';

let mongoMemoryServer: MongoMemoryServer;

const newBlog = {
  name: 'Blog name',
  description: 'Description',
  websiteUrl: 'https://GM.com',
};

const responcseProperties = [
  'id',
  'name',
  'description',
  'websiteUrl',
  'createdAt',
  'isMembership',
];

export const rootMongooseTestModule = (options: MongooseModuleOptions = {}) =>
  MongooseModule.forRootAsync({
    useFactory: async () => {
      mongoMemoryServer = await MongoMemoryServer.create();
      const mongoUri = mongoMemoryServer.getUri();
      return { uri: mongoUri, ...options };
    },
  });

export const closeInMongoConnection = async () => {
  if (mongoMemoryServer) await mongoMemoryServer.stop();
};

describe('integration test for Blogs', () => {
  let blogService: BlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
      ],
      providers: [BlogsService],
    }).compile();

    blogService = module.get<BlogsService>(BlogsService);
  });

  it('should be defined', () => {
    expect(blogService).toBeDefined();
  });

  describe('create Blog', () => {
    it('should return', async () => {
      const result = await blogService.createBlog(newBlog);
      console.log('const result = ', result);
      expect(compareObjectsProperties(result, responcseProperties)).toEqual(
        true,
      );
      expect(Object.keys(result).length).toBe(6);
      expect(result.name).toBe('Blog name');
      expect(result.description).toBe('Description');
      expect(result.websiteUrl).toBe('https://GM.com');
      const result2 = await blogService.getBlogs();
    });

    it('count blogs', async () => {
      const result = await blogService.getBlogs();
    });
  });

  describe('get Blogs', () => {});

  afterAll(async () => {
    await closeInMongoConnection();
  });
});
