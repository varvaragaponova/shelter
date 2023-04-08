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

pet.forEach(item => {
    item.addEventListener('click', (event) => petOpen(event, item));
})

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