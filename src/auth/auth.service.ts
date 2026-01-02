import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { UsersService } from '../users/users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string) {
    //See if email is used before
    const users = await this.usersService.find(email);
    if (users.length)
      throw new BadRequestException('This email is already used!');
    //Hash the user password
    ///Generate a salt
    const salt = randomBytes(8).toString('hex');
    ///Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    ///Join the hashed result and the salt together
    const result = salt + '.' + hash.toString('hex');
    //Create a new user and save it
    const user = await this.usersService.create(email, result);

    //Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    //return the user and token
    return {
      user,
      access_token: token,
    };
  }

  async signin(email: string, password: string) {
    const [user] = await this.usersService.find(email);
    if (!user) throw new NotFoundException('user not found');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if (storedHash !== hash.toString('hex'))
      throw new BadRequestException('Incorrect credentials');

    //Generate JWT token
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    //return user and token
    return {
      user,
      access_token: token,
    };
  }
}
