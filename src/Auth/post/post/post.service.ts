import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/Schema/PostSchema/post.schema';
import { CreatePostDto } from 'src/dto/postDto/postCreate.dto';
import { UpdatePostDto } from 'src/dto/postDto/updatePost.dto';
import mongoose from 'mongoose';
import { BadRequestException } from "@nestjs/common/exceptions";

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
  ) { }

  // CREATE POST
  async createPost(createPostDto: CreatePostDto, userId: string) {
    const post = await this.postModel.create({
      ...createPostDto,
      author: userId,
    });

    return post;
  }

  // GET ALL POSTS
  async findAll() {
    return this.postModel.find().populate('author', '-password');
  }

  // GET ONE POST
  async findById(id: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }
    const post = await this.postModel
      .findById(id)
      .populate('author', '-password');

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  // UPDATE POST
  async updatePost(id: string, updatePostDto: UpdatePostDto, userId: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // optional ownership check
    if (post.author.toString() !== userId) {
      throw new NotFoundException('You are not allowed to update this post');
    }

    return this.postModel.findByIdAndUpdate(
      id,
      { $set: updatePostDto },
      { new: true },
    );
  }

  // DELETE POST
  async deletePost(id: string, userId: string) {
    if (!mongoose.isValidObjectId(id)) {
      throw new BadRequestException('Invalid id');
    }
    const post = await this.postModel.findById(id);

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.author.toString() !== userId) {
      throw new NotFoundException('You are not allowed to delete this post');
    }

    return this.postModel.findByIdAndDelete(id);
  }
}