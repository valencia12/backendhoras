import { Test, TestingModule } from '@nestjs/testing';
import { SubjectController } from './controller';
import { SubjectService } from './service';

describe('SubjectController', () => {
  let subjectController: SubjectController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SubjectController],
      providers: [SubjectService],
    }).compile();

    subjectController = app.get<SubjectController>(SubjectController);
  });

  describe('first-mock', () => {
    it('it will return syllabus with 44 items', async () => {
      expect((await subjectController.getMockSyllabus()).length).toBe(44);
    });
  });
});
