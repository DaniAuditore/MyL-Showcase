<template>
    <nav>
      <SideBar></SideBar>
    </nav>
  
    <div class="content">
      <div class="market-title">
        <!-- Botón para crear oferta -->
        <router-link to="/card-selection" class="create-offer" v-if="isCurrentUser">Crear Oferta</router-link>
        <h1>Marketplace de {{ userName }}</h1>
      </div>      
      <div class="cards">
        <MarketOffer 
          v-for="offer in filteredOffers" 
          :key="offer.offerId" 
          :offer="offer"
          @open-details="openOfferDetails(offer)"
        />
      </div>      
      <OfferDetails 
        v-if="showDetails"
        :offer="selectedOffer"
        :isOwner="isCurrentUser"
        @close="closeOfferDetails"
        @accept="acceptOffer"
        @propose="proposeTrade"
        @remove="deleteOffer" 
      />
    </div>
  </template>
  
  <script scoped>
  import SideBar from '@/components/Side-bar.vue';
  import MarketOffer from '../components/market/market-offer.vue';
  import OfferDetails from '../components/market/offer-details.vue';
  import axios from 'axios';
  
  export default {
    data() {
      return {
        offers: [],
        filteredOffers: [],
        userName: '',
        isCurrentUser: false,
        showDetails: false,
        selectedOffer: null
      };
    },
    methods: {
      async fetchOffers(userId) {
        try {
          const response = await axios.get(`http://localhost:3000/offers`);
          this.offers = response.data.filter(offer => offer.userId === userId);
          this.filteredOffers = this.offers;
        } catch (error) {
          console.error('Error fetching offers:', error);
        }
      },
      openOfferDetails(offer) {
        this.selectedOffer = offer;
        this.showDetails = true;
      },
      closeOfferDetails() {
        this.showDetails = false;
      },
      acceptOffer(offer) {
        console.log('Oferta aceptada:', offer);
        this.closeOfferDetails();
      },
      proposeTrade(offer) {
        console.log('Propuesta de trato para:', offer);
        this.closeOfferDetails();
      },
      // Método para eliminar la oferta capturando el evento 'remove'
        async deleteOffer(offer) {
            try {
                console.log('Offer ID:', offer.offerId); // Verifica el offerId aquí
                await axios.delete(`http://localhost:3000/offers/${offer.offerId}`);
                this.filteredOffers = this.filteredOffers.filter(o => o.offerId !== offer.offerId);
                this.closeOfferDetails();
            } catch (error) {
                console.error('Error eliminando la oferta:', error);
            }   
        }

    },
    async mounted() {
      const userId = this.$route.params.userId;
      await this.fetchOffers(userId);
      this.isCurrentUser = this.$store.getters.currentUser.id === userId;
  
      try {
        const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
        this.userName = userResponse.data.name;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
    components: {
      MarketOffer,
      SideBar,
      OfferDetails
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
        justify-content: center;
        align-items: center;
        background-color: var(--primary-background-color);
    }

    .market-title {
        color: var(--primary-text-color);
        margin-left: 130px;
        width: calc(100% - 130px);
        max-width: 1600px;
        min-height: 70px;
        display: flex;
        background-color: var(--secondary-background-color);
        padding: 20px;
        border-radius: 10px;
        margin: 0 70px 0;
        border: 3px solid var(--primary-border-color);
    }  

    .market-title h1{
        max-width: 1600px;
        width: 100%;
        position: absolute;
    }
  
    .create-offer {
        align-self: self-start;
        align-content: center;
        background-color: transparent;
        color: var(--primary-border-color);
        border: 3px solid var(--primary-border-color);
        border-radius: 10px;
        width: 180px;
        height: 60px;
        font-size: 16px;
        cursor: pointer;
        transition: 0.5s ease-in-out;
        z-index: 10;
    }

    .create-offer:hover {
        transition: 0.2s ease-in-out;
        border-color: rgb(212, 175, 55);
        box-shadow: 0 0 20px rgb(212, 175, 55);
        color:  rgb(212, 175, 55);
        transform: scale(103%);
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

    .profilePhoto{
        width: 100px;
        height: 100px;
        padding-bottom: 15px;
    }
</style>
  