import axios from 'axios';
import { groupBy, values, mapObjIndexed, toPairs } from 'ramda';
import { Injectable } from '@nestjs/common';
import { Coach, ICoach } from '../../domain/ICoach';
import { Seat } from '../../domain/ISeat';
import { ITrain } from '../../domain/ITrain';

export interface ITrainDataService {
  get_train_data(train_id: string): Promise<ITrain>;
}

@Injectable()
export class TrainDataService implements ITrainDataService {
  private static service_url: string =
    process.env['TDS_URL'] || 'http://localhost:8081';
  private static client = axios.create({
    baseURL: TrainDataService.service_url,
  });

  get_train_data(train_id: string): Promise<ITrain> {
    interface apiReturn {
      seats: {
        [seat_id: string]: {
          booking_reference: string;
          seat_number: string;
          coach: string;
        };
      };
    }

    return TrainDataService.client
      .get(`data_for_train/${train_id}`)
      .then(response => response.data as apiReturn)
      .then(apiReturn => {
        const seats = values(apiReturn.seats);
        const groupedSeats = groupBy(seat => seat.coach, seats);

        const coaches: Coach[] = toPairs(groupedSeats).map(
          ([coachName, seats]) =>
            new Coach(
              coachName,
              seats.map(
                s =>
                  new Seat(
                    Number(s.seat_number),
                    coachName,
                    s.booking_reference,
                  ),
              ),
            ),
        );

        return {
          coaches,
        };
      });
  }
}
