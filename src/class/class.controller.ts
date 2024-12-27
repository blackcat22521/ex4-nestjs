import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassDto } from './dto/class.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { RoleGuard } from '../common/guards/roles.guard';

@Controller('classes')
@UseGuards(RoleGuard)
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  @Roles('admin', 'principal')
  @UsePipes(new ValidationPipe({ transform: true }))
  async createClass(@Body() classDto: ClassDto) {
    return this.classService.createClass(classDto);
  }

  @Get()
  async getAllClasses() {
    return this.classService.getAllClasses();
  }

  @Get(':id')
  async getClassById(@Param('id') id: number) {
    const cls = await this.classService.getClassById(id);
    if (!cls) throw new HttpException('Class not found', HttpStatus.NOT_FOUND);
    return cls;
  }

  @Put(':id')
  @Roles('admin', 'principal')
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateClass(@Param('id') id: number, @Body() classDto: ClassDto) {
    return this.classService.updateClass(id, classDto);
  }

  @Delete(':id')
  @Roles('admin')
  async deleteClass(@Param('id') id: number) {
    return this.classService.deleteClass(id);
  }
}
