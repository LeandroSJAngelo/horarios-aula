import { DatabaseService } from "src/database/database.service";
import { ProfessorDBImpl } from "./professor.db.impl";
import { Professor } from "src/domain/entities/professor.entity";


describe('ProfessorRepositoryImpl', () => {
  let repository: ProfessorDBImpl;
  let mockDbService: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    mockDbService = {
      query: jest.fn(),
      getClient: jest.fn(),
    } as any;

    repository = new ProfessorDBImpl(mockDbService);
  });

  it('deve retornar a carga horária total de cada professor', async () => {
    mockDbService.query.mockResolvedValueOnce({
      rows: [
        { id: 1, name: 'Professor Girafales', total_hours: '20' },
        { id: 2, name: 'Professor Linguiça', total_hours: '15' },
      ],
    } as any);

    const result = await repository.getProfessorHours();

    expect(result).toEqual([
      new Professor(1, 'Professor Girafales', 20),
      new Professor(2, 'Professor Linguiça', 15),
    ]);

    expect(mockDbService.query).toHaveBeenCalled();
  });

  it('deve retornar lista vazia se não houver professores', async () => {
    mockDbService.query.mockResolvedValueOnce({ rows: [] } as any);

    const result = await repository.getProfessorHours();

    expect(result).toEqual([]);
  });
});
