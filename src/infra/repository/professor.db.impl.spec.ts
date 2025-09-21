import { DatabaseService } from '../../database/database.service';
import { Professor } from '../../domain/entities/professor.entity';
import { ProfessorDBImpl } from './professor.db.impl';

describe('ProfessorRepositoryImpl', () => {
  let repo: ProfessorDBImpl;
  let mockDb: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    mockDb = {
      query: jest.fn(),
      getClient: jest.fn()
    } as any;

    repo = new ProfessorDBImpl(mockDb);
  });

  it('deve retornar a carga horária total de cada professor', async () => {
    mockDb.query.mockResolvedValueOnce({
      rows: [
        { id: 1, name: 'Girafales', total_hours: '4' },
        { id: 2, name: 'Chaves', total_hours: '2' },
      ],
    } as any);

    const result = await repo.getProfessorHours();

    expect(result).toEqual([
      new Professor(1, 'Girafales', 4),
      new Professor(2, 'Chaves', 2),
    ]);

    expect(mockDb.query).toHaveBeenCalled();
    expect(mockDb.query).toHaveBeenCalledWith(expect.stringContaining('COALESCE(SUM(EXTRACT(EPOCH'));
  });

  it('deve retornar array vazio quando não há resultados', async () => {
    mockDb.query.mockResolvedValueOnce({ rows: [] } as any);
    const result = await repo.getProfessorHours();
    expect(result).toEqual([]);
  });
});
