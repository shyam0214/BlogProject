import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty, ApiConsumes } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ example: 'John Doe', type: 'string', format: 'text' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'john@example.com', type: 'string', format: 'text' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', type: 'string', format: 'text' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ type: 'file', format: 'binary' })
  profileImage: any;
}

export class LoginDto {
  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}