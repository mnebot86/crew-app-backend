import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { HydratedDocument, Types } from 'mongoose';

export type CrewDocument = HydratedDocument<Crew>;

@Schema()
class Address {
  @IsString({ message: 'Street must be a string.' })
  @IsNotEmpty({ message: 'Street is required.' })
  street: string;

  @IsString({ message: 'City must be a string.' })
  @IsNotEmpty({ message: 'City is required.' })
  city: string;

  @IsString({ message: 'State must be a string.' })
  @IsNotEmpty({ message: 'State is required.' })
  state: string;

  @IsString({ message: 'Zip code must be a string.' })
  @IsNotEmpty({ message: 'Zip code is required.' })
  zipCode: string;
}

const AddressSchema = SchemaFactory.createForClass(Address);

@Schema()
export class Crew {
  @Prop({required: false })
  minAge: number;

  @Prop({ required: false  })
  maxAge: number;

  @Prop({ required: true })
  gender: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  locationName: string;

  @Prop({
    required: true,
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  })
  meetingDay: string;

  @Prop({ required: true, type: AddressSchema })
  address: Address;

  @Prop({ required: true, type: String })
  time: string;

  @Prop({ required: true, type: [Types.ObjectId], ref: 'User' })
  leaders: Types.ObjectId[];

  @Prop({ required: false, type: [Types.ObjectId], ref: 'User', default: [] })
  members: Types.ObjectId[];
}

export const CrewSchema = SchemaFactory.createForClass(Crew);
