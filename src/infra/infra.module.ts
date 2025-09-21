import { Module } from "@nestjs/common";
import { ScheduleController } from "./controller/schedule.controller";
import { ProfessorDBImpl } from "./database/professor.db.impl";
import { ProfessorUseCase } from "src/use-cases/professor.usecase";
import { SchedulerService } from "./service/schedule.service";
import { RoomDBImpl } from "./database/room.db.impl";
import { RoomUseCase } from "src/use-cases/room.usecase";

@Module({
  imports: [],
  controllers: [ScheduleController],
  providers: [
    {
      provide: 'ProfessorRepository',
      useClass: ProfessorDBImpl,
    },
    ProfessorUseCase,
    {
      provide: 'RoomRepository',
      useClass: RoomDBImpl,
    },
    RoomUseCase,
    SchedulerService,
  ],
})
export class InfraModule {}