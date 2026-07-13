import * as React from 'react'; // esm 
import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';
// 组件参数接口  父子组件对接 
// props 接口可以确保子组件的正确运行
interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}
const TodoList: React.FC<Props> = (
  { todos, onToggle, onRemove}
) => {
  return (
    <ul>
    { todos.map((todo:Todo) => (
      <TodoItem 
        key={todo.id} 
        todo={todo}
        onToggle={onToggle}
        onRemove={onRemove}
      />
    ))}
    </ul>
  )
}

export default TodoList;