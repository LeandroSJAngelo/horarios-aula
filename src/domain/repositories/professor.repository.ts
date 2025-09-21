import { Professor } from "../entities/professor.entity";

export interface ProfessorRepository {
  getProfessorHours(): Promise<Professor[]>;
}