import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { SubjectService } from './service';
import { SubjectDto } from './domain/dto';
import { Subject } from './domain/model';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Get('/all')
  getFindAll(): Promise<SubjectDto[]> {
    return this.subjectService.getFindAll();
  }

  @Get(':id')
  getFindOneSubject(@Param('id') id: string): Promise<Subject> {
    return this.subjectService.getFindOneSubject(id);
  }

  @Post()
  postCreateRecord(@Body() body: SubjectDto): Promise<SubjectDto> {
    return this.subjectService.postCreateSubject(body);
  }

  @Put(':id')
  putUpdateSubject(
    @Body() body: SubjectDto,
    @Param('id') id: string,
  ): Promise<SubjectDto> {
    return this.subjectService.putUpdateSubject(body, id);
  }

  @Get('/mock-file')
  getMockSyllabus(): Promise<Subject[]> {
    return this.subjectService.getMockFile();
  }

  @Post('/mock-upload')
  postUploadMockSubjects(): Promise<Subject[]> {
    return this.subjectService.postUploadMockSyllabus();
  }
}
