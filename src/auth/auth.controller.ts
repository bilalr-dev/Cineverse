import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({
    summary: 'Create a new user account',
    description:
      'Register a new user with email and password. Returns the created user and JWT access token.',
  })
  @ApiResponse({
    status: 201,
    description: 'User successfully created',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Email already used or validation failed.',
  })
  async signup(@Body() body: CreateUserDto) {
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate user with email and password. Returns user and JWT access token.',
  })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: User,
  })
  @ApiResponse({
    status: 400,
    description: 'Incorrect credentials',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  async signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
  }

  @Post('/signout')
  signout() {
    return { message: 'Signed out successfully' };
  }
}
