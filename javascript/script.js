//mostra ou esconde o menu
(function () {
    const toogleMenu = () => {
        document.querySelector('.nav-items').classList.toggle('hide-menu');
    }
    document.querySelector('.btn-menu').addEventListener('click', toogleMenu);
})();