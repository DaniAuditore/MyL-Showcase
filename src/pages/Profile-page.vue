<template>
  <nav>
    <SideBar />
  </nav> 
  <div class="main-content">
    <profileLayout :userId="userId" /> <!-- Pass the userId as a parameter to profileLayout -->
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import SideBar from '../components/Side-bar.vue';
import profileLayout from '../components/profile/profile-layout.vue';


const route = useRoute();
const userId = route.params.userId||"1";  

</script>

<style scoped>
.main-content {
  overflow: hidden;
  height: 100%;
  width: calc(100% - 130px);
  left: 130px;
  position: fixed;
  top: 0px;
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--primary-background-color);
}
</style>
