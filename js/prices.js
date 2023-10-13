// Массив с продуктами
const products = [
    {
        counter: 1,
        maxQuantity: 2,
        oldPriceOne: 1051,
        discount: 0.503,
        btnPlus: document.querySelector('#btn-plus-1'), 
        btnMinus: document.querySelector('#btn-minus-1'), 
        inputCounter: document.querySelector('#counter-value-1'),
    },
    {
        counter: 200,
        maxQuantity: 300,
        oldPriceOne: 11500.235,
        discount: 0.0869547,
        btnPlus: document.querySelector('#btn-plus-2'), 
        btnMinus: document.querySelector('#btn-minus-2'),
        inputCounter: document.querySelector('#counter-value-2'), 
    },
    {
        counter: 2,
        maxQuantity: 2,
        oldPriceOne: 475,
        discount: 0.48,
        btnPlus: document.querySelector('#btn-plus-3'), 
        btnMinus: document.querySelector('#btn-minus-3'), 
        inputCounter: document.querySelector('#counter-value-3'),
    },
];

// Получение элементов DOM-дерева для новых цен
const htmlPrices = [
    document.querySelector('#price_1'),
    document.querySelector('#price_2'),
    document.querySelector('#price_3'),
];

// Получение элементов DOM-дерева для старых цен
const htmlOldPrices = [
    document.querySelector('#old_price_1'),
    document.querySelector('#old_price_2'),
    document.querySelector('#old_price_3'),
];

// Получение элементов DOM-дерева для checkboxes товаров
const checkboxes = [
    document.querySelector('#product_1'),
    document.querySelector('#product_2'),
    document.querySelector('#product_3')
]
const checkboxAll = document.querySelector('#products_all');

// Счетчик доставок
let counterDeliveryBoxes = 0;

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

// Установить в дом состояния счетчиков товаров
for (let i = 0; i < products.length; i++) {
    setProductCounter(i)
}

// Установить в DOM итоговые цены и скидку
setPricesSum();

// Слушатели событий =============================================

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
        updateBasket();
    } else {
        for (let i = 0; i < 3; i++) {
            checkboxes[i].checked = false;
        }
        updateBasket();
    }
})

// Вбрать главный checkbox, если выбраны все, 
// или убрать, если выбраны не все 
for (let i = 0; i < 3; i++) {
    checkboxes[i].addEventListener('change', () => {
        checkboxAll.checked = checkCheckboxs();
        updateBasket();
    })
}

// Слушатель событий для кнопок счетчиков
for (let i = 0; i < products.length; i++) {
    products[i].btnMinus.addEventListener('click', () => {
        decrementProguct(i);
        // Установить новое значение счетчика
        setProductCounter(i); 
        // Установить новое значение цен
        setPrices();
        // Обновить значения цен, доставки, кнопки заказа
        updateBasket();
    });
    products[i].btnPlus.addEventListener('click', () => {
        incrementProguct(i);
        // Установить новое значение счетчика
        setProductCounter(i); 
        // Установить новое значение цен
        setPrices();
        // Обновить значения цен, доставки, кнопки заказа
        updateBasket();
    });
}

// Функции =================================================

// Функция. Изменяет состав корзины в доставке.
// Устанавливает или удаляет товары из доставки в соответствии с
// выбором из корзины (checkboxes)
function changeDeliveryBasket() {
    // удаление предыдущих элементов
    for (let i = 0; i < counterDeliveryBoxes; i++) {
        document.querySelector(`#delivery-date-${i}`).remove();
        document.querySelector(`#delivery-box-${i}`).remove();
    }

    // Сброс счетчика доставок
    counterDeliveryBoxes = 0;

    for (let i = 0; i < products.length; i++) {
        if (checkboxes[i].checked) {
            showProductInDelivery(i);
        }
    } 
} 

function showProductInDelivery(ind) {
    const deliveries = Math.ceil(products[ind].counter / 184);

    for (let i = 0; i < deliveries; i++) {
        
        const productInDelivery = document.createElement('div');
        productInDelivery.classList.add('image-box', 'p-relative');
        productInDelivery.innerHTML = `<img style="height: 100%;" src="./images/product_${ind + 1}.png">`;

        const numProducts = (i === deliveries - 1) 
            ? (products[ind].counter - 184 * (deliveries - 1)) 
            : 184;
        if (numProducts > 1) {
            productInDelivery.innerHTML += `<div class="quantity quantity-product">
                ${numProducts}
            </div>`;
        } 
        
        if (counterDeliveryBoxes < i + 1) {
            addDateDelivery(i);
            addBoxDelivery(i);
        }
        const box = document.querySelector(`#delivery-box-${i}`);

        box.append(productInDelivery);
    }
}

function addDateDelivery(ind) {
    const deliveryContainer = document.querySelector('#delivery-container');
    // Даты доставки
    const datesDelivery = ['5—6 февраля', '7—8 февраля']; 
    // Создание блока с датой доставки
    const date = document.createElement('span');
    date.classList.add('delivery-header', 'mobile-mb-12');
    date.id = `delivery-date-${ind}`;
    date.innerHTML = datesDelivery[ind];
    deliveryContainer.append(date);

    counterDeliveryBoxes++;
}

function addBoxDelivery(ind) {
    const deliveryContainer = document.querySelector('#delivery-container');
    // Создание блока с товарами доставки
    const box = document.createElement('div');
    box.classList.add('images-container', 'mobile-mb-24');
    box.id = `delivery-box-${ind}`;

    deliveryContainer.append(box);
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
        setNumber(htmlPrices[i], getNewPrice(products[i]) );
        setNumber(htmlOldPrices[i], getOldPrice(products[i]) );
    }
}

// Установка в DOM итоговых цен и скидки
function setPricesSum() {
    const [oldPriceSum, newPriceSum] = calculateSum();
    const discountSum = oldPriceSum - newPriceSum;

    setNumber(htmlPriceSum, newPriceSum);
    setNumber(htmlOldPriceSum, oldPriceSum);
    setNumber(htmlDiscountSum, discountSum);
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
function calculateSum() {
    let oldPriceSum = 0;
    let newPriceSum = 0;
    for (let i = 0; i < 3; i ++) {
        if (checkboxes[i].checked) {
            oldPriceSum += getOldPrice(products[i]);
            newPriceSum += getNewPrice(products[i]);
        }
    }
    return [oldPriceSum, newPriceSum];
}

// Проверка, все ли из 3-x checkboxes выбраны
function checkCheckboxs() {
    if (checkboxes[0].checked && checkboxes[1].checked && checkboxes[2].checked) {
        return true;
    }
    return false;
}

// Функция: увеличивает счетчик продукта с индексом ind
// Принимает: индекс продукта
// Изменияет: Значение счетчика продукта в products
function incrementProguct(ind) {
    if (products[ind].maxQuantity > products[ind].counter) {
        products[ind].counter++;
    }
} 

// Функция: уменьшает счетчик продукта с индексом ind
// Принимает: индекс продукта
// Изменияет: Значение счетчика продукта в products
function decrementProguct(ind) {
    if (products[ind].counter > 0) {
        products[ind].counter--;
    }
} 

// Функция для установки значений счетчиков и состояний их кнопок
// Принимает массив индексов продуктов
// Изменияет: Счетчик продукта в DOM, финальную цену в DOM, суммы цен в DOM,
// кнопки счетчиков
function setProductCounter(ind) {
    products[ind].inputCounter.value = products[ind].counter;
    if (products[ind].maxQuantity === products[ind].counter) {
        setDisabled(ind, 'Plus');
        showMessageLimit(ind);
    } else if (products[ind].btnPlus.disabled) {
        removeDisabled(ind, 'Plus');
        hideMessageLimit(ind);
    } 

    if (products[ind].counter === 1) {
        setDisabled(ind, 'Minus');
    } else if (products[ind].btnMinus.disabled) {
        removeDisabled(ind, 'Minus');
    } 

}

// Функция для установка кнопки счетчика в неактивное состояние
// Принимает: индекс продукта, тип кнопки
function setDisabled(ind, typeBtn) {
    products[ind]['btn' + typeBtn].disabled = true; 
}

// Функция для удаление неактивного состояния с кнопки счетчика
// Принимает: индекс продукта, тип кнопки
function removeDisabled(ind, typeBtn) {
    products[ind]['btn' + typeBtn].disabled = false; 
}

// Функция для возвращения старой цены продукта
// Принимает: объет продукта
function getOldPrice(product) {
    return Math.round(product.counter * product.oldPriceOne);
}

// Функция для возвращения новой цены (с учетом скидки)
// Принимает: объет продукта
function getNewPrice(product) {
    return Math.round(product.counter * (product.oldPriceOne -  product.oldPriceOne * product.discount));
}

// Функция для отображение сообщения с лимитом товаров
// Принимает: индекс товра
function showMessageLimit(ind) {
    const limiter = document.querySelector(`#limiter-${ind + 1}`);
    limiter.classList.add('show');
}

// Функция для скрытия сообщения с лимитом товаров
// Принимает: индекс товра
function hideMessageLimit(ind) {
    const limiter = document.querySelector(`#limiter-${ind + 1}`);
    limiter.classList.remove('show');
}

// Функция для изменения значений в DOM:
// изменяет итоговые цены, кнопку заказа, блок с доставкой
function updateBasket() {
    setPricesSum();
    changeOrderButton();
    changeDeliveryBasket();
}