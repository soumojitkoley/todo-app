let getList = document.querySelector('.task-list');
let inputBox = document.querySelector('.input-box');
let addButton = document.querySelector('.add-btn');

let i = 0;
let checkboxStates = [];

addButton.addEventListener('click', addTask);
inputBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});


function addTask() {
    if (inputBox.value === '') {
        alert('You must write something');
    } else {
        let eachListDiv = document.createElement('div');
        eachListDiv.classList.add('list-div');
        eachListDiv.innerHTML = `<div class="checkbox-p">
                                    <input class="box-style" onclick="saveCheckbox()" type="checkbox" id="cbx${i}" ${checkboxStates[i] ? 'checked' : ''}>
                                    <label for="cbx${i}" class="check">
                                    <svg width="22px" height="22px" viewBox="0 0 18 18">
                                        <path
                                            d="M1,9 L1,3.5 C1,2 2,1 3.5,1 L14.5,1 C16,1 17,2 17,3.5 L17,14.5 C17,16 16,17 14.5,17 L3.5,17 C2,17 1,16 1,14.5 L1,9 Z">
                                        </path>
                                        <polyline points="1 9 7 14 15 4"></polyline>
                                    </svg>
                                    </label>
                                    <div class="task-content" contenteditable="false">${inputBox.value}</div>
                                </div>
                                <div class="save-edit-del">
                                    <span class="save-btn" style="display:none"><i class="fa-solid fa-check fa-xl" style="color:#0bef13"></i></span>
                                    <span class="edit-btn"><i class="fa-regular fa-pen-to-square fa-xl" style="color: aqua"></i></span>
                                    <span class="del-btn"><i class="fa-solid fa-trash fa-xl" style="color:red"></i></span>
                                </div>`;

        getList.appendChild(eachListDiv);
        inputBox.value = '';
        i++;
        saveData();
    }
}

getList.addEventListener('click', (e) => {
    if (e.target.classList.contains('fa-trash')) {
        e.target.closest('.list-div').remove();
        updateCheckboxStates();
        saveData();
    }
    else if (e.target.type === 'checkbox') {
        const checkbox = e.target;
        const taskContent = checkbox.parentElement.querySelector('.task-content');

        if (checkbox.checked) {
            taskContent.style.cssText = 'color: green; font-weight: bold; text-decoration: line-through;';
        } else {
            taskContent.style.cssText = 'color: white; font-weight: normal; text-decoration: none;';
        }

        updateCheckboxStates();
        saveData();
    }
    else if (e.target.classList.contains('fa-pen-to-square')) {
        const listItem = e.target.closest('.list-div');
        const taskContent = listItem.querySelector('.task-content');
        const editButton = listItem.querySelector('.edit-btn');
        const saveButton = listItem.querySelector('.save-btn');
        taskContent.style.boxShadow = '0 0 10px #dfd1e6, 0 0 25px #f2f3e9, 0 0 50px #e8eadf';
        editButton.style.display = 'none';
        saveButton.style.display = 'block';
        taskContent.contentEditable = true;
        taskContent.focus();

        let range = document.createRange();
        range.selectNodeContents(taskContent);
        range.collapse(false);
        let selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
    else if (e.target.classList.contains('fa-check')) {
        const listItem = e.target.closest('.list-div');
        const taskContent = listItem.querySelector('.task-content');
        const editButton = listItem.querySelector('.edit-btn');
        const saveButton = listItem.querySelector('.save-btn');

        editButton.style.display = 'block';
        saveButton.style.display = 'none';
        taskContent.style.boxShadow = 'none';
        taskContent.contentEditable = false;
        updateCheckboxStates();
        saveData();
    }
});

getList.addEventListener('input', (e) => {
    if (e.target.classList.contains('task-content')) {
        const editedText = e.target.textContent;
        updateCheckboxStates();
        saveData();
    }
});


function saveCheckbox() {
    checkboxStates = Array.from(document.querySelectorAll('.box-style')).map(checkbox => checkbox.checked);
    saveData();
}

function updateCheckboxStates() {
    checkboxStates = Array.from(document.querySelectorAll('.box-style')).map(checkbox => checkbox.checked);
}

function saveData() {
    localStorage.setItem('data', getList.innerHTML);
    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

function showTask() {
    getList.innerHTML = localStorage.getItem('data');
    const savedCheckboxStates = JSON.parse(localStorage.getItem('checkboxStates')) || [];
    checkboxStates = savedCheckboxStates;

    i = document.querySelectorAll('.list-div').length;
    const checkboxes = document.querySelectorAll('.box-style');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = checkboxStates[index];
    });
}

showTask();
