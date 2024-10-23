<template>
    <aside id="filter-sidebar">
        <div class="close-btn" @click="$emit('close')">&times;</div>
        <h2>Filtros</h2>

        <div class="filter-section">
            <label for="change-edition">Edición:</label>
            <select id="change-edition" aria-label="Selecciona una edición" class="styled-button" @change="onEditionChange">
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
            <select id="filter-rarity" class="styled-button" @input="filterCards">
                <option value="">--Seleccionar--</option>
            </select>
        </div>
        <div class="filter-section">
            <label for="filter-type">Tipo:</label>
            <select id="filter-type" class="styled-button" @input="filterCards">
                <option value="">--Seleccionar--</option>
            </select>
        </div>
        <div class="filter-section">
            <label for="filter-race">Raza:</label>
            <select id="filter-race" class="styled-button" @input="filterCards">
                <option value="">--Seleccionar--</option>
            </select>
        </div>
        <div class="filter-section">
            <label for="filter-cost">Coste:</label>
            <input type="text" id="filter-cost" placeholder="Coste" class="styled-button" @input="filterCards">
        </div>
        <div class="filter-section">
            <label for="filter-damage">Daño:</label>
            <input type="text" id="filter-damage" placeholder="Daño" class="styled-button" @input="filterCards">
        </div>

        <button id="clear-filters" class="styled-button" @click="clearFilters">Limpiar Filtros</button>
    </aside>
</template>

<script>
export default {
    props: ['filtersData'],
    methods: {
        onEditionChange(event) {
            this.$emit('edition-change', event.target.value);
        },
        filterCards() {
            this.$emit('filter-cards');
        },
        clearFilters() {
            this.$emit('clear-filters');
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
        this.populateFilterOptions();
    }
}
</script>

<style>
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
    border-radius: 15px;
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
    border-radius: 15px;
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
    border-radius: 15px;
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
    border-radius: 15px;
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
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
}

#filter-sidebar .filter-section button:hover {
    background-color: var(--quaternary-color);
    color: var(--secondary-color);
}
</style>