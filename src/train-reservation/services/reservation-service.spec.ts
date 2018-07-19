import { ReservationService } from './reservation-service';
import {ICoach} from "../domain/ICoach";
import {Seat} from "../domain/ISeat";
import {ITrain, Train} from "../domain/ITrain";

describe('ReservationService', () => {
  let provider: ReservationService;
  let get_train_data_result: ITrain;
  let bookingReferenceService;
  let trainDataService;

  beforeEach(async () => {
    jest.resetAllMocks();
    bookingReferenceService = {
      get_reference: jest.fn(() => Promise.resolve("foo bar"))
    };

    trainDataService =  {
      get_train_data: jest.fn((train_id) => get_train_data_result)
    };

    provider = new ReservationService(bookingReferenceService, trainDataService)

  });

  describe('book_seats', () => {

    describe('when the train is empty', () => {

      it('books the first seat when we want to book 1 seat', async () => {
        get_train_data_result = new Train([
          {
            name: 'A',
            seats: [
              new Seat(1, 'A', ''),
              new Seat(2, 'A', ''),
              new Seat(3, 'A', ''),
              new Seat(4, 'A', ''),
            ]
          }
        ]);

        const trainId = 'fooBar';
        const result = await provider.book_seats(trainId, 1);
        expect(bookingReferenceService.get_reference).toHaveBeenCalled();
        expect(trainDataService.get_train_data).toHaveBeenCalledWith(trainId);
        expect(result.seats).toEqual(['A1'])
      });

      it('fails when we want to book more seats than available', async () => {
        get_train_data_result = new Train(
          [
            {
              name: 'A',
              seats: [
                new Seat(1, 'A', ''),
                new Seat(2, 'A', ''),
                new Seat(3, 'A', ''),
                new Seat(4, 'A', ''),
              ]
            }
          ]
        );
        const trainId = 'fooBar';
        await expect(provider.book_seats(trainId, 10)).rejects.toEqual(new Error("Train capacity too low"))
      })

    });

    describe('when the train would reached > 70% capacity', () => {

      it('should throw an exception', async () => {
        get_train_data_result = new Train([
          {
            name: 'A',
            seats: [
              new Seat(1, 'A', 'reserved'),
              new Seat(2, 'A', 'reserved'),
              new Seat(3, 'A', 'reserved'),
              new Seat(4, 'A', 'reserved'),
              new Seat(5, 'A', 'reserved'),
              new Seat(6, 'A', 'reserved'),
              new Seat(7, 'A', ''),
              new Seat(8, 'A', ''),
              new Seat(9, 'A', ''),
              new Seat(10, 'A', ''),
            ]
          }
        ]);

        const trainId = 'fooBar';
        await expect(provider.book_seats(trainId, 3)).rejects.toEqual(new Error("Train capacity too low"))
        expect(bookingReferenceService.get_reference).not.toHaveBeenCalled();
        expect(trainDataService.get_train_data).toHaveBeenCalledWith(trainId);
      });

    })

  })
});
