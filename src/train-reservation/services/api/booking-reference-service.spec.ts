import { Test, TestingModule } from '@nestjs/testing';
import { BookingReferenceService } from './booking-reference-service';

describe('BookingReferenceService', () => {
  let provider: BookingReferenceService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookingReferenceService],
    }).compile();
    provider = module.get<BookingReferenceService>(BookingReferenceService);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
