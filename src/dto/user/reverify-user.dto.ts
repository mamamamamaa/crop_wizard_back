import { IsEmail } from 'class-validator';

export class ReverifyUserDto {
  @IsEmail()
  readonly email: string;
}
