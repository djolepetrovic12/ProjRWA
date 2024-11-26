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
      dateUploaded: new Date(),
      comments:[],
      user
    })
    
    await this.studyResourceRepository.save(SR);

    return SR;
  }

  findAll() {
    return this.studyResourceRepository.find({relations:['user','comments']});
  }

  findAllForUser(id:number) {
    return this.studyResourceRepository.find({where:{userID:id},relations:['user','comments','comments.user']});
  }

  findOne(id: number) {
    return `This action returns a #${id} studyResource`;
  }

  async update(id: number, updateStudyResourceDto: UpdateStudyResourceDto) {
    await this.studyResourceRepository.update(id,updateStudyResourceDto);
    return await this.studyResourceRepository.findOne({where:{id},relations:['user','comments']});
  }

  async remove(id: number) {

    await this.studyResourceRepository.delete(id);

    return id;
  }
}
