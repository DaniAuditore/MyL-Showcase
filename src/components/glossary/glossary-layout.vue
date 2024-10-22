<template>
  <div class="title">Glosario</div>
  <div class="sections">
    <ul>
      <GlossarySection
        v-for="item in glossaryItems"
        :key="item.id"
        :sectionId="item.id"
        :sectionName="item.name"
        :sectionContent="item.content"
      />
    </ul>
  </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  import GlossarySection from './glossary-section.vue';
  import { onMounted } from 'vue';

  const glossaryItems = ref([]);

  onMounted(async () => {
    try {
      const response = await fetch('http://localhost:3000/glossary-sections');
      if (response.ok) {
        const data = await response.json();
        glossaryItems.value = data;
      } else {
        console.error('Failed to fetch glossary sections:', response.status);
      }
    } catch (error) {
      console.error('Error fetching glossary sections:', error);
    }
  });
  </script>
  
  <style>
  :root {
      --primary-background-color: #2c2c2e;
      --secondary-background-color: #373739;
      --primary-text-color: #A40000;
      --secondary-text-color:#CB0000;
      --primary-border-color: #E3CFCF;
      --secondary-border-color: #FFEBEB;
      --test-border-color: green;
  }

  .title {
      z-index: 1;
      max-width: 1400px;
      width: 100%;
      height: 100px;
      border-radius: 20px;
      border: 5px var(--primary-border-color) solid;
      top:15px;
      position: absolute;
      color: var(--primary-text-color);
      background-color: var(--secondary-background-color);
      font-size: 500%;
      display: flex;
      justify-content: center;
      align-items: center;
  }

  .sections {
      margin-top: 120px; 
      overflow-y: auto;
      padding: 0 20px; 
      width: 100%; 
      flex-grow: 1; 
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center; 
  }

  .sections ul{
    top: 0px;
    margin-top: 4350px;
    min-height: 5150px;
    /*border: 10px solid var(--test-border-color);*/
    list-style: none;
    justify-content: center;
  }
</style>