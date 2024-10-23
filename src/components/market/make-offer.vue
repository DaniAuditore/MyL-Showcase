<template>
    <div class="content">
      <h2>Create Offer</h2>
      <div class="form-group">
        <label for="price">Price:</label>
        <input type="number" v-model="price" />
      </div>
      <div class="form-group">
        <label for="requestedCard">Request a Specific Card:</label>
        <input type="text" v-model="requestedCard" placeholder="Optional" />
      </div>
      <button @click="submitOffer">Submit Offer</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      selectedCard: Object  
    },
    data() {
      return {
        price: 0,
        requestedCard: ''
      };
    },
    methods: {
      submitOffer() {
        // Submit the new offer to the API
        console.log(this.selectedCard, this.price, this.requestedCard);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  