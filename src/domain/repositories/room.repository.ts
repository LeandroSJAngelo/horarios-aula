import { Room } from "../entities/room.entity";

export interface RoomRepository {
  getRoomSchedules(): Promise<Room[]>;
}