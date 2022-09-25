import { Module } from '@nestjs/common';
import { ServiceConfig } from './configuration/app.configuration';
import { CurriculumModule } from './curriculum/module';
import { SubjectModule } from './subject/module';

@Module({
  imports: [ServiceConfig, SubjectModule, CurriculumModule],
})
export class AppModule {}
