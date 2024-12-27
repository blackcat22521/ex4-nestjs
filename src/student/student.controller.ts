import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Student } from 'src/entity/student.entity';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/roles.guard';
import { CreateStudentDto } from './dto/createStudentDto';
import { UpdateStudentDto } from './dto/updateStudentDto';
import { StudentService } from './student.service';

@Controller('students')
@UseGuards(RoleGuard)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @Roles('admin', 'teacher')
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() studentDto: CreateStudentDto): Promise<Student> {
    return this.studentService.create(studentDto);
  }

  @Get()
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  @Get(':id')
  async getStudentById(@Param('id') id: number) {
    const student = await this.studentService.getStudentById(id);
    if (!student) {
      throw new HttpException('Student not found', HttpStatus.NOT_FOUND);
    }
    return student;
  }

  @Put(':id')
  @Roles('admin', 'teacher') // Admin and teacher can update
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateStudent(
    @Param('id') id: number,
    @Body() studentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(id, studentDto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteStudent(@Param('id') id: number) {
    return this.studentService.deleteStudent(id);
  }
}
