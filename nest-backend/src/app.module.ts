import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { FlashcardModule } from './flashcard/flashcard.module';
import { CommentModule } from './comment/comment.module';
import { StudyResourceModule } from './study-resource/study-resource.module';
import { StudyResource } from './study-resource/entities/study-resource.entity';
import { Flashcard } from './flashcard/entities/flashcard.entity';
import { Comment } from './comment/entities/comment.entity';

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
        entities: [User,Comment,StudyResource,Flashcard],
        migrations:["src/migration/**/*{.ts,.js}"],
        logging:true,
        synchronize: false,

      }),
      inject:[ConfigService]

    }),
    
    
    JwtModule.register({
      global:true,
      //to nam treba kada se kreira jwt jer se jwt generize iz header-a, payload-a i secret-a
      //promeni ovo na kraju kako bi osigurao da tajna ne bude vidljiva nigde, pokusaj da je ubacis is .env fajla
      secret: 'helloIamAsecret',
      signOptions:{expiresIn:'1d'}
    }),
    UserModule,
    FlashcardModule,
    CommentModule,
    StudyResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {

}
