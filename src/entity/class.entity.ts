import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Student } from './student.entity';

@Entity()
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  className: string;

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];
}
