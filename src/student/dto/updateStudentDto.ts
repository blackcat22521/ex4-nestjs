import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateStudentDto {
  @IsNotEmpty({ message: 'studentName is required.' })
  @IsString({ message: 'studentName must be a string.' })
  studentName: string;
}
