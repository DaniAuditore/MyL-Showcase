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
    </header>

    <main id="results" class="card-grid"></main>

        <!-- Sidebar de Filtros -->
        <aside id="filter-sidebar">
        <div class="close-btn">&times;</div>
        <h2>Filtros</h2>

        <!-- Select para cambiar de edición -->
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

        <!-- Filtros -->
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

        <!-- Botón de Limpiar Filtros -->
        <button id="clear-filters" class="styled-button">Limpiar Filtros</button>
    </aside>

</template>

<script>

import SideBar from '../components/Side-bar.vue';

export default {
    components: {
      SideBar,
    }
}

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
    width: 70%;
}

.search-container {
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
    width: 25%;
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

</style>