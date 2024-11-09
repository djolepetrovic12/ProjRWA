import { Test, TestingModule } from '@nestjs/testing';
import { StudyResourceController } from './study-resource.controller';
import { StudyResourceService } from './study-resource.service';

describe('StudyResourceController', () => {
  let controller: StudyResourceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudyResourceController],
      providers: [StudyResourceService],
    }).compile();

    controller = module.get<StudyResourceController>(StudyResourceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
