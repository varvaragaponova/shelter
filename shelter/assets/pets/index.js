import json from './pets.json' assert { type: 'json'};

/*Burger*/

const menuButton = document.getElementById('menu');
const header = document.querySelector('header');
const menu = document.querySelector('.shelter_menu');
const body = document.querySelector('body');
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

menuButton.addEventListener('click', function(event) {
    header.classList.toggle('open');
    body.classList.toggle('no_scroll');
    overlay.classList.toggle("add");
    event.stopPropagation();
});

document.body.addEventListener('click', function(event) {
    if (event.target === menu) return;
    if (header.classList.contains('open')) {
        header.classList.remove('open');
        body.classList.remove('no_scroll');
        overlay.classList.remove("add");
    }
});

/*Pagination*/
const petsWrapper = document.querySelector('.pets_card__wrapper');
const currentPageNumber = document.querySelector('.now');
const firstPage = document.querySelectorAll('.prev')[0];
const prevPage = document.querySelectorAll('.prev')[1];

const nextPage = document.querySelectorAll('.next')[0];
const lastPage = document.querySelectorAll('.next')[1];

document.addEventListener('DOMContentLoaded', initPages);
nextPage.addEventListener('click', () => turnPage(1));
prevPage.addEventListener('click', () => turnPage(-1));

firstPage.addEventListener('click', () => toLimitPage(true));
lastPage.addEventListener('click', () => toLimitPage());

let imageArray = [];
let currentPageNum = 1;
let totalPagesCount;
let prevTotalPagesCount;
let imagesPerPage;


window.addEventListener('resize', (e) => {
    const { clientWidth } = document.body;
    prevTotalPagesCount = totalPagesCount;

    if (clientWidth >= 1080) {
        totalPagesCount = 6;
    } else if (clientWidth >= 768) {
        totalPagesCount = 8;
    } else if (clientWidth >= 540) {
        totalPagesCount = 12;
    } else {
        totalPagesCount = 16;
    }

    if (prevTotalPagesCount === totalPagesCount) {
        return;
    }

    const prevImagesPerPage = imagesPerPage;

    breakTotalPerPage();

    const prevElement = prevImagesPerPage * currentPageNum;

    currentPageNum = Math.round(prevElement / imagesPerPage);
    currentPageNumber.textContent = currentPageNum.toString();
    renderImages(currentPageNum);
});

function initPages() {
    const { clientWidth } = document.body;

    if (clientWidth >= 1080) {
        totalPagesCount = 6;
    } else if (clientWidth >= 768) {
        totalPagesCount = 8;
    } else if (clientWidth >= 540) {
        totalPagesCount = 12;
    } else {
        totalPagesCount = 16;
    }

    breakTotalPerPage();

    renderImages(currentPageNum);

    prevPage.disabled = true;
    firstPage.disabled = true;
}

function breakTotalPerPage(isSkipGenerating) {
    const fullPagesArray = (isSkipGenerating ? imageArray : generateImageArray()).flat(2);
    console.log(fullPagesArray);
    imageArray = [];
    imagesPerPage = 48 / totalPagesCount;

    for (let i = 0; i < fullPagesArray.length; i+=imagesPerPage) {
        imageArray.push(fullPagesArray.slice(i, i + imagesPerPage));
    }
    // console.log(imageArray);
}
function turnPage(offset) {
    if (offset > 0) {
        currentPageNum++;
    } else {
        currentPageNum--;
    }
    renderImages(currentPageNum);
    currentPageNumber.textContent = (currentPageNum).toString();

    if (currentPageNum === totalPagesCount) {
        nextPage.disabled = true;
        lastPage.disabled = true;
    } else if (currentPageNum === 1) {
        prevPage.disabled = true;
        firstPage.disabled = true;
    } else {
        nextPage.disabled = false;
        lastPage.disabled = false;
        firstPage.disabled = false;
        prevPage.disabled = false;
    }
}

function toLimitPage(isToFirstPage) {
    if (isToFirstPage) {
        renderImages(1);
        currentPageNumber.textContent = '1';
        currentPageNum = 1;
        firstPage.disabled = true;
        prevPage.disabled = true;
        lastPage.disabled = false;
        nextPage.disabled = false;
    } else {
        renderImages(imageArray.length);
        currentPageNumber.textContent = totalPagesCount.toString();
        currentPageNum = totalPagesCount;
        firstPage.disabled = false;
        prevPage.disabled = false;
        lastPage.disabled = true;
        nextPage.disabled = true;
    }
}

function renderImages(currentPageIndex) {
    petsWrapper.innerHTML = '';
    imageArray[currentPageIndex - 1].forEach(image => {
        const singleImage = `
            <div id="${(image.name).toLowerCase()}" class="pet_info">
                <img class="our_pet" src="${image.img}" alt="${image.type}">
                <p class="pet_info__name">${image.name}</p>
                <button class="pet_more">Learn more</button>
            </div>
        `;
        petsWrapper.insertAdjacentHTML('beforeend', singleImage);
    });

    const pet = document.querySelectorAll('.pet_info');
    console.log('==', pet);

    pet.forEach(item => {
        item.addEventListener('click', (event) => petOpen(event, item));
    })
}

function generateImageArray() {
    const totalArray = [];
    for (let i = 0; i < 6; i++) {
        totalArray.push(getRandomOrder(json));
    }
    return totalArray;
}

function getRandomOrder(arr) {
    const arrStart = arr.slice(0, 4)
        .map(el => ({ ...el, random: Math.random() }))
        .sort((a, b) => a.random - b.random);
    const arrEnd = arr.slice(4, 8)
        .map(el => ( { ...el, random: Math.random() }))
        .sort((a, b) => a.random - b.random);
    return [...arrStart, ...arrEnd];
        // .map(el => ({ ...el, random: Math.random() }))
        // .sort((a, b) => a.random - b.random)
}

/*Pop Up*/

const petOpen = (event, item) => {
    popUp.classList.toggle("opened");
    overlay.classList.toggle("add");
    html.classList.toggle("stop");
    event.stopPropagation();

    console.log(item.id);
    const currentPet = json.find(elem => elem.name.toLowerCase() === item.id);
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