import { Injectable } from "@nestjs/common";
import { ProfessorUseCase } from "src/use-cases/professor.usecase";
import { RoomUseCase } from "src/use-cases/room.usecase";

@Injectable()
export class SchedulerService {
  constructor(
    private readonly professorUseCase: ProfessorUseCase,
    private readonly roomUseCase: RoomUseCase,
  ) {}

  async getProfessorHours() {
    return this.professorUseCase.execute();
  }

  async getRoomSchedules() {
    return this.roomUseCase.execute();
  }

}