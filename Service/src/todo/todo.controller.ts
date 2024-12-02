import { Controller, Delete, Post, Put, Req, Body } from "@nestjs/common";
import { TodoService } from "./todo.service";

@Controller("todo")
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post("create")
  async create(@Body() body: Object) {
    return await this.todoService.create(body);
  }

  @Delete("delete")
  async delete(@Body("id") id: number) {
    return await this.todoService.delete(id);
  }

  @Put("edit")
  async edit(@Body() body: Object) {
    console.log('edit', body)
    return await this.todoService.edit(body);
  }

  @Post("findAll")
  async findAll() {
    return await this.todoService.findAll();
  }

  @Post("detail")
  async detail(@Body("id") id: number) {
    return await this.todoService.findDetail(id);
  }
}
