import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Like, Not, Repository } from 'typeorm';

@Injectable()
export class UserService {




  constructor(@InjectRepository(User) private readonly userRepository : Repository<User>,){}


  async create(createUserDto: CreateUserDto): Promise<User> {
    let u1 = this.userRepository.create(createUserDto);
      
    return await this.userRepository.save(u1);
 
  }

  async findUser(email:string): Promise<User>  {
    return this.userRepository.findOne({where: {email}});
  }

  async getAllUsers(id: number): Promise<Omit<User, 'password'>[]> {
    const users = this.userRepository.find({where:{ id:Not(id) }});
    return (await users).map(({ password, ...userWithoutPassword }) => userWithoutPassword);
  }

  findOne(id: any) {
    return this.userRepository.findOne({where:{id}});
  }

  async deleteUser(id: number) {
    await this.userRepository.delete(id);

    return id;
  }


  async updateUser(id: number, UpdateUserDto: UpdateUserDto) {
    await this.userRepository.update(id,UpdateUserDto);
    return await this.userRepository.findOne({where:{id}});
  
  }


}
