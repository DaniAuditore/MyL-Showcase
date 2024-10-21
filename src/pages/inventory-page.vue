<template>
<div class="body">
    <nav>
        <sideBar/>
    </nav>
    
    <div class="content">
        <header>
            <router-link to="/inventory">
                <createButton/>
            </router-link>
            
            <!-- <filterButton/> -->
        </header>

        <main class="decks">
             <div v-for="(deck, index) in decks" :key="deck.id">
                <deckView class="deck"
                    :deck="deck" 
                    @click="expand(index)"
                    :class="{ deckExpanded: expandIndex === index }"
                />
             </div>
        </main>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

import sideBar from '../components/Side-bar.vue';
import createButton from '../components/create-button.vue';
// import filterButton from '../components/filter-button.vue';
import deckView from '../components/inventory/deck-view.vue';

var expandIndex = ref(null);

const expand = (id) => {
    expandIndex.value = expandIndex.value === id ? null : id;
}


const decks = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('http://localhost:3000/decks');
        decks.value = response.data;
    } catch (error) {
        console.error('Error al cargar los mazos:', error);
    }
});
</script>

<style scoped>
.body {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;

    z-index: -2;
    background-color: var(--primary-background-color);
}

.content {
    height: 99%;
    width: calc(100% - 130px);
    position: absolute;
    /* left: 130px; */
    right: 0;
    
    z-index: -1;
    text-align: center;
}

header {
    width: 90%;
    max-width: 1103px;
    height: fit-content;
    position: relative;
    top: 22px;
    left: 50%;
    transform: translateX(-50%);

    text-align: left;
}

.decks {
    width: 100%;
    height: 83%;
    position: absolute;
    top: 160px;
    right: inherit;

    overflow-y: scroll;
    scrollbar-width: none;
}
</style>
