/*Burger*/

const menuButton = document.getElementById('menu');
const header = document.querySelector('header');
const menu = document.querySelector('.shelter_menu');
const body = document.querySelector('body');

menuButton.addEventListener('click', function(event) {
    header.classList.toggle('open');
    body.classList.toggle('no_scroll');
    body.classList.toggle('background');
    event.stopPropagation();
});

document.body.addEventListener('click', function(event) {
    if (event.target === menu) return;
    if (header.classList.contains('open')) {
        header.classList.remove('open');
        body.classList.remove('no_scroll');
        body.classList.remove('background');
    }
});