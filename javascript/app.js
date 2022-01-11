const $data = JSON.parse(localStorage.getItem("user"));

const welcome = () => {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.classList.add('welcome');
    const name = $data.username;
    welcomeMsg.textContent = "Olá "+name+", bem vindo ao sistema.";
    document.querySelector('.main-container').prepend(welcomeMsg);
}

const darkmode = () => {
    const body = document.querySelector('.main-class');
    const btnDarkmode = document.querySelector('.svg-container');
    const darkMoonRegular = ` <img class="moon-svg" src="./svgs/moon-regular.svg" alt="dark mode regular">`;
    const darkMoonSolid = `<img class="moon-svg" src="./svgs/moon-solid.svg" alt="dark mode solid">`;

    if (btnDarkmode.innerHTML === darkMoonRegular) {
        btnDarkmode.innerHTML = darkMoonSolid;
        body.classList.add('--dark-mode');
    } else {
        body.classList.add('--dark-modeEnd');

        
        setTimeout(() => {
            btnDarkmode.innerHTML = darkMoonRegular;
            body.classList.remove('--dark-modeEnd');
            body.classList.remove('--dark-mode');
        }, 500)
    }
    console.log(btnDarkmode)
}

const colorRandomizer = () => {
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    const color = r+','+g+','+b;
    console.log(color);
}

window.addEventListener('load', () => {
  welcome();
  colorRandomizer();
  document.querySelector('.btn-dark--mode').addEventListener('click', darkmode);
})



