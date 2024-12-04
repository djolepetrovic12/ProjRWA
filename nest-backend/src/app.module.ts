import { Module } from '@nestjs/common';
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
import { JwtStrategy } from './auth/jwt-strategy/jwt-strategy.service';
import { PassportModule } from '@nestjs/passport';

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
    
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      global:true,
      secret: process.env.JWT_SECRET,
      signOptions:{expiresIn:'1h'}
    }),
    UserModule,
    FlashcardModule,
    CommentModule,
    StudyResourceModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
  exports: [PassportModule]
})
export class AppModule {

}
