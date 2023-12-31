import React, { useEffect, useState } from 'react';
import { TodoProvider } from './Context/Context';
import Todoform from './Component/Todoform';
import TodoItems from './Component/TodoItems';

function App(){

  const [todos,settodos]=useState([]);

  const addtodo=(todo)=>{
    settodos((perv)=>[
      {id:Date.now(),...todo},...perv
    ])
  }
  const updatetodo=(id,todo)=>{
    settodos(
    (prev)=>prev.map(
        (prevTodo)=>
        prevTodo.id === id?todo:prevTodo
    ));
  }

  const deletetodo=(id)=>{
    settodos((prev)=> prev.filter((todo)=>todo.id!==id))
  }

  const toggletodo=(id)=>{
    settodos((prev)=> prev.map((prevtodo)=> prevtodo ===id?{...prevtodo,completed:!prevtodo.completed}:prevtodo))
  }
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      settodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  return(
    <TodoProvider value={{todos,addtodo,toggletodo,updatetodo,deletetodo}}>
    <div className="bg-[#172842] min-h-screen py-8">
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
        <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
        <div className="mb-4">
           <Todoform/>
        </div>
        <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id}
              className='w-full'
              >
                <TodoItems todo={todo} />
              </div>
            ))}
        </div>
    </div>
</div>
</TodoProvider>

  )
}

export default App;