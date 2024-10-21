<template>
    <div>
        <nav>
            <SideBar/>    <!-- calling the SideBar component-->
        </nav>
        <cardExample />  <!-- calling example for use of card component -->
        
    </div>
</template>

<script setup>
import cardExample from '../components/card-example.vue';
import SideBar from '../components/Side-bar.vue'
</script>

<style scoped>

</style>
