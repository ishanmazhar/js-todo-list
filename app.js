//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list'); 
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos); 
todoButton.addEventListener('click', addTodo); 
todoList.addEventListener('click', deleteCheck); 
filterOption.addEventListener('click', filterTodo);


//Functions
function addTodo(event) {
    //Prevent form from submitting
    event.preventDefault();
    if (todoInput.value == '')
        alert("Please enter a task to do"); 
    else {
        //Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //Add todo to Local Storage
        saveLocalStorage(todoInput.value); 

        //CHECK MARK BUTTON
        const completedButton = document.createElement('button'); 
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //TRASH BUTTON
        const trashButton = document.createElement('button'); 
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton); 

        //APPEND TODO-DIV TO TODO-LIST
        todoList.appendChild(todoDiv);

        //CLEAR TOTO INPUT VALUE
        todoInput.value = '';
    }
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo); 
        todo.addEventListener('transitionend', () => {
            todo.remove(); 
            console.log(todo);
        });
    }

    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        console.log('ishan')
        todo.classList.toggle('completed');
    }
    console.log(item.classList)
}

function filterTodo(e) {
    const todos = todoList.childNodes; 
    todos.forEach((todo) => {
        switch(e.target.value) {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if (todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none'; 
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed'))
                    todo.style.display = 'flex';
                else
                    todo.style.display = 'none'; 
                break;
        }
    });
}

function saveLocalStorage(todo) {
    //CHECK IF ANYTHING IS ALREADY IN LOCAL STORAGE
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo); 
    localStorage.setItem('todos', JSON.stringify(todos)); 
}

function getTodos() {
    //CHECK IF ANYTHING IS ALREADY IN LOCAL STORAGE
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach((todo) => {
         //Todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        //Create Li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo; 
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);

        //CHECK MARK BUTTON
        const completedButton = document.createElement('button'); 
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);

        //TRASH BUTTON
        const trashButton = document.createElement('button'); 
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton); 

        //APPEND TODO-DIV TO TODO-LIST
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    //CHECK IF ANYTHING IS ALREADY IN LOCAL STORAGE
    let todos; 
    if(localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText; //li element 
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem('todos', JSON.stringify(todos)); 
}