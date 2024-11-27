import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateStudyResourceDto } from './dto/create-study-resource.dto';
import { UpdateStudyResourceDto } from './dto/update-study-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { StudyResource } from './entities/study-resource.entity';
import * as fs from 'fs';
import * as path from 'path';

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
    return this.studyResourceRepository.find({relations:['user','comments','comments.user']});
  }

  findAllForUser(id:number) {
    return this.studyResourceRepository.find({where:{userID:id},relations:['user','comments','comments.user']});
  }

  findOne(id: number) {
    return `This action returns a #${id} studyResource`;
  }

  async update(id: number, updateStudyResourceDto: UpdateStudyResourceDto) {
    await this.studyResourceRepository.update(id,updateStudyResourceDto);
    return await this.studyResourceRepository.findOne({where:{id},relations:['user','comments','comments.user']});
  }

  async remove(id: number) {

    await this.studyResourceRepository.delete(id);

    return id;
  }

  async downloadMyStudyResource(resourceID: number) {

    const studyResource = await this.studyResourceRepository.findOneBy({id:resourceID});

    if(!studyResource)
      throw new NotFoundException("study resource not found");


    const absoluteFilePath = path.resolve(__dirname, '..', 'uploads', studyResource.resourceLink);
    if(!fs.existsSync(absoluteFilePath))
    {
      console.log('nema fajla')
      throw new NotFoundException('File not found');
    }

    return studyResource.resourceLink;
    
  }

}
