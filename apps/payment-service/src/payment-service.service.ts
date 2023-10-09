import { EventPatterns, TokenInjections } from '@app/shared/constants';
import { MakePaymentDto } from '@app/shared/dto/make-payment.dto';
import { User } from '@app/shared/entities';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentServiceService implements OnModuleInit {
  constructor(
    @Inject(TokenInjections.AUTH_MICROSERVICE)
    private readonly authClient: ClientKafka,
  ) {}

  /**
   *
   * @param makePaymentDto
   * Instead of using the emit() method to publish the get_user event,
   * use the send() method. The send() method enables you to use a callback to
   * subscribe to the reply of an event.
   */
  processPayment(makePaymentDto: MakePaymentDto) {
    const { userId, amount } = makePaymentDto;
    console.log('process Payment');

    this.authClient
      .send(EventPatterns.get_user, JSON.stringify({ userId }))
      .subscribe((user: User) => {
        console.log(
          `process payment for user ${user.name} - amount: ${amount}`,
        );
      });
  }

  onModuleInit() {
    this.authClient.subscribeToResponseOf(EventPatterns.get_user);
  }
}
