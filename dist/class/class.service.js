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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const class_entity_1 = require("../entity/class.entity");
const common_2 = require("@nestjs/common");
let ClassService = class ClassService {
    constructor(classRepository) {
        this.classRepository = classRepository;
    }
    async createClass(body) {
        const existingClass = await this.getClassByName(body.className);
        if (existingClass) {
            throw new common_2.ConflictException(`Class with name '${body.className}' already exists.`);
        }
        const cls = this.classRepository.create(body);
        return this.classRepository.save(cls);
    }
    getAllClasses() {
        return this.classRepository.find();
    }
    getClassById(id) {
        return this.classRepository.findOneBy({ id });
    }
    getClassByName(name) {
        return this.classRepository.findOneBy({ className: name });
    }
    async updateClass(id, body) {
        const cls = await this.getClassById(id);
        if (!cls) {
            throw new common_1.NotFoundException(`Class with ID '${id}' not found.`);
        }
        if (body.className) {
            const existingClass = await this.getClassByName(body.className);
            if (existingClass && existingClass.id !== id) {
                throw new common_2.ConflictException(`Class with name '${body.className}' already exists.`);
            }
            cls.className = body.className;
        }
        return this.classRepository.save(cls);
    }
    async deleteClass(id) {
        const cls = await this.getClassById(id);
        if (!cls)
            throw new Error('Class not found');
        return this.classRepository.remove(cls);
    }
};
exports.ClassService = ClassService;
exports.ClassService = ClassService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(class_entity_1.Class)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ClassService);
//# sourceMappingURL=class.service.js.map