<template>
    <section class="card-section">
      <h2>{{ title }}</h2>
      <div class="horizontal-images">
        <myl-card v-for="card in cards" :key="card.ide" :card="card" :edid="card.edid" />
      </div>
    </section>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      cards: {
        type: Array,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .card-section {
    margin-bottom: 5%;
  }
  
  .horizontal-images {
    display: flex;
    gap: 1rem;
    overflow-x: scroll;
  }
  </style>
  