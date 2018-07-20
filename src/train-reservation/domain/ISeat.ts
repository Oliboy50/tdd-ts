export interface ISeat {
  number: number;
  coachName: string;
  booking_reference: string;
  is_reserved: boolean;
  id: string;
}

export class Seat implements ISeat {
  number: number;
  coachName: string;
  booking_reference: string;

  constructor(number: number, coachName: string, booking_reference: string) {
    this.number = number;
    this.coachName = coachName;
    this.booking_reference = booking_reference;
  }

  get is_reserved(): boolean {
    return !!this.booking_reference;
  }

  get id(): string {
    return `${this.coachName}${this.number}`;
  }
}
