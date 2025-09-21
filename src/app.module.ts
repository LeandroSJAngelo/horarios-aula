import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { InfraModule } from './infra/infra.module';

@Module({
  imports: [
    DatabaseModule,   // agora o Pool vem daqui
    InfraModule,
  ],
})
export class AppModule {}
