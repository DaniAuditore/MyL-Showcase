<template> 
  <div class="user-info">
    <profilePhoto :userId="userId" class="profilePhoto"/>
    <div class="username-section">
      <div class="username">{{ userName }}</div>
      <!-- Botones dinámicos dependiendo de las condiciones de perfil -->
      <div class="profile-buttons">
        <!-- Mostrar si el usuario actual está viendo su propio perfil -->
        <profileActionButton
          text="Editar Perfil"
          :currentName="userName"
          :currentImage="userImage"
          v-if="isCurrentUser"
          @confirm="openEditProfile"
        />

        <!-- Mostrar si el usuario es Admin y no está en su propio perfil -->
        <profileActionButton
          :text="userRole === 'judge' ? 'Degradar a Usuario' : 'Promover a Juez'"
          :title="userRole === 'judge' ? 'Confirmar Degradación' : 'Confirmar Promoción'"
          :description="userRole === 'judge' ? '¿Desea degradar este usuario a Usuario?' : '¿Desea promover este usuario a Juez?'"
          v-if="isAdmin && !isCurrentUser"
          @confirm="userRole === 'judge' ? openDemoteUser : openPromoteUser"
        />

        <!-- Botón para borrar la cuenta (se muestra para el usuario actual o si es Admin y está en otro perfil) -->
        <profileActionButton
          text="Borrar Cuenta"
          title="Confirmar Borrado"
          description="¿Está seguro de que desea borrar esta cuenta?"
          v-if="isCurrentUser || (isAdmin && !isCurrentUser)"
          @confirm="openDeleteAccount"
        />
      </div>
    </div>
  </div>

  <div class="profile-buttons">
    <profile-button text="Colección" route="/collection" />
    <profile-button text="Posts" route="/forum" />
    <profile-button :text="'Mercado'" :route="`/market/${userId}`" />
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

// Acceso a Vuex y la ruta actual
const store = useStore();
const route = useRoute();

// Datos del perfil actual visitado
const userId = ref(route.params.userId);
const userName = ref('');
const userImage = ref('');
const userRole = ref('');

// Variables de permisos
const isCurrentUser = ref(false);
const isAdmin = ref(false);

// Cargar datos del usuario desde JSON y verificar permisos
onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:3000/users/${userId.value}`);
    userName.value = response.data.name;
    userImage.value = response.data.profileImage;
    userRole.value = response.data.role;

    // Verificar si es el perfil del usuario actual o si el usuario actual es admin
    isCurrentUser.value = store.getters.currentUser.id === userId.value;
    isAdmin.value = store.getters.currentUser.role === 'admin';
    console.log(store.getters.currentUser.id)
    console.log(`${store.getters.currentUser.role}`)
  } catch (error) {
    console.error('Error al cargar el perfil:', error);
  }
});


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
