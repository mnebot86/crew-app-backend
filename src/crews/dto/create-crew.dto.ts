import {
	IsNotEmpty,
	IsString,
	MaxLength,
	IsEnum,
	ValidateNested,
	IsOptional,
	IsArray,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class AddressDto {
	@IsString({ message: 'Street must be a string.' })
	@IsNotEmpty({ message: 'Street is required.' })
	readonly street: string;
  
	@IsString({ message: 'Address 2 must be a string.' })
	@IsOptional()
	readonly address2?: string;
  
	@IsString({ message: 'Address 3 must be a string.' })
	@IsOptional()
	readonly address3?: string;
  
	@IsString({ message: 'City must be a string.' })
	@IsNotEmpty({ message: 'City is required.' })
	readonly city: string;
  
	@IsString({ message: 'State must be a string.' })
	@IsNotEmpty({ message: 'State is required.' })
	readonly state: string;
  
	@IsString({ message: 'Zip code must be a string.' })
	@IsNotEmpty({ message: 'Zip code is required.' })
	readonly zipCode: string;
  }
  
  export class CreateCrewDto {
	@IsString({ message: 'Name must be a string.' })
	@MaxLength(30, {
	  message: 'Name can be a maximum of 30 characters long.',
	})
	@IsNotEmpty({ message: 'Name is required.' })
	readonly name: string;
  
	@IsString({ message: 'Description must be a string.' })
	@MaxLength(255, {
	  message: 'Description can be a maximum of 255 characters long.',
	})
	@IsNotEmpty({ message: 'Description is required.' })
	readonly description: string;
  
	@IsEnum(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], {
	  message: 'Meeting day must be one of the days of the week.',
	})
	@IsNotEmpty({ message: 'Meeting day is required.' })
	readonly meetingDay: string;
  
	@IsString({ message: 'Location name must be a string.' })
	@MaxLength(30, {
	  message: 'Location name can be a maximum of 30 characters long.',
	})
	@IsNotEmpty({ message: 'Location name is required.' })
	readonly locationName: string;
  
	@ValidateNested({ message: 'Address must be a valid object.' })
	@Type(() => AddressDto)
	readonly address: AddressDto;
  
	@IsString({ message: 'Time must be a string.' })
	@IsNotEmpty({ message: 'Time is required.' })
	readonly time: string;
  
	@IsArray({ message: 'Leaders must be an array.' })
	@IsNotEmpty({ message: 'Leaders are required.' })
	readonly leaders: string[];
  
	@IsArray({ message: 'Members must be an array.' })
	@IsOptional()
	readonly members?: string[];
  }
  