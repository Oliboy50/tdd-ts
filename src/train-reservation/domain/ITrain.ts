import {ICoach} from "./ICoach";

export interface ITrain {
  coaches: ICoach[],
}

export class Train implements ITrain {
  constructor(public coaches: ICoach[]) {}
}