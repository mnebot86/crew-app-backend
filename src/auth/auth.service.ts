import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  async generateJwtToken(user: any) {
    const payload = { id: user._id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    const { password: _, ...result } = user;

    return result;
}

  async generateToken(user: any) {
    const payload = { email: user.email, id: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async generateResetToken(email: string): Promise<string> {
    const secret = this.configService.get<string>('RESET_TOKEN_SECRET');
    const expiresIn = this.configService.get<string>('RESET_TOKEN_EXPIRATION', '1h');

    return jwt.sign({ email }, secret, { expiresIn });
  }

  async verifyResetToken(token: string): Promise<string | null> {
    try {
      const secret = this.configService.get<string>('RESET_TOKEN_SECRET');
      const decoded = jwt.verify(token, secret) as { email: string };

      return decoded.email;
    } catch (error) {
      return null;
    }
  }

  async socialLogin(user: any) {
    let existingUser = await this.usersService.getUserByEmail(user.email);

    if (!existingUser) {
      existingUser = await this.usersService.createUser({
        email: user.email,
        password: null,
      });
    }

    const token = await this.generateToken(existingUser);
    return { user: existingUser, ...token };
  }
}
