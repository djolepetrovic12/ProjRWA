import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post('createAComment/:userID/:resourceID')
  create(@Param('userID') userID : string,@Param('resourceID') resourceID : string ,@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(+userID,+resourceID,createCommentDto);
  }

}
