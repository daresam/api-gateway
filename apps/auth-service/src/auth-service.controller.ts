import { Controller, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';
import { EventPatterns } from '@app/shared/constants';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUserDto } from '@app/shared/dto';

@Controller()
export class AuthServiceController {
  constructor(private readonly authServiceService: AuthServiceService) {}

  @EventPattern(EventPatterns.create_user)
  handleCreateUser(@Payload(ValidationPipe) data: CreateUserDto) {
    this.authServiceService.createUser(data);
  }

  @MessagePattern(EventPatterns.get_user)
  handleGetUser(@Payload('userId', ParseIntPipe) userId: number) {
    return this.authServiceService.getUser(userId);
  }
}
