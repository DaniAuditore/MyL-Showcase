<template>
  <nav>
    <SideBar/>
  </nav>
  <div class="content">
    <header class="offer-header">
      <!-- Inputs de Precio e Intercambio -->
      <div class="input-group">
        <label for="price">PRECIO:</label>
        <input v-model="price" type="number" id="price" placeholder="Ingrese el precio en dinero" />
        <!-- Botón de Atrás -->
        <button class="back-btn" @click="goBack">Atrás</button>
      </div>
      <div class="input-group">
        <label for="requestedCard">BUSQUE CARTAS PARA OFRECER COMO INTERCAMBIO</label>
        <input v-model="requestedCard" type="text" id="requestedCard" placeholder="Ingrese el ID de la carta para intercambio" />
      </div>
      <div class="action-buttons">
        <button class="submit-btn" @click="postOffer" :disabled="!offeredCard">VENDER</button>
        <button class="filter-btn">Filtros</button>
      </div>
    </header>

    <!-- Listado de cartas simuladas para intercambio -->
    <h3>Cartas para Pedir a Cambio</h3>
    <main class="cards">
      <div class="card-item" v-for="card in tradeOptions" :key="card.ide">
        <img :src="getCardImageUrl(card)" :alt="'Carta ' + card.ide" class="card-image" />
        <button class="select-btn" @click="selectTradeCard(card)">Seleccionar</button>
      </div>
    </main>

    
  </div>
</template>

<script>
import axios from 'axios';
import { useStore } from 'vuex';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import SideBar from '../components/Side-bar.vue';

export default {
  setup() {
    const store = useStore();
    const currentUser = store.getters.currentUser;
    const offeredCard = ref(null);
    const price = ref(null);
    const requestedCard = ref(null);
    const tradeOptions = ref([]); // Opciones simuladas de intercambio

    const route = useRoute();
    const cardId = route.params.cardId;

    // Recuperar la carta ofrecida basada en el cardId
    onMounted(async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
        offeredCard.value = response.data.cards.find(card => card.ide === cardId);
      } catch (error) {
        console.error('Error al cargar la carta:', error);
      }

      // Opciones simuladas de cartas para intercambio
      tradeOptions.value = [
        { ide: "001", edid: "125" },
        { ide: "002", edid: "125" },
        { ide: "003", edid: "125" },
        { ide: "004", edid: "125" },
        { ide: "005", edid: "125" },
        { ide: "006", edid: "125" },
        { ide: "007", edid: "125" },
        { ide: "008", edid: "125" },
        { ide: "009", edid: "125" },
        { ide: "010", edid: "125" },
        { ide: "011", edid: "125" },
        { ide: "012", edid: "125" },
        { ide: "013", edid: "125" },
        { ide: "014", edid: "125" },
        { ide: "015", edid: "125" },
        { ide: "016", edid: "125" },
        { ide: "017", edid: "125" },
        { ide: "018", edid: "125" },
        { ide: "019", edid: "125" },
        { ide: "020", edid: "125" }
      ];
    });

    const getCardImageUrl = (card) => {
      const baseUrl = 'https://api.myl.cl/static/cards/';
      return `${baseUrl}${card.edid}/${card.ide}.png`;
    };

    const selectTradeCard = (card) => {
      requestedCard.value = card.ide;
    };

    const postOffer = async () => {
      const offerData = {
        offerId: `${Math.random().toString(36).substr(2, 9)}`, // ID aleatorio
        userId: currentUser.id,
        card: offeredCard.value,
        price: price.value || null,
        requestedCard: requestedCard.value || null,
        status: 'active',
        type: price.value ? 'sale' : 'trade',
      };

      try {
        await axios.post('http://localhost:3000/offers', offerData);
        this.$router.push(`/profile/${currentUser.id}`);
      } catch (error) {
        console.error('Error al publicar la oferta:', error);
      }
    };

    const goBack = () => {
      window.history.back();
    };

    return {
      offeredCard,
      price,
      requestedCard,
      tradeOptions,
      getCardImageUrl,
      selectTradeCard,
      postOffer,
      goBack,
    };
  },
  components: {
    SideBar
  }
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
  --font-style: 'Open Sans', sans-serif;
  --test-border-color: #008000;
}
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

.offer-header {
  border: 3px solid var(--primary-border-color);
  border-radius: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  max-height: 200px;
  margin-bottom: 20px;
}

.input-group {  
  width: 270px;

  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  color: var(--primary-border-color);
}

input {
  padding: 10px;
  border: 1px solid var(--secondary-border-color);
  border-radius: 5px;
  background-color: var(--secondary-background-color);
  color: white;
}

.action-buttons {
  width: 200px;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.submit-btn {
  background-color: var(--secondary-background-color);
  color: var(--secondary-border-color);
  padding: 10px;
  border: 2px solid var(--secondary-border-color);
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 10px;
  transition: 0.2s ease-in-out;
}
.submit-btn:hover{
  transform: scale(103%);
  transition: 0.2s ease-in-out;
  border-color: rgb(212, 175, 55);
  box-shadow: 0 0 20px rgb(212, 175, 55);
  color:  rgb(212, 175, 55);
}

.filter-btn {
  background-color: var(--primary-background-color);
  color: var(--primary-border-color);
  padding: 10px;
  border: 2px solid var(--primary-border-color);
  border-radius: 5px;
  cursor: pointer;
}

h3{
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-border-color);
  margin: 40px 0;
}


.cards {
  /*border: 2px solid var(--test-border-color);*/
  max-width: 1500px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 40px;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 40px;
  scrollbar-width: none;
}
.cards::-webkit-scrollbar {
    display: none;
}

.card-item {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: visible;
}

.card-image {
  width: 100%;
  max-width: 150px;
  border-radius: 10px;
}

.select-btn {
  margin-top: 10px;
  padding: 5px 15px;
  background-color: transparent;
  color: var(--primary-border-color);
  border: 2px solid var(--primary-border-color);
  border-radius: 5px;
  transition: 0.2s ease-in-out;
  cursor: pointer;
}
.submit-btn :hover{
  transform: scale(103%);
  transition: 0.2s ease-in-out;
  color: var(--secondary-text-color);
  border-color: var(--primary-text-color);
}

.back-btn {
  background-color: transparent;
  color: var(--secondary-border-color);
  border: 2px solid var(--secondary-border-color);
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: 0,2s ease-in-out;
}

.back-btn:hover {
  transition: 0,2s ease-in-out;
  border-color: var(--primary-text-color);
  color: var(--primary-text-color);
}
</style>
