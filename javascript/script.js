import "./app.js";

//mostra ou oculta o menu
const toogleMenu = () => {
    document.querySelector('.nav-items').classList.toggle('hide-menu');
}

//mostra ou oculta o modal de login
 const login = () => {
    document.querySelector('.modal-form').classList.toggle('hide-items');
    document.querySelector('.--register').classList.add('hide-items');
    toogleMenu();
}

const register = () => {
    document.querySelector('.--register').classList.toggle('hide-items');
    document.querySelector('.modal-form').classList.add('hide-items');
    toogleMenu();
}

//remove o modal de login
const quitModal = () => {
    document.querySelector('.modal-form').classList.add('hide-items');
    document.querySelector('.--register').classList.add('hide-items');
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

    setToLocalStorage($userData);
}

// salva os dados do usuário no navegador
const setToLocalStorage = ($userData) => {
    localStorage.setItem("user", JSON.stringify($userData));
}

// carrega os eventos
function loadEvents () {
    document.querySelectorAll('.btn-quit').item(0).addEventListener('click', quitModal);
    document.querySelectorAll('.btn-quit').item(1).addEventListener('click', quitModal);
    document.querySelector('#btn-login').addEventListener('click', login);
    document.querySelector('.btn-menu').addEventListener('click', toogleMenu);
    document.querySelector('#btn-register').addEventListener('click', register);
    btnEntrar.addEventListener('click', userLogin);
    btnSignup.addEventListener('click', userSignup);
}
window.addEventListener('load', loadEvents);
