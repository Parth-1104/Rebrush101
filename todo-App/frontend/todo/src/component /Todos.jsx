import { useState, useEffect } from 'react';

export function Todos({ initialTodos = [] }) {
  const [todos, setTodos] = useState(initialTodos);
  
  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos]);
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id && !todo.completed 
        ? { ...todo, completed: true } 
        : todo
    ));
  };
  
  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>
          <h1>{todo.title}</h1>
          <h2>{todo.description}</h2>
          <button onClick={() => toggleTodo(todo.id)}>
            {todo.completed ? "Completed" : "Mark as complete"}
          </button>
        </div>
      ))}
    </div>
  );
}
