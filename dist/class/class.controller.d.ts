import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';
export declare class ClassController {
    private readonly classService;
    constructor(classService: ClassService);
    createClass(classDto: ClassDto): Promise<import("../entity/class.entity").Class>;
    getAllClasses(): Promise<import("../entity/class.entity").Class[]>;
    getClassById(id: number): Promise<import("../entity/class.entity").Class>;
    updateClass(id: number, classDto: ClassDto): Promise<import("../entity/class.entity").Class>;
    deleteClass(id: number): Promise<import("../entity/class.entity").Class>;
}
