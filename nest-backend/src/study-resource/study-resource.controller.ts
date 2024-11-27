import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { StudyResourceService } from './study-resource.service';
import { CreateStudyResourceDto } from './dto/create-study-resource.dto';
import { UpdateStudyResourceDto } from './dto/update-study-resource.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as multer from 'multer';
import {Logger} from '@nestjs/common';
import {Response} from 'express';

@Controller('studyResource')
export class StudyResourceController {

  constructor(private readonly studyResourceService: StudyResourceService) {}

  @Post('createAStudyResource/:userid')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Create a unique folder for each user based on their userId
          const basePath = path.join(__dirname, '..', '/uploads');

          const userFolder = path.join(basePath, String( `user_` + req.params.userid));

          Logger.log(userFolder);
          
          // Check if the folder exists, and create it if not
          if (!fs.existsSync(userFolder)) {
            Logger.log("askdjasldk");
            fs.mkdirSync(userFolder, { recursive: true });
            Logger.log(`file successfully created ${userFolder}`)
          }
          else
          {
            Logger.log('folder already exists')
          }
          Logger.log("hello")
  
          cb(null, userFolder); // Set the destination folder for the file
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
    }),
  )
  create(@Param('userid') userid:string, @UploadedFile() file: Express.Multer.File ,@Body() createStudyResourceDto: CreateStudyResourceDto) {
    const filePath = `user_${userid}/${file.filename}`;
    createStudyResourceDto.resourceLink = filePath;
    return this.studyResourceService.create(+userid,createStudyResourceDto);
  }

  @Get('downloadMyStudyResource/:resourceID')
  async downloadMyStudyResource(@Param('resourceID') resourceID:number,@Res() res: Response){
    const relFilePath= await this.studyResourceService.downloadMyStudyResource(resourceID);

    /*const rfp = relFilePath.split('/');

    const filePath = `/${rfp[1]}/${rfp[2]}`;
    const fileName = `${rfp[3]}`;

    Logger.log(filePath);
    Logger.log(fileName)*/
    
    const absoluteFilePath = path.resolve(__dirname, '..', 'uploads', relFilePath);

  Logger.log(`Absolute file path: ${absoluteFilePath}`);

  // Check if the file exists
  if (!fs.existsSync(absoluteFilePath)) {
    Logger.error('File not found:', absoluteFilePath);
    return res.status(404).send('File not found');
  }

  // Extract the file name from the relative path
  const fileName = path.basename(relFilePath);
  Logger.log(`File name: ${fileName}`);

  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    res.download(absoluteFilePath, fileName, (err) => {
      if (err) {
        throw new Error('Error downloading the file');
      }
    });
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
