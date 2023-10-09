import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
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
          producerOnlyMode: true,
          consumer: {
            groupId: ConsumerGroupIds.AUTH_CONSUMER,
          },
        },
      },
    ]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
