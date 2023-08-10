let modalWindowDelivery= document.querySelector('#modal-window-delivery');
let closeBtnWindowDelivery = document.querySelector('#close-window-delivery');
let chooseBtnWindowDelivery = document.querySelector('#choose-window-delivery');
let backgroundWindowDelivery = document.querySelector('#background-window-delivery');
let openBtnWindowDelivery1 = document.querySelector('#open-window-delivery-1');
let openBtnWindowDelivery2 = document.querySelector('#open-window-delivery-2');

let addressFieldHtml1 = document.querySelector('#address-field-1');
let addressFieldHtml2 = document.querySelector('#address-field-2');

let methodFieldHtml1 = document.querySelector('#method-field-1');
let methodFieldHtml2 = document.querySelector('#method-field-2');

backgroundWindowDelivery.addEventListener('click', () => {
    modalWindowDelivery.classList.remove('show');
});

closeBtnWindowDelivery.addEventListener('click', () => {
    modalWindowDelivery.classList.remove('show');
});

chooseBtnWindowDelivery.addEventListener('click', () => {

    const numberAddress = document.querySelector('input[name="address"]:checked').value;
    const textAddress = document.querySelector('#text-' + numberAddress).innerHTML;
    const numberMethodDelivery = document.querySelector('input[name="method"]:checked').value;
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

openBtnWindowDelivery1.addEventListener('click', () => {
    modalWindowDelivery.classList.add('show');
});

openBtnWindowDelivery2.addEventListener('click', () => {
    modalWindowDelivery.classList.add('show');
});

function capitalizeFLetter(text) {
    const firstLetter = text[0];
    const restText = text.slice(1, text.length);
    
    return firstLetter.toUpperCase() + restText.toLocaleLowerCase();
}