document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const modal = document.getElementById('card-details-modal');
    const closeModal = document.querySelector('.close-modal');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const cardId = card.getAttribute('data-id');
            const cardData = getCardDataById(cardId); // Función para obtener los datos de la carta

            if (cardData) {
                // Mostrar la información de la carta en el modal
                document.getElementById('card-image').src = cardData.image;
                document.getElementById('card-race').textContent = `Raza: ${cardData.race}`;
                document.getElementById('card-type').textContent = `Tipo: ${cardData.type}`;
                document.getElementById('card-cost').textContent = `Coste: ${cardData.cost}`;
                document.getElementById('card-power').textContent = `Fuerza: ${cardData.power}`;
                document.getElementById('card-ability').textContent = `Habilidad: ${cardData.ability}`;

                // Mostrar el modal
                modal.classList.remove('hidden');
            }
        });
    });

    closeModal.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    // Función para obtener los datos de la carta por ID
    function getCardDataById(id) {
        // Aquí debes implementar la lógica para obtener los datos de la carta.
        // Por ejemplo, podrías tener un objeto `cardsData` que almacene los datos de todas las cartas.
        // return cardsData[id] || null;
    }
});
