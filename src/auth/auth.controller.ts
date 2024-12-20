import {
  Controller,
  Post,
  Body,
  Request,
  UseGuards,
  Logger,
  Get,
  Req,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { EmailService } from '../emailer/emailer.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const token = await this.authService.generateToken(req.user);

    const { password, ...userWithoutPassword } = req.user;

    return {
      user: userWithoutPassword,
      ...token,
    };
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    const token = await this.authService.generateToken(user);

    return {
      user,
      ...token,
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = await this.authService.generateResetToken(user.email);

    await this.emailService.sendPasswordResetEmail(user.email, token);

    return { message: 'Password reset link sent to your email' };
  }

  @Post('reset-password')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
  ) {
    const email = await this.authService.verifyResetToken(token);
    if (!email) {
      throw new UnauthorizedException('Invalid or expired token');
    }

    await this.usersService.updatePassword(email, password);

    return { message: 'Password reset successful' };
  }


  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleLogin() {
    this.logger.log('Redirecting to Google login...');
    return { message: 'Redirecting to Google' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any) {
    this.logger.log('Handling Google callback...');
    return this.authService.socialLogin(req.user);
  }

  @Get('facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookLogin() {
    this.logger.log('Redirecting to Facebook login...');
    return { message: 'Redirecting to Facebook' };
  }

  @Get('facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookCallback(@Req() req: any) {
    this.logger.log('Handling Facebook callback...');
    return this.authService.socialLogin(req.user);
  }

  @Get('apple')
  @UseGuards(AuthGuard('apple'))
  async appleLogin() {
    this.logger.log('Redirecting to Apple login...');
    return { message: 'Redirecting to Apple' };
  }

  @Get('apple/callback')
  @UseGuards(AuthGuard('apple'))
  async appleCallback(@Req() req: any) {
    this.logger.log('Handling Apple callback...');
    return this.authService.socialLogin(req.user);
  }
}
