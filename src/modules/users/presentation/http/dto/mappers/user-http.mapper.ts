import { UserOutput } from 'src/modules/users/application/dto/user.output';
import { UserResponse } from '../responses/user.response';

export const toResponse = (user: UserOutput): UserResponse => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
};

export const toResponseList = (users: UserOutput[]): UserResponse[] => {
  return users.map((user) => toResponse(user));
};
