import {Inject, Injectable} from '@nestjs/common';
import { chain, partition } from 'ramda';
import {ICoach} from "../domain/ICoach";
import {IBookingConfirmation} from "../domain/IBookingConfirmation";
import {IBookingReferenceService} from "./api/booking-reference-service";
import {ISeat} from "../domain/ISeat";
import {ITrainDataService} from "./api/train-data-service";
import {ITrain} from "../domain/ITrain";

export interface IReservationService {
  book_seats(train_id: string, number_seats: number): Promise<IBookingConfirmation>
}

@Injectable()
export class ReservationService implements IReservationService {

  constructor(
    @Inject('IBookingReferenceService')  private readonly bookingReferenceService: IBookingReferenceService,
    @Inject('ITrainDataService') private readonly trainDataService: ITrainDataService,
  ) {}

  private static get_bookable_seats(number_seats, train: ITrain): ISeat[] {

    const overallSeats: ISeat[] = chain((coach => coach.seats), train.coaches);
    const [overallReservedSeats, overallEmptySeats] = partition(seat => seat.is_reserved, overallSeats);

    const trainHasEnoughEmptySeats = number_seats <= overallEmptySeats.length;
    const trainWouldHaveMoreThan70PercentReservedSeats = (overallReservedSeats.length + number_seats) > Math.ceil(overallSeats.length * 0.7);

    if (!trainHasEnoughEmptySeats || trainWouldHaveMoreThan70PercentReservedSeats) {
      throw new Error("Train capacity too low");
    }

    return overallSeats.slice(0, number_seats);
  }

  async book_seats(train_id: string, number_seats: number): Promise<IBookingConfirmation> {
    const train_topology = await this.trainDataService.get_train_data(train_id);
    const bookable_seats = ReservationService.get_bookable_seats(number_seats, train_topology);
    const bookingReference = await this.bookingReferenceService.get_reference();

    return {
      bookingReference,
      seats: bookable_seats.map(s => s.id)
    }
  }

}
