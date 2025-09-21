import { ScheduleController } from "./schedule.controller";


describe('ScheduleController', () => {
  it('GET /professors retorna carga horária', async () => {
    const mockService = { getProfessorHours: jest.fn().mockResolvedValue([{ id:1, name:'Girafales', totalHours:4 }]) } as any;
    const controller = new ScheduleController(mockService);
    const result = await controller.getProfessorHours();
    expect(result).toEqual([{ id:1, name:'Girafales', totalHours:4 }]);
    expect(mockService.getProfessorHours).toHaveBeenCalled();
  });
});
