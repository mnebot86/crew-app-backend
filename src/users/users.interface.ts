import { Document, Types } from 'mongoose';

export interface IUser {
  _id: string | Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password?: string;
}

export interface IUserDocument extends Omit<IUser, '_id'>, Document {
  _id: Types.ObjectId;
}

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}