<template>
  <nav>
      <SideBar/>
  </nav>
  <div class="content">
      <header>
          <button class="back-btn" @click="goBack">Atrás</button>
          <!-- Este input es solo visual -->
          <input type="text" class="search-bar" placeholder="BUSQUE LA CARTA QUE DESEE OFERTAR" disabled/>
      </header>
      <main class="cards">
          <selection-card v-for="card in userCards" :key="card.ide"
              :card="card"
              :edid="card.edid" 
          />
      </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import SideBar from '@/components/Side-bar.vue';
import selectionCard from '@/components/market/selection-card.vue';

const store = useStore();
const currentUser = store.getters.currentUser;
const userCards = ref([]); // Almacena las cartas del usuario actual

// Obtener las cartas del usuario actual al montar el componente
onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
        userCards.value = response.data.cards;
        console.log(userCards.value)
    } catch (error) {
        console.error('Error al cargar las cartas del usuario:', error);
    }
});

// Función para regresar a la página anterior
const goBack = () => {
    window.history.back();
};
</script>

<style scoped>

  .content {
    overflow: hidden;
    height: 100%;
    width: calc(100% - 130px);
    left: 130px;
    position: fixed;
    top: 0px;
    flex-grow: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--primary-background-color);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1500px;
    padding: 40px;
    margin-top: 0;
    background-color: var(--secondary-background-color);
    border-radius: 10px;
  }
  .search-bar {
    width: 70%;
    padding: 30px;
    border: none;
    border-radius: 5px;
    background-color: var(--primary-background-color);
    color: var(--secondary-border-color);
    cursor: not-allowed;
  }

  .cards {
      /*border: 2px solid var(--test-border-color);*/
        max-width: 1500px;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 40px;
        flex-grow: 1;
        overflow-y: auto;
        margin: 40px 0;
        scrollbar-width: none;
  }

  .back-btn {
      background-color: transparent;
      color: var(--secondary-border-color);
      border: 2px solid var(--secondary-border-color);
      padding: 10px;
      cursor: pointer;
      border-radius: 5px;
  }

  .back-btn:hover {
      border-color: var(--primary-text-color);
      color: var(--primary-text-color);
  }
</style>
