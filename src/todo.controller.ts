import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';

@Controller('api/todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Todo> {
    return this.todoService.findById(id);
  }

  @Post()
  async create(@Body() todo: Todo): Promise<Todo> {
    return this.todoService.create(todo);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() todo: Partial<Todo>): Promise<Todo> {
    return this.todoService.update(id, todo);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.todoService.delete(id);
  }

  @Delete()
  async deleteAll(): Promise<void> {
    return this.todoService.deleteAll();
  }
}