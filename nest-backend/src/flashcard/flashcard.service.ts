import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flashcard } from './entities/flashcard.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class FlashcardService {

  constructor(
    @InjectRepository(Flashcard) private readonly flashcardRepository: Repository<Flashcard>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
){}

  async create(userID: number, createFlashcardDto: CreateFlashcardDto) {
    
    const user = await this.userRepository.findOneBy({id:userID});

    if(!user)
      throw new NotFoundException("user not found");

    console.log("hello");

    const flashcard = this.flashcardRepository.create({
      ...createFlashcardDto,
      user
    });
    
    await this.flashcardRepository.save(flashcard);
    
    return flashcard;
  }


  findAllForUser(id:number) {
    return this.flashcardRepository.findBy({userID:id});
  }


  async update(id: number, updateFlashcardDto: UpdateFlashcardDto) {
    const updateResult = await this.flashcardRepository.update(id, updateFlashcardDto);

  if (updateResult.affected === 0) {
    throw new Error("failed to update");
  }

  return await this.flashcardRepository.findOneBy({ id });
  }

  remove(id: number) {
    this.flashcardRepository.delete(id);
    return id;
  }
}
