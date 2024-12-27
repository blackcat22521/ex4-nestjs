import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from './class.entity';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  studentName: string;

  @ManyToOne(() => Class, (cls) => cls.students, { onDelete: 'CASCADE' })
  class: Class;
}
