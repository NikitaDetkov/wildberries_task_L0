let name_input = document.querySelector('#name_input');
let name_comment = document.querySelector('#name_comment');
let name_error = document.querySelector('#name_error');

name_input.addEventListener('change', () => {
    if (name_input.value === '') {
        name_error.style.opacity = '0';
        // name_input.style.color = 'red';
    } else {
        name_input.style.color = 'red';
        name_error.style.opacity = '1';
    }

})

name_input.addEventListener('keydown', () => {
    name_comment.style.opacity = '1';
})