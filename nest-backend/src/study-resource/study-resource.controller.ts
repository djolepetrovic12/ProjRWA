import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudyResourceService } from './study-resource.service';
import { CreateStudyResourceDto } from './dto/create-study-resource.dto';
import { UpdateStudyResourceDto } from './dto/update-study-resource.dto';

@Controller('study-resource')
export class StudyResourceController {
  constructor(private readonly studyResourceService: StudyResourceService) {}

  @Post('createStudyResource/:userid')
  create(@Param('userid') userid:string ,@Body() createStudyResourceDto: CreateStudyResourceDto) {
    return this.studyResourceService.create(+userid,createStudyResourceDto);
  }

  @Get()
  findAll() {
    return this.studyResourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studyResourceService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudyResourceDto: UpdateStudyResourceDto) {
    return this.studyResourceService.update(+id, updateStudyResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studyResourceService.remove(+id);
  }
}
