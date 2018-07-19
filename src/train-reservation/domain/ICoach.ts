import {ISeat} from "./ISeat";

export interface ICoach {
  name: string,
  seats: ISeat[]
}

export class Coach implements ICoach {
  seats: ISeat[];
  name: string;

  constructor(name: string, seats: ISeat[]) {
    this.seats = seats;
    this.name = name;
  }
}