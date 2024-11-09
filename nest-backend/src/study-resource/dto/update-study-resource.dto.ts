import { PartialType } from '@nestjs/mapped-types';
import { CreateStudyResourceDto } from './create-study-resource.dto';

export class UpdateStudyResourceDto extends PartialType(CreateStudyResourceDto) {}
