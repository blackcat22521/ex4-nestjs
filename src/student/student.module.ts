import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from '../entity/student.entity';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { Class } from '../entity/class.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Class])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
