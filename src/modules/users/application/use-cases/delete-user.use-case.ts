import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from '../../domain/repositories/user.repository';
import type { UserRepository } from '../../domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    await this.userRepository.delete(id);
  }
}
