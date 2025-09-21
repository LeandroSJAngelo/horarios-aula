import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders, DatabaseService],
  exports: [DatabaseService], // exporta o service para os outros módulos
})
export class DatabaseModule {}
