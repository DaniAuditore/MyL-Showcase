<template></template>

<script>
import axios from 'axios';


const filters = axios.get('http://localhost:3000/filtersData').then(response => response.data);

// Función para filtrar cartas
function filterCards() {
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
}

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

// Función para limpiar filtros
function clearFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('filter-rarity').value = '';
    document.getElementById('filter-race').value = '';
    document.getElementById('filter-type').value = '';
    document.getElementById('filter-cost').value = '';
    document.getElementById('filter-damage').value = '';
    filterCards();
}

</script>

<style></style>