import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
  Matches,
  IsOptional
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'First name must be a string.' })
  @MaxLength(30, {
    message: 'First name can be a maximum of 30 characters long.',
  })
  @IsNotEmpty({ message: 'First name is required.' })
  readonly firstName: string;

  @IsString({ message: 'Last name must be a string.' })
  @MaxLength(30, {
    message: 'Last name can be a maximum of 30 characters long.',
  })
  @IsNotEmpty({ message: 'Last name is required.' })
  readonly lastName: string;

  @IsOptional()
  @IsString({ message: 'Role must be a string.' })
  readonly role: string;

  @IsString({ message: 'Email must be a string.' })
  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Please provide a valid email address.' })
  readonly email: string;

  @IsString({ message: 'Password must be a string.' })
  @MinLength(8, { message: 'Password must be at least 8 characters long.' })
  @MaxLength(255, {
    message: 'Password can be a maximum of 255 characters long.',
  })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message:
      'Password must contain at least one letter, one number, and one special character.',
  })
  readonly password: string;
}
