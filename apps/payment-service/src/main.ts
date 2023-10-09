import { NestFactory } from '@nestjs/core';
import { PaymentServiceModule } from './payment-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BROKERS_ADDRESS, ConsumerGroupIds } from '@app/shared/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [BROKERS_ADDRESS],
        },
        consumer: {
          groupId: ConsumerGroupIds.PAYMENT_CONSUMER,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
