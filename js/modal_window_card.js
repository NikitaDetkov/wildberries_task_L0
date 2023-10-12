// Получение элементов из DOM
// Модальное окно выбора карты
const modalWindowCard = document.querySelector('#modal-window-card');
// Кнопка закрытия
const closeBtnWindowCard = document.querySelector('#close-window-card');
// Кнопка выбора карты
const chooseBtnWindowCard = document.querySelector('#choose-window-card');
// Фон за модальным окном (по нажатию закрывает модально окно)
const backgroundWindowCard = document.querySelector('#background-window-card');
// Кнопки, открывающие модальное окно
const openBtnWindowCard1 = document.querySelector('#open-window-card-1');
const openBtnWindowCard2 = document.querySelector('#open-window-card-2');
// Элементы, значения которых требуется менять 
const cardNumberHtml1 = document.querySelector('#card-number-1');
const cardNumberHtml2 = document.querySelector('#card-number-2');
const cardImageHtml1 = document.querySelector('#card-image-1');
const cardImageHtml2 = document.querySelector('#card-image-2');

// Текущая выбранная карта
let currentCard = document.querySelector('input[name="card"]:checked').value;

// Закрыть модальное окно при нажатии на фон
backgroundWindowCard.addEventListener('click', () => {
    modalWindowCard.classList.remove('show');
});
// Закрыть модальное окно при нажатии на кнопку закрытия
closeBtnWindowCard.addEventListener('click', () => {
    modalWindowCard.classList.remove('show');
});
// Устанавливает новые значения в DOM при нажатии кнопки выбора
chooseBtnWindowCard.addEventListener('click', () => {
    const typeOfCard = document.querySelector('input[name="card"]:checked').value;
    currentCard = typeOfCard; // Запомнить текущую карту
    const cardNumber = document.querySelector('#card-number-' + typeOfCard).innerHTML;
    const cardImage = `<img src="./images/${typeOfCard}_icon.svg">`;

    cardNumberHtml1.innerHTML = cardNumber;
    cardNumberHtml2.innerHTML = cardNumber;

    cardImageHtml1.innerHTML = cardImage;
    cardImageHtml2.innerHTML = cardImage;
    modalWindowCard.classList.remove('show');
});
// Открыть модальное окно при нажатии на кнопку открытия
openBtnWindowCard1.addEventListener('click', () => {
    // Установка активной радиокнопки для текущей карты 
    document.querySelector(`input[id="${currentCard}"]`).checked = true;

    modalWindowCard.classList.add('show');
});
// Открыть модальное окно при нажатии на кнопку открытия
openBtnWindowCard2.addEventListener('click', () => {
    // Установка активной радиокнопки для текущей карты 
    document.querySelector(`input[id="${currentCard}"]`).checked = true;

    modalWindowCard.classList.add('show');
});
