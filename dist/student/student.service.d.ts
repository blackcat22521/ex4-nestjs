import { Class } from 'src/entity/class.entity';
import { Student } from 'src/entity/student.entity';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/createStudentDto';
import { UpdateStudentDto } from './dto/updateStudentDto';
export declare class StudentService {
    private readonly studentRepository;
    private classRepository;
    constructor(studentRepository: Repository<Student>, classRepository: Repository<Class>);
    create(studentDto: CreateStudentDto): Promise<Student>;
    getAllStudents(): Promise<Student[]>;
    getStudentById(id: number): Promise<Student>;
    updateStudent(id: number, body: UpdateStudentDto): Promise<Student>;
    deleteStudent(id: number): Promise<Student>;
}
