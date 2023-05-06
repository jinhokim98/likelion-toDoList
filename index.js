const inputBox = document.querySelector('#input_');
const list = document.querySelector('.showList');

// 고유키 만들기
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
}

function init() {
    let localStorageKeys = [];
    let dataList = []; 

    // 로컬 스토리지에 있는 모든 키 이름을 가지고 온다.
    for (let i = 0; i<localStorage.length; i++) {
        localStorageKeys.push(localStorage.key(i));
    }

    // 뽑아온 키 이름으로 데이터리스트에 내용을 추가한다.
    localStorageKeys.map(item => {
        dataList.push(JSON.parse(localStorage.getItem(item)));
    })

    dataList.map(item => {
        const appendItem = document.createElement('li');
    
        const createItem = `
        <div id='row${item.key}' class='row'>
            <input id='${item.key}' type='checkbox' class='checkbox live' onclick='setLineThrough(this)'/>
            <span id='desc${item.key}' class='desc'>${item.desc}</span>
        <div>
        `;

        appendItem.innerHTML = createItem;
        list.appendChild(appendItem);
        listStyle();
    });
}

document.addEventListener('DOMContentLoaded', init);

function addList(event) {
    event.preventDefault();
    
    const uuidKey = uuidv4();
    const toDo = inputBox.value;
    const appendItem = document.createElement('li');
    const item = `
    <div id='row${uuidKey}' class='row'>
        <input id='${uuidKey}' type='checkbox' class='checkbox live' onclick='setLineThrough(this)'/>
        <span id='desc${uuidKey}' class='desc'>${toDo}</span>
    <div>
    `;
    appendItem.innerHTML = item;
    list.appendChild(appendItem);
    listStyle();
    
    // save to local storige
    const data = {
        key: uuidKey,
        desc: toDo
    }
    localStorage.setItem(`${data.key}`, JSON.stringify(data));
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
    let deleteKey = [];

    const allCheckbox = document.querySelectorAll('.checkbox');
    
    // nodeList를 array로 변환해주기 위해
    [...allCheckbox]
        .filter(checkbox => checkbox.checked === true)
        .map(item => item.id)
        .map(id => {
            deleteKey.push(id)
            return id;
        })
        .map(id => document.querySelector(`#row${id}`).parentNode)
        .map(item => list.removeChild(item));

    // delete key from local storige
    deleteKey.map(id => localStorage.removeItem(id));
}
