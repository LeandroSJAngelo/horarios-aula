import { Inject, Injectable } from "@nestjs/common";
import { Professor } from "../domain/entities/professor.entity";
import { ProfessorRepository } from "../domain/repositories/professor.repository";

@Injectable()
export class ProfessorUseCase {
  constructor(
    @Inject('ProfessorRepository')
    private readonly professorRepo: ProfessorRepository) {}

  async execute(): Promise<Professor[]> {
    return this.professorRepo.getProfessorHours();
  }
}