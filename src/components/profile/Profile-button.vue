<template>
  <button class="redirect-button" @click="redirect">
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
    route: {
      type: String,
      required: true
    }
  },
  methods: {
    redirect() {
      window.location.href = this.route;
    }
  }
};
</script>

<style scoped>
.redirect-button {
  position: relative;
  justify-content: center;
  background: linear-gradient(to top, #2C2C2E, #A40000);
  color: var(--primary-border-color);
  font-family: "Bebas Neue", sans-serif;
  font-weight: bold;
  font-size: 30px;
  border-radius: 30px;
  width: 400px; 
  height: 500px; 
  cursor: pointer;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease-in-out;
  text-align: center;
  padding: 0;
  align-items: center;
  justify-content: center;
}

.redirect-button:hover {
  background: linear-gradient(to top, var(--primary-background-color), var(--secondary-text-color));
  transform: scale(105%);
}
</style>
