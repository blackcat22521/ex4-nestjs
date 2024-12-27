import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentModule } from './student/student.module';
import { ClassModule } from './class/class.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'practice_db',
      autoLoadEntities: true,
      synchronize: false,
    }),
    ClassModule,
    StudentModule,
  ],
})
export class AppModule {}
