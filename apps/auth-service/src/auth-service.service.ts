import { CreateUserDto } from '@app/shared/dto';
import { User } from '@app/shared/entities';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';

@Injectable()
export class AuthServiceService {
  constructor(private readonly usersRepository: UsersRepository) {}

  createUser(data: CreateUserDto): void {
    this.usersRepository.save(data);
  }

  getUser(id: number): User {
    return this.usersRepository.findOne(id);
  }
}
