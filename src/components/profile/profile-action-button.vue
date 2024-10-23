<template>
  <div>
    <button class="profile-button" @click="openPopup">{{ text }}</button>

    <ProfilePopupEdit
      v-if="showPopup && text === 'Editar Perfil'"
      :show="showPopup"
      :currentName="currentName"
      :currentImage="currentImage"
      @confirm="handleConfirmEdit"
      @cancel="handleCancel"
    />

    <PopupWindow
      v-else
      :show="showPopup"
      :title="title"
      :description="description"
      @confirm="handleConfirm"
      @cancel="handleCancel"
      @updateRole="handleRoleUpdate"
    />
  </div>
</template>

<script>
import PopupWindow from './popup-window.vue';
import ProfilePopupEdit from './profile-popup-edit.vue';

export default {
  components: {
    PopupWindow,
    ProfilePopupEdit
  },
  props: {
    text: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    currentName: {
      type: String,
      required: false
    },
    currentImage: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      showPopup: false
    };
  },
  methods: {
    openPopup() {
      this.showPopup = true;
    },
    handleConfirmEdit({ newName, newImage }) {
      this.$emit('confirm', { newName, newImage });
      this.showPopup = false;
    },
    handleConfirm() {
      this.$emit('confirm');
      this.showPopup = false;
    },
    handleCancel() {
      this.showPopup = false;
    },
    handleRoleUpdate(newRole) {
      this.$emit('roleUpdated', newRole); // Emitir para que `profile-layout.vue` lo maneje
    }
  }
};
</script>

<style scoped>
.profile-button {
  background-color: transparent;
  cursor: pointer;
  width: calc(100%);
  min-width: 300px;
  height: 80px;
  border-radius: 30px;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  text-align: center;
  border: 3px solid var(--primary-border-color);
  color: var(--secondary-border-color);
}

.profile-button:hover {
  background-color: var(--primary-text-color);
  color: var(--primary-border-color);
}
</style>
