<template>
    <div>
        <nav>
            <SideBar/>       <!-- calling the SideBar component-->
        </nav>
        <cardExample />  <!-- calling example for use of card component -->
        
    </div>
</template>

<script setup>
import cardExample from '../components/card-example.vue';
import SideBar from '../components/side.bar.vue';
</script>

<style scoped>

</style>
