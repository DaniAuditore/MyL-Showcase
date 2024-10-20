<template>
  <div class="user-info">
    <profilePhoto :profileImage="userImage" />
    <div class="username-section">
      <div class="username">{{ userName }}</div>
      <div class="profile-buttons">
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
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

import profilePhoto from "@/components/profile-photo.vue";
import ProfileButton from './Profile-button.vue';
import profileActionButton from "./profile-action-button.vue";

// Using Vuex to access current user data
const store = useStore();
const userName = computed(() => store.getters.currentUser.name);
const userImage = computed(() => store.getters.currentUser.profileImage);
const userId = computed(() => store.getters.currentUser.id);

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId.value}`);
    store.dispatch('setUser', {
      id: response.data.id,
      name: response.data.name,
      profileImage: response.data.profileImage
    });
  } catch (error) {
    console.error('Error al cargar el perfil del usuario:', error);
  }
});

// Function to update the profile in the API
async function updateProfile({ newName, newImage }) {
  try {
    const updatedUser = {
      name: newName || userName.value,
      profileImage: newImage || userImage.value
    };

    await axios.put(`http://localhost:3000/users/${userId.value}`, updatedUser);

    store.dispatch('setUser', {
      id: userId.value,
      name: updatedUser.name,
      profileImage: updatedUser.profileImage
    });
  } catch (error) {
    console.error('Error al actualizar el perfil del usuario:', error);
  }
}
</script>

<style scoped>
.user-info {
 /* border: 3px solid var(--test-border-color);*/
  display: flex;
  width: 80%;
  max-width: 1800px;
  margin-bottom: 50px;
  justify-content: space-around;
  position: relative;
}

.username-section {
  /*border: 3px solid var(--test-border-color);*/
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

.username {
  /*background-color: var(--secondary-background-color);*/
  color: var(--secondary-text-color);
  font-size: 40px;
  border: 4px solid var(--primary-border-color);
  border-radius: 50px;
  padding: 20px;
  text-align: center;
  width: 90%;
}

.profile-buttons {
  /*border: 3px solid var(--test-border-color);*/
  display: flex;
  justify-content: space-around;
  width: 100%;
  max-width: 1700px;
}
</style>
