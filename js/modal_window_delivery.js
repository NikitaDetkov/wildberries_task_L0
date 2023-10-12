// Получение элементов из DOM
// Модальное окно доставки
let modalWindowDelivery= document.querySelector('#modal-window-delivery');
// Кнопка закрытия
let closeBtnWindowDelivery = document.querySelector('#close-window-delivery');
// Кнопка выбора способа доставки
let chooseBtnWindowDelivery = document.querySelector('#choose-window-delivery');
// Фон за модальным окном (по нажатию закрывает модально окно)
let backgroundWindowDelivery = document.querySelector('#background-window-delivery');
// Кнопки, открывающие модальное окно
let openBtnWindowDelivery1 = document.querySelector('#open-window-delivery-1');
let openBtnWindowDelivery2 = document.querySelector('#open-window-delivery-2');
// Элементы, значения которых требуется менять 
let addressFieldHtml1 = document.querySelector('#address-field-1');
let addressFieldHtml2 = document.querySelector('#address-field-2');
let methodFieldHtml1 = document.querySelector('#method-field-1');
let methodFieldHtml2 = document.querySelector('#method-field-2');
// Закрыть модальное окно при нажатии на фон
backgroundWindowDelivery.addEventListener('click', () => {
    modalWindowDelivery.classList.remove('show');
});
// Закрыть модальное окно при нажатии на кнопку закрытия
closeBtnWindowDelivery.addEventListener('click', () => {
    modalWindowDelivery.classList.remove('show');
});

// Текущий адресс
let currentAddress = document.querySelector('input[name="address"]:checked').value;
// Текущий способ доставки
let currentMethodDelivery = document.querySelector('input[name="method"]:checked').value;

// Устанавливает новые значения в DOM при нажатии кнопки выбора
chooseBtnWindowDelivery.addEventListener('click', () => {
    const numberAddress = document.querySelector('input[name="address"]:checked').value;
    currentAddress = numberAddress; // Запомнить текущий адресс
    const textAddress = document.querySelector('#text-' + numberAddress).innerHTML;
    const numberMethodDelivery = document.querySelector('input[name="method"]:checked').value;
    currentMethodDelivery = numberMethodDelivery; // Запомнить текущий способ доставки
    const textMethodDelivery = document.querySelector('#text-' + numberMethodDelivery).innerHTML;

    addressFieldHtml1.innerHTML = textAddress;
    addressFieldHtml2.innerHTML = textAddress;

    const textMethodField2 = numberMethodDelivery === 'method-1' 
        ? textMethodDelivery.slice(2, textMethodDelivery.length)
        : textMethodDelivery.toUpperCase();

    methodFieldHtml1.innerHTML = capitalizeFLetter(textMethodField2);
    methodFieldHtml2.innerHTML = 'Доставка ' + textMethodDelivery.toLocaleLowerCase();

    modalWindowDelivery.classList.remove('show');
});
// Открыть модальное окно при нажатии на кнопку открытия
openBtnWindowDelivery1.addEventListener('click', () => {
    // Установить в радиокнопки текущий способ доставки и дату
    document.querySelector(`#${currentMethodDelivery}`).checked = true;
    document.querySelector(`#${currentAddress}`).checked = true;

    modalWindowDelivery.classList.add('show');
});
// Открыть модальное окно при нажатии на кнопку открытия
openBtnWindowDelivery2.addEventListener('click', () => {
    // Установить в радиокнопки текущий способ доставки и дату
    document.querySelector(`#${currentMethodDelivery}`).checked = true;
    document.querySelector(`#${currentAddress}`).checked = true;

    modalWindowDelivery.classList.add('show');
});
// Функция
function capitalizeFLetter(text) {
    const firstLetter = text[0];
    const restText = text.slice(1, text.length);
    
    return firstLetter.toUpperCase() + restText.toLocaleLowerCase();
}