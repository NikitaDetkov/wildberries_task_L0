// Получение HTML-элементов всплывающих окон и кнопок, по наведению 
// на которые они становятся видимыми
const popupButtonFree1 = document.querySelector('#popup-button-free-1');
const popupInfoFree1 = document.querySelector('#popup-info-free-1');
const popupButtonFree2 = document.querySelector('#popup-button-free-2');
const popupInfoFree2 = document.querySelector('#popup-info-free-2');

// Назначение слушателей событий для всплывающих окон
addEventForPopupInfo(popupButtonFree1, popupInfoFree1)
addEventForPopupInfo(popupButtonFree2, popupInfoFree2)

for (let i = 0; i < 3; i++) {
    // Получение HTML-элементов всплывающих окон и кнопок, по наведению 
    // на которые они становятся видимыми
    const popupButtonMarket = document.querySelector(`#popup-button-market-${i + 1}`);
    const popupInfoMarket = document.querySelector(`#popup-info-market-${i + 1}`);
    const popupButtonDiscount = document.querySelector(`#popup-button-discount-${i + 1}`);
    const popupInfoDiscount = document.querySelector(`#popup-info-discount-${i + 1}`);

    // Назначение слушателей событий для всплывающих окон
    addEventForPopupInfo(popupButtonMarket, popupInfoMarket)
    addEventForPopupInfo(popupButtonDiscount, popupInfoDiscount)
}

// Функция добавляет события:
// при наведении на элемент elemButton становится виден elemInfo,
// при выведении курсора за элемент elemButton скрывается elemInfo.
// Принимает: elemButton - html-элемент, elemInfo - html-элемент.
function addEventForPopupInfo(elemButton, elemInfo) {
    elemButton.addEventListener('mouseover', () => {
        elemInfo.style.opacity = '1';
        elemInfo.style.display = 'flex';
    });

    elemButton.addEventListener('mouseout', () => {
        elemInfo.style.opacity = '0';
        elemInfo.style.display = 'none';
    });

}