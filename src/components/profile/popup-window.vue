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
      },
      cancelAction() {
        this.$emit('cancel');
      }
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
    width: 500px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    border: 2px solid var(--primary-border-color);
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
  