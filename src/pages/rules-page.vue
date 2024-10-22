<template>

  <nav>
    <side-bar></side-bar>
  </nav>

  <div class="content">

    <main>

      <h1>Reglas Formato Imperio</h1>

      <h2>Cartas Prohibidas</h2>

      <section class="horizontal-images">
        <myl-card class="card" v-for="card in banned" :key="card.ide" :card="card" :edid="card.edid" />
      </section>

      <h2>Cartas Limitadas</h2>

      <section class="horizontal-images">
        <myl-card class="card" v-for="card in limited" :key="card.ide" :card="card" :edid="card.edid" />
      </section>

      <h2>Cartas con Errata</h2>

      <section class="vertical-images">
        <div v-for="card in erratum" :key="card.ide" class="erratum-item">
          <myl-card class="card" :card="card" :edid="card.edid" />
          <div class="erratum-text">
            <p>{{ card.description }}</p>
          </div>
        </div>
      </section>

    </main>

  </div>

</template>
  
  <script>
  import MylCard from '../components/myl-card.vue';
  import SideBar from '../components/Side-bar.vue';
  
  export default {
    components: {
      MylCard,
      SideBar
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
          { ide: '176', 
            edid: '125', 
            description: 'Descripción de la carta 176' 

          },
          { ide: '297', 
            edid: '106', 
            description: 'Descripción de la carta 176'  

          },
          { ide: '007', 
            edid: '91', 
            description: 'Descripción de la carta 176'  

          },
          { ide: '043', 
            edid: '125', 
            description: 'Descripción de la carta 176'  

          },
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

  main {
    overflow-y: scroll;
    min-width: 100%;
    justify-content: center;
  }

  .content {
    width: calc(100% - 130px);
    position: absolute;
    right: 0;
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

  p {
    color: var(--tertiary-color);
  }

  .horizontal-images {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: unwrap;
    max-height: 357px;
    justify-content: flex-start;
    gap: 1rem;
    overflow-x: scroll, hidden;
    overflow-y: hidden;

  }

  .vertical-images {
    display: inline-flex;
    flex-direction: column;
    max-height: 754px;
    min-width: 790px;
    justify-content: flex-start;
    gap: 1rem;

  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 790px;
    scrollbar-width: none;
    justify-content: center;
    gap: 2rem;
  }

  .erratum-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .card {
    width: 250px;
    flex-shrink: 0;
    object-fit: contain;
  }
</style>
  