import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Room } from "src/domain/entities/room.entity";
import { RoomRepository } from "src/domain/repositories/room.repository";

@Injectable()
export class RoomDBImpl implements RoomRepository {
  constructor(private readonly db: DatabaseService) {}

  async getRoomSchedules(): Promise<Room[]> {
    const result = await this.db.query(`
      SELECT
        r.id,
        r.name,
        cs.day_of_week,
        cs.start_time,
        cs.end_time
      FROM room r
      LEFT JOIN class_schedule cs ON cs.room_id = r.id
      ORDER BY r.name, cs.day_of_week, cs.start_time;
    `);

    const roomSc =  result.rows.map(r => {
      const status = r.start_time ? 'occupied' : 'available';
      return new Room(r.id, r.name, r.day_of_week, r.start_time, r.end_time, status);
    });

    return roomSc;
  }
}