const taskForm = document.getElementById('task-form');
const taskInput = document.querySelector('#taskInput');
const search = document.querySelector('#search');
const clearBtn = document.querySelector('#clearBtn');
const listGroup = document.querySelector('.list-group');

// Load All Event Listeners
loadEventListeners();

// Load All event listeners function
function loadEventListeners(){
    // Lode Saved File
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add Task Event
    taskForm.addEventListener('submit',addTask);
    // Remove Task
    listGroup.addEventListener('click', removeTask);
    // Clear All Task
    clearBtn.addEventListener('click', cleanTasks);
    // Search All Task
    search.addEventListener('keyup', searchTask);

}

// Add Task Event Listener Function
function addTask(e){
    if(taskInput.value === ''){
        alert("You Can't Save Empty Task!" )
    }
    const li = document.createElement('li');
    const span = document.createElement('span');

    li.classList = 'list-group-item text-primary d-flex justify-content-between align-items-center';
    li.appendChild(document.createTextNode(taskInput.value));

    span.classList = 'btn btn-sm bg-red del-item';
    span.innerHTML = '<i class="fas fa-trash-alt"></i>'
    li.appendChild(span);
    listGroup.appendChild(li);
    
    // Save in local store
    saveTaskToLocalStore(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}

// Remove Task Event Listener Function
function removeTask(e){
    if(e.target.parentElement.classList.contains('del-item')){
        if(confirm("Are you sure?")){
            e.target.parentElement.parentElement.remove();

            // Remove from local store
            removeTaskFromLocalStore(e.target.parentElement.parentElement);
        }
    }
}

// cleanTasks Event Listener Function
function cleanTasks(){
    if(confirm("Are you sure, you want to delate all task?")){
        while(listGroup.firstChild){
            listGroup.firstChild.remove();
        }
        // Clear Task from local store
        clearTasksFromLocalStore();
    }
}

// searchTask Event Listener Function
function searchTask(e){
    const text = e.target.value.toLowerCase();
    const listItem = document.querySelectorAll('.list-group-item');

    listItem.forEach(function(task){
        const item = task.textContent.toLowerCase();
        if(item.indexOf(text) !== -1){
            task.classList.remove('d-none');
        }
        else{
            task.classList.add('d-none');
        }
    });
}

////// All Function For LocalStore //////
// Save Task to local store
function saveTaskToLocalStore(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get Task from local store
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        const li = document.createElement('li');
        const span = document.createElement('span');
    
        li.classList = 'list-group-item text-primary d-flex justify-content-between align-items-center';
        li.appendChild(document.createTextNode(task));
    
        span.classList = 'btn btn-sm bg-red del-item';
        span.innerHTML = '<i class="fas fa-trash-alt"></i>'
        li.appendChild(span);
        listGroup.appendChild(li);
    });
}

// removeTaskFromLocalStore function
function removeTaskFromLocalStore(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index,1);
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

// clearTasksFromLocalStore function
function clearTasksFromLocalStore(){
    localStorage.clear();
}

