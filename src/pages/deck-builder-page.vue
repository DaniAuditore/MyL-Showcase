<template>
  <nav>
  <side-bar></side-bar>
</nav>

<header class="search-container">
      <div class="search-bar">
          <input type="text" id="search-input" placeholder="BUSCAR CARTAS" aria-label="Buscar cartas">
          <span class="small_icon">
              <img src="assets/search-svgrepo-com.svg" alt="Icono de búsqueda">
          </span>
      </div>
      <button id="filter-button" class="styled-button">FILTROS</button>
      <div class="name-deck-bar">
          <input type="text" id="nombre-baraja" placeholder="NOMBRE DE LA BARAJA" aria-label="Ingrese el nombre de su baraja">
      </div>
  </header>

  <main id="results" class="card-grid"></main>
  <div id="static-box">
      <p>Tus cartas se añadiran aquí</p>
      <div id="static-box">
          <p>Tus cartas se añadirán aquí</p>
          <button id="save-deck" class="fixed-button">Guardar Baraja</button>
      </div>
      
  </div>

  <!-- Sidebar de Filtros -->
  <aside id="filter-sidebar">
      <div class="close-btn">&times;</div>
      <h2>Filtros</h2>
      <div class="filter-section">
          <label for="change-edition">Edición:</label>
          <select id="change-edition" aria-label="Selecciona una edición" class="styled-button">
              <option value="" disabled selected>Selecciona una edición</option>
              <option value="chile_oscuro">Chile Oscuro</option>
              <option value="espiritu_samurai">Espíritu Samurai</option>
              <option value="extension_valhalla">Extensión Valhalla</option>
              <option value="giger">Giger</option>
              <option value="la_venganza_de_horus">La Venganza de Horus</option>
              <option value="napoleon">Napoleón</option>
              <option value="neo_midgard">Neo Midgard</option>
              <option value="raciales_imp_2024">Raciales IMP 2024</option>
              <option value="relatos_del_despertar_gotico">Relatos del Despertar Gótico</option>
              <option value="valhalla">Valhalla</option>
              <option value="visiones_de_kemet">Visiones de Kemet</option>
              <option value="zodiaco">Zodiaco</option>
          </select>
      </div>
      <div class="filter-section">
          <label for="filter-rarity">Rareza:</label>
          <select id="filter-rarity" class="styled-button">
              <option value="">--Seleccionar--</option>
          </select>
      </div>
      <div class="filter-section">
          <label for="filter-type">Tipo:</label>
          <select id="filter-type" class="styled-button">
              <option value="">--Seleccionar--</option>
          </select>
      </div>
      <div class="filter-section">
          <label for="filter-race">Raza:</label>
          <select id="filter-race" class="styled-button">
              <option value="">--Seleccionar--</option>
          </select>
      </div>
      <div class="filter-section">
          <label for="filter-cost">Coste:</label>
          <input type="text" id="filter-cost" placeholder="Coste" class="styled-button">
      </div>
      <div class="filter-section">
          <label for="filter-damage">Daño:</label>
          <input type="text" id="filter-damage" placeholder="Daño" class="styled-button">
      </div>
      <button id="clear-filters" class="styled-button">Limpiar Filtros</button>
  </aside>

</template>

<script>

import SideBar from '../components/Side-bar.vue';

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      filtersData : {
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
}
    };
  },
  methods: {
    initializeEvents() {
      this.populateFilterOptions();
      this.loadCards('zodiaco'); // Carga las cartas de la edición por defecto

      document.getElementById('search-input').addEventListener('input', this.filterCards);
      document.querySelectorAll('#filter-sidebar select, #filter-sidebar input').forEach(input => {
        input.addEventListener('input', this.filterCards);
      });

      document.getElementById('change-edition').addEventListener('change', (event) => {
        const selectedEdition = event.target.value;
        if (selectedEdition) this.loadCards(selectedEdition);
      });

      document.getElementById('filter-button').addEventListener('click', () => {
        document.getElementById('filter-sidebar').classList.toggle('show');
      });

      document.querySelector('#filter-sidebar .close-btn').addEventListener('click', () => {
        document.getElementById('filter-sidebar').classList.remove('show');
      });

      document.getElementById('clear-filters').addEventListener('click', this.clearFilters);
    },
    async loadCards(edition) {
      document.getElementById('results').innerHTML = '<p>Cargando cartas...</p>';
      const data = await this.fetchEditionCards(edition);
      if (data) this.displayCards(data.cards, data.edition.id);
    },
    async fetchEditionCards(edition) {
      const apiBaseUrl = 'https://api.myl.cl/cards/edition/';
      try {
        const response = await fetch(`${apiBaseUrl}${edition}`);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        return await response.json();
      } catch (error) {
        console.error(error);
        document.getElementById('results').innerHTML = `<p>Error al cargar cartas: ${error.message}</p>`;
      }
    },
    displayCards(cards, editionId) {
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = cards.length === 0 
        ? '<p>No se encontraron cartas.</p>' 
        : cards.map(card => {
          const imageUrl = `https://api.myl.cl/static/cards/${editionId}/${card.edid}.png`;
          return `
            <div class="card" data-name="${card.name}" data-ability="${card.ability}" data-rarity="${card.rarity}" data-race="${card.race}" data-type="${card.type}" data-cost="${card.cost}" data-damage="${card.damage}">
              <img src="${imageUrl}" alt="${card.name}" onerror="this.onerror=null; this.src='https://via.placeholder.com/150';">
            </div>
          `;
        }).join('');
    },
    filterCards() {
      const searchInput = document.getElementById('search-input').value.toLowerCase();
      const rarityFilter = document.getElementById('filter-rarity').value;
      const raceFilter = document.getElementById('filter-race').value;
      const typeFilter = document.getElementById('filter-type').value;
      const costFilter = document.getElementById('filter-cost').value;
      const damageFilter = document.getElementById('filter-damage').value;

      const cards = document.querySelectorAll('#results .card');
      cards.forEach(card => {
        const isNameMatch = card.dataset.name.toLowerCase().includes(searchInput) || card.dataset.ability.toLowerCase().includes(searchInput);
        const isRarityMatch = !rarityFilter || rarityFilter === card.dataset.rarity;
        const isRaceMatch = !raceFilter || raceFilter === card.dataset.race;
        const isTypeMatch = !typeFilter || typeFilter === card.dataset.type;
        const isCostMatch = !costFilter || costFilter === card.dataset.cost;
        const isDamageMatch = !damageFilter || damageFilter === card.dataset.damage;
        
        card.style.display = isNameMatch && isRarityMatch && isRaceMatch && isTypeMatch && isCostMatch && isDamageMatch ? 'block' : 'none';
      });
    },
    clearFilters() {
      document.getElementById('search-input').value = '';
      document.getElementById('filter-rarity').value = '';
      document.getElementById('filter-race').value = '';
      document.getElementById('filter-type').value = '';
      document.getElementById('filter-cost').value = '';
      document.getElementById('filter-damage').value = '';
      this.filterCards();
    },
    populateFilterOptions() {
      const raritySelect = document.getElementById('filter-rarity');
      this.filtersData.rarities.forEach(({ id, name }) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        raritySelect.appendChild(option);
      });

      const raceSelect = document.getElementById('filter-race');
      this.filtersData.races.forEach(({ id, name }) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        raceSelect.appendChild(option);
      });

      const typeSelect = document.getElementById('filter-type');
      this.filtersData.types.forEach(({ id, name }) => {
        const option = document.createElement('option');
        option.value = id;
        option.textContent = name;
        typeSelect.appendChild(option);
      });
    }
  },
  mounted() {
    this.initializeEvents();
  }
};


const apiBaseUrl = 'https://api.myl.cl/cards/edition/';

// Función para llenar las opciones de los filtros
function populateFilterOptions() {
  const raritySelect = document.getElementById('filter-rarity');
  filtersData.rarities.forEach(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      raritySelect.appendChild(option);
  });

  const raceSelect = document.getElementById('filter-race');
  filtersData.races.forEach(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      raceSelect.appendChild(option);
  });

  const typeSelect = document.getElementById('filter-type');
  filtersData.types.forEach(({ id, name }) => {
      const option = document.createElement('option');
      option.value = id;
      option.textContent = name;
      typeSelect.appendChild(option);
  });
}

// Asegúrate de que el script se ejecute después de que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  const resultsContainer = document.getElementById('results');

  // Función para redirigir a los detalles de la carta
  function goToCardDetails(cardId, editionId) {
      window.location.href = `card-details.html?id=${cardId}&edition=${editionId}`;
  }

  // Función que renderiza las cartas
  function renderCards(cards, editionId) {
      resultsContainer.innerHTML = '';

      cards.forEach(card => {
          const cardElement = document.createElement('div');
          cardElement.classList.add('card');

          // Agregamos un evento al hacer clic en la carta
          cardElement.addEventListener('click', () => {
              goToCardDetails(card.id, editionId);
          });

          cardElement.innerHTML = `
              <img src="https://api.myl.cl/static/cards/${editionId}/${card.edid}.png" alt="${card.name}">
              <h2>${card.name}</h2>
          `;

          resultsContainer.appendChild(cardElement);
      });
  }

  // Aquí deberías tener el código para obtener las cartas y luego llamas a renderCards
  // por ejemplo, después de obtener la lista de cartas desde tu API
  fetch(`${apiBaseUrl}${selectedEdition}`)
      .then(response => response.json())
      .then(data => {
          const cards = data.cards; // Suponiendo que el JSON tiene una propiedad 'cards'
          renderCards(cards, selectedEdition);
      })
      .catch(error => console.error('Error al cargar las cartas:', error));
});


</script>


<style>

:root {
  --primary-color: #A40000;
  --secondary-color: #2C2C2E;
  --tertiary-color: #E3CFCF;
  --quaternary-color: #B0B0B0;
  --quinary-color: #D6D6D6;
}

::-webkit-scrollbar {
  display: none;
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  margin: 0;
  padding: 0;
}

header {
  margin: 2% 15%;
  display: flex;
  align-items: center;
  width: 35%;
}

.search-container {
  margin-left: 15%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
}

.search-bar {
  display: flex;
  align-items: center;
  border-radius: 15px;
  border: 2px solid var(--tertiary-color);
  flex-grow: 1;
  margin-right: 10px;
}

#search-input {
  border: none;
  background: transparent;
  color: var(--tertiary-color);
  font-size: 16px;
  outline: none;
  flex: 1;
  padding: 18px; /* Ajusta el padding para coincidir con el alto deseado */
  border-radius: 15px;
}

.small_icon {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.small_icon img {
  width: 20px;
  height: 20px;
  cursor: pointer;
  filter: brightness(0) saturate(100%) invert(63%) sepia(10%) saturate(100%) hue-rotate(0deg) brightness(93%) contrast(85%);
}

#filter-button {
  font-size: 16px;
  padding: 10px;
  border-radius: 15px;
  border: 2px solid var(--tertiary-color);
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  height: 56px; /* Ajusta este valor para que coincida con el alto de la barra de búsqueda */
  display: flex;
  align-items: center;
  justify-content: center;
}

#filter-button:hover {
  background-color: var(--tertiary-color);
  color: var(--secondary-color);
  border-color: var(--quaternary-color);
}

.card-grid {
  margin: 20px 15%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 20px;
}

.card {
  background-color: #3a3a3a;
  border-radius: 15px; /* Ajustado a 15px para mantener la estética */
  overflow: hidden;
  position: relative;
  transition: transform 0.2s;
}

.card img {
  width: 100%;
  height: auto;
}

.card:hover {
  transform: scale(1.05);
}

#filter-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 45%;
  height: 100%;
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border-radius: 15px; /* Redondea las esquinas del sidebar */
}

#filter-sidebar.show {
  transform: translateX(0);
}

#filter-sidebar .close-btn {
  font-size: 24px;
  cursor: pointer;
  color: var(--tertiary-color);
  margin: 10px;
  text-align: right;
}

#filter-sidebar h2 {
  padding: 20px;
  margin: 0;
  border-bottom: 2px solid var(--tertiary-color);
  border-radius: 15px; /* Redondea las esquinas del título del sidebar */
}

#filter-sidebar .filter-section {
  padding: 20px;
  margin: 0;
  display: flex;
  flex-direction: column;
}

#filter-sidebar .filter-section label {
  margin-bottom: 5px;
}

#filter-sidebar .filter-section select,
#filter-sidebar .filter-section input {
  margin-bottom: 10px;
  font-size: 16px;
  padding: 10px;
  border-radius: 15px; /* Redondea las esquinas de los inputs y selects */
  border: 2px solid var(--tertiary-color);
  background-color: var(--secondary-color);
  color: var(--tertiary-color);
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

#filter-sidebar .filter-section select:focus,
#filter-sidebar .filter-section input:focus {
  background-color: var(--tertiary-color);
  border-color: var(--quaternary-color);
  color: var(--secondary-color);
  outline: none;
}

.styled-button {
  background-color: var(--tertiary-color);
  color: var(--secondary-color);
  border: 2px solid var(--quaternary-color);
  border-radius: 15px; /* Redondea las esquinas de los botones */
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
}

.styled-button:hover {
  background-color: var(--quaternary-color);
  color: var(--secondary-color);
}

#filter-sidebar .filter-section button {
  background-color: var(--tertiary-color);
  color: var(--secondary-color);
  border: 2px solid var(--quaternary-color);
  width: 100%; /* Asegura que el botón ocupe todo el ancho disponible */
  height: 56px; /* Ajusta este valor para que coincida con el alto de la barra de búsqueda */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px; /* Redondea las esquinas de los botones en el sidebar */
}

#filter-sidebar .filter-section button:hover {
  background-color: var(--quaternary-color);
  color: var(--secondary-color);
}

/* Estilos generales */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Contenedor principal */
.container {
  display: flex;
  height: 100vh;
}

/* Sección de cartas */
.cards-section {
  width: 60%;
  padding: 10px;
  overflow-y: auto;
  background-color: #f4f4f4;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

/* Sección de la baraja */
.deck-section {
  margin-left: 60%;
  width: 40%;
  padding: 20px;
  background-color: #fff;
}

/* Estilo de las cartas */
#results {
  margin-right: 50%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

/* Estilo de las cartas individuales */
.card {
  width: calc(50% - 10px);
  box-sizing: border-box;
}

/* Asegúrate de que la imagen de las cartas tenga un tamaño adecuado */
.card img {
  width: 100%;
  height: auto;
}

#static-box {
  position: fixed;
  top: 140px; /* Ajusta según el espacio deseado desde la parte superior */
  right: 90px; /* Ajusta según el espacio deseado desde el borde derecho */
  width: 500px;
  height: 450px;
  padding: 20px; /* Ajusta el padding según sea necesario */
  background-color: var(--tertiary-color);
  color: var(--secondary-color);
  border-radius: 15px; /* Mantén la coherencia con el estilo general */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Añade sombra si lo deseas */
  z-index: 1000; /* Asegúrate de que esté por encima de otros elementos */
}

.fixed-button {
  position: absolute;
  bottom: 10px;  /* Cambiamos 'top' a 'bottom' para colocarlo abajo */
  right: 10px;   /* Mantén el botón a la derecha */
  padding: 10px 20px;
  background-color: var(--secondary-color); /* Color del botón */
  color: white;
  border: none;
  border-radius: 15px; /* Consistente con tu diseño */
  cursor: pointer;
}

.fixed-button:hover {
  background-color: var(--primary-color); /* Cambia el color al pasar el mouse */
}

#static-box p {
  margin: 10%; /* Elimina márgenes para el texto */
}

/* Estilo de la barra de nombre de la baraja */
.name-deck-bar {
  margin-top: 0.75%;
  margin-right: 12%;
  position: fixed; /* Fija la barra en la parte superior de la ventana */
  top: 20px; /* Ajusta la distancia desde el borde superior */
  right: 20px; /* Ajusta la distancia desde el borde derecho */
  display: flex;
  align-items: center;
  border-radius: 15px;
  border: 2px solid var(--tertiary-color);
  background-color: var(--secondary-color);
  padding: 0 10px; /* Añade padding para el espaciado interno */
  width: 300px; /* Ajusta el ancho según sea necesario */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Añade sombra si lo deseas */
  z-index: 1000; /* Asegura que esté por encima de otros elementos */
}

#nombre-baraja {
  border: none;
  background: transparent;
  color: var(--tertiary-color);
  font-size: 16px;
  outline: none;
  flex: 1; /* Hace que el input ocupe el espacio disponible */
  padding: 18px;
  border-radius: 15px;
}



</style>