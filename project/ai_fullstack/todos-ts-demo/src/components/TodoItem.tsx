import type { Todo } from '../types/todo';
import * as React from 'react'; // esm 

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}

const TodoItem: React.FC<Props> = (
  { todo, onToggle, onRemove }
) => {
  return (
    <li>
      <input 
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ textDecoration: todo.completed?'line-through':'none'}}>
      {todo.title}
      </span>
      <button onClick={() => onRemove(todo.id)}>删除</button>
    </li>
  )
}

export default TodoItem