import { Module } from '@nestjs/common';
import { AuthServiceController } from './auth-service.controller';
import { AuthServiceService } from './auth-service.service';
import { UsersRepository } from './user.repository';

@Module({
  imports: [],
  controllers: [AuthServiceController],
  providers: [AuthServiceService, UsersRepository],
})
export class AuthServiceModule {}
