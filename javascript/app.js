import './functions.js';
import { colorRandomizer } from './functions.js';
import { onOpenModalAnimation } from './animations.js';
import { onCloseModalAnimation } from './animations.js';
import { quitModal } from './functions.js';
import { setDataToStorage } from './functions.js';
import { getDataFromStorage } from './functions.js';
import { rendererRefresh } from './functions.js';
import { toogleMenu } from './functions.js';
import { constructContacts } from './functions.js';

const $data = JSON.parse(localStorage.getItem("user"));

const welcome = () => {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.classList.add('welcome');
    const name = $data.username;
    welcomeMsg.textContent = "Olá "+name+", bem vindo ao sistema.";
    document.querySelector('.main-container').prepend(welcomeMsg);
}

// muda para modo noturno e vice-versa
const darkmode = () => {
    const body = document.querySelector('.main-class');
    const toolbar = document.querySelector('.toolbar');
    const appBody = document.querySelector('.app-body');
    const btnDarkmode = document.querySelector('.svg-container');
    const darkMoonRegular = ` <img class="moon-svg" src="./svgs/moon-regular.svg" alt="dark mode regular">`;
    const darkMoonSolid = `<img class="moon-svg" src="./svgs/moon-solid.svg" alt="dark mode solid">`;

    if (btnDarkmode.innerHTML === darkMoonRegular) {
        btnDarkmode.innerHTML = darkMoonSolid;
        body.classList.add('--dark-mode');
        toolbar.classList.add('--dark-background');
        appBody.classList.add('--dark-background');
    } else {
        body.classList.add('--dark-modeEnd');
        setTimeout(() => {
            btnDarkmode.innerHTML = darkMoonRegular;
            body.classList.remove('--dark-modeEnd');
            body.classList.remove('--dark-mode');
            toolbar.classList.remove('--dark-background');
            appBody.classList.remove('--dark-background');
        }, 500)
    }
}

const getContactData = () => {
    const contactName = document.getElementById('contact-name').value;
    const contactPhone = document.getElementById('contact-number').value;
    const contactNote = document.getElementById('contact-note').value;
    const contactEmail= document.getElementById('contact-email').value;
    const contactAddress = document.getElementById('contact-adress').value;
    
    const $contactsData = {
        name: contactName,
        phone: contactPhone,
        note: contactNote,
        email:contactEmail,
        address: contactAddress
    }

    
    const $contacts = [];
    getDataFromStorage();
    $contacts.push($contactsData);
    


    setDataToStorage('contactsData', $contacts);
    rendererRefresh('contactsData');
}




// elimina o contacto

/* const removeContact = () => {
    

    function removerItem (index) {
        data.splice(index, 1)
        
    }
    
    const contact = document.querySelectorAll('.contacts-data');

    contact.forEach(item => {
        const index = item.dataset.index;
        removerItem(index);
    })

    console.log(contact.length);
    console.log(data)
}   */




//carrega os eventos
window.addEventListener('load', () => {
    welcome();
    colorRandomizer();
    rendererRefresh('contactsData');
    document.querySelectorAll('.btn--display-options').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            console.log(e.target)
        });
    });
    document.querySelector('.btn-save--contact').addEventListener('click', getContactData);
    document.querySelector('.btn-dark--mode').addEventListener('click', darkmode);
});

(() => {
    







//mostra ou oculta o modal de login
 const login = () => {
    document.querySelector('.login-modal').classList.toggle('hide-items');
    document.querySelector('.--login').classList.remove('hide-items');
    document.querySelector('.--register').classList.add('hide-items');
    onOpenModalAnimation();
    toogleMenu();
}

//mostra ou oculta o modal de cadastro
const register = () => {
    document.querySelector('.login-modal').classList.toggle('hide-items');
    document.querySelector('.--register').classList.toggle('hide-items');
    document.querySelector('.--login').classList.add('hide-items');
    document.querySelector('.add-contact').classList.add('hide-items');
    onOpenModalAnimation();
    toogleMenu();
}

//mostra ou oculta o modal de adição de novo contato
const addContact = () => {
    document.querySelector('.login-modal').classList.toggle('hide-items');
    document.querySelector('.--login').classList.add('hide-items');
    document.querySelector('.add-contact').classList.toggle('hide-items');
    onOpenModalAnimation();
}



//login do usuário com os dados salvos no navegador
const btnEntrar = document.querySelector('.btn-entrar');
const btnSignup = document.getElementById('btn-signup');

const userLogin = () => {
    const passwordSignIn = document.getElementById('password-input-signin').value;
    const emailSignIn = document.getElementById('email-input-signin').value;
    var div;
    var formBox;

    // carrega os dados salvos no localStorage
    const $data = JSON.parse(localStorage.getItem('user'));

    // constroi uma div para mensagens de erro
    const divMsg = (msg) => {
        formBox = document.querySelectorAll('.modal-form').item(0);
        div = document.createElement('div');
        div.classList.add('form-item');
        div.style.border = '2px'+' '+'solid'+' '+'tomato';
        div.style.padding = '5px';
        div.style.color = 'tomato';
        div.style.fontSize = '.9rem';
        div.style.textAlign = 'center';
        div.style.borderRadius = '3px';
        div.textContent = msg;
        formBox.append(div);

        setTimeout(() => {
            formBox.removeChild(div);
        }, 2000);
    }

    // verifica se o usuário pode logar
    try {
        if (emailSignIn === "")
        return divMsg('Por favor, escreva um e-mail válido!');
            
        if (emailSignIn === $data.email && passwordSignIn === $data.password) {
            btnEntrar.classList.add('hide-items');
            btnSignup.classList.add('hide-items');
        } else {
            window.location.pathname;
            divMsg("Dados inválidos.");
        }

    } catch (error) {
        console.log(error);
    }
}

//cadastro do usuário
const userSignup = () => {
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

    setUserToLocalStorage($userData);
}

// salva os dados do usuário no navegador
const setUserToLocalStorage = ($userData) => {
    localStorage.setItem("user", JSON.stringify($userData));
}

// carrega os eventos
function loadEvents () {
    document.querySelectorAll('.btn-quit').forEach(item => {
        item.addEventListener('click', quitModal);
    });
    document.querySelector('.btn-cancel--contact').addEventListener('click', quitModal, onCloseModalAnimation)
    document.querySelector('#btn-login').addEventListener('click', login);
    document.querySelector('.btn-menu').addEventListener('click', toogleMenu);
    document.querySelector('#btn-register').addEventListener('click', register);
    document.querySelector('.btn-new--contact').addEventListener('click', addContact);
    /* document.querySelector('.login-modal').addEventListener('click', e => {
        e.cancelBubble;
        e.stopPropagation()
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        quitModal();
        console.log(e.target)
    }); */
    
    btnEntrar.addEventListener('click', userLogin);
    btnSignup.addEventListener('click', userSignup);
}
window.addEventListener('load', loadEvents);

})();