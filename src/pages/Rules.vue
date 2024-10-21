<template>

  <h1>Reglas Formato Imperio</h1>

<main>

  <h2>Cartas Prohibidas</h2>

  <section class="horizontal-images">
    <myl-card class="card"
          v-for="card in banned" 
          :key="card.ide" 
          :card="card" 
          :edid="card.edid" 
        />
  </section>

  <h2>Cartas Limitadas</h2>

<section class="horizontal-images">
    <myl-card class="card"
          v-for="card in limited" 
          :key="card.ide" 
          :card="card" 
          :edid="card.edid" 
        />
  </section>

  <h2>Cartas con Errata</h2>

  <section class="vertical-images">
    <myl-card class="card"
          v-for="card in erratum" 
          :key="card.ide" 
          :card="card" 
          :edid="card.edid" 
        />
  </section>

</main>

</template>

<script>
import MylCard from './components/myl-card.vue';

export default {
  components: {
    MylCard,
  },
  data() {
    return {
      banned: [
        { ide: '045', edid: '85' },
        { ide: '080', edid: '85' },
      ],
      limited: [
        { ide: '148', edid: '73' },
        { ide: '163', edid: '106' },
        { ide: '162', edid: '106' },
        { ide: '212', edid: '85' },
        { ide: '003', edid: '80' },
        { ide: '314', edid: '73' },
        { ide: '034', edid: '106' },
      ],
      erratum: [
        { ide: '176', edid: '125' },
        { ide: '297', edid: '106' },
        { ide: '007', edid: '91' },
        { ide: '043', edid: '125' },
      ],
    };
  },
};
</script>

<style>

:root {
    --primary-color: #A40000;
    --secondary-color: #2C2C2E;
    --tertiary-color: #E3CFCF;
    --quaternary-color: #B0B0B0;
    --quinary-color: #D6D6D6;
}

body {
    background-color: var(--secondary-color);
    color: var(--tertiary-color);
    font-family: 'Arial', sans-serif;
    text-align: center;
}

h1 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: var(--primary-color);
}

h2 {
    font-size: 2rem;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
    color: var(--tertiary-color);
}

.horizontal-images {
    
    max-height: 362px;
    justify-content: center;
    gap: 2rem;
    overflow-x: scroll;
    overflow-y: hidden;
}

.vertical-images { 
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
}

section {
  margin-top: 5%;
  margin-bottom: 5%;
  scrollbar-width:  none; 
  justify-content: center;
}

.card {
    width: 250px;
}
</style>
