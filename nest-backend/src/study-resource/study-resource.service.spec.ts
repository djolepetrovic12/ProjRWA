import { Test, TestingModule } from '@nestjs/testing';
import { StudyResourceService } from './study-resource.service';

describe('StudyResourceService', () => {
  let service: StudyResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudyResourceService],
    }).compile();

    service = module.get<StudyResourceService>(StudyResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
