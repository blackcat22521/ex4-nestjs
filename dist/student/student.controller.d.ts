import { Student } from 'src/entity/student.entity';
import { CreateStudentDto } from './dto/createStudentDto';
import { UpdateStudentDto } from './dto/updateStudentDto';
import { StudentService } from './student.service';
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
    create(studentDto: CreateStudentDto): Promise<Student>;
    getAllStudents(): Promise<Student[]>;
    getStudentById(id: number): Promise<Student>;
    updateStudent(id: number, studentDto: UpdateStudentDto): Promise<Student>;
    deleteStudent(id: number): Promise<Student>;
}
