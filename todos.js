
// Default items
var defaultItems = [
    { contents: "Complete online JavaScript course", activeState: 1 },
    { contents: "Jog around the park 3x", activeState: 0 },
    { contents: "10 minutes meditation", activeState: 0 },
    { contents: "Read for 1 hour", activeState: 0 },
    { contents: "Pick up groceries", activeState: 0 },
    { contents: "Complete Todo App on Frontend Mentor", activeState: 0 }
 ];
 

// Get todos from LocalStorage
var todos = JSON.parse(localStorage.getItem('todos')) || defaultItems;

// Get reference to todo list
var todoList = document.querySelector('#todo-list');

// Render todos
function renderTodos() {
    // Clear existing list items
    todoList.innerHTML = '';
  
    // Retrieve items
    todos = JSON.parse(localStorage.getItem('todos')) || defaultItems;
    todos.forEach(function(item, index) {
        var listItem = document.createElement('li');
        listItem.className = 'todo-item';

        // Create a item-wrapper for the span and checkbox
        var itemWrapper = document.createElement('div');
        
        // Set the text content of the list item
        var span = document.createElement('span');
        span.textContent = item.contents;

       // Create a checkbox
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'item-' + index;
        checkbox.className = 'todo-item-checkbox';
        checkbox.checked = item.activeState === 1; 
        // Create a label for the checkbox
        var label = document.createElement('label');
        label.className = 'todo-item-icon';
        label.setAttribute('for', checkbox.id);
        checkbox.addEventListener('change', function() {
        // Update activeState when checkbox is checked or unchecked
        todos[index].activeState = this.checked ? 1 : 0;
        // Update localStorage
        localStorage.setItem('todos', JSON.stringify(todos));
        // Update class of list item
        listItem.classList.toggle('item-complete', this.checked);
        label.classList.toggle('checked', this.checked);
        updateItemCount();
        });
        if (checkbox.checked) {
            listItem.classList.add('item-complete');
            label.classList.add('checked');
        }


        // Append the checkbox to the label
        label.appendChild(checkbox);

        // Append the label to the list item
        itemWrapper.appendChild(label);

        // Append the span to the list item
        itemWrapper.appendChild(span);

        // Append the item-wrapper to the list item
        listItem.appendChild(itemWrapper);


        // Add delete button to each list item
        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = '';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            listItem.classList.add('hidden');
            setTimeout(() => {
                listItem.remove();
                todos = todos.filter(function(todo) {
                    return todo !== item;
                });
                localStorage.setItem('todos', JSON.stringify(todos));
                renderTodos(); // Re-render todos after deleting an item
                updateItemCount(); // Update item count
            }, 800); // Wait for the transition to finish
        });

        // Append the delete button to the list item
        listItem.appendChild(deleteButton);

        // Append the list item to the todo list
        todoList.appendChild(listItem);

   });
}

// Render todos initially
renderTodos();

// Capture input field entry
var inputField = document.querySelector('.input-field');
inputField.addEventListener('keypress', function(event) {
 if (event.key === 'Enter') {
 var newTodo = { contents: inputField.value, activeState: 0 };

 // Store new item
 todos.push(newTodo);
 localStorage.setItem('todos', JSON.stringify(todos));

 // Clear input field
 inputField.value = '';

 // Re-render todos
 renderTodos();
 updateItemCount();
 }
});

function updateItemCount() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let activeTodos = todos.filter(todo => todo.activeState === 0);
    if (activeTodos.length > 0) {
        document.getElementById('item-count').textContent = activeTodos.length;
    } else {
        document.getElementById('item-count').textContent = 0;
    }
 }  
updateItemCount();


function infoRow() {
    document.querySelectorAll('.sort-btn-group button').forEach(button => {
        button.addEventListener('click', (event) => {
            let state;
            switch(event.target.textContent){
                case 'All':
                    state = [0,1];
                    break;
                case 'Active':
                    state = [0];
                    break;
                case 'Completed':
                    state = [1];
                    break;
            }
            todos.forEach((todo, index) => {
                let listItem = document.querySelectorAll('.todo-list li')[index];
                if(state.includes(todo.activeState)) {
                    listItem.classList.remove('hidden');
                } else {
                    listItem.classList.add('hidden');
                }
            });
            // Remove 'active' class from all buttons
            document.querySelectorAll('.sort-btn-group button').forEach(btn => {
                btn.classList.remove('active');
            });
            // Add 'active' class to the clicked button
            event.target.classList.add('active');
        });
    });
    document.querySelector('.clear-completed-btn').addEventListener('click', () => {
        todos = todos.filter(todo => todo.activeState === 0);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    });
}
infoRow();

