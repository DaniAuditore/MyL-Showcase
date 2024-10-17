<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <MylCard v-for="card in cards" :key="card.ide" :card="card" :edid="edid" />
  <p>{{ card }}</p>
</template>

<script>
import MylCard from './components/MylCard.vue';

export default {
  name: 'App',
  components: {
    MylCard
  },
  data() {
    return {
      // Definimos la carta con ide 009
      cards: [
        {ide: '009' },{ide: '010'}
      ],
      edid: '125', // ID de la edición
    };
  },
}
</script>

<style>

.card-container {
  display: flex; /* Permite que las cartas se alineen en una fila */
  flex-wrap: wrap; /* Permite que las cartas se envuelvan si no hay espacio suficiente */
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
