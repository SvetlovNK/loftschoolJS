/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function (resolve) {

        setTimeout(() => {
            resolve();
        }, seconds * 1000);
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return getTowns();
}

function getTowns() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        let towns = new Object();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);

        xhr.onload = function () {
            towns = JSON.parse(xhr.responseText);
            resolve(sortTowns(towns));
        };

        xhr.onerror = function () {
            reject();
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

export {
    delayPromise,
    loadAndSortTowns
};
