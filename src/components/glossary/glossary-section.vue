<template>
  <li :id="'section-' + sectionId" class="section" @click="toggleVisibility">
    <div class="toggle-section">
      <span>{{ sectionName }}</span>
    </div>
    <div :class="['content-visible', { open: isOpen }]" @click.stop>
      <p>{{ sectionContent }}</p>
    </div>
  </li>
</template>


  
  <script>
  import { ref } from 'vue';
  
  export default {
    props: {
      sectionId: {
        type: Number,
        required: true,
      },
      sectionName: {
        type: String,
        required: true,
      },
      sectionContent: {
        type: String,
        required: true,
      }
    },
    setup() {
      const isOpen = ref(false);
  
      function toggleVisibility() {
        isOpen.value = !isOpen.value;
      }
  
      return { isOpen, toggleVisibility };
    }
  }
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

    li{
      margin: 30px 0;
    }

    .button, .toggle-section {
      width: calc(100% - 40px); 
      padding: 10px 20px;
      box-sizing: border-box; 
      background: var(--secondary-background-color);
    }

    .toggle-section span { 
      width: 100%;
      overflow: hidden;
      text-align:center;
      padding: 10px 0; 
      margin: 0;
      font-size: 40px;
      font-weight: bold;
      color: var(--secondary-text-color);
      background-color: var(--secondary-background-color);
    }


    .section {
      border-radius: 30px;
      border: 2px solid var(--primary-border-color);
      background-color: var(--secondary-background-color);
      cursor: pointer;
      padding: 20px 0; 
    }

    .toggle-section {
      padding: 0 20px;
    }
    
    .content-visible {
      
      width: 100%;
      max-width: 1300px;
      height: 0px;
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      margin-bottom: 20px;
      overflow: hidden;
      font-size: 32px;
      color: var(--primary-border-color);
      border-radius: 30px;
      cursor: pointer;
      transition: height 0.5s ease-in-out;
    }

    .content-visible.open p {
    text-align: justify; 
    text-justify: inter-word; 
    white-space: pre-wrap; 
    margin-bottom: 0;
  }

    .content-visible.open {
      border-radius:0px;
      width: 95%;
      border: 2px solid var(--primary-border-color);
      overflow-y: auto; 
      transition: height 0.4s ease-in-out;
      height: 435px;
      scrollbar-width: none;
    }
</style>
  