import { forwardRef, Module } from "@nestjs/common";
import { ProfessorUseCase } from "./professor.usecase";
import { RoomUseCase } from "./room.usecase";
import { ProfessorDBImpl } from "src/infra/repository/professor.db.impl";
import { RoomDBImpl } from "src/infra/repository/room.db.impl";
import { DatabaseModule } from "src/database/database.module";
import { InfraModule } from "src/infra/infra.module";

@Module({
  imports: [forwardRef(() => InfraModule)],
  providers: [
    ProfessorUseCase,
    RoomUseCase,
  ],
  exports: [ProfessorUseCase, RoomUseCase],
})
export class UseCaseModule {}