import { Module } from '@nestjs/common';
import { StudyResourceService } from './study-resource.service';
import { StudyResourceController } from './study-resource.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { StudyResource } from './entities/study-resource.entity';

@Module({
  controllers: [StudyResourceController],
  providers: [StudyResourceService],
  imports: [TypeOrmModule.forFeature([User,StudyResource])]
})
export class StudyResourceModule {}
