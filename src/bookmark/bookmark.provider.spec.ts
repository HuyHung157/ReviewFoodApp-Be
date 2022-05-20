import { Test, TestingModule } from '@nestjs/testing';
import { BookmarkProvider } from './bookmark.provider';

describe('BookmarkProvider', () => {
  let provider: BookmarkProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarkProvider],
    }).compile();

    provider = module.get<BookmarkProvider>(BookmarkProvider);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
