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

setPrices();
setPricesSum();

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
    } else {
        for (let i = 0; i < 3; i++) {
            checkboxes[i].checked = false;
        }
        setPricesSum();
        changeOrderButton();
    }
})

// Вбрать главный checkbox, если выбраны все, 
// или убрать, если выбраны не все 
for (let i = 0; i < 3; i++) {
    checkboxes[i].addEventListener('change', () => {
        checkbox_all.checked = checkCheckboxs();
        setPricesSum();
        changeOrderButton();
    })
}

function changeOrderButton() {
    if (payment_checkbox.checked) {
        order_button.innerHTML = `Оплатить ${html_price_sum.innerHTML}`;
    } else {
        order_button.innerHTML = 'Заказать';
    }
}

// 
function setPrices() {
    for (let i = 0; i < 3; i++) {
        setNumber(html_prices[i], prices[i]);
        setNumber(html_old_prices[i], old_prices[i]);
    }
}

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
