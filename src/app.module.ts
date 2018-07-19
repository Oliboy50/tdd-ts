import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainReservationModule } from './train-reservation/train-reservation.module';

@Module({
  imports: [TrainReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
