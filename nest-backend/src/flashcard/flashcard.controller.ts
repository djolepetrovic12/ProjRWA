import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';

@Controller('flashcard')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}

  
  @Post('createFlashcard/:id')
  async create(@Param('id') id: string,@Body() createFlashcardDto: CreateFlashcardDto) {
    return await this.flashcardService.create(+id,createFlashcardDto);
  }

  @Get()
  findAll() {
    return this.flashcardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flashcardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFlashcardDto: UpdateFlashcardDto) {
    return this.flashcardService.update(+id, updateFlashcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flashcardService.remove(+id);
  }
}
