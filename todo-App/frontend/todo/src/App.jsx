import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './component /CreateTodo'
import { Todos } from './component /Todos'

function App() {
  // const [todos, setTodo] = useState([]);


  // fetch("http://localhost:3000/todos").then(async function(res){
  //   const json=await res.json()
  //   setTodo(json.Todos)
  // })

  return (
    <>
     <CreateTodo/>
     {/* <Todos todos={todos}/> */}
    </>
  )
}

export default App
