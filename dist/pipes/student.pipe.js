"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentPipe = void 0;
const common_1 = require("@nestjs/common");
let StudentPipe = class StudentPipe {
    transform(value) {
        const { studentName, className } = value;
        if (!studentName || studentName.trim() === '') {
            throw new common_1.HttpException({
                errorCode: 'BAD_REQUEST_INPUT',
                devMessage: 'studentName is required.',
                data: { field: 'studentName' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        if (!className || className.trim() === '') {
            throw new common_1.HttpException({
                errorCode: 'BAD_REQUEST_INPUT',
                devMessage: 'className is required.',
                data: { field: 'className' },
            }, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
};
exports.StudentPipe = StudentPipe;
exports.StudentPipe = StudentPipe = __decorate([
    (0, common_1.Injectable)()
], StudentPipe);
//# sourceMappingURL=student.pipe.js.map