/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return getTowns();
}

function getTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let towns = new Object();
        let path = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

        xhr.open('GET', path, true);

        xhr.onload = function () {
            if (this.status == 200) {
                towns = JSON.parse(xhr.responseText);
                resolve(sortTowns(towns));
            } else {
                reject('Не удалось загрузить города');
            }
        };

        xhr.send();
    });
}

function sortTowns(objectTowns) {
    let result = objectTowns.sort((a, b) => {

        if (a.name > b.name) {
            return 1;
        }

        if (a.name < b.name) {
            return -1;
        }

        return 0;
    });

    return result;
}

/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    let str = full;
    let regexp = new RegExp(chunk, 'i');
    let result = str.match(regexp);

    if (chunk.length === 0) return false;

    if (result != null) {
        return true;
    } else {
        return false
    }
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let errorBlock = homeworkContainer.querySelector('#error-block');
let errorButton = homeworkContainer.querySelector('.js-error-button');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let townsPromise;
let towns;

initTowers();

filterResult.addEventListener('click', acceptTown);

filterInput.addEventListener('keyup', function() {
    let inputValue = this.value;

    showMathes(inputValue);
});

errorButton.addEventListener('click', function () {
    initTowers()
});

function initTowers() {
    townsPromise = getTowns();

    townsPromise.then(
        result => {
            loadingBlock.style.display = 'none';
            filterBlock.style.display = 'block';
            towns = result;
        },
        error => {
            console.warn(error);
            loadingBlock.style.display = 'none';
            errorBlock.style.display = 'block';
        });
}

function showMathes(value) {
    let townsList = new Array();

    for (let i = 0; i < towns.length; i++) {
        let town = towns[i];
        let townName = town['name'];

        let isMatch = isMatching(townName, value);

        if (isMatch) {
            townsList.push(townName);
        }
    }

    filterMathes(townsList)
}

function filterMathes(townsList) {
    filterResult.innerHTML = '';

    for (let i = 0; i < townsList.length; i++) {
        let townName = townsList[i];
        let div = createBlock(townName);

        filterResult.appendChild(div);
    }
}

function createBlock(text) {
    let block = document.createElement('DIV');

    block.innerHTML = text;
    block.className = 'filter-result__element js-result-item';
    block.style.cursor = 'pointer';

    return block
}

function acceptTown() {
    let element = event.target;

    if (element.classList.contains('js-result-item')) {
        let value = element.innerHTML;

        filterInput.value = value;
        showMathes(value);
        filterResult.innerHTML = '';
    }
}

export {
    loadTowns,
    isMatching
};
