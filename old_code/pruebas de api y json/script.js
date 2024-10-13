const apiBaseUrl = 'https://api.myl.cl/cards/edition/';

async function fetchEditionCards(edition) {
    const response = await fetch(`${apiBaseUrl}${edition}`);
    if (!response.ok) {
        throw new Error(`Error al cargar cartas de la edición ${edition}: ${response.statusText}`);
    }
    return await response.json();
}

function displayCards(cards, editionId) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

    if (cards.length === 0) {
        resultsDiv.innerHTML = '<p>No se encontraron cartas.</p>';
    } else {
        cards.forEach(card => {
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card');

            // Construir la URL de la imagen
            const imageUrl = `https://api.myl.cl/static/cards/${editionId}/${card.edid}.png`;

            cardDiv.innerHTML = `
                <img src="${imageUrl}" alt="${card.name}">
                <div class="card-info">
                    <strong>${card.name}</strong>
                    <p>${card.ability}</p>
                </div>
            `;

            // Evento para mostrar/ocultar información al hacer clic
            cardDiv.addEventListener('click', () => {
                const infoDiv = cardDiv.querySelector('.card-info');
                infoDiv.style.display = infoDiv.style.display === 'none' || infoDiv.style.display === '' ? 'block' : 'none';
            });

            resultsDiv.appendChild(cardDiv);
        });
    }
}

async function loadCards(edition) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p>Cargando cartas...</p>'; // Mensaje de carga
    
    try {
        const data = await fetchEditionCards(edition);
        displayCards(data.cards, data.edition.id); // Pasar el ID de la edición
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = `<p>Error al cargar cartas de la edición ${edition}: ${error.message}</p>`;
    }
}

document.getElementById('edition-select').addEventListener('change', (event) => {
    loadCards(event.target.value); // Cargar cartas al cambiar la edición
});

document.getElementById('search-input').addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();
    const cards = Array.from(document.querySelectorAll('.card'));
    cards.forEach(card => {
        const cardName = card.querySelector('strong').textContent.toLowerCase();
        const cardAbility = card.querySelector('p').textContent.toLowerCase();
        if (cardName.includes(query) || cardAbility.includes(query)) {
            card.style.display = ''; // Mostrar carta
        } else {
            card.style.display = 'none'; // Ocultar carta
        }
    });
});

// Cargar cartas de la edición "Zodiaco" al iniciar
window.onload = () => loadCards('zodiaco');