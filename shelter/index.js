// console.log("Итоговая оценка: 100; Вёрстка страницы Main соответствует макету при ширине экрана 1280px: +14\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 768px: +14\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Main соответствует макету при ширине экрана 320px: +14\nблок <header>: +2\nблок Not only: +2\nблок About: +2\nблок Our Friends: +2\nблок Help: +2\nблок In addition: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 1280px: +6\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 768px: +6\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nВёрстка страницы Pets соответствует макету при ширине экрана 320px: +6\nблок <header>: +2\nблок Our Friends: +2\nблок <footer>: +2\nНи на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки, справа от отдельных блоков не появляются белые поля. Весь контент страницы при этом сохраняется: не обрезается и не удаляется: +20\nнет полосы прокрутки при ширине страницы Main от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Main от 768рх до 320рх: +5\nнет полосы прокрутки при ширине страницы Pets от 1280рх до 768рх: +5\nнет полосы прокрутки при ширине страницы Pets от 768рх до 320рх: +5\nВерстка резиновая: при плавном изменении размера экрана от 1280px до 320px верстка подстраивается под этот размер, элементы верстки меняют свои размеры и расположение, не наезжают друг на друга, изображения могут менять размер, но сохраняют правильные пропорции (Примеры неправильной и правильной реализации): +8\nна странице Main: +4\nна странице Pets: +4\nПри ширине экрана меньше 768px на обеих страницах меню в хедере скрывается, появляется иконка бургер-меню: +4\nВерстка обеих страниц валидная: +8");

import json from './pets.json' assert { type: 'json'};
/*Burger*/

const menuButton = document.getElementById('menu');
const header = document.querySelector('header');
const menu = document.querySelector('.shelter_menu');
const body = document.querySelector('body');
const pet = document.querySelectorAll('.pet_info');
const popUp = document.querySelector('.pop_up__pet');
const html = document.querySelector('html');
const popUpClose = document.querySelector('.pop_up__close');

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

/*POP UP*/
pet.forEach(item => {
    item.addEventListener('click', function(event) {
        console.log(1);
        popUp.classList.toggle('opened');
        body.classList.toggle('background');
        html.classList.toggle('stop');
        event.stopPropagation();
    })
})

document.body.addEventListener('click', function(event) {
    console.log(2);
    if (event.target === popUp) return;
    if (popUp.classList.contains('opened')) {
        popUp.classList.remove('opened');
        html.classList.remove('stop');
        body.classList.remove('background');
    }
})

popUpClose.addEventListener('click', function() {
    popUp.classList.remove('opened');
    html.classList.remove('stop');
    body.classList.remove('background');
})
