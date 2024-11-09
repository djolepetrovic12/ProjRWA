/*import { Comment } from './comment/entities/comment.entity';
import { Flashcard } from './flashcard/entities/flashcard.entity';
import { StudyResource } from './study-resource/entities/study-resource.entity';
import { User } from './user/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'rootroot',
  password: 'root',
  database: 'newDB',
  entities: [User, Comment,StudyResource,Flashcard], // List your entities here
  migrations: ['src/migration/**\/*{.ts,.js}'], // Path to migrations
  synchronize: false,  // Disable auto-sync to use migrations
});*/