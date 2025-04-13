import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogDto {
  @ApiProperty({ example: 'My First Blog' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: 'This is my first blog post...' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: any;
}

export class UpdateBlogDto extends CreateBlogDto {}