<template>
  <div class="user-info">
    <profilePhoto :userId="userId" class="profilePhoto"/>
    <div class="username-section">
      <div class="username">{{ userName }}</div>
      <div class="profile-buttons" v-if="isCurrentUser || isAdmin">
        <profileActionButton
          text="Editar Perfil"
          :currentName="userName"
          :currentImage="userImage"
          :currentId="userId"
          @confirm="updateProfile"
        />
        <profileActionButton
          text="Borrar Cuenta"
          title="Confirmar Borrado"
          description="¿Está seguro de que desea borrar su cuenta?"
          v-if="isAdmin"
        />
      </div>
    </div>
  </div>
  <div class="profile-buttons">
    <profile-button text="Colección" route="collection.html" />
    <profile-button text="Posts" route="forum.html" />
    <profile-button text="Mercado" route="market.html" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';
import { useRoute } from 'vue-router';

import profilePhoto from "@/components/profile-photo.vue";
import ProfileButton from './Profile-button.vue';
import profileActionButton from "./profile-action-button.vue";

// Accede al store de Vuex y ruta actual
const store = useStore();
const route = useRoute();

// Recibe el userId desde la propiedad
const userId = ref(route.params.userId);

// Variables reactivas para los datos del usuario
const userName = ref('');
const userImage = ref('');
const userRole = ref('');

// Variables para permisos
const isCurrentUser = ref(false);
const isAdmin = ref(false);

// Cargar la información del usuario desde el archivo test_users.json
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId.value}`);

    userName.value = response.data.name;
    userImage.value = response.data.profileImage;
    userRole.value = response.data.role;

    // Verificar si es el usuario actual o un administrador
    isCurrentUser.value = store.getters.currentUser.id === userId.value;
    isAdmin.value = store.getters.currentUser.role === 'admin';
  } catch (error) {
    console.error('Error al cargar el perfil del usuario:', error);
  }
});

// Función para actualizar el perfil en la API
async function updateProfile({ newName, newImage }) {
  try {
    const updatedUser = {
      name: newName || userName.value,
      profileImage: newImage || userImage.value
    };

    // Actualizar el archivo test_users.json
    await axios.put(`http://localhost:3000/users/${userId.value}`, updatedUser);

    // Actualizar los datos locales
    userName.value = updatedUser.name;
    userImage.value = updatedUser.profileImage;

    // Si es el usuario actual, actualizar en Vuex también
    if (isCurrentUser.value) {
      store.dispatch('setUser', {
        id: userId.value,
        name: updatedUser.name,
        profileImage: updatedUser.profileImage
      });
    }
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
  }
}
</script>

<style scoped>
.user-info {
  display: flex;
  width: 80%;
  max-width: 1800px;
  margin-bottom: 50px;
  justify-content: space-around;
  position: relative;
}

.username-section {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  gap: 30px;
  max-width: 1000px;
  width: 100%;
}

.profilePhoto {
  width: 300px;
  height: 300px;
}

.username {
  color: var(--secondary-text-color);
  font-size: 40px;
  border: 4px solid var(--primary-border-color);
  border-radius: 50px;
  padding: 20px;
  text-align: center;
  width: 90%;
}

.profile-buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1700px;
}
</style>
