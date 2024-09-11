const apiBaseUrl = 'https://api.myl.cl/cards/edition/';

// Datos de ejemplo (deberías reemplazarlos con una llamada API real si los datos provienen de un servidor)
const filtersData = {
    races: [
        { id: "0", slug: "noraza", name: "Sin Raza" },
        { id: "1", slug: "caballero", name: "Caballero" },
        { id: "2", slug: "bestia", name: "Bestia" },
        { id: "3", slug: "eterno", name: "Eterno" },
        { id: "4", slug: "guerrero", name: "Guerrero" },
        { id: "5", slug: "barbaro", name: "Bárbaro" },
        { id: "6", slug: "faerie", name: "Faerie" },
        { id: "7", slug: "samurai", name: "Samurái" },
        { id: "8", slug: "sombra", name: "Sombra" },
        { id: "9", slug: "ancestral", name: "Ancestral" },
        { id: "10", slug: "sacerdote", name: "Sacerdote" },
        { id: "11", slug: "dragon", name: "Dragón" },
        { id: "12", slug: "heroe", name: "Héroe" },
        { id: "13", slug: "oni", name: "Oni" },
        { id: "14", slug: "olimpico", name: "Olímpico" },
        { id: "15", slug: "titan", name: "Titán" },
        { id: "16", slug: "faraon", name: "Faraón" },
        { id: "17", slug: "desafiante", name: "Desafiante" },
        { id: "18", slug: "defensor", name: "Defensor" },
        { id: "19", slug: "licantropo", name: "Licántropo" },
        { id: "20", slug: "vampiro", name: "Vampiro" },
        { id: "21", slug: "cazador", name: "Cazador" },
        { id: "22", slug: "chaman", name: "Chamán" },
        { id: "23", slug: "dios", name: "Dios" },
        { id: "24", slug: "abominacion", name: "Abominación" },
        { id: "25", slug: "kami", name: "Kami" },
        { id: "26", slug: "xian", name: "Xian" },
        { id: "27", slug: "criaturas", name: "Criaturas" },
        { id: "28", slug: "campeon/shaolin", name: "Campeón / Shaolín" },
        { id: "29", slug: "campeon/ninja", name: "Campeón / Ninja" },
        { id: "30", slug: "campeon/samurai", name: "Campeón / Samurái" },
        { id: "31", slug: "campeon", name: "Campeón" },
        { id: "32", slug: "heroe/sacerdote", name: "Héroe/Sacerdote" },
        { id: "33", slug: "eterno/sombra", name: "Eterno/Sombra" },
        { id: "34", slug: "caballero/guerrero", name: "Caballero/Guerrero" },
        { id: "35", slug: "bestia/guerrero", name: "Bestia/Guerrero" },
        { id: "36", slug: "caballero/heroe", name: "Caballero/Héroe" },
        { id: "37", slug: "dragon/eterno", name: "Dragón/Eterno" },
        { id: "38", slug: "eterno/faerie", name: "Eterno/Faerie" },
        { id: "39", slug: "paladin", name: "Paladín" },
        { id: "40", slug: "asesino", name: "Asesino" },
        { id: "41", slug: "tenebris", name: "Tenebris" },
        { id: "42", slug: "eterno/sacerdote", name: "Eterno/Sacerdote" },
        { id: "43", slug: "caballero/guerrero/hero", name: "Caballero/Guerrero/Héroe" },
        { id: "44", slug: "bestia/dragon/sombra", name: "Bestia/Dragón/Sombra" },
        { id: "45", slug: "eterno/faerie/sacerdote", name: "Eterno/Faerie/Sacerdote" },
        { id: "46", slug: "bestia/faerie", name: "Bestia/Faerie" }
    ],
    rarities: [
        { id: "0", slug: "promo", name: "Promocional" },
        { id: "1", slug: "legendaria", name: "Legendaria" },
        { id: "2", slug: "ultra-real", name: "Ultra Real" },
        { id: "3", slug: "mega-real", name: "Mega Real" },
        { id: "4", slug: "real", name: "Real" },
        { id: "5", slug: "cortesano", name: "Cortesano" },
        { id: "6", slug: "vasallo", name: "Vasallo" },
        { id: "7", slug: "oro", name: "Oro" },
        { id: "8", slug: "milenaria", name: "Milenaria" },
        { id: "9", slug: "secreta", name: "Secreta" },
        { id: "10", slug: "ficha", name: "Ficha" },
        { id: "11", slug: "set_paralelo", name: "Set Paralelo" }
    ],
    types: [
        { id: "1", slug: "aliado", name: "Aliado" },
        { id: "2", slug: "talisman", name: "Talismán" },
        { id: "3", slug: "arma", name: "Arma" },
        { id: "4", slug: "totem", name: "Tótem" },
        { id: "5", slug: "oro", name: "Oro" },
        { id: "6", slug: "monumento", name: "Monumento" }
    ]
};

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

            // Almacenar atributos en los atributos de datos
            cardDiv.dataset.name = card.name; // Guardar el nombre
            cardDiv.dataset.ability = card.ability; // Guardar la habilidad
            cardDiv.dataset.rarity = card.rarity; // Guardar la rareza (debe ser el ID)
            cardDiv.dataset.race = card.race; // Guardar la raza (debe ser el ID)
            cardDiv.dataset.type = card.type; // Guardar el tipo (debe ser el ID)
            cardDiv.dataset.cost = card.cost; // Guardar el coste
            cardDiv.dataset.damage = card.damage; // Guardar el daño

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

// Filtrado de cartas
function filterCards() {
    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const rarityFilter = document.getElementById('filter-rarity').value;
    const raceFilter = document.getElementById('filter-race').value;
    const typeFilter = document.getElementById('filter-type').value;
    const costFilter = document.getElementById('filter-cost').value;
    const damageFilter = document.getElementById('filter-damage').value;

    const resultsDiv = document.getElementById('results');
    const cards = resultsDiv.getElementsByClassName('card');

    Array.from(cards).forEach(card => {
        const cardName = card.dataset.name.toLowerCase();
        const cardAbility = card.dataset.ability.toLowerCase();
        const cardRarity = card.dataset.rarity;
        const cardRace = card.dataset.race;
        const cardType = card.dataset.type;
        const cardCost = card.dataset.cost;
        const cardDamage = card.dataset.damage;

        const isNameMatch = cardName.includes(searchInput) || cardAbility.includes(searchInput);
        const isRarityMatch = rarityFilter === '' || rarityFilter === cardRarity;
        const isRaceMatch = raceFilter === '' || raceFilter === cardRace;
        const isTypeMatch = typeFilter === '' || typeFilter === cardType;
        const isCostMatch = costFilter === '' || cardCost === costFilter;
        const isDamageMatch = damageFilter === '' || cardDamage === damageFilter;

        card.style.display = (isNameMatch && isRarityMatch && isRaceMatch && isTypeMatch && isCostMatch && isDamageMatch) ? 'block' : 'none';
    });
}


// Configuración inicial y eventos
window.onload = () => {
    populateFilterOptions(); // Cargar las opciones de los filtros
    loadCards('valhalla');
    
    // Configuración de la barra de búsqueda
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', filterCards);

    // Configuración de los filtros
    const filterInputs = document.querySelectorAll('#filter-sidebar select, #filter-sidebar input');
    filterInputs.forEach(input => {
        input.addEventListener('input', filterCards);
    });
};


// Llenar las opciones de filtro
function populateFilterOptions() {
    // Cargar opciones de rareza
    const raritySelect = document.getElementById('filter-rarity');
    filtersData.rarities.forEach(rarity => {
        const option = document.createElement('option');
        option.value = rarity.id; // Usa el ID en lugar del slug
        option.textContent = rarity.name;
        raritySelect.appendChild(option);
    });

    // Cargar opciones de raza
    const raceSelect = document.getElementById('filter-race');
    filtersData.races.forEach(race => {
        const option = document.createElement('option');
        option.value = race.id; // Usa el ID en lugar del slug
        option.textContent = race.name;
        raceSelect.appendChild(option);
    });

    // Cargar opciones de tipo
    const typeSelect = document.getElementById('filter-type');
    filtersData.types.forEach(type => {
        const option = document.createElement('option');
        option.value = type.id; // Usa el ID en lugar del slug
        option.textContent = type.name;
        typeSelect.appendChild(option);
    });
}


document.getElementById('filter-button').addEventListener('click', () => {
    document.getElementById('filter-sidebar').classList.toggle('show');
});

document.querySelector('#filter-sidebar .close-btn').addEventListener('click', () => {
    document.getElementById('filter-sidebar').classList.remove('show');
});
