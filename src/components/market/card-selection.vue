<template>
    <div class="content">
      <h2>Select a Card to Offer</h2>
      <div class="cards">
        <div v-for="card in userCards" :key="card.id" class="card" @click="selectCard(card)">
          <img :src="card.image" alt="Card image">
          <h3>{{ card.title }}</h3>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        userCards: []  // Fetched from user collection
      };
    },
    methods: {
      selectCard(card) {
        this.$emit('card-selected', card);
      }
    },
    mounted() {
      // Fetch user's cards from an API or dataSource.json
      this.userCards = [ /* Sample user cards */ ];
    }
  };
  </script>
  
  <style scoped>
  </style>
  