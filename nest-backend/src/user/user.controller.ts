import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, Req, UnauthorizedException, UseGuards, SetMetadata, Query, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import {JwtModule, JwtService} from '@nestjs/jwt';
import { Response,Request, response } from 'express';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth-guard/jwt-auth-guard.guard';
import { RolesGuard } from 'src/roles-guard/roles-guard.guard';
import { Roles } from 'enums';
import * as path from 'path';
import * as fs from 'fs';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private jwtService:JwtService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password,12);

    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    delete user.password;

    return {
      message: "success"
    };
  }

  @Post('login')
  async login(
    @Body('email') email : string,
    @Body('password') sifra: string,
    //ovo passthrough je da omoguci da se cookie posalje na frontend
    @Res({passthrough: true}) response: Response
    ) {
    const user = await this.userService.findUser(email);

    if(!user)
    {
      throw new UnauthorizedException('incorrect credentials');
    }

    if(!await bcrypt.compare(sifra,user.password))
    {
      throw new UnauthorizedException('incorrect credentials');
    }

    //sa signAsync definisemo payload koji ce se nalaziti u tokenu
    const jwt = await this.jwtService.signAsync({id:user.id,role: user.role,name: user.name,surname: user.surname,email: user.email, username: user.username});

    response.cookie('jwt',jwt,{httpOnly:true});

    const {password, ...korisnik} = user

    return korisnik;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user1')
  async user(@Req() request : Request){

    const user = request.user;
  if (!user) {
    throw new UnauthorizedException();
  }
  return user;

  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Admin,Roles.Student,Roles.Professor])
  @Post('logout')
  async logout(@Res({passthrough:true}) response : Response)
  {
      response.clearCookie('jwt');
  
      return {message: 'logout successful'}

  }




  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }


  @Get('getAllUsers/:userID')
  getAllUsers(@Param('userID') id: number) {
    return this.userService.getAllUsers(id);
  }

  

  @Delete('deleteUser/:id')
  async deleteUser(@Param('id') id: number) {

    const folderName = `user_${id}`;
    const absoluteFolderPath = path.resolve(process.cwd(),'uploads', folderName);

    Logger.log(`Absolute folder path: ${absoluteFolderPath}`);

    if (!fs.existsSync(absoluteFolderPath)) {
      Logger.error('Folder not found:', absoluteFolderPath);
      throw new NotFoundException('Folder not found');
    }

    try {
      fs.rmSync(absoluteFolderPath, { recursive: true, force: true });
      Logger.log(`Folder deleted successfully: ${absoluteFolderPath}`);
    } catch (error) {
      Logger.error('Could not delete the folder:', error);
      throw new NotFoundException('Could not delete the folder');
    }


    return await this.userService.deleteUser(id);
  }

  

  @Patch('updateUser/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(+id,updateUserDto);
  }

}
