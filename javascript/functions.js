import { onCloseModalAnimation } from "./animations.js";
import { confirmModal } from "./modals.js";

//retorna o console.log
export function log (content) {
    return console.log(content);
}

// salva os dados no localStorage
export const setDataToStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

//carrega os dados do localStorage
export const getDataFromStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    rendererContacts(data);
}

// retorna dados do localStorage
export const fetchDataFromStorage = (key) => {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
}

// sorteia o array em ordem alfabética
const arraySort = (data) => {
    try {
        data.sort((a, b) => {
            if (a.name < b.name){
                return -1;
            } else {
                return true;
            }
        });
    } catch (e) {
        console.log(e);
    }
}

// elimina o contacto
const removeContact = (index) => {
    var data = fetchDataFromStorage('contactsData'); 
    data.splice(index, 1);
    setDataToStorage('contactsData', data);
    rendererRefresh('contactsData');     
}

// adiciona um evento click ao botão options
export const deleteButton = () => {
    const container = document.querySelector('.app-body');
    container.addEventListener('click', e => {
        e.stopPropagation(); 
        const clickedElement = e.target;
        if (clickedElement.tagName === 'BUTTON' || clickedElement.classList.contains('more-svg')) {
            e.preventDefault();
            const index = clickedElement.dataset.index;
            removeContact(index);
            /* confirmModal(); */
        }
    });
}

// atualiza a tela ao modificar os contatos
export const rendererRefresh = (key) => {
    rendererClear();
    getDataFromStorage(key);
}

//limpa a tela antes da atualização dos contatos
export const rendererClear = () => {
    const contactsContainer = document.querySelector('.saved-contacts--container');
    while (contactsContainer.firstChild){
        contactsContainer.removeChild(contactsContainer.lastChild);
    }
}

// atualiza a tela com os contatos salvos
export const rendererContacts = (data) => {
    if (data !== null) {
        data.forEach((item, index) => constructContacts(item.name, item.phone, item.email, index));
    } else {
        data = [];
    }
}

// gera cor rgba aleatória
const colorRandomizer = () => {
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    var a = (Math.random()*1).toFixed(1);
    const color = r+','+g+','+b+','+a;
    return color;
}

// mostra a mensagem de boas vindas ao usuário
export const welcome = () => {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.classList.add('welcome');
    const $data = fetchDataFromStorage("user");

    try {
        if ($data === null) {
            return console.log('Faça o cadastro para acessar a aplicação.');
        } else if ($data !== null) {
            const name = $data.name;
            welcomeMsg.textContent = "Olá "+name+", bem vindo ao sistema.";
            document.querySelector('.main-container').prepend(welcomeMsg);
        }
    } catch (err) {
        console.log(err);
    }
}

// muda para modo noturno e vice-versa
export const darkMode = () => {
    const body = document.querySelector('.main-class');
    const toolbar = document.querySelector('.toolbar');
    const appBody = document.querySelector('.app-body');
    const btnDarkmode = document.querySelector('.svg-container');
    const darkMoonRegular = ` <img class="moon-svg" src="./svgs/moon-regular.svg" alt="dark mode regular">`;
    const darkMoonSolid = `<img class="moon-svg" src="./svgs/moon-solid.svg" alt="dark mode solid">`;

    switch (btnDarkmode.innerHTML) {
        case darkMoonRegular:
            btnDarkmode.innerHTML = darkMoonSolid;
            body.classList.add('--dark-mode');
            toolbar.classList.add('--dark-background');
            appBody.classList.add('--dark-background');
        break;
        case darkMoonSolid:
            body.classList.add('--dark-modeEnd');
            setTimeout(() => {
                btnDarkmode.innerHTML = darkMoonRegular;
                body.classList.remove('--dark-modeEnd');
                body.classList.remove('--dark-mode');
                toolbar.classList.remove('--dark-background');
                appBody.classList.remove('--dark-background');
            }, 500);
        break;
        default:
            btnDarkmode.innerHTML = darkMoonRegular;
        break;
    }
}

//mostra ou oculta o menu
export const toggleMenu = () => {
    document.querySelector('.nav-items').classList.toggle('hide-menu');
}

//remove o modal
export const quitModal = () => {
    onCloseModalAnimation();
    try {
        setTimeout(() => {
            document.querySelector('.login-modal').classList.add('hide-items');
            document.querySelector('.--register').classList.add('hide-items');
            document.querySelector('.add-contact').classList.add('hide-items');
            document.querySelector('.confirm-modal').classList.add('hide-items');    
        }, 500);
    } catch (err) {
        console.log(err);
    }
}

//construtor function: constroi a interface para
// os contactos
export const constructContacts = (name, phone, email, index) => {
    const container = document.querySelector('.saved-contacts--container');
    const divContactData = document.createElement('div');
    const divContact_name = document.createElement('div');
    const divContact_phone = document.createElement('div');
    const divContact_note = document.createElement('div');
    const divContact_more = document.createElement('div');
    const btnContact_more = document.createElement('button');
    const imgContact = document.createElement('img');

    divContactData.classList.add('contacts-data');
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
    divContact_note.textContent = email;
    divContactData.append(divContact_note);

    divContact_more.classList.add('contact-more');
    divContact_more.classList.add('contact-item');
    divContactData.append(divContact_more);

    btnContact_more.classList.add('btn--display-options');
    btnContact_more.setAttribute('data-index', index);
    divContact_more.append(btnContact_more);

    imgContact.classList.add('more-svg');
    imgContact.alt = 'more-icon';
    imgContact.src = './svgs/delete.svg';
    imgContact.setAttribute('data-index', index);
    btnContact_more.append(imgContact);

    // constructOptionButtons(btnContact_more);
}

// constroi botões de opções para cada contacto
const constructOptionButtons = (contactMore) => {
    const divContainer = document.createElement('div');
    const divOptions = document.createElement('div');
    const btnDetails = document.createElement('button');
    const btnDelete = document.createElement('button');
    const svgImg1 = document.createElement('img');
    var svgImg2 = document.createElement('img');

    divContainer.classList.add("options-modal--container");
    divContainer.classList.add("hide-items");
    contactMore.append(divContainer);

    divOptions.classList.add("options-modal");
    divContainer.append(divOptions);

    btnDetails.classList.add("btn-details");
    btnDetails.textContent = 'Detalhes';
    divOptions.append(btnDetails);

    btnDelete.classList.add("btn-delete");
    btnDelete.textContent = 'Deletar';
    divOptions.append(btnDelete);

    svgImg1.classList.add("chvronr-svg");
    svgImg1.src = "./svgs/chevron-right.svg";
    svgImg1.alt = "arrow left";
    btnDetails.append(svgImg1);

    svgImg2.classList.add("chvronr-svg");
    svgImg2.src = "./svgs/chevron-right.svg";
    svgImg2.alt = "arrow left";
    btnDelete.append(svgImg2);
}

//cadastro do usuário
export const userSignup = () => {
    const emailSignup = document.getElementById('email-input-signup').value;
    const password = document.querySelector('#password-input-signup').value;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const phoneNumber = document.getElementById('phone-number').value;
    const birthdate = document.getElementById('birthdate').value;
    const gender = document.getElementById('gender').value;
    const setupTime = new Date();

    const $userData = {
        firstName: firstName,
        lastName: lastName,
        username: firstName + ' ' + lastName,
        birthdate: birthdate,
        gender: gender,
        phoneNumber: phoneNumber,
        email: emailSignup,
        password: password,
        signedUpAt: setupTime
    }
    setDataToStorage("user", $userData);
    quitModal();
}

// constroi uma div para mensagens de erro
export const divMsg = (msg) => {
    const formBox = document.querySelectorAll('.modal-form'); 

    for (let i = 0; i < formBox.length; i++) {
        const div = document.createElement('div');

        div.classList.add('form-item');
        div.style.border = '2px'+' '+'solid'+' '+'tomato';
        div.style.padding = '5px';
        div.style.color = '#fff';
        div.style.backgroundColor = 'tomato';
        div.style.fontSize = '.95rem';
        div.style.textAlign = 'center';
        div.style.borderRadius = '5px';
        div.textContent = msg;
        formBox[i].append(div);

        setTimeout(() => {
            formBox[i].removeChild(div);
        }, 2000);
    }
}