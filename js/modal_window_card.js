const modalWindowCard = document.querySelector('#modal-window-card');
const closeBtnWindowCard = document.querySelector('#close-window-card');
const chooseBtnWindowCard = document.querySelector('#choose-window-card');
const backgroundWindowCard = document.querySelector('#background-window-card');
const openBtnWindowCard1 = document.querySelector('#open-window-card-1');
const openBtnWindowCard2 = document.querySelector('#open-window-card-2');

const cardNumberHtml1 = document.querySelector('#card-number-1');
const cardNumberHtml2 = document.querySelector('#card-number-2');
const cardImageHtml1 = document.querySelector('#card-image-1');
const cardImageHtml2 = document.querySelector('#card-image-2');

backgroundWindowCard.addEventListener('click', () => {
    modalWindowCard.classList.remove('show');
});

closeBtnWindowCard.addEventListener('click', () => {
    modalWindowCard.classList.remove('show');
});

chooseBtnWindowCard.addEventListener('click', () => {

    const typeOfCard = document.querySelector('input[name="card"]:checked').value;
    const cardNumber = document.querySelector('#card-number-' + typeOfCard).innerHTML;
    const cardImage = `<img src="./images/${typeOfCard}_icon.svg">`;

    cardNumberHtml1.innerHTML = cardNumber;
    cardNumberHtml2.innerHTML = cardNumber;

    cardImageHtml1.innerHTML = cardImage;
    cardImageHtml2.innerHTML = cardImage;
    modalWindowCard.classList.remove('show');
});

openBtnWindowCard1.addEventListener('click', () => {
    modalWindowCard.classList.add('show');
});

openBtnWindowCard2.addEventListener('click', () => {
    modalWindowCard.classList.add('show');
});
