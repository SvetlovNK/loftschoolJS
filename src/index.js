/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {
    let isAllTrue = true;

    if (!(array instanceof Array) || array.length === 0) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for (let i = 0; i < array.length; i++) {
        let isTrue = (fn(array[i]));

        if (!isTrue) {
            isAllTrue = false;
            break;
        }
    }

    return isAllTrue;
}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    let someTrue = false;

    if (!(array instanceof Array) || array.length === 0) {
        throw new Error('empty array');
    }

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for (let i = 0; i < array.length; i++) {
        let isTrue = (fn(array[i]));

        if (isTrue) {
            someTrue = true;
            break;
        }
    }

    return someTrue;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {

    let result = new Array();

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for (let i = 1; i< arguments.length; i++) {
        try {
            fn(arguments[i]);
        }
        catch (e) {
            result.push(arguments[i]);
        }
    }

    return result;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    let result = number;

    if (typeof number != 'number') {
        throw new Error('number is not a number');
    }

    let object = {
        sum: function() {
            for (let i = 0; i < arguments.length; i++) {
                result += arguments[i];
            }

            return result;
        },
        dif: function () {
            for (let i = 0; i <arguments.length; i++) {

                result -= arguments[i];
            }

            return result;
        },
        div: function () {
            for (let i = 0; i < arguments.length; i++) {

                if (arguments[i] === 0) {
                    throw new Error('division by 0');
                }

                result /= arguments[i];
            }

            return result;
        },
        mul: function () {
            for (let i = 0; i < arguments.length; i++) {
                result *= arguments[i];
            }

            return result;
        }
    };

    return object;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
