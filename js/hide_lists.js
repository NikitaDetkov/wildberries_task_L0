// Используются данные из prices.js 
// Переменная products
// Функции: addSpaces, getNewPrice

// Списки для скрытия
const list1 = {
    hidingButton: document.querySelector('#hiding_button_1'),
    hiddenList: document.querySelector('#hidden_list_1'),
    listState: true,
}

const list2 = {
    hidingButton: document.querySelector('#hiding_button_2'),
    hiddenList: document.querySelector('#hidden_list_2'),
    listState: true,
}

// Слушатель событий для скрытия первого списка
// Скрывает первый список, считает суммарную стоимость товаров в корзине, 
// их количество и выводит в DOM
list1.hidingButton.addEventListener('click', () => {
    // Заголовок с чекбоксом
    const productsAllWrapper = document.querySelector('#products_all-wrapper');
    // Заголовок со значением цены и количества товаров
    const allProductsPrice = document.querySelector('#all-products-price');
    if (list1.listState) {
        list1.hiddenList.style.display = 'none';
        list1.hidingButton.style.transform = 'rotate(180deg)';

        // Получить значения цены и количества, добавит пробелы
        const productsNum = addSpaces( String( getProductsNum(products) ) );
        const productsPrice = addSpaces( String( getProductsPrice(products) ) );

        productsAllWrapper.style.display = 'none';
        // Вывести значение в DOM
        allProductsPrice.innerHTML = `${productsNum} товаров · ${productsPrice} сом`;
        allProductsPrice.classList.add('show');
    } else {
        list1.hiddenList.style.display = 'flex';
        list1.hidingButton.style.transform = 'rotate(0deg)';

        productsAllWrapper.style.display = 'flex';
        allProductsPrice.classList.remove('show');
    }
    list1.listState = !list1.listState;
});

// Слушатель событий для скрытия второго списка
list2.hidingButton.addEventListener('click', () => {
    if (list2.listState) {
        list2.hiddenList.style.display = 'none';
        list2.hidingButton.style.transform = 'rotate(180deg)';
    } else {
        list2.hiddenList.style.display = 'flex';
        list2.hidingButton.style.transform = 'rotate(0deg)';
    }
    list2.listState = !list2.listState;
});


// Функция для получения полного количества продуктов
// Принимает: список продутов
function getProductsNum(products) {
    let productsNum = 0;
    for (let i = 0; i < products.length; i++) {
        productsNum += products[i].counter;
    }

    return productsNum;
}

// Функция для получения полной цены всех продуктов
// Принимает: список продутов
function getProductsPrice(products) {
    let productsPrice = 0;
    for (let i = 0; i < products.length; i++) {
        productsPrice += getNewPrice(products[i]);
    }

    return productsPrice;
}