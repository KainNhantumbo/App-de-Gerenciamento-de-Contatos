'use strict';
import { onCloseModalAnimation } from './animations.js';
import { quitModal } from './functions.js';
import { rendererRefresh } from './functions.js';
import { toggleMenu } from './functions.js';
import { divMsg } from './functions.js';
import { userSignup } from './functions.js';
import { darkMode } from './functions.js';
import { loginModal } from './modals.js';
import { addContactModal } from './modals.js';
import { registerModal } from './modals.js';
import { welcome } from './functions.js';
import { deleteButton } from './functions.js';
import { log } from './functions.js';
import { fetchDataFromStorage } from './functions.js';
import { getContactData } from './functions.js';
import { nothingToShow } from './functions.js';


//login do usuário com os dados salvos no navegador
const userLogin = async (e) => {
    e.preventDefault();
    const passwordSignIn = document.getElementById('password-input-signin').value;
    const emailSignIn = document.getElementById('email-input-signin').value;
    
    // verifica se o usuário pode logar
    try {
        // carrega os dados salvos no localStorage
        const $data = await fetchDataFromStorage("user");

        if (emailSignIn === "")
        return divMsg('Por favor, escreva um e-mail válido!');
            
        if (emailSignIn === $data.email && passwordSignIn === $data.password) {
            quitModal();
            console.log('Sucesso.');
        } else {
            divMsg("Dados inválidos.");
        }
    } catch (err) {
        console.log(err);
    }
}

// carrega os eventos e funções
function loadEvents () {
    welcome();
    rendererRefresh('contactsData');
    deleteButton();
    nothingToShow()
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
    document.querySelector('.btn-save--contact').addEventListener('click', getContactData);
    document.querySelector('.btn-dark--mode').addEventListener('click', darkMode);
    document.querySelector('.modal-container').addEventListener('click', quitModal);
    document.querySelector('.--login').addEventListener('click', e => e.stopPropagation());
    document.querySelector('.--register').addEventListener('click', e => e.stopPropagation());
    document.querySelector('.add-contact').addEventListener('click', e => e.stopPropagation());
}

// inicia os eventos e funções
window.addEventListener('load', loadEvents);