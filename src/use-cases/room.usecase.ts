import { Room } from "../domain/entities/room.entity";
import { RoomRepository } from "../domain/repositories/room.repository";

export class RoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async execute(): Promise<Room[]> {
    return this.roomRepo.getRoomSchedules();
  }
}