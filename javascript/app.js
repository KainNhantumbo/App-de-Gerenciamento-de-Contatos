'use strict';
import './functions.js';
import { colorRandomizer } from './functions.js';
import { onCloseModalAnimation } from './animations.js';
import { quitModal } from './functions.js';
import { setDataToStorage } from './functions.js';
import { getDataFromStorage } from './functions.js';
import { rendererRefresh } from './functions.js';
import { toggleMenu } from './functions.js';
import { divMsg } from './functions.js';
import { userSignup } from './functions.js';
import { darkmode } from './functions.js';

import { loginModal } from './modals.js';
import { addContactModal } from './modals.js';
import { registerModal } from './modals.js';

const $data = JSON.parse(localStorage.getItem("user"));
const welcome = () => {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.classList.add('welcome');
    const name = $data.username;
    welcomeMsg.textContent = "Olá "+name+", bem vindo ao sistema.";
    document.querySelector('.main-container').prepend(welcomeMsg);
}

const getContactData = () => {
    let contactName = document.getElementById('contact-name').value;
    let contactPhone = document.getElementById('contact-number').value;
    let contactNote = document.getElementById('contact-note').value;
    let contactEmail= document.getElementById('contact-email').value;
    let contactAddress = document.getElementById('contact-adress').value;
    
    const $contactsData = {
        name: contactName,
        phone: contactPhone,
        note: contactNote,
        email:contactEmail,
        address: contactAddress
    }

    var data = JSON.parse(localStorage.getItem('contactsData'));
    
    if (contactName === '' || contactPhone === '' && contactPhone === NaN || contactNote === '') {
        divMsg('Prencha pelo o menos nome, telefone e coloque uma anotação antes de salvar!');
    } else {
        if (data === null) {
            data = [];
        }
        data.push($contactsData);
        setDataToStorage('contactsData', data);
        rendererRefresh('contactsData');
        quitModal();
        document.querySelectorAll('.--item').forEach(item => item.value = null)
    }
}


// elimina o contacto

const removeContact = () => {
    var data = JSON.parse(localStorage.getItem('contactsData'));
    function removerItem (index) {
        var datex = data.shift(index, 0);
        console.log(datex)
    }
    
    const contact = document.querySelectorAll('.contacts-data');
    contact.forEach(item => {
        const index = item.dataset.index;
        removerItem(index);
    });
    console.log(data);
}   

//login do usuário com os dados salvos no navegador
const userLogin = () => {
    const passwordSignIn = document.getElementById('password-input-signin').value;
    const emailSignIn = document.getElementById('email-input-signin').value;
    
    // carrega os dados salvos no localStorage
    const $data = JSON.parse(localStorage.getItem('user'));

    // verifica se o usuário pode logar
    try {
        if (emailSignIn === "")
        return divMsg('Por favor, escreva um e-mail válido!');
            
        if (emailSignIn === $data.email && passwordSignIn === $data.password) {
            quitModal();
            console.log('sucesso')
        } else {
            window.location.pathname;
            divMsg("Dados inválidos.");
        }

    } catch (error) {
        console.log(error);
    }
}



// carrega os eventos
function loadEvents () {
    document.querySelectorAll('.btn-quit').forEach(item => {
        item.addEventListener('click', quitModal);
    });
    document.querySelector('.btn-cancel--contact').addEventListener('click', quitModal, onCloseModalAnimation)
    document.querySelector('#btn-login').addEventListener('click', loginModal);
    document.querySelector('.btn-menu').addEventListener('click', toggleMenu);
    document.querySelector('#btn-register').addEventListener('click', registerModal);
    document.querySelector('.btn-new--contact').addEventListener('click', addContactModal);
    document.querySelector('.btn-entrar').addEventListener('click', userLogin);
    document.getElementById('btn-signup').addEventListener('click', userSignup);
    welcome();
    colorRandomizer();
    rendererRefresh('contactsData');
    document.querySelectorAll('.btn--display-options').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            removeContact();
        });
    });
    document.querySelector('.btn-save--contact').addEventListener('click', getContactData);
    document.querySelector('.btn-dark--mode').addEventListener('click', darkmode);
    /* document.querySelector('.login-modal').addEventListener('click', e => {
        e.cancelBubble;
        e.stopPropagation()
        e.stopImmediatePropagation();
        e.stopPropagation();
        e.preventDefault();
        quitModal();
        console.log(e.target)
    }); */
}
window.addEventListener('load', loadEvents);

