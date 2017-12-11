/* ДЗ 7.1 - BOM */

/**
 * Функция должна создавать окно с указанным именем и размерами
 *
 * @param {number} name - имя окна
 * @param {number} width - ширина окна
 * @param {number} height - высота окна
 * @return {Window}
 */
function createWindow(name, width, height) {
    let params = `height = ${height}, width = ${width}`;
    let newWindow = window.open("", name, params);

    return newWindow;
}

/**
 * Функция должна закрывать указанное окно
 *
 * @param {Window} window - окно, размер которого надо изменить
 */
function closeWindow(window) {
    window.close();
}

/**
 * Функция должна создавать cookie с указанными именем и значением
 *
 * @param name - имя
 * @param value - значение
 */
function createCookie(name, value) {
    let date = new Date(new Date().getTime() + 60 * 1000);

    document.cookie = `${name} = ${value}; path = /; expires = ${date.toUTCString()}`;
}

/**
 * Функция должна удалять cookie с указанным именем
 *
 * @param name - имя
 */
function deleteCookie(name) {
}

export {
    createWindow,
    closeWindow,
    createCookie,
    deleteCookie
};
