import { Controller, ValidationPipe } from '@nestjs/common';
import { PaymentServiceService } from './payment-service.service';
import { EventPatterns } from '@app/shared/constants';
import { MakePaymentDto } from '@app/shared/dto/make-payment.dto';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class PaymentServiceController {
  constructor(private readonly paymentServiceService: PaymentServiceService) {}

  @EventPattern(EventPatterns.process_payment)
  handleProcessPayment(@Payload(ValidationPipe) data: MakePaymentDto) {
    this.paymentServiceService.processPayment(data);
  }
}
