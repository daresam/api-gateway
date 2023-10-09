import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  BROKERS_ADDRESS,
  ClientIds,
  ConsumerGroupIds,
  TokenInjections,
} from '@app/shared/constants';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: TokenInjections.PAYMENT_MICROSERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: ClientIds.PAYMENT_CLIENT_ID,
            brokers: [BROKERS_ADDRESS],
          },
          consumer: {
            groupId: ConsumerGroupIds.PAYMENT_CONSUMER,
          },
        },
      },
    ]),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
