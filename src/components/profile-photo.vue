<template>
  <div class="avatar" :class="roleClass">
    <img :src="image" alt="Avatar" @error="setDefaultImage">
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    userId: {
      type: String,
      required: true
    },
    defaultImage: {
      type: String,
      default() {
        return require('../assets/profile-icons/test_profile_photo.png');
      }
    }
  },
  data() {
    return {
      image: '',
      roleClass: ''
    };
  },
  methods: {
    async fetchUserProfile() {
      try {
        const response = await axios.get(`http://localhost:3000/users/${this.userId}`);

        if (response.data.profileImage) {
          // Utilizamos require solo si la imagen es una ruta relativa
          this.image = require(`@/assets/profile-icons/user-${this.userId}.png`);
        } else {
          this.image = this.defaultImage;  // Imagen por defecto si no hay imagen en el JSON
        }

        if (response.data.role === 'judge') {
          this.roleClass = 'gold-border';
        } else {
          this.roleClass = 'red-border';
        }
      } catch (error) {
        console.error('Error al obtener la foto de perfil del usuario:', error);
        this.image = this.defaultImage;
      }
    },
    setDefaultImage() {
      this.image = this.defaultImage;
    }
  },
  mounted() {
    this.fetchUserProfile();
  }
};
</script>

<style scoped>
.avatar img {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  border: 8px solid;
}

.red-border img {
  border-color: #A40000;
}

.gold-border img {
  border-color: rgb(212, 175, 55);
  box-shadow: 0 0 20px rgb(212, 175, 55);
}
</style>
