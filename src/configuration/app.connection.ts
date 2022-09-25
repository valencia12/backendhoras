import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConfig } from './app.environment';

const conn = process.env.MONGO_DB;

@Module({
  imports: [EnvironmentConfig, MongooseModule.forRoot(conn)],
})
export class MongoConnection {}
