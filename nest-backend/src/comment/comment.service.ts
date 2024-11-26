import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudyResource } from 'src/study-resource/entities/study-resource.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    @InjectRepository(StudyResource) private readonly studyResourceRepository:Repository<StudyResource>,
    @InjectRepository(Comment) private readonly commentRepository:Repository<Comment>
){}

  async create(userID: number, resourceID: number, createCommentDto: CreateCommentDto) {

    const user = await this.userRepository.findOneBy({id: userID });

    if(!user)
      throw new NotFoundException();

    const studyResource = await this.studyResourceRepository.findOneBy({id: resourceID });

    if(!studyResource)
      throw new NotFoundException();

    const comment = await this.commentRepository.create({
      ...createCommentDto,
      dateCreated: new Date(),
      user,
      studyResource
    })
    
    await this.commentRepository.save(comment);

    return comment;
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
