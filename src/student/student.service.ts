import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { Student } from 'src/entity/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/createStudentDto';
import { UpdateStudentDto } from './dto/updateStudentDto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Class) private classRepository: Repository<Class>,
  ) {}

  async create(studentDto: CreateStudentDto): Promise<Student> {
    const { studentName, className } = studentDto;
    const existingStudent = await this.studentRepository.findOne({
      where: { studentName },
    });
    if (existingStudent) {
      throw new BadRequestException(
        `Student with name '${studentName}' already exists`,
      );
    }

    const classEntity = await this.classRepository.findOne({
      where: { className },
    });

    if (!classEntity) {
      throw new NotFoundException(`Class with name ${className} not found`);
    }

    const newStudent = this.studentRepository.create({
      studentName,
      class: classEntity,
    });

    return await this.studentRepository.save(newStudent);
  }

  getAllStudents() {
    return this.studentRepository.find({ relations: ['class'] });
  }

  getStudentById(id: number) {
    return this.studentRepository.findOne({
      where: { id },
      relations: ['class'],
    });
  }
  async updateStudent(id: number, body: UpdateStudentDto): Promise<Student> {
    const { studentName } = body;
    const student = await this.getStudentById(id);
    if (!studentName) {
      throw new Error(`'studentName' is required.`);
    }
    if (!student) {
      throw new NotFoundException(`Student with ID '${id}' not found`);
    }
    const existingStudent = await this.studentRepository.findOne({
      where: { studentName },
    });

    if (existingStudent && existingStudent.id !== id) {
      throw new Error(`Student with name '${studentName}' already exists.`);
    }

    if (body.studentName) {
      student.studentName = body.studentName;
    }

    return this.studentRepository.save(student);
  }

  async deleteStudent(id: number) {
    const student = await this.getStudentById(id);
    if (!student) throw new Error('Student not found');
    return this.studentRepository.remove(student);
  }
}
