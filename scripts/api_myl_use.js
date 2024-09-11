const apiBaseUrl = 'https://api.myl.cl/cards/edition/';

async function fetchEditionCards(edition) {
    const response = await fetch(`${apiBaseUrl}${edition}`);
    if (!response.ok) {
        throw new Error(`Error al cargar cartas de la edición ${edition}: ${response.statusText}`);
    }
    return await response.json();
}

async function displayCards(cards, editionId) {
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
                <img src="${imageUrl}" alt="${card.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
            `;

            // Almacenar el nombre y la habilidad en atributos de datos
            cardDiv.dataset.name = card.name; // Guardar el nombre
            cardDiv.dataset.ability = card.ability; // Guardar la habilidad

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

function filterCards() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const resultsDiv = document.getElementById('results');
    const cards = resultsDiv.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
        const cardName = card.dataset.name.toLowerCase(); // Obtener el nombre desde el atributo de datos
        const cardAbility = card.dataset.ability.toLowerCase(); // Obtener la habilidad desde el atributo de datos

        // Filtrar si el nombre o la habilidad contienen el texto de búsqueda
        card.style.display = cardName.includes(searchInput) || cardAbility.includes(searchInput) ? 'block' : 'none';
    });
}

// Cargar cartas de la edición inicial al iniciar
window.onload = () => {
    loadCards('zodiaco');
    
    // Configuración de la barra de búsqueda
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterCards);
};