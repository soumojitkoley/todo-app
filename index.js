let getList = document.querySelector('.task-list');
let inputBox = document.querySelector('.input-box');
let addButton = document.querySelector('.add-btn');

var i = 0;

addButton.addEventListener('click', () => {
    let eachListDiv = document.createElement('div');
    eachListDiv.setAttribute('id', `div${i}`);
    eachListDiv.innerHTML = `<p>${inputBox.value}</p>
                             <button class="edit-btn">Edit</button>
                             <span class="del-btn">Delete</span>`;
    getList.appendChild(eachListDiv);
    inputBox.value = "";
    i++;

})

getList.addEventListener('click' , (e) => {
    if(e.target.tagName == 'SPAN') {
        e.target.parentElement.remove();
    }
})