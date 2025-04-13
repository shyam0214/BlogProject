import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Blog } from './schemas/blog.schema';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogsService {
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {}

  async create(createBlogDto: CreateBlogDto, imageUrl: string, userId: string) {
    const blog = new this.blogModel({
      ...createBlogDto,
      imageUrl,
      author: userId,
    });
    return blog.save();
  }

  async findAll() {
    return this.blogModel.find().populate('author', 'username email profileImage');
  }

  async findOne(id: string) {
    const blog = await this.blogModel
      .findById(id)
      .populate('author', 'username email profileImage');
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async update(id: string, updateBlogDto: UpdateBlogDto, imageUrl?: string) {
    const updateData = imageUrl
      ? { ...updateBlogDto, imageUrl }
      : updateBlogDto;
    const blog = await this.blogModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .populate('author', 'username email profileImage');
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return blog;
  }

  async remove(id: string) {
    const blog = await this.blogModel.findByIdAndDelete(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    return { message: 'Blog deleted successfully' };
  }
}