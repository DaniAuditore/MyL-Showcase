<template>
  <div class="card" @click="$emit('open-details', offer)">
    <img :src="imageUrl" alt="Card image" />
    <h3>{{ cardName }}</h3>
    <p v-if="offer.price">Valor: {{ offer.price }} Coins</p>
    <p v-else>Intercambio por carta: {{ requestedCardName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    offer: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl() {
      const baseUrl = 'https://api.myl.cl/static/cards/';
      return `${baseUrl}${this.offer.card.edid}/${this.offer.card.ide}.png`;
    },
    cardName() {
        return `Orochimaru`; 
    },
    requestedCardName() {
      return this.offer.requestedCard ? `Card ${this.offer.requestedCard.ide}` : 'N/A';
    }
  }
};
</script>

<style scoped>
.card {
  text-decoration: none;
  background-color: #373739;
  border-radius: 10px;
  max-height: 450px;
  padding: 20px;
  margin-top: 40px;
  text-align: center;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 15px;
}

.card h3 {
  font-size: 20px;
  color: var(--secondary-border-color);
  margin-bottom: 10px;
}

.card p {
  font-size: 16px;
  color: #ffcc00;
}

</style>
