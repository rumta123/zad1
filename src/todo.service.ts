import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    providers: [TodoService],
    controllers: [TodoController],
    exports: [TodoService], // добавить эту строку
  })
  export class TodoModule {}
@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async getAll(): Promise<Todo[]> {
    return this.todoService.getAll();
  }

  @Get(':id')
  async getById(@Param('id') id: number): Promise<Todo> {
    return this.todoService.getById(id);
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() todo: Todo): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<void> {
    return this.todoService.deleteById(id);
  }

  @Delete()
  async deleteAll(): Promise<void> {
    return this.todoService.deleteAll();
  }
}