// Старые и новые цены
const prices = [522, 2100047, 494];
const oldPrices = [1051, 2300047, 950];
let priceSum = 0;
let oldPriceSum = 0;
let discountSum = 0;

// Получение элементов DOM-дерева для новых цен
const htmlPrices = [
    document.querySelector('#price_1'),
    document.querySelector('#price_2'),
    document.querySelector('#price_3')
];

// Получение элементов DOM-дерева для старых цен
const htmlOldPrices = [
    document.querySelector('#old_price_1'),
    document.querySelector('#old_price_2'),
    document.querySelector('#old_price_3')
];

// Получение элементов DOM-дерева для checkboxes товаров
const checkboxes = [
    document.querySelector('#product_1'),
    document.querySelector('#product_2'),
    document.querySelector('#product_3')
]
const checkboxAll = document.querySelector('#products_all');

// Получение элементов DOM-дерева для итоговых цен и скидки
const htmlPriceSum = document.querySelector("#price_sum");
const htmlOldPriceSum = document.querySelector("#old_price_sum");
const htmlDiscountSum = document.querySelector('#discount_sum');

const paymentCheckbox = document.querySelector('#payment_checkbox');
const orderButton = document.querySelector('#order_button');

// Получение элементов DOM-дерева для формирования товаров в доставке
// Даты доставки
const htmlDeliveryDate1 = document.querySelector("#delivery-date-1");
const htmlDeliveryDate2 = document.querySelector("#delivery-date-2");
// Контейнеры для товаров в доставке
const htmlDeliveryBox1 = document.querySelector("#delivery-box-1");
const htmlDeliveryBox2 = document.querySelector("#delivery-box-2");
// Товары в доставке
const htmlDeliveryProduct1 = document.querySelector("#delivery-product-1");
const htmlDeliveryProduct21 = document.querySelector("#delivery-product-2-1");
const htmlDeliveryProduct3 = document.querySelector("#delivery-product-3");
const htmlDeliveryProduct22 = document.querySelector("#delivery-product-2-2");

// Установить в DOM цены на товары
setPrices();

// Установить в DOM итоговые цены и скидку
setPricesSum();

// Слушатели событий и функции =============================================

// Слушатель событий на checkbox для изменения кнопки "Заказать"
paymentCheckbox.addEventListener('change', () => {
    changeOrderButton();
})

// Выбрать все checkbox, если выбран главный,
// или убрать, если убран главный
checkboxAll.addEventListener('change', () => {
    if (checkboxAll.checked ) {
        for (let i = 0; i < 3; i++) {
            checkboxes[i].checked = true;
        }
        setPricesSum();
        changeOrderButton();
        changeDeliveryBasket();
    } else {
        for (let i = 0; i < 3; i++) {
            checkboxes[i].checked = false;
        }
        setPricesSum();
        changeOrderButton();
        changeDeliveryBasket();
    }
})

// Вбрать главный checkbox, если выбраны все, 
// или убрать, если выбраны не все 
for (let i = 0; i < 3; i++) {
    checkboxes[i].addEventListener('change', () => {
        checkboxAll.checked = checkCheckboxs();
        setPricesSum();
        changeOrderButton();
        changeDeliveryBasket();
    })
}

// Функция. Изменяет состав корзины в доставке.
// Устанавливает или удаляет товары из доставки в соответствии с
// выбором из корзины (checkboxes)
function changeDeliveryBasket() {
    if (checkboxes[0].checked || checkboxes[1].checked || checkboxes[2].checked) {
        htmlDeliveryBox1.classList.remove('hide');
        htmlDeliveryDate1.classList.remove('hide');
    } else {
        htmlDeliveryBox1.classList.add('hide');
        htmlDeliveryDate1.classList.add('hide');
        htmlDeliveryBox2.classList.add('hide');
        htmlDeliveryDate2.classList.add('hide');
    }

    if (checkboxes[0].checked) {
        htmlDeliveryProduct1.classList.remove('hide');
    } else {
        htmlDeliveryProduct1.classList.add('hide');
    }

    if (checkboxes[1].checked) {
        htmlDeliveryBox2.classList.remove('hide');
        htmlDeliveryDate2.classList.remove('hide');
        htmlDeliveryProduct21.classList.remove('hide');
        htmlDeliveryProduct22.classList.remove('hide');
    } else {
        htmlDeliveryBox2.classList.add('hide');
        htmlDeliveryDate2.classList.add('hide');
        htmlDeliveryProduct21.classList.add('hide');
        htmlDeliveryProduct22.classList.add('hide');
    }

    if (checkboxes[2].checked) {
        htmlDeliveryProduct3.classList.remove('hide');
    } else {
        htmlDeliveryProduct3.classList.add('hide');
    }
} 

// Изменить в DOM значение в кнопке заказа
function changeOrderButton() {
    if (paymentCheckbox.checked) {
        orderButton.innerHTML = `Оплатить ${htmlPriceSum.innerHTML}`;
    } else {
        orderButton.innerHTML = 'Заказать';
    }
}

// Установка цен на товары в DOM 
// (для НЕРЕАЛИЗОВАННОГО случая, если мы будем менять количество товаров)
function setPrices() {
    for (let i = 0; i < 3; i++) {
        setNumber(htmlPrices[i], prices[i]);
        setNumber(htmlOldPrices[i], oldPrices[i]);
    }
}

// Установка в DOM итоговых цен и скидки
function setPricesSum() {
    priceSum = calculateSum(prices);
    oldPriceSum = calculateSum(oldPrices);
    discountSum = oldPriceSum - priceSum;

    setNumber(htmlPriceSum, priceSum);
    setNumber(htmlOldPriceSum, oldPriceSum);
    setNumber(htmlDiscountSum, discountSum)
}

// Добавление пробелов через каждые три символа в строке из цифр
// Принимает: строку из цифр без пробелов
// Возвращает: строку из цифр с пробелами через 3 символа
function addSpaces(priceStr) {
    let priceArr = [];

    for (let i = 0; i < priceStr.length; i++) {
        priceArr.push(priceStr[i]);
        if ((priceStr.length - i - 1) % 3 === 0 && i !== priceStr.length - 1) {
            priceArr.push(' ');
        }
    }

    return priceArr.join('');
}

// Установка числового значения num_elem 
// в html-элемент в html-elem 
function setNumber(htmlElem, numElem) {
    let numElemStr = String(numElem);
    if (numElemStr.length > 4) {
        numElemStr = addSpaces(numElemStr);
    }    
    htmlElem.innerHTML = numElemStr;
}

// Вычисление суммы цены выбранных соваров
// Возвращает сумму товаров, где выбран checkbox
function calculateSum(pricesArr) {
    let sum = 0;
    for (let i = 0; i < 3; i ++) {
        if (checkboxes[i].checked) {
            sum += pricesArr[i];
        }
    }
    return sum;
}

// Проверка, все ли из 3-x checkboxes выбраны
function checkCheckboxs() {
    if (checkboxes[0].checked && checkboxes[1].checked && checkboxes[2].checked) {
        return true;
    }
    return false;
}
