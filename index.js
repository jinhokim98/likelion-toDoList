const inputBox = document.querySelector('#input_');
const list = document.querySelector('.showList');

let listNumber = 0;

function showToDo(event) {
    event.preventDefault();

    const toDo = inputBox.value;
    const appendItem = document.createElement('li');
    const item = `
    <div id='row${listNumber}' class='row'>
        <input id='${listNumber}' type='checkbox' class='checkbox live' onclick='setLineThrough(this)'/>
        <span id='desc${listNumber}' class='desc'>${toDo}</span>
    <div>
    `;
    appendItem.innerHTML = item;
    list.appendChild(appendItem);
    listStyle();
    listNumber++;
};

function showToday() {
    const today = new Date();
    const date = document.querySelector('.date');
    date.textContent = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
}

document.addEventListener('DOMContentLoaded', showToday);

function listStyle() {
    const checkbox = document.querySelectorAll('.checkbox');
    checkbox.forEach(item => {
        item.setAttribute('style', `
        width: 16px;
        height: 16px;
        border: 1px solid white;
        `);
    });
    const desc = document.querySelectorAll('.desc');
    desc.forEach(item => {
        item.setAttribute('style', `
        margin-left: 10px;
        font-size: 16px;
        `);
    });
    const rows = document.querySelectorAll('.row');
    rows.forEach(item => {
        item.setAttribute('style',`
        display: flex;
        align-items: center;
        margin: 0 16px 16px 16px;
        padding-bottom: 8px;
        border-bottom: 2px solid #AB9798;
        `);
    });
}

function setLineThrough(idx) {
    const selectList = document.querySelector(`#desc${idx.id}`);
    idx.checked
        ? selectList.setAttribute('style', `
            text-decoration: line-through;
            margin-left: 10px;`)
        : selectList.setAttribute('style', `
            text-decoration: none;
            margin-left: 10px;`);
}

function deleteList(event) {
    event.preventDefault();

    const allCheckbox = document.querySelectorAll('.checkbox');
    const checkedCheckbox = [...allCheckbox]
        .filter(checkbox => checkbox.checked === true)
        .map(item => item.id)
        .map(id => document.querySelector(`#row${id}`).parentNode);

    checkedCheckbox.map(item => list.removeChild(item));
}
