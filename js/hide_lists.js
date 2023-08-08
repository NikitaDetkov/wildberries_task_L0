// Массив скрывающих списки кнопок, полученный из DOM
const hiding_buttons = [
    document.querySelector('#hiding_button_1'),
    document.querySelector('#hiding_button_2')
];

// Массив необходимых для скрытия списков, полученный из DOM
const hidden_lists = [
    document.querySelector('#hidden_list_1'),
    document.querySelector('#hidden_list_2')
];

// Массивсостояний списков
const list_states = [
    true,
    true
];

// Слушатели событий на кнопки скрытия списков
// Скрывают/показывают списки, переворачивают кнопки
for (let i = 0; i < 2; i++) {
    hiding_buttons[i].addEventListener('click', () => {
        if (list_states[i]) {
            hidden_lists[i].style.display = 'none';
            hiding_buttons[i].style.transform = 'rotate(180deg)';
        } else {
            hidden_lists[i].style.display = 'flex';
            hiding_buttons[i].style.transform = 'rotate(0deg)';
        }
        list_states[i] = !list_states[i];
    })
}

