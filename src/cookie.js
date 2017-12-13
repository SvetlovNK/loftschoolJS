import {createCookie, deleteCookie, setCookie, getCookie} from './index.js';

/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let cookieInputs = homeworkContainer.querySelectorAll('.js-cookie-input');
let cookieList = new Array();

addButton.addEventListener('click', changeCookie);

filterNameInput.addEventListener('keyup', rewriteTable);

listTable.addEventListener('click', removeCookie);

function changeCookie() {
    let isValid = validateInputs();

    if (!isValid) return false;

    let cookie = {
        name: addNameInput.value,
        value: addValueInput.value
    };

    checkCookie(cookie);
    rewriteTable();

}

function validateInputs() {
    for (let i = 0; i < cookieInputs.length; i++) {
        let input = cookieInputs[i];

        if (input.value === '') {
            input.focus();
            input.style.outlineColor = 'red';

            return false;
        }
    }

    return true;
}

function checkCookie(cookieObj) {
    let filterValue = filterNameInput.value;

    if (cookieList.length > 0) {
        for (var i = 0; i < cookieList.length; i++) {
            if (cookieObj.name === cookieList[i].name) {
                updateCookie(cookieObj, cookieList[i]);
                return;
            }
        }
    }

    if (filterValue === '') {
        addNewCookie(cookieObj);
    } else {
        if (isMatching(cookieObj.name, filterValue) || isMatching(cookieObj.value, filterValue)) {
            addNewCookie(cookieObj);
        }
    }
}

function addNewCookie(cookieObj) {
    cookieList.push(cookieObj);
    createCookie(cookieObj.name, cookieObj.value);
}

function updateCookie(newCookie, oldCookie) {
    oldCookie.value = newCookie.value;
    setCookie(newCookie.name, newCookie.value);
}

function removeCookie(event) {
    let target = event.target;

    if (target.className !== 'js-delete-button') return;

    let row = target.closest('.js-row');
    let name = row.getAttribute('data-name');

    deleteCookieFromArray(name);
    deleteCookie(name);
    rewriteTable();
}

function deleteCookieFromArray(name) {
    for (var i = 0; i < cookieList.length; i++) {
        if (name === cookieList[i].name) {
            cookieList.splice(i, 1);
            return;
        }
    }
}

function rewriteTable() {
    let filtredList = new Array();
    listTable.innerHTML = '';

    filtredList = filterTable();

    filtredList.forEach(function (cookie) {
        listTable.appendChild(createRow(cookie));
    });
}

function createRow(cookieObj) {
    let row = document.createElement('TR');
    row.className = 'list-table__item js-row';
    row.setAttribute('data-name', cookieObj.name);

    for (let key in cookieObj) {
        let cell = document.createElement('TD');
        cell.innerHTML = cookieObj[key];
        row.appendChild(cell);
    }

    row.appendChild(createButton());

    return row;

    function createButton() {
        let cell = document.createElement('TD');
        let button = document.createElement('BUTTON');

        button.setAttribute('type', 'button');
        button.innerHTML = 'Удалить';
        button.className = 'js-delete-button';

        cell.appendChild(button);

        return cell;
    }
}

function filterTable() {
    let value = filterNameInput.value;
    let result = new Array();

    if (value === '') {
        return cookieList;
    } else {
        cookieList.forEach(function (cookie) {
            if (isMatching(cookie.name, value) || isMatching(cookie.value, value)) {
                result.push(cookie);
            }
        });

        return result
    }
}

function isMatching(full, chunk) {
    let str = full;
    let regexp = new RegExp(chunk, 'ig');
    let result = str.match(regexp);

    if (chunk.length === 0) return false;

    if (result != null) {
        return true;
    } else {
        return false
    }
}
