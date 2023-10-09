import { Module } from '@nestjs/common';
import { PaymentServiceController } from './payment-service.controller';
import { PaymentServiceService } from './payment-service.service';
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
        name: TokenInjections.AUTH_MICROSERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: ClientIds.AUTH_CLIENT_ID,
            brokers: [BROKERS_ADDRESS],
          },
          consumer: {
            groupId: ConsumerGroupIds.AUTH_CONSUMER,
          },
        },
      },
    ]),
  ],
  controllers: [PaymentServiceController],
  providers: [PaymentServiceService],
})
export class PaymentServiceModule {}
