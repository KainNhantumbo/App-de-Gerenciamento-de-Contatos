import { onCloseModalAnimation } from "./animations.js";

// salva os dados no localStorage
export const setDataToStorage = (chave, item) => {
    localStorage.setItem(chave, JSON.stringify(item));
}

//carrega os dados do localStorage
export const getDataFromStorage = (chave) => {
    const data = JSON.parse(localStorage.getItem(chave));
    rendererContacts(data);
}

export const rendererRefresh = (chave) => {
    rendererClear();
    getDataFromStorage(chave);
}

export const rendererClear = () => {
    const contactsContainer = document.querySelector('.saved-contacts--container');

    while (contactsContainer.firstChild){
        contactsContainer.removeChild(contactsContainer.lastChild);
    }
}

// atualiza a tela com os contatos salvos
export const rendererContacts = (data) => {
    if (data !== null) {
        data.forEach((item, index) => constructContacts(item.name, item.phone, item.note, index));
    } else {
        console.log('Sem nada a mostar na tela.');
    }
}

// gera cor aleatória rgba
export const colorRandomizer = () => {
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    var a = Math.round((Math.random()*1));
    const color = r+','+g+','+b+','+a;
}

//mostra ou oculta o menu
export const toogleMenu = () => {
    document.querySelector('.nav-items').classList.toggle('hide-menu');
}

//remove o modal
export const quitModal = () => {
    onCloseModalAnimation();

    setTimeout(() => {
        document.querySelector('.login-modal').classList.add('hide-items');
        document.querySelector('.--register').classList.add('hide-items');
        document.querySelector('.add-contact').classList.add('hide-items');
    }, 500);
}

//construtor funtion: constroi a interface para
// os contactos
export const constructContacts = (name, phone, note, index) => {
    const container = document.querySelector('.saved-contacts--container');
    const divContactData = document.createElement('div');
    const divContact_name = document.createElement('div');
    const divContact_phone = document.createElement('div');
    const divContact_note = document.createElement('div');
    const divContact_more = document.createElement('div');
    const btnContact_more = document.createElement('button');
    const imgContact = document.createElement('img');

    divContactData.classList.add('contacts-data');
    divContactData.setAttribute('data-index', index);
    container.append(divContactData);

    divContact_name.classList.add('contact-name');
    divContact_name.classList.add('contact-item');
    divContact_name.textContent = name;
    divContactData.append(divContact_name);

    divContact_phone.classList.add('contact-phone');
    divContact_phone.classList.add('contact-item');
    divContact_phone.textContent = phone;
    divContactData.append(divContact_phone);

    divContact_note.classList.add('contact-note');
    divContact_note.classList.add('contact-item');
    divContact_note.textContent = note;
    divContactData.append(divContact_note);

    divContact_more.classList.add('contact-more');
    divContact_more.classList.add('contact-item');
    divContactData.append(divContact_more);

    btnContact_more.classList.add('btn--display-options');
    divContact_more.append(btnContact_more);

    imgContact.classList.add('more-svg');
    imgContact.alt = 'more-icon';
    imgContact.src = './svgs/ellipsis-vertical.svg';
    btnContact_more.append(imgContact);
}