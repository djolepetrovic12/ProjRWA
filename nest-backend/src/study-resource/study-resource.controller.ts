import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { StudyResourceService } from './study-resource.service';
import { CreateStudyResourceDto } from './dto/create-study-resource.dto';
import { UpdateStudyResourceDto } from './dto/update-study-resource.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('studyResource')
export class StudyResourceController {
  constructor(private readonly studyResourceService: StudyResourceService) {}

  @Post('createAStudyResource/:userid')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: `./uploads/`, // Path to store files
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  create(@Param('userid') userid:string, @UploadedFile() file: Express.Multer.File ,@Body() createStudyResourceDto: CreateStudyResourceDto) {
    const filePath = `./uploads/${file.filename}`;
    createStudyResourceDto.resourceLink = filePath;
    return this.studyResourceService.create(+userid,createStudyResourceDto);
  }

  @Get('findAll')
  findAll() {
    return this.studyResourceService.findAll();
  }

  @Get('findAllForUser/:id')
  findOne(@Param('id') id: string) {
    return this.studyResourceService.findAllForUser(+id);
  }

  @Patch('updateMyStudyResource/:id')
  async updateMyStudyResource(@Param('id') id: string, @Body() updateStudyResourceDto: UpdateStudyResourceDto) {
    return await this.studyResourceService.update(+id, updateStudyResourceDto);
  }

  @Delete('deleteMyStudyResource/:id')
  async remove(@Param('id') id: string) {
    return this.studyResourceService.remove(+id);
  }
}
