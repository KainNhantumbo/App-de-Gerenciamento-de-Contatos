
(function () {
    //mostra ou oculta o menu
    const toogleMenu = () => {
        document.querySelector('.nav-items').classList.toggle('hide-menu');
    }

    //mostra ou oculta o modal de login
    const login = () => {
        document.querySelector('.modal-form').classList.toggle('hide-items');
        toogleMenu();
    }

    //remove o modal de login
    const quitModal = () => {
        document.querySelector('.modal-form').classList.add('hide-items');
    }

    document.querySelector('.btn-quit').addEventListener('click', quitModal)
    document.querySelector('#btn-login').addEventListener('click', login);
    document.querySelector('.btn-menu').addEventListener('click', toogleMenu);
})();



//login do usuário
(function () {
    const btnEntrar = document.querySelector('.btn-entrar');
    const email = document.querySelector('#email-input').value;
    const password = document.querySelector('#password-input').value;

    const userData = () => {

        

    }

    btnEntrar.addEventListener('click', userData)
})();