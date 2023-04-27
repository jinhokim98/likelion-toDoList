const formBox = document.querySelector('.inputForm');
const inputBox = document.querySelector('#input_');
const list = document.querySelector('.showList');

function showToDo(event) {
    event.preventDefault();

    const toDo = inputBox.value;
    const appendItem = document.createElement('li');
    appendItem.textContent = toDo;
    list.appendChild(appendItem);
};

formBox.addEventListener('submit', showToDo);
