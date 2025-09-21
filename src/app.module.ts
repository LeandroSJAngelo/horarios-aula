import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InfraModule } from './infra/infra.module';
import { UseCaseModule } from './use-cases/usecase.module';

@Module({
  imports: [
    DatabaseModule,   // agora o Pool vem daqui
    InfraModule,
    UseCaseModule
  ],
})
export class AppModule {}
