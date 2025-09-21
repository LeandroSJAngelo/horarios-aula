import { Controller, Get } from "@nestjs/common";
import { SchedulerService } from "../service/schedule.service";

@Controller("schedules")
export class ScheduleController {
  constructor(private readonly schedulerService: SchedulerService) {}

  @Get("professors")
  async getProfessorHours() {
    return this.schedulerService.getProfessorHours();
  }

  @Get("rooms")
  async getRoomSchedules() {
    return this.schedulerService.getRoomSchedules();
  }
}