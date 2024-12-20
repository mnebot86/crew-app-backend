import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { AppleStrategy } from './strategies/apple-strategy';
import { GoogleAuthStrategy } from './strategies/google-strategies';
import {
  FacebookStrategy
  
 } from './strategies/facebook.strategy';
import { EmailModule } from '../emailer/emailer.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
    EmailModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, AppleStrategy, GoogleAuthStrategy, FacebookStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {};
