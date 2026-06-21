import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';
import type { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';
import { UpdateUserInput } from '../dto/update-user.input';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(input: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new Error('User not found');
    }

    if (input.email && input.email !== user.email) {
      const emailOwner = await this.userRepository.findByEmail(input.email);

      if (emailOwner && emailOwner.id !== user.id) {
        throw new Error('Email already exists');
      }

      user.changeEmail(input.email);
    }

    if (input.name) {
      user.changeName(input.name);
    }

    return this.userRepository.update(user);
  }
}
