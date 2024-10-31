import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports:[ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User],
        synchronize: true,

      }),
      inject:[ConfigService]

    }),
    UserModule,
    JwtModule.register({
      //to nam treba kada se kreira jwt jer se jwt generize iz header-a, payload-a i secret-a
      global:true,
      //promeni ovo na kraju kako bi osigurao da tajna ne bude vidljiva nigde, pokusaj da je ubacis is .env fajla
      secret: 'helloIamAsecret',
      signOptions:{expiresIn:'1d'}
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
