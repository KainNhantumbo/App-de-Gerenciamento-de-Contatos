
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

    const register = () => {
        document.querySelector('.--register').classList.toggle('hide-items');
        toogleMenu();
    }

    //remove o modal de login
    const quitModal = () => {
        document.querySelector('.modal-form').classList.add('hide-items');
        document.querySelector('.--register').classList.add('hide-items');
    }

    document.querySelectorAll('.btn-quit').item(0).addEventListener('click', quitModal);
    document.querySelectorAll('.btn-quit').item(1).addEventListener('click', quitModal);
    document.querySelector('#btn-login').addEventListener('click', login);
    document.querySelector('.btn-menu').addEventListener('click', toogleMenu);
    document.querySelector('#btn-register').addEventListener('click', register);
})();



//login e cadastro do usuário ()dados salvos no navegador)
(function () {
    const btnEntrar = document.querySelector('.btn-entrar');
    const btnSignup = document.getElementById('btn-signup');
    
    console.log(localStorage.user)
    const userLogin = () => {
        const passwordSignIn = document.getElementById('password-input-signin').value;
        const emailSignIn = document.getElementById('email-input-signin').value;
        /* const data = JSON.parse(localStorage.getItem()); */

        /* for (item in localStorage.length) {
            console.log(item);
        } */

        /* if (emailSignIn === null){
            document.querySelectorAll('form-item').item(0);
        } else if (emailSignIn === data.email && passwordSignIn === data.password) {
            window.location.assign('/app.html');
        } */
    }
    console.log(localStorage)

    const userSignup = () => {
        const emailSignup = document.getElementById('email-input-signup').value;
        const password = document.querySelector('#password-input-signup').value;
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const phoneNumber = document.getElementById('phone-number').value;
        const birthdate = document.getElementById('birthdate').value;
        const gender = document.getElementById('gender').value;
        const setupTime = new Date(); 

        const userData = {
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

        const user = userData.username;
        localStorage.setItem(user, JSON.stringify(userData));
    }
    
    

    console.log(document.querySelectorAll('.form-item'));

    btnEntrar.addEventListener('click', userLogin);
    btnSignup.addEventListener('click', userSignup);
})();