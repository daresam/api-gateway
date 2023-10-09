import { NestFactory } from '@nestjs/core';
import { AuthServiceModule } from './auth-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { BROKERS_ADDRESS, ConsumerGroupIds } from '@app/shared/constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [BROKERS_ADDRESS],
        },
        consumer: {
          groupId: ConsumerGroupIds.AUTH_CONSUMER,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
