import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, SetMetadata } from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { JwtAuthGuard } from 'src/auth-guard/jwt-auth-guard.guard';
import { RolesGuard } from 'src/roles-guard/roles-guard.guard';
import { Roles } from 'enums';

@Controller('flashcard')
export class FlashcardController {
  constructor(private readonly flashcardService: FlashcardService) {}


  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Post('createFlashcard/:id')
  async create(@Param('id') id: string,@Body() createFlashcardDto: CreateFlashcardDto) {
    return await this.flashcardService.create(+id,createFlashcardDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Get('findAllForUser/:id')
  findAllForUser(@Param('id') id:number) {
    return this.flashcardService.findAllForUser(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Patch('updateAFlashcard/:id')
  update(@Param('id') id: string, @Body() updateFlashcardDto: UpdateFlashcardDto) {
    return this.flashcardService.update(+id, updateFlashcardDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Delete('deleteAFlashcard/:id')
  remove(@Param('id') id: string) {
    return this.flashcardService.remove(+id);
  }
}
