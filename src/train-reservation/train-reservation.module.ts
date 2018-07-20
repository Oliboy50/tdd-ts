import { Module } from '@nestjs/common';
import { ReservationService } from './services/reservation-service';
import { TrainDataService } from './services/api/train-data-service';
import { BookingReferenceService } from './services/api/booking-reference-service';

@Module({
  providers: [ReservationService, TrainDataService, BookingReferenceService],
})
export class TrainReservationModule {}
