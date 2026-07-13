import {
  useTodos,
} from './hooks/useTodos';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

export default function App() {
  const {
    todos, 
    addTodo, 
    toggleTodo, 
    removeTodo
  } = useTodos();

  return (
    <div>
      <h1>TodoList</h1>
      <TodoInput onAdd={addTodo}/>
      <TodoList 
        todos={todos}
        onToggle={toggleTodo}
        onRemove={removeTodo}
      />
    </div>
  )
}