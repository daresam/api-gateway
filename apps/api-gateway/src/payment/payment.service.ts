import { EventPatterns, TokenInjections } from '@app/shared/constants';
import { MakePaymentDto } from '@app/shared/dto/make-payment.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(TokenInjections.PAYMENT_MICROSERVICE)
    private readonly payentClient: ClientKafka,
  ) {}

  makePayment(makePaymentDto: MakePaymentDto) {
    this.payentClient.emit(
      EventPatterns.process_payment,
      JSON.stringify(makePaymentDto),
    );
  }
}
