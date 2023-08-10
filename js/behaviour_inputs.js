// Объекты, содержащие html-элементы: поле ввода, комментарий, ошибку, границу.
// Имя 
const nameField = {
    input: document.querySelector('#name_input'),
    comment: document.querySelector('#name_comment'),
    error: document.querySelector('#name_error'),
    border: document.querySelector('#name_border'),
    format: /^[а-яА-Я\-]+$/,
    isError: false,
};
// Фамилия
const surnameField = {
    input: document.querySelector('#surname_input'),
    comment: document.querySelector('#surname_comment'),
    error: document.querySelector('#surname_error'),
    border: document.querySelector('#surname_border'),
    format: /^[а-яА-Я\-]+$/,
    isError: false,
};
// Email
const emailField = {
    input: document.querySelector('#email_input'),
    comment: document.querySelector('#email_comment'),
    error: document.querySelector('#email_error'),
    border: document.querySelector('#email_border'),
    format: /^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i,
    isError: false,
};
// Телефон
const phoneField = {
    input: document.querySelector('#phone_input'),
    comment: document.querySelector('#phone_comment'),
    error: document.querySelector('#phone_error'),
    border: document.querySelector('#phone_border'),
    format: /^(\+\d{1}[\ ])(\d{3}[\ ]){2}\d{2}[\ ]\d{2}$/,
    isError: false,
};
// ИНН
const innField = {
    input: document.querySelector('#inn_input'),
    comment: document.querySelector('#inn_comment'),
    error: document.querySelector('#inn_error'),
    border: document.querySelector('#inn_border'),
    format: /^[0-9]{14}$/,
    isError: false,
};
const buttonOrder = document.querySelector('#order_button');

addEventForField(nameField);
addEventForField(surnameField);
addEventForField(emailField);
addEventForField(innField);
addEventForFieldPhone(phoneField);

buttonOrder.addEventListener('click', () => {
    if (nameField.input.value === '') {
        setError(nameField);
    }
    if (surnameField.input.value === '') {
        setError(surnameField);
    }
    if (emailField.input.value === '') {
        setError(emailField);
    }
    if (innField.input.value === '') {
        setError(innField);
    }
    if (phoneField.input.value === '') {
        setError(phoneField);
    }

    if (nameField.isError || surnameField.isError ||
        emailField.isError || innField.isError || 
        phoneField.isError) {
            document.querySelector("#recipient_form").scrollIntoView({behavior: "smooth"});
        }
}) 

// Функциии =======================================================

// Добавление слушателей событий 
// Принимает объект с полями
// Добавляет слушатели событий для поля input
function addEventForField(field) {
    field.input.addEventListener('change', () => {
        if (field.input.value === '') {
            removeError(field);
        } else {
            if (field.format.test(field.input.value)) {
                removeError(field);
            } else {
                setError(field);
            }
        }
    });

    // Слушатель событий при отпускании кнопки
    // Скрывается комментарий, если строка пустая
    // Удаляется ошибка, если строка пустая или проходит валидацию
    field.input.addEventListener('input', () => {

        if (field.input.value === '') {
            field.comment.style.opacity = '0';
            removeError(field);
        } else {
            if (field.comment.style.opacity == 0) {
                field.comment.style.opacity = '1';
            }  
            if (field.format.test(field.input.value)) {
                removeError(field);
            }
        }
    });
}

// Добавление слушателей событий 
// Принимает объект с полями
// Добавляет слушатели событий для поля input
function addEventForFieldPhone(field) {

    const onlyNumbersReg = /[а-яА-Яa-zA-Z]/g; 

    field.input.addEventListener('change', () => {
        if (field.input.value === '') {
            removeError(field);
        } else {

            field.input.value = addSpaces(field.input.value);

            if (field.format.test(field.input.value)) {
                removeError(field);
            } else {
                setError(field);
            }
        }
    });
    
    field.input.addEventListener('input', (event) => {

        field.input.value = field.input.value.replace(onlyNumbersReg, '')

        if (field.input.value === '') {
            field.comment.style.opacity = '0';
            removeError(field);
        } else {
            if (field.comment.style.opacity == 0) {
                field.comment.style.opacity = '1';
            }  
            if (field.format.test(field.input.value)) {
                removeError(field);
            }
        }
    });
}

// Устанавливает красный шрифт в input
// Показывает сообщение об ошибке error
// Принимает: поле ввода input, элемент с сообщением об ошибке error
function setError(field) {
    field.input.style.color = 'rgba(245, 81, 35, 1)';
    field.border.style.borderColor = 'rgba(245, 81, 35, 1)';
    field.error.style.opacity = '1';
    field.isError = true;
}

// Устанавливает черный шрифт в input
// Скрывает сообщение об ошибке error
// Принимает: поле ввода input, элемент с сообщением об ошибке error
function removeError(field) {
    field.input.style.color = 'black';
    field.border.style.borderColor = 'rgba(0, 0, 0, 0.2)';
    field.error.style.opacity = '0';
    field.isError = false;
}

function addSpaces(value) {
    value = value.replaceAll(' ', '');
    value = value.split('');
    let valueWithSpaces = [];

    for (let i = 0; i < value.length; i++) {
        if ((i === 2 || i === 5 || i === 8 || i === 10) &&
            (value[i] !== ' ')) {
            valueWithSpaces.push(' ');
        }
        valueWithSpaces.push(value[i]);
    }

    if (valueWithSpaces[valueWithSpaces.length - 1] === ' ') {
        valueWithSpaces.pop();
    }
    return valueWithSpaces.join('');
}