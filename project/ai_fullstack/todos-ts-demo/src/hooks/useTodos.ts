import {
  useState,
  useEffect
} from 'react';
// 引入Todo 接口 esm 加type 
import type { Todo } from '../types/todo';
import {
  getStorage,
  setStorage
} from '../utils/storages';

const STORAGE_KEY = 'todos'; // 便于维护

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(
    () => getStorage<Todo[]>(STORAGE_KEY, [])
  );

  useEffect(() => {
    setStorage<Todo[]>(STORAGE_KEY, todos);
  }, [todos]);
  // const [count, setCount] = useState<number>(0);
  const addTodo = (title:string) => {
    const newTodo:Todo = {
      id: + new Date(),
      title,
      completed: false
    }
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  }

  const toggleTodo = (id:number) => {
    const newTodos = todos.map(todo => 
      todo.id === id ? 
      { ...todo, completed: !todo.completed } 
      : todo
    );
    setTodos(newTodos);
  }

  const removeTodo = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id)
    setTodos(newTodos);
  }

  return {
    todos,
    addTodo,
    toggleTodo,
    removeTodo
  }
}