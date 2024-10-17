<template>

<div class="card" v-if="card"> <!-- imageUrl me trae las imagenes usando el link -->
  <img 
  :src="imageUrl"   
  :alt="card.name" 
  @error="handleImageError"/>
  
</div>

</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true
    },
    edid: {
      type: String,
      required: true
    },
  },
  computed: {
    imageUrl() {
      const baseUrl = 'https://api.myl.cl/static/cards/';
      return `${baseUrl}${this.edid}/${this.card.ide}.png`;
      
      /* 
      edid: el ID de la edicion a usar y ide: el ID de la carta dentro de esa edicion
      ide: el ID de la carta dentro de esa edicion 
      */
    }
  },
  methods: {
    handleImageError(event) {
      event.target.src = 'https://via.placeholder.com/150'; //relleno por si falla la imagen
    }
  },
}
</script>

<style scoped>

.card{
    display: inline-block; /*en caso de que muestre mas de una*/
}

.car-img{
    width: 100%;
    height: auto;
    display: block;
}

</style>