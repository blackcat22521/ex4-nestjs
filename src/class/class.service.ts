import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/entity/class.entity';
import { ConflictException } from '@nestjs/common';

@Injectable()
export class ClassService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async createClass(body: { className: string }) {
    const existingClass = await this.getClassByName(body.className);
    if (existingClass) {
      throw new ConflictException(
        `Class with name '${body.className}' already exists.`,
      );
    }
    const cls = this.classRepository.create(body);
    return this.classRepository.save(cls);
  }
  getAllClasses() {
    return this.classRepository.find();
  }

  getClassById(id: number) {
    return this.classRepository.findOneBy({ id });
  }

  getClassByName(name: string) {
    return this.classRepository.findOneBy({ className: name });
  }

  async updateClass(id: number, body: { className?: string }) {
    const cls = await this.getClassById(id);
    if (!cls) {
      throw new NotFoundException(`Class with ID '${id}' not found.`);
    }
    if (body.className) {
      const existingClass = await this.getClassByName(body.className);
      if (existingClass && existingClass.id !== id) {
        throw new ConflictException(
          `Class with name '${body.className}' already exists.`,
        );
      }
      cls.className = body.className;
    }

    return this.classRepository.save(cls);
  }

  async deleteClass(id: number) {
    const cls = await this.getClassById(id);
    if (!cls) throw new Error('Class not found');
    return this.classRepository.remove(cls);
  }
}
