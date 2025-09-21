import { Module } from "@nestjs/common";
import { ScheduleController } from "./controller/schedule.controller";
import { ProfessorDBImpl } from "./repository/professor.db.impl";
import { ProfessorUseCase } from "src/use-cases/professor.usecase";
import { SchedulerService } from "./service/schedule.service";
import { RoomDBImpl } from "./repository/room.db.impl";
import { RoomUseCase } from "src/use-cases/room.usecase";
import { DatabaseModule } from "src/database/database.module";
import { UseCaseModule } from "src/use-cases/usecase.module";

@Module({
  imports: [DatabaseModule, UseCaseModule],
  controllers: [ScheduleController],
  providers: [
    SchedulerService,
    {
      provide: 'ProfessorRepository',
      useClass: ProfessorDBImpl,
    },
    {
      provide: 'RoomRepository',
      useClass: RoomDBImpl,
    },
  ],
  exports: ['ProfessorRepository', 'RoomRepository'],
})
export class InfraModule {}