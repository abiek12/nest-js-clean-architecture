import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateUserUseCase } from 'src/modules/users/application/use-cases/create-user.use-case';
import { CreateUserRequestDto } from '../dto/requests/create-user.request';
import { successResponse } from 'src/shared/interfaces/api-response.interface';
import { GetUserByIdUseCase } from 'src/modules/users/application/use-cases/get-user-by-id.use-case';
import { GetAllUsersUseCase } from 'src/modules/users/application/use-cases/get-all-users.use-case';
import { UpdateUserRequestDto } from '../dto/requests/update-user.request';
import { UpdateUserUseCase } from 'src/modules/users/application/use-cases/update-user.use-case';
import { toResponse, toResponseList } from '../dto/mappers/user-http.mapper';

@Controller('users')
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
  ) {}

  @Post()
  async createUser(@Body() body: CreateUserRequestDto) {
    const user = await this.createUserUseCase.execute({
      name: body.name,
      email: body.email,
    });

    return successResponse('User created successfully!', toResponse(user));
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const user = await this.getUserByIdUseCase.execute(id);

    return successResponse('User fetched successfully', toResponse(user));
  }

  @Get()
  async getAllUsers() {
    const users = await this.getAllUsersUseCase.execute();

    return successResponse('All users fetched successfully!', toResponseList(users));
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserRequestDto) {
    const user = await this.updateUserUseCase.execute({
      id,
      name: body.name,
      email: body.email,
    });

    return successResponse('User updated successfully!', toResponse(user));
  }
}
