import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './component /CreateTodo'
import { Todos } from './component /Todos'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <CreateTodo/>
     <Todos todos={[
      {title:"Welllo",
      description:"hola amigo ",
      completed:false
      }
     ]}/>
    </>
  )
}

export default App
