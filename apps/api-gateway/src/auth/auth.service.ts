import { EventPatterns, TokenInjections } from '@app/shared/constants';
import { CreateUserDto } from '@app/shared/dto';
import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject(TokenInjections.AUTH_MICROSERVICE)
    private readonly authClient: ClientKafka,
  ) {}

  createUser(createUserDto: CreateUserDto) {
    this.authClient.emit(
      EventPatterns.create_user,
      JSON.stringify(createUserDto),
    );
  }
}
