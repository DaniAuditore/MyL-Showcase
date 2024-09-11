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
                <img src="${imageUrl}" alt="Carta" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
                <h3>${card.name}</h3>
                <p>Raridad: ${getRarityName(card.rarity)}</p>
                <p>Tipo: ${getCardTypeName(card.type)}</p>
                <p>Raza: ${getRaceName(card.race)}</p>
                <p>Costo: ${card.cost}</p>
                <p>Daño: ${card.damage}</p>
            `;

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

function getRarityName(rarityId) {
    const rarities = [
        { id: "0", name: "Promocional" },
        { id: "1", name: "Legendaria" },
        { id: "2", name: "Ultra Real" },
        { id: "3", name: "Mega Real" },
        { id: "4", name: "Real" },
        { id: "5", name: "Cortesano" },
        { id: "6", name: "Vasallo" },
        { id: "7", name: "Oro" },
        { id: "8", name: "Milenaria" },
        { id: "9", name: "Secreta" },
        { id: "10", name: "Ficha" },
        { id: "11", name: "Set Paralelo" }
    ];
    const rarity = rarities.find(r => r.id === rarityId);
    return rarity ? rarity.name : 'Desconocida';
}

function getCardTypeName(typeId) {
    const types = [
        { id: "1", name: "Aliado" },
        { id: "2", name: "Talismán" },
        { id: "3", name: "Arma" },
        { id: "4", name: "Tótem" },
        { id: "5", name: "Oro" },
        { id: "6", name: "Monumento" }
    ];
    const type = types.find(t => t.id === typeId);
    return type ? type.name : 'Desconocido';
}

function getRaceName(raceId) {
    const races = [
        { id: "0", name: "Sin Raza" },
        { id: "1", name: "Caballero" },
        { id: "2", name: "Bestia" },
        { id: "3", name: "Eterno" },
        { id: "4", name: "Guerrero" },
        { id: "5", name: "Bárbaro" },
        { id: "6", name: "Faerie" },
        { id: "7", name: "Samurái" },
        { id: "8", name: "Sombra" },
        { id: "9", name: "Ancestral" },
        { id: "10", name: "Sacerdote" },
        { id: "11", name: "Dragón" },
        { id: "12", name: "Héroe" },
        { id: "13", name: "Oni" },
        { id: "14", name: "Olímpico" },
        { id: "15", name: "Titán" },
        { id: "16", name: "Faraón" },
        { id: "17", name: "Desafiante" },
        { id: "18", name: "Defensor" },
        { id: "19", name: "Licántropo" },
        { id: "20", name: "Vampiro" },
        { id: "21", name: "Cazador" },
        { id: "22", name: "Chamán" },
        { id: "23", name: "Dios" },
        { id: "24", name: "Abominación" },
        { id: "25", name: "Kami" },
        { id: "26", name: "Xian" },
        { id: "27", name: "Criaturas" },
        { id: "28", name: "Campeón / Shaolín" },
        { id: "29", name: "Campeón / Ninja" },
        { id: "30", name: "Campeón / Samurái" },
        { id: "31", name: "Campeón" },
        { id: "32", name: "Héroe / Sacerdote" },
        { id: "33", name: "Eterno / Sombra" },
        { id: "34", name: "Caballero / Guerrero" },
        { id: "35", name: "Bestia / Guerrero" },
        { id: "36", name: "Caballero / Héroe" },
        { id: "37", name: "Dragón / Eterno" },
        { id: "38", name: "Eterno / Faerie" },
        { id: "39", name: "Paladín" },
        { id: "40", name: "Asesino" },
        { id: "41", name: "Tenebris" },
        { id: "42", name: "Eterno / Sacerdote" },
        { id: "43", name: "Caballero / Guerrero / Héroe" },
        { id: "44", name: "Bestia / Dragón / Sombra" },
        { id: "45", name: "Eterno / Faerie / Sacerdote" },
        { id: "46", name: "Bestia / Faerie" }
    ];
    const race = races.find(r => r.id === raceId);
    return race ? race.name : 'Desconocida';
}

// Cargar cartas de la edición inicial al iniciar
window.onload = () => loadCards('zodiaco');