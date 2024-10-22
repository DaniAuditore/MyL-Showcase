<template>
  <div class="user-info">
    <profilePhoto :userId="userId" class="profilePhoto"/>
    <div class="username-section">
      <div class="username">{{ userName }}</div>
      <div class="profile-buttons" v-if="isCurrentUser || isAdmin">

        <!-- Botón para editar perfil (solo si es el perfil del usuario actual) -->
        <profileActionButton
          text="Editar Perfil"
          :currentName="userName"
          :currentImage="userImage"
          :currentId="userId"
          v-if="isCurrentUser"
          @confirm="openEditProfile"
        />

        <!-- Botón de "Promover a Juez" o "Degradar a Usuario" (solo si el usuario es admin y viendo otro perfil) -->
        <profileActionButton
          :text="userRole === 'judge' ? 'Degradar a Usuario' : 'Promover a Juez'"
          :title="userRole === 'judge' ? 'Confirmar Degradación' : 'Confirmar Promoción'"
          :description="userRole === 'judge' ? '¿Está seguro de que desea degradar este usuario a Usuario?' : '¿Está seguro de que desea promover este usuario a Juez?'"
          v-if="isAdmin && !isCurrentUser"
          @confirm="userRole === 'judge' ? openDemoteUser : openPromoteUser"
        />

        <!-- Botón para borrar cuenta (para el usuario actual o si un admin está en el perfil de otro) -->
        <profileActionButton
          text="Borrar Cuenta"
          title="Confirmar Borrado"
          description="¿Está seguro de que desea borrar esta cuenta?"
          v-if="isCurrentUser || isAdmin"
          @confirm="openDeleteAccount"
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

// Emitir eventos para abrir ventanas emergentes con las respectivas acciones
function openEditProfile() {
  // Emitir evento para editar el perfil
  console.log('Editar perfil');
}

function openPromoteUser() {
  // Emitir evento para promover a juez
  console.log('Promover a juez');
}

function openDemoteUser() {
  // Emitir evento para degradar a usuario
  console.log('Degradar a usuario');
}

function openDeleteAccount() {
  // Emitir evento para borrar cuenta
  console.log('Borrar cuenta');
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
