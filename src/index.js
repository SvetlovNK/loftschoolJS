/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    let newArray = new Array;

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial = 0) {
    let i = (!initial) ? 1 : 0;
    let result = initial || array[0];

    for (i; i < array.length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    if (obj.hasOwnProperty(prop)) {
        delete obj[prop];
    }
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    return obj.hasOwnProperty(prop);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    let result = new Array;

    for (let key in obj) {
        result.push(key.toUpperCase());
    }

    return result;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
    let result = new Array;

    let i = spotFrom(from, array);
    let counter = spotTo(to, array);

    for (i; i < counter; i++) {
        result.push(array[i]);
    }

    return result;
}

function spotFrom(fromValue, array) {
    if (fromValue < 0) {
        if (Math.abs(fromValue) > array.length) {
            return 0;
        } else {
            return array.length + fromValue;
        }
    }

    return fromValue;
}

function spotTo(toValue, array) {
    if (toValue < 0) {
        return array.length + toValue;
    }

    if (toValue > array.length) {
        return array.length;
    }

    return toValue;
}
/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let handler = {
        set(target, prop, value) {
            return target[prop] = value * value;
        }
    };

    let proxy = new Proxy(obj, handler);

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
};
