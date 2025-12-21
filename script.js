const todoInputField=document.getElementById("todo-input-id")
const addTodoButtonFiled=document.getElementById("add-todo-button-id")

const todoListField=document.getElementById("todo-list-id")
const todoCountId=document.getElementById("todo-count-id")

const sortByField=document.getElementById("sort-select")

let todosArray=[]
let todosCount=0

const todosCounter=()=>{
    counter=0
    for (let todo of todosArray){
        if (todo && todo.completed===false){
            counter+=1
        }
    }
    todosCount=counter
    todoCountId.textContent=todosCount
}

//create todos and append
const createToDoItems=(each)=>{
    const todoListItemCreated=document.createElement("li")
    todoListItemCreated.classList.add("list-element")
    todoListItemCreated.dataset.id=each.todoId

    const checkboxElement=document.createElement('input')
    checkboxElement.type="checkbox"
    checkboxElement.classList.add("input-check")
    if (each.completed){
        checkboxElement.checked=true
    }
    todoListItemCreated.appendChild(checkboxElement)

    const textElement=document.createElement('input')
    textElement.type="text"
    textElement.value=each.todoValue.trim()
    textElement.classList.add("input-text")

    if (each.completed){
        textElement.style.textDecoration="line-through"
        textElement.disabled=true
    }
    todoListItemCreated.appendChild(textElement)

    const deleteButtonElement=document.createElement("button")
    deleteButtonElement.innerHTML=`<i class="fa-solid fa-x"></i>`
    deleteButtonElement.classList.add("delete-button")
    todoListItemCreated.appendChild(deleteButtonElement)
    setTimeout(()=>{
        todoListItemCreated.classList.add('todo-enter')
    })
    todoListField.append(todoListItemCreated)
    
}

//adds todos into array
const AddToDoFunction=()=>{    
    const todoValue=todoInputField.value.trim()
    const each={
        todoId:Date.now(),
        time:new Date(),
        completed:false,
        editing:false,
        todoValue
    }
    todosArray.push(each)
    console.log(todosArray)
    todoInputField.value=""
    createToDoItems(each)
    todosCounter()

}

const createMultipleToDoItems=(arr)=>{
    todoListField.innerHTML=""
    arr.forEach(each=>{
        createToDoItems(each)
    })
}

addTodoButtonFiled.addEventListener("click", (e)=>{
    e.preventDefault()
    if (todoInputField.value.trim()===""){
        alert("Cannot add an empty Todo")
        return
    }
    AddToDoFunction()

})


// checkbox and delete functionality

todoListField.addEventListener("click", (event)=>{
    const targetItem=event.target
    const listItem=targetItem.closest("li")
    const todoDataSetId=Number(listItem.dataset.id)

    if (event.target.matches(".input-check")){
        
        const todoItemInArray=todosArray.find(each=>each.todoId===todoDataSetId)
        todoItemInArray.completed=!todoItemInArray.completed
        listItem.classList.toggle("checked", todoItemInArray.completed)
        listItem.querySelector(".input-text").disabled=todoItemInArray.completed

    }

    if (event.target.matches(".delete-button")){
        const filteredArray=todosArray.filter(each=>each.todoId !== todoDataSetId)
        todosArray=filteredArray
        listItem.remove()
    }

    todosCounter()
})

//update each todo specifically

todoListField.addEventListener("keydown", (event)=>{
    if (event.key!=="Enter") return
    if (!event.target.matches(".input-text")) return

    const todoInputItem=event.target
    const listItem=todoInputItem.closest("li")
    const todoDataSetId=Number(listItem.dataset.id)

    const todoItemInArray=todosArray.find(each=>each.todoId===todoDataSetId)
    todoItemInArray.todoValue=todoInputItem.value.trim()
    alert("Todo Updated Successfully")

})

//sort todos based on user's selection
 
sortByField.addEventListener("change", ()=>{
    
    let sortedArray=[...todosArray]
    if (sortByField.value==="Latest"){
        sortedArray.sort((a,b)=>b.time-a.time)
    }

    if (sortByField.value==="Oldest"){
        sortedArray.sort((a,b)=>a.time-b.time)  
    }

    if (sortByField.value==="A-Z"){
        sortedArray.sort((a,b)=>a.todoValue.toLowerCase().localeCompare(b.todoValue.toLowerCase()) )   
    }

    if (sortByField.value==="Z-A"){
        sortedArray.sort((a,b)=>b.todoValue.toLowerCase().localeCompare(a.todoValue.toLowerCase()))   
    }
    createMultipleToDoItems(sortedArray)
})