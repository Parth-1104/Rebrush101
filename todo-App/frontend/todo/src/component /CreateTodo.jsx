import { useState } from "react"

export function  CreateTodo(){
    const [title,setTitle]=useState("")
    const [description,setDescription]=useState("")

return (
<div>
    <input type="text" placeholder="Title" onChange={function(e){
        const json=e.target.value
        setTitle(json)
    }} /><br />
    <input type="text" placeholder="Description" onChange={function(e){
        const json=e.target.value
        setDescription(json)
    }}/><br />
    <button onClick={function(){
        fetch("http://localhost:3000/todo",{
            method:"POST",
            body:JSON.stringify({
                title:title,
                description:description
            }),
            headers:{
                "Content-type":"application/json"
            }
        })
    }}>Add todo </button><br />
</div>
)}