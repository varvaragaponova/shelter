console.log("Итоговая оценка: 106.\nСделаны полностью бургер, попап и пагинация, в слайдере не реализована анимация. Карточки в слайдере генерируются нормально, по крайне мере, мне повторов не попадалось.\nСпасибо за проверку и хорошего дня!");

import json from './pets.json' assert { type: 'json'};

const menuButton = document.getElementById('menu');
const header = document.querySelector('header');
const menu = document.querySelector('.shelter_menu');
const body = document.querySelector('body');
// const pet = document.querySelectorAll('.pet_info');
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
const overlay = document.querySelector('.overlay');

/*Burger*/

menuButton.addEventListener('click', function(event) {
    header.classList.toggle('open');
    body.classList.toggle('no_scroll');
    overlay.classList.toggle('add');
    event.stopPropagation();
});

document.body.addEventListener('click', function(event) {
    if (event.target === menu) return;
    if (header.classList.contains('open')) {
        header.classList.remove('open');
        body.classList.remove('no_scroll');
        overlay.classList.remove('add');
    }
});

/*Slider*/

const nextSlide = document.querySelector('.img_next');
const prevSlide = document.querySelector('.img_prev');
const petCards = document.querySelector('.pet_cards');
const wrapper = document.querySelector('.slider_wrapper');

let clientWidth;
let totalCards = 3;
let currentArr = [];
let nextArr = [];
let prevArr = [];
let randomArray = [];
let usedCardsCount = 0;
let prevPagesCount;

nextSlide.addEventListener('click', forward);
prevSlide.addEventListener('click', back);

window.addEventListener('resize', (e) => {
    const { clientWidth } = document.body;
    if (clientWidth > 1208) {
        totalCards = 3;
    } else if (clientWidth >= 768) {
        totalCards = 2;
    } else {
        totalCards = 1;
    }

    if (prevPagesCount === totalCards) return;

    init();
});

init();

function init() {
    prevPagesCount = totalCards;
    generateRandomCards();
    prevArr = fillArray();
    currentArr = fillArray();
    nextArr = fillArray();
    renderCards();
}

function forward() {
    prevArr = currentArr.slice();
    currentArr = nextArr.slice();
    nextArr = fillArray();

    changeFirstImages();
    changeCurrentImages();
    changeLastImages();
    const pet = document.querySelectorAll('.pet_info');
    pet.forEach(item => {
        item.addEventListener('click', (event) => petOpen(event, item));
    })
}

function back() {
    nextArr = currentArr.slice();
    currentArr = prevArr.slice();
    prevArr = fillArray();

    changeFirstImages();
    changeCurrentImages();
    changeLastImages();
    const pet = document.querySelectorAll('.pet_info');
    pet.forEach(item => {
        item.addEventListener('click', (event) => petOpen(event, item));
    })
}

function changeCurrentImages() {
    const domImages = document.querySelectorAll('.pet_info');
    for (let i = 0; i < totalCards; i++) {
        const el = currentArr[i];
        const cardStr = `
            <div id="${el.name}" class="pet_info">
                <img class="our_pet" src="${el.img}" alt="${el.type}">
                <p class="pet_info__name">${el.name}</p>
                <button class="pet_more">Learn more</button>
            </div>
            `;
        domImages[prevArr.length + i].outerHTML = cardStr;
    }
}

function changeLastImages() {
    let i = 0;
    while (i < totalCards) {
        const domImages = document.querySelectorAll('.pet_info');
        domImages[domImages.length - 1].remove();
        i++;
    }
    nextArr.forEach(el => {
        const cardStr = `
            <div id="${el.name}" class="pet_info">
                <img class="our_pet" src="${el.img}" alt="${el.type}">
                <p class="pet_info__name">${el.name}</p>
                <button class="pet_more">Learn more</button>
            </div>
            `;
        petCards.insertAdjacentHTML('beforeend', cardStr);
    });
}

function changeFirstImages() {
    const domImages = document.querySelectorAll('.pet_info');
    for (let i = 0; i < totalCards; i++) {
        domImages[i].remove();
    }
    prevArr.forEach(el => {
        const cardStr = `
            <div id="${el.name}" class="pet_info">
                <img class="our_pet" src="${el.img}" alt="${el.type}">
                <p class="pet_info__name">${el.name}</p>
                <button class="pet_more">Learn more</button>
            </div>
            `;
        petCards.insertAdjacentHTML('afterbegin', cardStr);
    });
}

function fillArray() {
    const arr = [];
    for (let i = 0; i < totalCards; i++) {
        if (usedCardsCount === randomArray.length) {
            usedCardsCount = 0;
        }
        arr.push(randomArray[usedCardsCount]);
        usedCardsCount++;
    }
    return arr;
}

function renderCards() {
    petCards.innerHTML = '';
    [...prevArr, ...currentArr, ...nextArr].forEach(el => {
        const cardStr = `
            <div id="${el.name}" class="pet_info">
                <img class="our_pet" src="${el.img}" alt="${el.type}">
                <p class="pet_info__name">${el.name}</p>
                <button class="pet_more">Learn more</button>
            </div>
        `;
        petCards.insertAdjacentHTML('beforeend', cardStr);
    });
    const offset = petCards.offsetWidth;
    const gap = getComputedStyle(petCards).gap;
    const { clientWidth } = document.body;
    // petCards.style.transition = 'transform .5s';
    if (clientWidth == 768) {
            petCards.style.transform = 'translateX(calc(' + (-offset) + 'px ' + '- ' + gap + '))';
    } else if (clientWidth <= 1180) {
        petCards.style.transform = 'translateX(calc(' + (-offset) + 'px ' + '- ' + gap + '))';
    } else if (clientWidth <= 1208) {
        petCards.style.transform = 'translateX(calc(' + (-offset) + 'px))';
    } else {
        petCards.style.transform = 'translateX(calc(' + (-offset) + 'px ' + '- ' + gap + '))';
    }
    const pet = document.querySelectorAll('.pet_info');
    pet.forEach(item => {
        item.addEventListener('click', (event) => petOpen(event, item));
    })
}

function generateRandomCards() {
    randomArray = json
        .map(el => ({...el, random: Math.random()}))
        .sort((a, b) => a.random - b.random);
}

/*POP UP*/

const petOpen = (event, item) => {
    popUp.classList.toggle("opened");
    overlay.classList.toggle("add");
    html.classList.toggle("stop");
    event.stopPropagation();

    const currentPet = json.find(elem => elem.name === item.id);
    popUpImg.src = currentPet.img;
    petName.textContent = currentPet.name;
    petIs.textContent = `${currentPet.type} - ${currentPet.breed}`;
    petInfo.textContent = currentPet.description;
    petAge.textContent = ' ' + currentPet.age;
    petInoculations.textContent = ' ' + currentPet.inoculations;
    petDiseases.textContent = ' ' + currentPet.diseases;
    petParasites.textContent = ' ' + currentPet.parasites;
}

document.body.addEventListener('click', function() {
    if (popUp.classList.contains('opened')) {
        popUp.classList.remove('opened');
        html.classList.remove('stop');
        overlay.classList.remove("add");
    }
})

popUp.addEventListener('click', function(event) {
    event.stopPropagation();
    return;
})

popUpClose.addEventListener('click', function() {
    popUp.classList.remove('opened');
    html.classList.remove('stop');
    overlay.classList.remove("add");
})