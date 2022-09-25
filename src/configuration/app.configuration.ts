import { Module } from '@nestjs/common';
import { MongoConnection } from './app.connection';
import { EnvironmentConfig } from './app.environment';

@Module({
  imports: [EnvironmentConfig, MongoConnection],
})
export class ServiceConfig {}
