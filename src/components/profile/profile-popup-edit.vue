<template>
  <div v-if="show" class="popup-window" @click.self="cancelChanges">
    <div class="content-modal">
      <h2>Edición de Perfil</h2>
      <div class="edit-group">
        <label for="name">Cambiar Nombre:</label>
        <input v-model="newName" type="text" id="name" placeholder="Nuevo nombre" class="styled-input" />
      </div>
      <div class="edit-group">
        <label for="profile-picture">Cambiar Foto de Perfil:</label>
        <input type="file" id="profile-picture" @change="onFileChange" accept=".png, .jpg, .jpeg" class="file-input"/>
      </div>
      <div class="btn-group">
        <button class="confirm-button" @click="confirmChanges">Confirmar</button>
        <button class="cancel-button" @click="cancelChanges">Cancelar</button>
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
    currentName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newName: this.currentName || '',   // Inicializa newName con el valor de currentName
      previewImage: '',                  // Previsualización de la imagen
      selectedFile: null                 // Archivo seleccionado

    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;  //Access the current user from Vuex

    }
  },
  methods: {
    onFileChange(event) {
      const file = event.target.files[0];
      if (file && file.type.match('image.*')) {
        this.selectedFile = file;
        this.previewImage = URL.createObjectURL(file);  // Previsualizar la imagen seleccionada

      } else {
        this.previewImage = null;
        console.error("El archivo seleccionado no es válido o no es una imagen.");
      }
    },
    async confirmChanges() {
      // Verifica si hay un nombre nuevo o usa el nombre actual
      var updatedName = this.newName.trim() !== '' ? this.newName : this.currentUser.name; //desmenusar esta linea de codigo (mas tarde)

      // Subir la nueva imagen de perfil
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append('profileImage', this.selectedFile);

        try {
          await axios.post(`http://localhost:4000/upload/${this.currentUser.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

        } catch (error) {
          console.error('Error al cargar la imagen:', error);
        }
      }
      try {
        const updatedUser = {
          name: updatedName,  // Asegurarse de usar el nombre correcto
          profileImage: `../assets/profile-icons/user-${this.currentUser.id}.png` || this.previewImage
        };

        await axios.patch(`http://localhost:3000/users/${this.currentUser.id}`, updatedUser);

        // Actualizar los datos en Vuex
        this.$store.dispatch('setUser', {
          id: this.currentUser.id,
          name: updatedUser.name,
          profileImage: updatedUser.profileImage
        });
      } catch (error) {
        console.error('Error al actualizar el perfil del usuario en la API:', error);
      }

      this.$emit('confirm');
    },
    cancelChanges() {
      this.$emit('cancel'); 
    }
  },
  mounted() {
    this.newName = this.currentUser.name || '';  
    this.previewImage = this.currentUser.profileImage;
  }
};
</script>


<style scoped>  
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
  max-width: 800px;
  width: 100%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  border: 2px solid var(--primary-border-color);
}

h2 {
  color: var(--secondary-text-color);
  font-size: 40px;
  border: 4px solid var(--primary-border-color);
  padding: 20px;
  text-align: center;
}

.edit-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
}

label {
  color: var(--secondary-text-color);
  font-weight: bold;
  width: 200px;
  text-align: right;
}

.styled-input, .file-input {
  width: 100%;
  max-width: 500px;
  padding: 10px;
  font-size: 16px;
  border-radius: 8px;
  border: 2px solid var(--primary-border-color);
  background-color: var(--secondary-background-color);
  color: var(--primary-border-color);
}

.styled-input:focus, .file-input:focus {
  outline: none;
  border-color: var(--secondary-text-color);
  background-color: var(--primary-background-color);
}

.preview-image {
  max-width: 100px;
  margin-top: 10px;
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
