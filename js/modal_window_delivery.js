let modalWindowDelivery= document.querySelector('#modal-window-delivery');
let closeBtnWindowDelivery = document.querySelector('#close-window-delivery');
let chooseBtnWindowDelivery = document.querySelector('#choose-window-delivery');
let backgroundWindowDelivery = document.querySelector('#background-window-delivery');
let openBtnWindowDelivery1 = document.querySelector('#open-window-delivery-1');
let openBtnWindowDelivery2 = document.querySelector('#open-window-delivery-2');

let deliveryNumberHtml1 = document.querySelector('#delivery-number-1');
let deliveryNumberHtml2 = document.querySelector('#delivery-number-2');
let deliveryImageHtml1 = document.querySelector('#delivery-image-1');
let deliveryImageHtml2 = document.querySelector('#delivery-image-2');

backgroundWindowDelivery.addEventListener('click', () => {
    modalWindowDelivery.classList.remove('show');
});

closeBtnWindowDelivery.addEventListener('click', () => {
    modalWindowDelivery.classList.remove('show');
});

chooseBtnWindowDelivery.addEventListener('click', () => {

    // const typeOfCard = document.querySelector('input[name="card"]:checked').value;
    // const cardNumber = document.querySelector('#card-number-' + typeOfCard).innerHTML;
    // const cardImage = `<img src="./images/${typeOfCard}_icon.svg">`;

    // cardNumberHtml1.innerHTML = cardNumber;
    // cardNumberHtml2.innerHTML = cardNumber;

    // cardImageHtml1.innerHTML = cardImage;
    // cardImageHtml2.innerHTML = cardImage;
    modalWindowDelivery.classList.remove('show');
});

openBtnWindowDelivery1.addEventListener('click', () => {
    modalWindowDelivery.classList.add('show');
});

openBtnWindowDelivery2.addEventListener('click', () => {
    modalWindowCard.classList.add('show');
});
