import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      
      return result;
    }

    return null;
  }

  async generateJwtToken(user: any): Promise<string> {
    const payload = { sub: user._id, email: user.email, role: user.role };

    return this.jwtService.sign(payload);
  }
}
