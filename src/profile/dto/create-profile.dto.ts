import {
	IsNotEmpty,
	IsString,
	Validate,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments,
	IsOptional,
  } from 'class-validator';
  
  @ValidatorConstraint({ name: 'IsISO8601', async: false })
  export class IsISO8601Constraint implements ValidatorConstraintInterface {
	validate(value: any): boolean {
	  return !isNaN(Date.parse(value));
	}
  
	defaultMessage(args: ValidationArguments): string {
	  return `${args.property}: Date of Birth must be a valid ISO 8601 date string.`;
	}
  }
  
  export class CreateProfileDto {
	@IsNotEmpty({ message: 'Date of Birth is required.' })
	@Validate(IsISO8601Constraint)
	dob: string;
  
	@IsNotEmpty({ message: 'Gender is required.' })
	@IsString({ message: 'Gender must be a string.' })
	gender: string;
  
	@IsNotEmpty({ message: 'First name is required.' })
	@IsString({ message: 'First name must be a string.' })
	firstName: string;
  
	@IsNotEmpty({ message: 'Last name is required.' })
	@IsString({ message: 'Last name must be a string.' })
	lastName: string;
	  
	@IsOptional({ message: 'User reference is required.' })
    @IsString({ message: 'User reference must be a string.' })
    user: string;
  }
