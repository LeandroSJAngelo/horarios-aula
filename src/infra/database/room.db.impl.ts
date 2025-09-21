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
          r.id, r.name,
          cs.day_of_week,
          cs.start_time,
          cs.end_time,
          'ocupado' AS status
      FROM room r
      JOIN class_schedule cs ON r.id = cs.room_id
      ORDER BY r.id, cs.day_of_week, cs.start_time;
    `);

    return result.rows.map(r =>
      new Room(r.id, r.name, r.day_of_week, r.start_time, r.end_time, r.status)
    );
  }
}