<template>
    <div class="modal">
      <div class="modal-content">
        <div class="card-section">
          <img :src="imageUrl" alt="Card image" />
          <h2 class="card-name">{{ cardName }}</h2>
        </div>
        <div class="details-section">
            <h2>{{ cardName }}</h2>
            <p>Fuerza: 4 | Coste: 2 ⚡ | Raza: Sombra | Tipo: Aliado | Rareza: UR</p>
            <p>Oferta de {{ offerOwnerName }}</p>
            <p v-if="offer.price" class="price">Valor: <span class="highlight">{{ offer.price }} Coins</span></p>
            <p v-else>Intercambio por carta: {{ requestedCardName }}</p>

            <div class="buttons">
                <div v-if="isOwner">
                    <button class="remove-offer" @click="$emit('remove', offer)">Eliminar Oferta</button>
                </div>
                <div v-else>
                    <button class="accept-offer" @click="$emit('accept', offer)">Aceptar Oferta</button>
                    <button class="propose-trade" @click="$emit('propose', offer)">Proponer Otro Trato</button>
                </div>
                <button class="close-modal" @click="$emit('close')">Cerrar</button>
            </div>
        </div>
      </div>
    </div>
  </template>
  
  <script scoped>
  export default {
    props: {
      offer: {
        type: Object,
        required: true
      },
      isOwner: {
        type: Boolean,
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
      },
      offerOwnerName() {
        return "Nombre de usuario";
      }
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
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .modal-content {
      display: flex;
      justify-content: space-between;
      background-color: var(--secondary-background-color);
      padding: 20px;
      border-radius: 10px;
      width: 80%;
      max-width: 1000px;
      border: 3px solid var(--primary-border-color);
    }

    .card-section {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 50%;
    }

    .card-section img {
      width: auto;
      max-width: 100%;
      max-height: 500px;
    }

    .card-name {
      margin-top: 15px;
      font-size: 28px;
      color: var(--primary-border-color);
    }

    .details-section {
      width: 45%;
      padding-left: 20px;
      color: var(--primary-border-color);
      text-align: left;
    }

    .details-section h2 {
      font-size: 28px;
      margin-bottom: 15px;
    }

    .details-section p {
      font-size: 18px;
      margin-bottom: 10px;
    }

    .price {
      font-size: 24px;
      font-weight: bold;
    }

    .highlight {
      color: green;
    }

    .buttons {
        display: flex;
        justify-content: space-evenly; 
        align-items: center;
        margin-top: 20px;
        padding: 10px;
        flex-wrap: wrap; 
    }

    button {
        background-color: transparent;
        border: 2px solid var(--secondary-border-color);
        padding: 10px 20px;
        border-radius: 5px;
        color: var(--secondary-border-color);
        cursor: pointer;
        transition: 0.3s ease-in-out;
        min-width: 150px; 
        min-height: 60px;
        text-align: center;
        margin: 20px; 
    }

    button:hover {
        border-color: rgb(212, 175, 55);
        color: rgb(212, 175, 55);
    }

    .close-modal {
        border-color: var(--primary-text-color);
        color: var(--primary-text-color);
    }

</style>
  