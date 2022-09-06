const form = document.querySelector("#new-task-form")
const input = document.querySelector("#new-task-input")
const list_el = document.querySelector("#tasks")

document.addEventListener("DOMContentLoaded", getTodos)
form.addEventListener("submit", addTodo)
list_el.addEventListener("click", todoControl)

function addTodo(e){
    e.preventDefault()
    const task = input.value
    if(!task){
        alert("Please fill out the task")
        return
    }

    const task_el = document.createElement("div")
    task_el.classList.add("task")

    const task_content_el = document.createElement("div")
    task_content_el.classList.add("content")

    const task_input_el = document.createElement("input")
    task_input_el.type = "text"
    task_input_el.classList.add("text")
    task_input_el.value = task
        
    task_content_el.appendChild(task_input_el)
    task_el.appendChild(task_content_el)
    list_el.appendChild(task_el)

    const task_actions_el = document.createElement("div")
    task_actions_el.classList.add("actions")

    saveLocalTodos(task)

    const task_edit_el = document.createElement("button")
    task_edit_el.classList.add("edit")
    task_edit_el.innerHTML = "Edit"

    const task_delete_el = document.createElement("button")
    task_delete_el.classList.add("delete")
    task_delete_el.innerHTML = "Delte"

    task_actions_el.appendChild(task_edit_el)
    task_actions_el.appendChild(task_delete_el)
    task_el.appendChild(task_actions_el)

    input.value = ""

    function saveLocalTodos(todo){
        let todos
        if(localStorage.getItem("todos")==null){
            todos = []
        }else{
            todos = JSON.parse(localStorage.getItem("todos"))
        }
        todos.push(todo)
        localStorage.setItem("todos", JSON.stringify(todos))
    }
}

function todoControl(e){
    let todos
    if(localStorage.getItem("todos")==null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }    
    const item = e.target
    const a = item.parentElement
    const b = a.parentElement
    const c = b.childNodes[0]
    const d = c.childNodes[0]
    const dIndex = todos.indexOf(d.value)

    if(item.classList == "delete"){
        b.remove()
        todos.splice(dIndex ,1)
        localStorage.setItem("todos", JSON.stringify(todos))
    }if(item.classList == "edit"){
        var changeTodos = prompt("Change Value :", "")
        d.value = changeTodos
        todos[dIndex] = changeTodos
        localStorage.setItem("todos", JSON.stringify(todos))
    }
    
}
function getTodos(todo){
    let todos
    if(localStorage.getItem("todos")==null){
        todos = []
    }else{
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
        const task_el = document.createElement("div")
        task_el.classList.add("task")
    
        const task_content_el = document.createElement("div")
        task_content_el.classList.add("content")
    
        const task_input_el = document.createElement("input")
        task_input_el.type = "text"
        task_input_el.classList.add("text")
        task_input_el.value = todo
        // task_input_el.setAttribute("readonly","readonly")
            
        task_content_el.appendChild(task_input_el)
        task_el.appendChild(task_content_el)
        list_el.appendChild(task_el)
    
        const task_actions_el = document.createElement("div")
        task_actions_el.classList.add("actions")
    
        const task_edit_el = document.createElement("button")
        task_edit_el.classList.add("edit")
        task_edit_el.innerHTML = "Edit"
    
        const task_delete_el = document.createElement("button")
        task_delete_el.classList.add("delete")
        task_delete_el.innerHTML = "Delete"
    
        task_actions_el.appendChild(task_edit_el)
        task_actions_el.appendChild(task_delete_el)
        task_el.appendChild(task_actions_el)
                
    })
}