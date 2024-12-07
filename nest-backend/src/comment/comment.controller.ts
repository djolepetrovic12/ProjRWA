import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth-guard/jwt-auth-guard.guard';
import { RolesGuard } from 'src/roles-guard/roles-guard.guard';
import { Roles } from 'enums';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Admin,Roles.Student,Roles.Professor])
  @Post('createAComment/:userID/:resourceID')
  create(@Param('userID') userID : string,@Param('resourceID') resourceID : string ,@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(+userID,+resourceID,createCommentDto);
  }

}
