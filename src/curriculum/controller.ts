import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CurriculumDto } from './domain/dto';
import { Curriculum } from './domain/model';
import { CurriculumService } from './service';

@Controller('curriculums')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get('all')
  getFindAll(): Promise<Curriculum[]> {
    return this.curriculumService.findAll();
  }

  @Get(':id')
  getFindOneCurriculum(@Param('id') id: string): Promise<Curriculum> {
    return this.curriculumService.getFindOneCurriculum(id);
  }

  @Post()
  postCreateCurriculum(@Body() body: CurriculumDto): Promise<Curriculum> {
    return this.curriculumService.postCreateCurriculum(body);
  }

  @Put(':id')
  putUpdateCurriculum(
    @Body() body: CurriculumDto,
    @Param('id') id: string,
  ): Promise<CurriculumDto> {
    return this.curriculumService.putUpdateCurriculum(body, id);
  }
}
