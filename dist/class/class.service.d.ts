import { Repository } from 'typeorm';
import { Class } from 'src/entity/class.entity';
export declare class ClassService {
    private readonly classRepository;
    constructor(classRepository: Repository<Class>);
    createClass(body: {
        className: string;
    }): Promise<Class>;
    getAllClasses(): Promise<Class[]>;
    getClassById(id: number): Promise<Class>;
    getClassByName(name: string): Promise<Class>;
    updateClass(id: number, body: {
        className?: string;
    }): Promise<Class>;
    deleteClass(id: number): Promise<Class>;
}
