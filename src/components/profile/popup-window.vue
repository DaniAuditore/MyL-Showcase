<template>
  <div v-if="show" class="popup-window">
    <div class="content-modal">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
      <div class="btn-group">
        <button class="confirm-button" @click="confirmAction">Confirmar</button>
        <button class="cancel-button" @click="cancelAction">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  props: {
    show: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  },
  methods: {
    confirmAction() {
      this.$emit('confirm');
      if (this.title === 'Confirmar Borrado') {
        this.deleteUser();
      } else if (this.title === 'Confirmar Promoción' || this.title === 'Confirmar Degradación') {
        this.promoteOrDemoteUser();
      }
      window.location.reload();
    },
    cancelAction() {
      this.$emit('cancel');
    },
    async deleteUser() {
      try {
        await axios.delete(`http://localhost:3000/users/${this.$route.params.userId}`);
        this.$router.push('/');
      } catch (error) {
        console.error('Error al eliminar el usuario:', error);
      }
    },
    async promoteOrDemoteUser() {
      const newRole = this.title === 'Confirmar Promoción' ? 'judge' : 'user';
      try {
        await axios.patch(`http://localhost:3000/users/${this.$route.params.userId}`, { role: newRole });
        this.$emit('updateRole', newRole); // Emitir el evento para que el rol se actualice en el padre.
      } catch (error) {
        console.error('Error al cambiar el rol del usuario:', error);
      }
      window.location.reload();
    }
  }
};
</script>

<style scoped>
:root {
    --primary-background-color: #2c2c2e;
    --secondary-background-color: #373739;
    --primary-text-color: #A40000;
    --secondary-text-color:#CB0000;
    --primary-border-color: #E3CFCF;
    --secondary-border-color: #FFEBEB;
    --test-border-color: green;
}
.popup-window {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.content-modal {
  background-color: var(--primary-background-color);
  padding: 20px;
  border-radius: 15px;
  text-align: center;
  max-width: 300px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-border-color);
}

h2 {
  color: var(--secondary-border-color);
  font-size: 40px;
  text-align: center;
}

p{
  width: 100%;
  position: relative;
  color: var(--secondary-text-color);
  font-weight: bold;
}

.btn-group {
  display: flex;
  justify-content: space-between;
}

.confirm-button, .cancel-button {
  background-color: var(--secondary-background-color);
  color: var(--primary-border-color);
  border: 2px solid var(--primary-border-color);
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.5s ease;
}

.confirm-button:hover {
  background-color: var(--primary-border-color);
  color: var(--primary-background-color);
}

.cancel-button:hover {
  background-color: var(--primary-text-color);
  color: var(--secondary-border-color);
  box-shadow: 0 0 40px rgb(202, 25, 25);
}
</style>
