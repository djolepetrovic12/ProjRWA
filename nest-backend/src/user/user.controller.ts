import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res, Req, UnauthorizedException, UseGuards, SetMetadata } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import {JwtService} from '@nestjs/jwt';
import { Response,Request, response } from 'express';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe, NotFoundException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth-guard/jwt-auth-guard.guard';
import { RolesGuard } from 'src/roles-guard/roles-guard.guard';
import { Roles } from 'enums';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private jwtService:JwtService) {}

  @Post('register')
  async register(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    //2. parametar je koliko round-a treba da izvrsi
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
      throw new NotFoundException('dati korisnik ne postoji');
    }

    if(!await bcrypt.compare(sifra,user.password))
    {
      throw new BadRequestException('neispravni kredencijali');
    }

    //sa signAsync definisemo payload koji ce se nalaziti u tokenu
    const jwt = await this.jwtService.signAsync({id:user.id,role: user.role,name: user.name,surname: user.surname,email: user.email, username: user.username});

    response.cookie('jwt',jwt,{httpOnly:true});

    const {password, ...korisnik} = user

    return korisnik;
  }

  @Get('user1')
  async user(@Req() request : Request){
    
    try
    {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if(!data)
      {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne( data['id']);
      const {password, ...korisnik} = user;

      return korisnik;
    }
    catch(e)
    {
    throw new UnauthorizedException();
    }

  }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Admin,Roles.Student])
  @Post('logout')
  async logout(@Res({passthrough:true}) response : Response)
  {
    try{

      response.clearCookie('jwt');
  
      if(!response.req.cookies['jwt'])
      {
        return {message: 'logout successful'}
      }
      else {
        throw new Error('Failed to clear cookie');  // Throw error if cookie wasn't cleared
      }

    }
    catch(e)
    {
      throw new UnauthorizedException('Logout failed' + e.message)
    }

  }




  @UseGuards(JwtAuthGuard, RolesGuard)
  @SetMetadata('roles',[Roles.Admin])
  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
