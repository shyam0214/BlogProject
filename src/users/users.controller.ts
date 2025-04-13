import { 
  Controller, 
  Post, 
  Get,
  Body, 
  UseInterceptors, 
  UploadedFile,
  Request 
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { SignUpDto, LoginDto } from './dto/auth.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('profileImage', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
    }),
  )
  signup(@Body() signUpDto: SignUpDto, @UploadedFile() file: Express.Multer.File) {
    return this.usersService.signup(signUpDto, file);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }

  @Get('profile')
  async getAllUsers(@Request() req) {
    const userId = req.user.id;
    return this.usersService.getAllUsers(userId);
  }
}