import {
  Injectable
} from '@nestjs/common'

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class TodosService {
  private todos: Todo[] = [
    {
      id: 1,
      title: '周五狂欢',
      completed: false
    },
    {
      id: 2, 
      title: '三角洲首胜',
      completed: true
    }
  ]

  findAll() {
    return this.todos
  }
  addTodo(title: string) {
    const todo: Todo = {
      id: + Date.now(),
      title,
      completed: false
    }
    this.todos.push(todo);
    return todo;
  }
  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return {
      message: 'Todo deleted',
      code: 200
    }
  }
}