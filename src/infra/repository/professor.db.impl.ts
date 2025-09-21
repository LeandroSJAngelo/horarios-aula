import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { Professor } from "src/domain/entities/professor.entity";
import { ProfessorRepository } from "src/domain/repositories/professor.repository";

@Injectable()
export class ProfessorDBImpl implements ProfessorRepository {
  constructor(private readonly db: DatabaseService) {}

  async getProfessorHours(): Promise<Professor[]> {
    const result = await this.db.query(
      `
      SELECT
        p.id, p.name,
        COALESCE(SUM(EXTRACT(EPOCH FROM (cs.end_time - cs.start_time)) / 3600),0) AS total_hours
      FROM professor p
      LEFT JOIN subject s ON s.professor_id = p.id
      LEFT JOIN class c ON c.subject_id = s.id
      LEFT JOIN class_schedule cs ON cs.class_id = c.id
      GROUP BY p.id, p.name
      ORDER BY total_hours DESC;
      `,
    );

    const pfHrs = result.rows.map(r => new Professor(r.id, r.name, parseFloat(r.total_hours)));

    return pfHrs;
  }
}