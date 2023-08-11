// Массив скрывающих списки кнопок, полученный из DOM
const hidingButtons = [
    document.querySelector('#hiding_button_1'),
    document.querySelector('#hiding_button_2')
];

// Массив необходимых для скрытия списков, полученный из DOM
const hiddenLists = [
    document.querySelector('#hidden_list_1'),
    document.querySelector('#hidden_list_2')
];

// Массивсостояний списков
const listStates = [
    true,
    true
];

// Слушатели событий на кнопки скрытия списков
// Скрывают/показывают списки, переворачивают кнопки
for (let i = 0; i < 2; i++) {
    hidingButtons[i].addEventListener('click', () => {
        if (listStates[i]) {
            hiddenLists[i].style.display = 'none';
            hidingButtons[i].style.transform = 'rotate(180deg)';
        } else {
            hiddenLists[i].style.display = 'flex';
            hidingButtons[i].style.transform = 'rotate(0deg)';
        }
        listStates[i] = !listStates[i];
    })
}

