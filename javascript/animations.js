//animação ao abrir os modais
export const onOpenModalAnimation = () => {
    const modals = document.querySelectorAll('.modal-form');

    for (let i = 0; modals.length > i; i++) {
        modals[i].classList.add('--modal-open');
    }

    setTimeout(() => {
        for (let i = 0; modals.length > i; i++) {
            modals[i].classList.remove('--modal-open');
        }
    }, 500);
}

//animação ao fechar os modais
export const onCloseModalAnimation = () => {
    const modals = document.querySelectorAll('.modal-form');

    for (let i = 0; modals.length > i; i++) {
        modals[i].classList.add('--modal-close');
    }
    
    setTimeout(() => {
        for (let i = 0; modals.length > i; i++) {
            modals[i].classList.remove('--modal-close');
        }
    }, 500);
}