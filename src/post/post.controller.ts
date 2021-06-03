import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Token } from 'src/libs/decorator/token.decorator';
import { GetPost, GetPosts } from 'src/libs/interface/IPost';
import { IUser } from 'src/libs/interface/IUser';
import { returnLib } from 'src/libs/return.lib';
import CheckGaurd from 'src/middleware/check.middleware';
import { AddPostDto } from './dto/addPost.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {

  constructor(
    private readonly postService: PostService
  ) { }

  @Post()
  @UseGuards(new CheckGaurd())
  async addPost(
    @Body() addPostDto: AddPostDto,
    @Token() tokenUser?: IUser,
  ) {

    await this.postService.addPost(addPostDto, tokenUser);

    return returnLib(201, '게시글 게시 성공');
  }

  @Get()
  async getAllPost() {

    const Posts: GetPosts[] = await this.postService.getAllPost();

    return returnLib(200, '게시글 모두 불러오기 성공', Posts);
  }

  @Get('/:idx')
  @UseGuards(new CheckGaurd())
  async getPost(
    @Param('idx') idx: number,
    @Token() tokenUser?: IUser,
  ) {

    const post: GetPost = await this.postService.getPost(idx, tokenUser);

    return returnLib(200, '특정 게시글 불러오기 성공', post);
  }
}