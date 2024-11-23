import { User } from './user.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop({ required: true })
  @IsDate({ message: 'Date of Birth must be a valid date' })
  dob: Date;

  @Prop({ required: true })
  @IsNumber({}, { message: 'Age must be a number' })
  age: number;

  @Prop({ required: true })
  @IsString({ message: 'Gender must be a string' })
  @IsNotEmpty({ message: 'Gender is required' })
  gender: string;

  @Prop({ required: true })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName: string;

  @Prop({ required: true })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  lastName: string;

  @Prop({ required: true, ref: 'User' })
  @IsNotEmpty({ message: 'User reference is required' })
  user: Types.ObjectId;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
