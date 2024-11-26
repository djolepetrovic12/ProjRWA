import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { User } from 'src/user/entities/user.entity';
import { StudyResource } from 'src/study-resource/entities/study-resource.entity';
import { Comment } from './entities/comment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports : [TypeOrmModule.forFeature([User,StudyResource,Comment])]
})
export class CommentModule {}
