import { DataSource } from 'typeorm';
import { Class } from 'src/entity/class.entity';
import { Student } from 'src/entity/student.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'practice_db',
  entities: [Student, Class],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
