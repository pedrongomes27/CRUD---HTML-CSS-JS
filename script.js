// Obtém a referência ao elemento HTML <ul> com o ID "list"
const list = document.getElementById('list');
// Obtém a referência ao botão HTML com o ID "add-button"
const addButton = document.getElementById('add-button');
const saveButton = document.getElementById('save-button');


// Adiciona um ouvinte de eventos de envio de formulário para o botão "Add"
addButton.addEventListener('click', () => {
    // Obtém as referências aos elementos HTML do formulário
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;

    // Verifica se o campo de título não está vazio
    if (title.trim() !== '') {
        // Cria um novo item com os valores dos campos do formulário
        const newItem = {
            title,
            description,
            priority,
            dueDate
        };

        // Adiciona o novo item à lista de tarefas
        addItem(newItem);

        // Salva a lista atualizada no armazenamento local do navegador
        saveList();

        // Limpa os campos do formulário
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('priority').value = '';
        document.getElementById('due-date').value = '';

        location.reload();
    } else {
        // Exibe uma mensagem de erro ou destaca o campo de título para o usuário
        alert('Por favor insira um título');
    }
});

saveButton.addEventListener('click', () => {
    // Obtém as referências aos elementos HTML do formulário
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const priority = document.getElementById('priority').value;
    const dueDate = document.getElementById('due-date').value;

    // Verifica se o campo de título não está vazio
    if (title.trim() !== '') {
        // Atualiza o item da lista com os novos valores dos campos do formulário
        const updatedItem = {
            title,
            description,
            priority,
            dueDate
        };
        todoList[currentIndex] = updatedItem;

        // Salva a lista atualizada no armazenamento local do navegador
        saveList();

        // Limpa os campos do formulário e exibe o botão "Adicionar" novamente
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('priority').value = '';
        document.getElementById('due-date').value = '';
        addButton.style.display = 'block';
        saveButton.style.display = 'none';

        // Renderiza a lista atualizada
        renderList();

        location.reload();
    } else {
        // Exibe uma mensagem de erro ou destaca o campo de título para o usuário
        alert('Por favor insira um título');
    }
});


// Adiciona um item à lista de tarefas
function addItem(item) {
    todoList.push(item);
    renderList();
}

function editItem(index) {
    window.scrollTo(0,0);

    const item = todoList[index];
    document.getElementById('title').value = item.title;
    document.getElementById('description').value = item.description;
    document.getElementById('priority').value = item.priority;
    document.getElementById('due-date').value = item.dueDate;

    // Armazena o índice do item que está sendo editado e exibe o botão "Salvar"
    currentIndex = index;
    addButton.style.display = 'none';
    saveButton.style.display = 'block';
}

// Remove um item da lista de tarefas
function deleteItem(index) {
    todoList.splice(index, 1);
    renderList();
    saveList();
}

// Renderiza a lista de tarefas no elemento HTML <ul>
function renderList() {
    // Limpa o conteúdo do elemento HTML <ul>
    list.innerHTML = '';

    // Itera sobre todos os itens na lista de tarefas
    todoList.forEach((item, index) => {
        // Cria elementos HTML para exibir as informações do item
        const div = document.createElement('div');
        div.classList.add('div-js');

        const checkbox = document.createElement('input');
        checkbox.classList.add('task-checkboxas');
        checkbox.type = 'checkbox';
        checkbox.classList.add(`priority-${item.priority}`);

        // Adiciona um ouvinte de eventos de mudança ao checkbox
        checkbox.addEventListener('change', () => {
            // Salva o estado do checkbox no localStorage
            localStorage.setItem(`todoItem-${index}-checked`, checkbox.checked);
        });

        // Define o estado do checkbox com base no valor armazenado no localStorage
        const checked = localStorage.getItem(`todoItem-${index}-checked`);
        checkbox.checked = checked === 'true';

        const h2 = document.createElement('h2');
        h2.classList.add('task-title');
        h2.innerText = item.title;

        const pDueDate = document.createElement('p');
        pDueDate.innerText = item.dueDate;
        pDueDate.classList.add('task-due-date');

        const pPriority = document.createElement('p');
        // pPriority.innerText = item.priority;
        pPriority.classList.add('task-priority');
        pPriority.classList.add(`priority-${item.priority}`);
        

        div.appendChild(checkbox);
        div.appendChild(h2);
        div.appendChild(pDueDate);
        div.appendChild(pPriority);

        const pDescription = document.createElement('p');
        pDescription.innerText = item.description;
        pDescription.classList.add('task-description')

        const divButton = document.createElement('div');
        divButton.classList.add('div-js');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('option-button');
        deleteButton.id = 'deleteButton';
        const deleteIcon = document.createElement('img'); deleteIcon.src = 'img/icon-delete.png';
        const deleteText = document.createElement('span');
        deleteText.innerText = 'Deletar';

        deleteButton.appendChild(deleteIcon);
        deleteButton.appendChild(deleteText);
        deleteButton.addEventListener('click', () => deleteItem(index));


        const editButton = document.createElement('button');
        editButton.classList.add('option-button');
        editButton.id = 'editButton';
        const editIcon = document.createElement('img'); editIcon.src = 'img/icon-edit.png';
        const editText = document.createElement('span');
        editText.innerText = 'Editar';

        editButton.appendChild(editIcon);
        editButton.appendChild(editText);

        // Adiciona um ouvinte de eventos de clique ao botão "Edit"
        editButton.addEventListener('click', () => editItem(index));

        divButton.appendChild(editButton);
        divButton.appendChild(deleteButton);


        // Cria um elemento HTML <li> para exibir o item na lista
        const li = document.createElement('li');
        li.appendChild(div);
        li.appendChild(pDescription);
        li.appendChild(divButton);

        
        // Adiciona o elemento HTML <li> à lista de tarefas
        list.appendChild(li);
    });
}


// Salvar a lista de tarefas atual no armazenamento local do navegador
function saveList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

// Carregar a lista de tarefas salva no armazenamento local do navegador, se houver
function loadList() {
    const savedList = localStorage.getItem('todoList');

    if (savedList !== null) {
        todoList = JSON.parse(savedList);
        renderList();
    }
}

// Inicializar a lista de tarefas vazia e carregar a lista salva, se houver
let todoList = [];
let currentIndex = -1; // inicialmente, nenhum item está sendo editado
loadList();
