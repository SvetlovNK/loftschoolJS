require('./custom.css');

/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    let div = document.createElement('DIV');
    const max = 150;
    const min = 50;

    const maxX = window.innerWidth;
    const maxY = window.innerHeight;

    const divWidth = Math.random() * (max - min) + min;
    const divHeight = Math.random() * (max - min) + min;
    const leftPosition = Math.random() * (maxX - divWidth) + divWidth;
    const TopPosition = Math.random() * (maxY - divHeight) + divHeight;

    div.style.position = 'absolute';
    div.style.width = `${divWidth}px`;
    div.style.height = `${divHeight}px`;
    div.style.top = `${TopPosition}px`;
    div.style.left = `${leftPosition}px`;
    div.style.backgroundColor = getRandomColor();

    div.classList.add('draggable-div');

    return div;
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {
    target.setAttribute('draggable', true);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    let dragHelper = new Object();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    homeworkContainer.addEventListener('dragstart', startDrag);
    homeworkContainer.addEventListener('dragend', handleDrop);
    homeworkContainer.addEventListener('drop', handleDrop);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/

    function startDrag(event) {
        let div = event.target;

        div.classList.add('drag');

        dragHelper.targetX = event.clientX - div.offsetLeft;
        dragHelper.targetY = event.clientY - div.offsetTop;
    }

    function handleDrop(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        }

        event.preventDefault();

        let div = event.target;

        let xCoords = event.clientX - dragHelper.targetX;
        let yCoords = event.clientY - dragHelper.targetY;

        div.style.top = `${yCoords}px`;
        div.style.left = `${xCoords}px`;

        div.classList.remove('drag');
        dragHelper = {};
    }
});

export {
    createDiv
};
