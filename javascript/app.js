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

const colorRandomizer = () => {
    var r = Math.floor(Math.random()*255);
    var g = Math.floor(Math.random()*255);
    var b = Math.floor(Math.random()*255);
    var a = Math.abs((Math.random()*1));
    const color = r+','+g+','+b+','+a;
    console.log(color);
}

const $contacts = {
    name: 'Alfredo Pimenta',
    phone: '89990956',
    note: 'Vizinho',
    email:'pop@mail.com',
    address: 'Magnolia'
}

console.log($contacts.name);

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

    setConstactToStorage($contactsData);
    
}

const constructContacts = () => {
    const container = document.querySelector('.saved-contacts--container');
    const divContactData = document.createElement('div');
    const divContact_name = document.createElement('div');
    const divContact_phone = document.createElement('div');
    const divContact_note = document.createElement('div');
    const divContact_more = document.createElement('div');
    const btnContact_more = document.createElement('button');
    const imgContact = document.createElement('img');

    divContactData.classList.add('contacts-data');
    container.append(divContactData);

    divContact_name.classList.add('contact-name');
    divContact_name.classList.add('contact-item');
    divContact_name.textContent = $contacts.name;
    divContactData.append(divContact_name);

    divContact_phone.classList.add('contact-phone');
    divContact_phone.classList.add('contact-item');
    divContact_phone.textContent = $contacts.phone;
    divContactData.append(divContact_phone);

    divContact_note.classList.add('contact-note');
    divContact_note.classList.add('contact-item');
    divContact_note.textContent = $contacts.note;
    divContactData.append(divContact_note);

    divContact_more.classList.add('contact-more');
    divContact_more.classList.add('contact-item');
    divContactData.append(divContact_more);

    btnContact_more.classList.add('btn--display-options');
    divContact_more.append(btnContact_more);

    imgContact.classList.add('more-svg');
    imgContact.alt = 'more-icon';
    imgContact.src = './svgs/ellipsis-vertical.svg';
    btnContact_more.append(imgContact);
}

// salva os dados do contacto no localStorage
const setConstactToStorage = ($contactsData) => {
    localStorage.setItem($contactsData.name, JSON.stringify($contactsData));
}

console.log(localStorage.length)

window.addEventListener('load', () => {
  welcome();
  colorRandomizer();
  constructContacts();
  constructContacts();
  document.querySelector('.btn-save--contact').addEventListener('click', getContactData);
  document.querySelector('.btn-dark--mode').addEventListener('click', darkmode);
})