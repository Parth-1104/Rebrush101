import { useState, useEffect } from 'react';
import { CreateTodo } from './component /CreateTodo';
import { Todos } from './component /Todos';

function App() {
  const [todos, setTodos] = useState([]);  // Fixed: setTodos

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(res => res.json())
      .then(data => setTodos(data.Todos || []))  // Handle json.Todos safely
      .catch(err => console.error(err));
  }, []);  // Empty deps = run once

  return (
    <>
      <CreateTodo />
      <Todos initialTodos={todos} />  {/* Fixed: initialTodos */}
    </>
  );
}

export default App;