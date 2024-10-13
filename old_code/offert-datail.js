const acceptButton = document.getElementById('accept-offer');
const proposeButton = document.getElementById('propose-trade');
const confirmModal = document.getElementById('confirm-modal');
const proposeModal = document.getElementById('propose-modal');
const cancelButton = document.getElementById('cancel');
const cancelProposeButton = document.getElementById('cancel-propose');

acceptButton.addEventListener('click', () => {
    confirmModal.style.display = 'flex';
});

cancelButton.addEventListener('click', () => {
    confirmModal.style.display = 'none';
});
