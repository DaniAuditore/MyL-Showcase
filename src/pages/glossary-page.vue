<template>
    <nav>
        <SideBar/>
    </nav>
    <div class="content">
        <GlossaryLayout>
        </GlossaryLayout>
    </div>
</template>

<script setup>
  import SideBar from '../components/Side-bar.vue';
  import GlossaryLayout from '../components/glossary/glossary-layout.vue'
</script>

<style scoped>
    .content {
        background-color: var(--primary-background-color);
        z-index: 2;
        height: 100%;
        width: calc(100% - 130px);
        position: fixed;
        right: 0;
        top: 0;
        overflow: hidden;
        justify-content: center;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>