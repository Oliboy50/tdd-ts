import { Injectable } from '@nestjs/common';
import axios from 'axios';

export interface IBookingReferenceService {
  get_reference(): Promise<string>;
}

@Injectable()
export class BookingReferenceService implements IBookingReferenceService {
  private service_url: string =
    process.env['BR_URL'] || 'http://localhost:8082';
  private client = axios.create({
    baseURL: this.service_url,
  });

  get_reference(): Promise<string> {
    return this.client
      .get('/booking_reference')
      .then(response => response.data as string);
  }
}
