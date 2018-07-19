import { Test, TestingModule } from '@nestjs/testing';
import { TrainDataService } from './train-data-service';

describe('TrainDataService', () => {
  let provider: TrainDataService;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainDataService],
    }).compile();
    provider = module.get<TrainDataService>(TrainDataService);
  });
  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
