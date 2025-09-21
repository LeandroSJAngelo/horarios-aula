import { Inject } from "@nestjs/common";
import { Room } from "../domain/entities/room.entity";
import { RoomRepository } from "../domain/repositories/room.repository";

export class RoomUseCase {
  constructor(@Inject('RoomRepository') private readonly roomRepo: RoomRepository) {}

  async execute(): Promise<Room[]> {
    return this.roomRepo.getRoomSchedules();
  }
}