export class Room {
  id: number;
  name: string;
  dayOfWeek?: string;
  startTime?: string;
  endTime?: string;
  status?: string;

  constructor(
    id: number,
    name: string,
    dayOfWeek?: string,
    startTime?: string,
    endTime?: string,
    status?: string,
  ){
    this.id = id;
    this.name = name;
    this.dayOfWeek = dayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = status;
  }
}