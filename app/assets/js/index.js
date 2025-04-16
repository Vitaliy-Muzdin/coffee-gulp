"use strict"

window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.pageYOffset > 100) {
        header.classList.add('header_active');
    } else {
        header.classList.remove('header_active');
    }
});

const email = document.getElementById('email');
const formText = document.querySelector('.subscribe-form__text');
document.addEventListener('change', function() {
    if(email.value === '') {
        formText.classList.remove('subscribe-form__text_not-active');
    } else {
        formText.classList.add('subscribe-form__text_not-active');
    }
});

window.onload = function(event) {
    const coffeeStylesItemTitle = document.querySelectorAll('.coffee-styles__item-title');
    let coffeeStylesItemTitleHeight = 0;
    for(let i = 0; i < coffeeStylesItemTitle.length; i++ ) {
        const coffeeStylesItemTitleElem = coffeeStylesItemTitle[i].offsetHeight;
        if(coffeeStylesItemTitleElem > coffeeStylesItemTitleHeight) {
            // coffeeStylesItemTitleHeight = coffeeStylesItemTitleElem / 100 * 114;
            coffeeStylesItemTitleHeight = coffeeStylesItemTitleElem;
        }
    }
    for(let i = 0; i < coffeeStylesItemTitle.length; i++ ) {
        coffeeStylesItemTitle[i].style.height = coffeeStylesItemTitleHeight + 'px';
    }

    const coffeeStylesItemText = document.querySelectorAll('.coffee-styles__item-text');
    let coffeeStylesItemTextHeight = 0;
    for(let i = 0; i < coffeeStylesItemText.length; i++ ) {
        const coffeeStylesItemTextElem = coffeeStylesItemText[i].offsetHeight;
        if(coffeeStylesItemTextElem > coffeeStylesItemTextHeight) {
            // coffeeStylesItemTextHeight = coffeeStylesItemTextElem / 100 * 116;
            coffeeStylesItemTextHeight = coffeeStylesItemTextElem;
        }
    }
    for(let i = 0; i < coffeeStylesItemText.length; i++ ) {
        coffeeStylesItemText[i].style.height = coffeeStylesItemTextHeight + 'px';
    }

    const advantagesItemTitle = document.querySelectorAll('.advantages__item-title');
    let advantagesItemTitleHeight = 0;
    for(let i = 0; i < advantagesItemTitle.length; i++ ) {
        const advantagesItemTitleElem = advantagesItemTitle[i].offsetHeight;
        if(advantagesItemTitleElem > advantagesItemTitleHeight) {
            // advantagesItemTitleHeight = advantagesItemTitleElem / 100 * 115;
            advantagesItemTitleHeight = advantagesItemTitleElem;
        }
    }
    for(let i = 0; i < advantagesItemTitle.length; i++ ) {
        advantagesItemTitle[i].style.height = advantagesItemTitleHeight + 'px';
    }

    const advantagesItemText = document.querySelectorAll('.advantages__item-text');
    let advantagesItemTextHeight = 0;
    for(let i = 0; i < advantagesItemText.length; i++ ) {
        const advantagesItemTextElem = advantagesItemText[i].offsetHeight;
        if(advantagesItemTextElem > advantagesItemTextHeight) {
            // advantagesItemTextHeight = advantagesItemTextElem / 100 * 116.4;
            advantagesItemTextHeight = advantagesItemTextElem;
        }
    }
    for(let i = 0; i < advantagesItemText.length; i++ ) {
        advantagesItemText[i].style.height = advantagesItemTextHeight + 'px';
    }

    const reviewsContent = document.querySelector('.reviews__content');
    const reviewsItem = document.querySelectorAll('.reviews__item');
    let reviewsItemHeight = 0;
    for(let i = 0; i < reviewsItem.length; i++ ) {
        const reviewsItemElem = reviewsItem[i].offsetHeight;
        if(reviewsItemElem > reviewsItemHeight) {
            reviewsItemHeight = reviewsItemElem;
        }
    }
    for(let i = 0; i < reviewsItem.length; i++ ) {
        reviewsContent.style.height = reviewsItemHeight + 'px';
    }
}

const slideItem = document.querySelectorAll('.reviews__item');
const pref = document.querySelector('.reviews__button-left');
const next = document.querySelector('.reviews__button-right');
let i = 0;
next.onclick = function () {
    slideItem[i].classList.remove('reviews__item_active');
    i++;
    if (i >= slideItem.length) {
        i = 0;
    }
    slideItem[i].classList.add('reviews__item_active');
};
pref.onclick = function () {
    slideItem[i].classList.remove('reviews__item_active');
    i--;
    if (i < 0) {
        i = slideItem.length -1;
    }
    slideItem[i].classList.add('reviews__item_active');
};

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', sendForm);

    function formAddError(input) {
        input.parentElement.classList.add('subscribe-form__email_error');
        input.classList.add('subscribe-form__email_error');
    }

    function formRemoveError(input) {
        input.parentElement.classList.remove('subscribe-form__email_error');
        input.classList.remove('subscribe-form__email_error');
    }

    // Функция проверки email
    function emailTest(input) {
        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input.value);
    }

    function formValidation(form) {
        let error = 0;
        let email = document.getElementById('email');
        formRemoveError(email);

        console.log('Функция formValidation сработала');

        if(email.classList.contains('subscribe-form__email')) {
            console.log('email.classList.contains');
            if(!emailTest(email)) {
                formAddError(email);
                error++;
            } else if(email.value === '') {
                formAddError(email);
                error++;
            } else {
                console.log('Ошибок нет - ' + error);
            }
        }
        return error;
    }

    async function sendForm(event) {
        event.preventDefault();
        event.stopPropagation();
        let error = formValidation(form);
        let formData = new FormData(form);
        console.log('formData - ' + formData);
        const formInfoError = document.querySelector('.form-info__error'),
            formInfoOk = document.querySelector('.form-info__ok'),
            loading = document.getElementById('loading');
        if(error === 0) {
            loading.classList.add('loading_active');
            formInfoError.innerHTML = '';
            const response = await fetch('./mail/subscribe.php', {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                let result = await response.json();
                loading.classList.remove('loading_active');
                formInfoError.innerHTML = '';
                formInfoOk.innerHTML = '<span class="form-info__info">' + result.message + '</span>';
                formText.classList.remove('subscribe-form__text_not-active');
                form.reset();
            } else {
                formInfoError.innerHTML = '<span class="form-info__info">Ошибка - подписаться на новости не удалось</span>';
                loading.classList.remove('loading_active');
                console.log('if(response.false) - ');
            }
        } else {
            formInfoError.innerHTML = '<span class="form-info__info">Заполните обязательные поля</span>';
            formInfoOk.innerHTML = '';
        }
    }
});



