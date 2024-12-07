import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, BadRequestException, NotFoundException, Query, UseGuards, SetMetadata } from '@nestjs/common';
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
import { JwtAuthGuard } from 'src/auth-guard/jwt-auth-guard.guard';
import { RolesGuard } from 'src/roles-guard/roles-guard.guard';
import { Roles } from 'enums';

@Controller('studyResource')
export class StudyResourceController {

  constructor(private readonly studyResourceService: StudyResourceService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Post('createAStudyResource/:userid')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          // Create a unique folder for each user based on their userId
          const basePath = path.resolve(process.cwd(), 'uploads');

          const userFolder = path.join(basePath, String( `user_` + req.params.userid));

          Logger.log(userFolder);
          
          // Check if the folder exists, and create it if not
          if (!fs.existsSync(userFolder)) {
            fs.mkdirSync(userFolder, { recursive: true });
            //Logger.log(`folder successfully created ${userFolder}`)
          }
  
          cb(null, userFolder); // Set the destination folder for the file
        },
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}-${file.originalname}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        // Restrict uploads to only PDF files
        if (file.mimetype !== 'application/pdf') {
          cb(new BadRequestException('Only PDF files are allowed'), false);
        } else {
          cb(null, true);
        }
      },
    }),
  )
  create(@Param('userid') userid:string, @UploadedFile() file: Express.Multer.File ,@Body() createStudyResourceDto: CreateStudyResourceDto) {
    const filePath = `${file.filename}`;
    createStudyResourceDto.resourceLink = filePath;
    return this.studyResourceService.create(+userid,createStudyResourceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('downloadMyStudyResource/:resourceID')
  async downloadMyStudyResource(@Param('resourceID') resourceID:number,@Res() res: Response){
    const [ResLink,Uid]= await this.studyResourceService.findMyStudyResource(resourceID);

    const relFilePath = `user_${Uid}/${ResLink}`
    
    const absoluteFilePath = path.resolve(process.cwd(),'uploads', relFilePath);

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Admin,Roles.Student,Roles.Professor])
  @Get('findInitial')
  findInitial() {
    return this.studyResourceService.findInitial();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Get('findAllForUser/:id')
  findOne(@Param('id') id: string) {
    return this.studyResourceService.findAllForUser(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Patch('updateMyStudyResource/:id')
  async updateMyStudyResource(@Param('id') id: string, @Body() updateStudyResourceDto: UpdateStudyResourceDto) {
    return await this.studyResourceService.update(+id, updateStudyResourceDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Student,Roles.Professor])
  @Delete('deleteMyStudyResource/:id')
  async remove(@Param('id') id: string) {

  const [ResLink,Uid]= await this.studyResourceService.findMyStudyResource(+id);
  
  const relFilePath = `user_${Uid}/${ResLink}`

  const absoluteFilePath = path.resolve(process.cwd(),'uploads', relFilePath);

  Logger.log(`Absolute file path: ${absoluteFilePath}`);

  if (!fs.existsSync(absoluteFilePath)) {
    Logger.error('File not found:', absoluteFilePath);
  }

  try {
    fs.unlinkSync(absoluteFilePath);
  } catch (error) {
    throw new NotFoundException('Could not delete the file');
  }


    return this.studyResourceService.remove(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('searchItems') 
  searchItems(@Query('query') query: string, @Query('professorIDs') professorIDs: number[]) {
    return this.studyResourceService.searchItems(query,professorIDs);
  }

  @UseGuards(JwtAuthGuard)
  @Get('searchProfessors')
  searchProfessors(@Query('query') query: string) {
    return this.studyResourceService.searchProfessors(query);
  }

}
