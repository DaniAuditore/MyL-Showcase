<template>
    <MylCard v-for="card in cards" :key="card.ide" :card="card" :edid="edid" />
    <p>{{ card }}</p>
</template>

<script setup>
import MylCard from './MylCard.vue';

const cards = [
  {ide: '009' },{ide: '010'} //Arreglo de cartas
];
const edid = '125'; // ID de la edición
</script>

<style scoped>
.card-container {
  display: flex; /* Permite que las cartas se alineen en una fila */
  flex-wrap: wrap; /* Permite que las cartas se envuelvan si no hay espacio suficiente */
}
</style>
