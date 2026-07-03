import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from 'src/dto/postDto/postCreate.dto';
import { UpdatePostDto } from 'src/dto/postDto/updatePost.dto';
import { AuthGuard } from 'src/Guards/AuthGuard/auth.guards';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) { }

  // CREATE POST
  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() dto: CreatePostDto, @Req() req: any) {
    return this.postService.createPost(dto, req.user.sub);
  }

  // GET ALL POSTS
  @Get()
  getAllPosts() {
    return this.postService.findAll();
  }

  // GET POST BY ID
  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postService.findById(id);
  }

  // UPDATE POST
  @UseGuards(AuthGuard)
  @Patch(':id')
  updatePost(
    @Param('id') id: string,
    @Body() dto: UpdatePostDto,
    @Req() req: any,
  ) {
    return this.postService.updatePost(id, dto, req.user.sub);
  }

  // DELETE POST
  @UseGuards(AuthGuard)
  @Delete(':id')
  deletePost(@Param('id') id: string, @Req() req: any) {
    return this.postService.deletePost(id, req.user.sub);
  }
}