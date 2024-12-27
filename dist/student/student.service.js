"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const class_entity_1 = require("../entity/class.entity");
const student_entity_1 = require("../entity/student.entity");
const typeorm_2 = require("typeorm");
let StudentService = class StudentService {
    constructor(studentRepository, classRepository) {
        this.studentRepository = studentRepository;
        this.classRepository = classRepository;
    }
    async create(studentDto) {
        const { studentName, className } = studentDto;
        const existingStudent = await this.studentRepository.findOne({
            where: { studentName },
        });
        if (existingStudent) {
            throw new common_1.BadRequestException(`Student with name '${studentName}' already exists`);
        }
        const classEntity = await this.classRepository.findOne({
            where: { className },
        });
        if (!classEntity) {
            throw new common_1.NotFoundException(`Class with name ${className} not found`);
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
    getStudentById(id) {
        return this.studentRepository.findOne({
            where: { id },
            relations: ['class'],
        });
    }
    async updateStudent(id, body) {
        const { studentName } = body;
        const student = await this.getStudentById(id);
        if (!studentName) {
            throw new Error(`'studentName' is required.`);
        }
        if (!student) {
            throw new common_1.NotFoundException(`Student with ID '${id}' not found`);
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
    async deleteStudent(id) {
        const student = await this.getStudentById(id);
        if (!student)
            throw new Error('Student not found');
        return this.studentRepository.remove(student);
    }
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(student_entity_1.Student)),
    __param(1, (0, typeorm_1.InjectRepository)(class_entity_1.Class)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], StudentService);
//# sourceMappingURL=student.service.js.map