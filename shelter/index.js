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
const popUpImg = document.querySelector('.pop_up__img');
const petName = document.querySelector('.pop_up__title');
const petIs = document.querySelector('.pop_up__subtitle');
const petInfo = document.querySelector('.pop_up__description');
const petAge = document.querySelector('.age');
const petInoculations = document.querySelector('.inoculations');
const petDiseases = document.querySelector('.diseases');
const petParasites = document.querySelector('.parasites');

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

const petOpen = (event, item) => {
    popUp.classList.toggle("opened");
    body.classList.toggle("background");
    html.classList.toggle("stop");
    event.stopPropagation();

    console.log(item.id);
    const currentPet = json.find(elem => elem.name.toLowerCase() === item.id);
    popUpImg.src = currentPet.img;
    petName.textContent = currentPet.name;
    petIs.textContent = `${currentPet.type}: ${currentPet.breed}`;
    petInfo.textContent = currentPet.description;
    petAge.textContent = ' ' + currentPet.age;
    petInoculations.textContent = ' ' + currentPet.inoculations;
    petDiseases.textContent = ' ' + currentPet.diseases;
    petParasites.textContent = ' ' + currentPet.parasites;
}

pet.forEach(item => {
    item.addEventListener('click', (event) => petOpen(event, item));
})

document.body.addEventListener('click', function() {
    if (popUp.classList.contains('opened')) {
        popUp.classList.remove('opened');
        html.classList.remove('stop');
        body.classList.remove('background');
    }
})

popUp.addEventListener('click', function(event) {
    event.stopPropagation();
    return;
})

popUpClose.addEventListener('click', function() {
    popUp.classList.remove('opened');
    html.classList.remove('stop');
    body.classList.remove('background');
})