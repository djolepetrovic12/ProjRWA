import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudyResourceDto } from './dto/create-study-resource.dto';
import { UpdateStudyResourceDto } from './dto/update-study-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { StudyResource } from './entities/study-resource.entity';

@Injectable()
export class StudyResourceService {

  constructor(
    @InjectRepository(User) private readonly userRepository:Repository<User>,
    @InjectRepository(StudyResource) private readonly studyResourceRepository:Repository<StudyResource>
    ){}

  async create(userID:number,createStudyResourceDto: CreateStudyResourceDto) {
    
    const user = await this.userRepository.findOneBy({id: userID });

    if(!user)
      throw new NotFoundException();

    const SR = await this.studyResourceRepository.create({
      ...createStudyResourceDto,
      comments:[],
      userID:user.id,
      user:user
    })
    
    
    return await this.studyResourceRepository.save(SR);
  }

  findAll() {
    return this.studyResourceRepository.find({relations:['user']});
  }

  findAllForUser(id:number) {
    return this.studyResourceRepository.find({where:{userID:id},relations:['user']});
  }

  findOne(id: number) {
    return `This action returns a #${id} studyResource`;
  }

  update(id: number, updateStudyResourceDto: UpdateStudyResourceDto) {
    return `This action updates a #${id} studyResource`;
  }

  remove(id: number) {
    return `This action removes a #${id} studyResource`;
  }
}
