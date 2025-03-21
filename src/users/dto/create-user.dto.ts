/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'שם משתמש הוא שדה חובה' })
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6, { message: 'הסיסמה חייבת להיות לפחות 6 תווים' })
  password: string;
}
