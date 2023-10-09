import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { MakePaymentDto } from '@app/shared/dto/make-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  makePayment(@Body(ValidationPipe) makePaymentDto: MakePaymentDto) {
    return this.paymentService.makePayment(makePaymentDto);
  }
}
