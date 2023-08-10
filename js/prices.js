// Старые и новые цены
const prices = [522, 2100047, 494];
const old_prices = [1051, 2300047, 950];
let price_sum = 0;
let old_price_sum = 0;
let discount_sum = 0;

// Получение элементов DOM-дерева для новых цен
const html_prices = [
    document.querySelector('#price_1'),
    document.querySelector('#price_2'),
    document.querySelector('#price_3')
];

// Получение элементов DOM-дерева для старых цен
const html_old_prices = [
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
const checkbox_all = document.querySelector('#products_all');

// Получение элементов DOM-дерева для итоговых цен и скидки
const html_price_sum = document.querySelector("#price_sum");
const html_old_price_sum = document.querySelector("#old_price_sum");
const html_discount_sum = document.querySelector('#discount_sum');

const payment_checkbox = document.querySelector('#payment_checkbox');
const order_button = document.querySelector('#order_button');

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
payment_checkbox.addEventListener('change', () => {
    changeOrderButton();
})

// Выбрать все checkbox, если выбран главный,
// или убрать, если убран главный
checkbox_all.addEventListener('change', () => {
    if (checkbox_all.checked ) {
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
        checkbox_all.checked = checkCheckboxs();
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
    if (payment_checkbox.checked) {
        order_button.innerHTML = `Оплатить ${html_price_sum.innerHTML}`;
    } else {
        order_button.innerHTML = 'Заказать';
    }
}

// Установка цен на товары в DOM 
// (для НЕРЕАЛИЗОВАННОГО случая, если мы будем менять количество товаров)
function setPrices() {
    for (let i = 0; i < 3; i++) {
        setNumber(html_prices[i], prices[i]);
        setNumber(html_old_prices[i], old_prices[i]);
    }
}

// Установка в DOM итоговых цен и скидки
function setPricesSum() {
    price_sum = calculateSum(prices);
    old_price_sum = calculateSum(old_prices);
    discount_sum = old_price_sum - price_sum;

    setNumber(html_price_sum, price_sum);
    setNumber(html_old_price_sum, old_price_sum);
    setNumber(html_discount_sum, discount_sum)
}

// Добавление пробелов через каждые три символа в строке из цифр
// Принимает: строку из цифр без пробелов
// Возвращает: строку из цифр с пробелами через 3 символа
function addSpaces(price_str) {
    let price_arr = [];

    for (let i = 0; i < price_str.length; i++) {
        price_arr.push(price_str[i]);
        if ((price_str.length - i - 1) % 3 === 0 && i !== price_str.length - 1) {
            price_arr.push(' ');
        }
    }

    return price_arr.join('');
}

// Установка числового значения num_elem 
// в html-элемент в html-elem 
function setNumber(html_elem, num_elem) {
    let num_elem_str = String(num_elem);
    if (num_elem_str.length > 4) {
        num_elem_str = addSpaces(num_elem_str);
    }    
    html_elem.innerHTML = num_elem_str;
}

// Вычисление суммы цены выбранных соваров
// Возвращает сумму товаров, где выбран checkbox
function calculateSum(prices_arr) {
    let sum = 0;
    for (let i = 0; i < 3; i ++) {
        if (checkboxes[i].checked) {
            sum += prices_arr[i];
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
