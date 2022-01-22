import { onOpenModalAnimation } from './animations.js';
import { toggleMenu } from './functions.js';

//mostra ou oculta o modal de login
export const loginModal = () => {
    document.querySelector('.login-modal').classList.toggle('hide-items');
    document.querySelector('.--login').classList.remove('hide-items');
    document.querySelector('.--register').classList.add('hide-items');
    onOpenModalAnimation();
    toggleMenu();
}

//mostra ou oculta o modal de cadastro
export const registerModal = () => {
    document.querySelector('.login-modal').classList.toggle('hide-items');
    document.querySelector('.--register').classList.toggle('hide-items');
    document.querySelector('.--login').classList.add('hide-items');
    document.querySelector('.add-contact').classList.add('hide-items');
    onOpenModalAnimation();
    toggleMenu();
}

//mostra ou oculta o modal de adição de novo contato
export const addContactModal = () => {
    document.querySelector('.login-modal').classList.toggle('hide-items');
    document.querySelector('.--login').classList.add('hide-items');
    document.querySelector('.add-contact').classList.toggle('hide-items');
    onOpenModalAnimation();
}

//mostra ou oculta o modal de opções de contato
export const confirmModal = () => {
    document.querySelector('.login-modal').classList.toggle('hide-items');
    document.querySelector('.confirm-modal').classList.toggle('hide-items');
    document.querySelector('.--login').classList.add('hide-items');
    onOpenModalAnimation(); 
}