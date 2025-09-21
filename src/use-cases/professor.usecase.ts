import { Professor } from "../domain/entities/professor.entity";
import { ProfessorRepository } from "../domain/repositories/professor.repository";

export class ProfessorUseCase {
  constructor(private readonly professorRepo: ProfessorRepository) {}

  async execute(): Promise<Professor[]> {
    return this.professorRepo.getProfessorHours();
  }
}