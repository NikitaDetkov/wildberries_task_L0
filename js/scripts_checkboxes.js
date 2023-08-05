const checkbox_all = document.querySelector('#products_all');
const checkbox_1 = document.querySelector('#product_1');
const checkbox_2 = document.querySelector('#product_2');
const checkbox_3 = document.querySelector('#product_3');

// Выбрать все checkbox, если выбран главный,
// или убрать, если убран главный
checkbox_all.addEventListener('change', () => {
    if (checkbox_all.checked ) {
        checkbox_1.checked = true;
        checkbox_2.checked = true;
        checkbox_3.checked = true;
    } else {
        checkbox_1.checked = false;
        checkbox_2.checked = false;
        checkbox_3.checked = false;
    }
})

// Вбрать главный checkbox, если выбраны все, 
// или убрать, если выбраны не все 
checkbox_1.addEventListener('change', () => {
    checkbox_all.checked = checkCheckboxs();
})

checkbox_2.addEventListener('change', () => {
    checkbox_all.checked = checkCheckboxs();
})

checkbox_3.addEventListener('change', () => {
    checkbox_all.checked = checkCheckboxs();
})
// Проверка, все ли из 3-x checkboxes выбраны
function checkCheckboxs() {
    if (checkbox_1.checked && checkbox_2.checked && checkbox_3.checked) {
        return true;
    }
    return false;
}