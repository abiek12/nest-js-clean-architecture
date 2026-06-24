import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserRequestDto {
  @IsString()
  @MinLength(2)
  @MaxLength(100)
  name!: string;

  @IsEmail()
  email!: string;
}
