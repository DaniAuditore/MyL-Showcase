var deck_buttons = document.querySelectorAll('.deck-exp-button');
var deck_expan = document.querySelectorAll('.deck');

deck_buttons.forEach((elem, key) => {
    elem.addEventListener('click', () => {
        deck_expan[key].classList.toggle("open-close")
    })
});
