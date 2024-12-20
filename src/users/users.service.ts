import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, UserData } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserData> {
    const { email, password: plainPassword } = createUserDto;

    const existingUser = await this.userModel.findOne({ email }).exec();

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltOrRounds);

    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });

    await newUser.save();

    const { password, ...userWithoutPassword } = newUser.toObject();

    return userWithoutPassword as UserData;
  }

  async getUserByEmail(email: string): Promise<IUser | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }

  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      userId,
      updateUserDto,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }

    return existingUser;
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) throw new NotFoundException('User not found.');

    if (newPassword.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
  }

  async getUserById(userId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(userId).exec();

    if (!existingUser) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }

    return existingUser;
  }

  async deleteUser(userId: string): Promise<IUser> {
    const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID "${userId}" not found.`);
    }

    return deletedUser;
  }
}
