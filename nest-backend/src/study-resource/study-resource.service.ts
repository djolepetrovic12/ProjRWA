import { Injectable, NotFoundException, Res } from '@nestjs/common';
import { CreateStudyResourceDto } from './dto/create-study-resource.dto';
import { UpdateStudyResourceDto } from './dto/update-study-resource.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Brackets, In, Like, Repository } from 'typeorm';
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

  async findInitial() {
    return await this.studyResourceRepository.find({order: { dateUploaded: 'DESC' },take:20,relations:['user','comments','comments.user']});
  }

  findAllForUser(id:number) {
    return this.studyResourceRepository.find({order: { dateUploaded: 'DESC' },where:{userID:id},relations:['user','comments','comments.user']});
  }

  async update(id: number, updateStudyResourceDto: UpdateStudyResourceDto) {
    await this.studyResourceRepository.update(id,updateStudyResourceDto);
    return await this.studyResourceRepository.findOne({where:{id},relations:['user','comments','comments.user']});
  }

  async remove(id: number) {

    await this.studyResourceRepository.delete(id);

    return id;
  }

  async findMyStudyResource(resourceID: number) {

    const studyResource = await this.studyResourceRepository.findOneBy({id:resourceID});

    if(!studyResource)
      throw new NotFoundException("study resource not found");


    const absoluteFilePath = path.resolve(__dirname, '..', 'uploads', studyResource.resourceLink);
    return [studyResource.resourceLink, studyResource.userID];
    
  }

  searchItems(query: string,professorIDs: number[] = []) {
     if (query && professorIDs.length > 0) {
       return this.studyResourceRepository.find({
        where: { 
          title: Like(`%${query}%`),
          userID: In(professorIDs)
        },
        take:50,
        order: { dateUploaded: 'DESC' },
        relations: ['user', 'comments', 'comments.user'], 
      });
      }
      else if (query) {
        return this.studyResourceRepository.find({
          where: { title: Like(`%${query}%`) },
          take:50,
          order: { dateUploaded: 'DESC' },
          relations: ['user', 'comments', 'comments.user'],
        });
      } 
      else {
        return this.studyResourceRepository.find({take:50, relations: ['user', 'comments', 'comments.user'] }); 
      } 
    }

    searchProfessors(query: string) {
      console.log('hello from the function')
      if (query) {
        return this.userRepository.createQueryBuilder('user')
        .where(
          new Brackets(qb => {
            qb.where('user.name LIKE :query', { query: `%${query}%` })
              .orWhere('user.surname LIKE :query', { query: `%${query}%` });
          })
        )
        .andWhere('user.role = :role', { role: 'PROFESSOR' })
        .getMany();
       }
       else {
         return this.userRepository.find(); 
       } 
      
     }

}
