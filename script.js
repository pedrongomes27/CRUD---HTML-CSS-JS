const list = document.getElementById('list');
const addButton = document.getElementById('add-button');
const editButton = document.getElementById('edit-button');

addButton.addEventListener('click', () => {
    const newtitle = document.getElementById('title');
    const newdescription = document.getElementById('description');
    const newpriority = document.getElementById('priority');
    const newdueDate = document.getElementById('due-date');

    const title = newtitle.value;;
    const description = newdescription.value;
    const priority = newpriority.value;
    const dueDate = newdueDate.value;

    const newItem = {
        title,
        description,
        priority,
        dueDate
    };

    addItem(newItem);
    saveList();

    newtitle.value = "";
    newdescription.value = "";
    newpriority.value = "";
    newdueDate.value = "";

});

editButton.addEventListener('click', () => {
    document.getElementById('title').value = newtitle;
    newdescription = document.getElementById('description').value;;
    newpriority = document.getElementById('priority').value;
    newdueDate = document.getElementById('due-date').value;

    title = newtitle.value;;
    escription = newdescription.value;
    riority = newpriority.value;
    dueDate = newdueDate.value;

    addItem(newItem);
    saveList();

    newtitle.value = "";
    newdescription.value = "";
    newpriority.value = "";
    newdueDate.value = "";

});

function addItem(item) {
    todoList.push(item);
    renderList();
}

function deleteItem(index) {
    todoList.splice(index, 1);
    renderList();
    saveList();
}

function renderList() {
    list.innerHTML = '';

    todoList.forEach((item, index) => {
        const h2 = document.createElement('h2');
        h2.innerText = item.title;

        const pDescription = document.createElement('p');
        pDescription.innerText = item.description;

        const pPriority = document.createElement('p');
        pPriority.innerText = `Priority: ${item.priority}`;
        pPriority.classList.add(`priority-${item.priority}`);

        const pDueDate = document.createElement('p');
        pDueDate.innerText = `Due Date: ${item.dueDate}`;

        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteItem(index)); const li = document.createElement('li');
        li.appendChild(h2);
        li.appendChild(pDescription);
        li.appendChild(pPriority);
        li.appendChild(pDueDate);
        li.appendChild(deleteButton);

        list.appendChild(li);
    });
}

function saveList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function loadList() {
    const savedList = localStorage.getItem('todoList');

    if (savedList !== null) {
        todoList = JSON.parse(savedList);
        renderList();
    }
}

let todoList = [];
loadList();
