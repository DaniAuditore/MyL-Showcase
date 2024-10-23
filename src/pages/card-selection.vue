<template>
  <nav>
    <SideBar/>
  </nav>
  <div class="card-selection">
    <!-- Encabezado con barra de búsqueda y botón de filtros -->
    <div class="header">
      <div class="back-button">
        <input type="image" @click="goBack" src="/public/images/back-icon.png" alt="Back" />
      </div>
      <input type="text" class="search-bar" placeholder="BUSQUE LA CARTA QUE DESEE OFERTAR" v-model="searchQuery" />
      <button class="filter-btn" @click="applyFilters">FILTROS</button>
    </div>

    <!-- Lista de cartas del usuario -->
    <div class="cards-list">
      <div class="card-item" v-for="card in filteredCards" :key="card.ide">
        <img :src="getCardImageUrl(card)" :alt="'Carta ' + card.ide" class="card-image" />
        <button class="offer-btn" @click="selectCard(card)">OFERTAR</button>
      </div>
    </div>
  </div>
</template>

<script scoped>
import axios from 'axios';
import SideBar from '../components/Side-bar.vue';
export default {
  data() {
    return {
      cards: [], // This will hold the cards of the user fetched from the API
      searchQuery: '',
    };
  },
  computed: {
    filteredCards() {
      return this.cards.filter(card => card.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    },
  },
  components:{
    SideBar
  },
  methods: {
    getCardImageUrl(card) {
      const baseUrl = 'https://api.myl.cl/static/cards/';
      return `${baseUrl}${card.edid}/${card.ide}.png`;
    },
    selectCard(card) {
      // Navigate to the offer creation page with the selected card details
      this.$router.push({ name: 'make-offer', params: { cardId: card.ide } });
    },
    goBack() {
      this.$router.go(-1); // Navigate back
    },
    applyFilters() {
      // Logic for filters can be implemented here
      console.log('Apply filters');
    },
    async fetchUserCards() {
      try {
        const response = await axios.get('http://localhost:3000/user-cards'); // Fetch cards of the user
        this.cards = response.data;
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    },
  },
  mounted() {
    this.fetchUserCards();
  },
};
</script>

<style scoped>
:root {
  --primary-background-color: #2c2c2e;
  --secondary-background-color: #373739;
  --primary-text-color: #A40000;
  --secondary-text-color: #CB0000;
  --primary-border-color: #E3CFCF;
  --secondary-border-color: #FFEBEB;
}

body {
  background-color: var(--primary-background-color);
  font-family: 'Arial', sans-serif;
  color: var(--secondary-border-color);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1300px;
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
}

.filter-btn {
  padding: 15px 60px;
  background-color: var(--primary-background-color);
  border: none;
  border-radius: 5px;
  color: var(--secondary-border-color);
  cursor: pointer;
}

.cards-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  width: 90%;
  max-width: 1200px;
  margin-top: 210px;
}

.card-item {
  background-color: var(--primary-background-color);
  border: 2px solid var(--secondary-text-color);
  border-radius: 10px;
  padding: 10px;
  text-align: center;
}

.card-image {
  width: 100%;
  border-radius: 5px;
}

.offer-btn {
  background-color: transparent;
  color: var(--secondary-border-color);
  border: 2px solid var(--secondary-border-color);
  padding: 10px 20px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
