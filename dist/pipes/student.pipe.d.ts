import { PipeTransform } from '@nestjs/common';
export declare class StudentPipe implements PipeTransform<{
    studentName: string;
    className: string;
}> {
    transform(value: {
        studentName: string;
        className: string;
    }): {
        studentName: string;
        className: string;
    };
}
