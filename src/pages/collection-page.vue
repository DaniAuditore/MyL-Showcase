<template>
<div class="body">
    <nav>
        <SideBar/>
    </nav>

    <div class="content">
        <header>
            <filterButton class="filter_button"/>
        </header>

        <h1>{{ ownerId }}</h1>
        
        <main class="cards">
            <collectionCard v-for="card in sampleCards" :key="card.ide"
                :card="card"
                :edid="card.edid"
            />
        </main>
    </div>
</div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
// import { useStore } from 'vuex';
import axios from 'axios';

import SideBar from '@/components/Side-bar.vue';
import filterButton from '@/components/filter-button.vue';
import collectionCard from '@/components/collection/collection-card.vue';

// To access user's collection from path
const route = useRoute();
const ownerId = ref(route.params.userId);

// To check permissions
// const store = useStore();
// const currentUser = store.getters.currentUser.id;

const ownedCards = ref([]);

const sampleCards = [
    { "ide": "001", "edid": "85" },
    { "ide": "002", "edid": "85" },
    { "ide": "003", "edid": "85" },
    { "ide": "004", "edid": "85" },
    { "ide": "005", "edid": "85" },
    { "ide": "006", "edid": "85" },
    { "ide": "007", "edid": "85" },
    { "ide": "008", "edid": "85" },
    { "ide": "009", "edid": "85" },
    { "ide": "010", "edid": "85" },
    { "ide": "011", "edid": "85" },
    { "ide": "012", "edid": "85" },
    { "ide": "013", "edid": "85" },
    { "ide": "014", "edid": "85" },
    { "ide": "015", "edid": "85" },
    { "ide": "016", "edid": "85" },
    { "ide": "017", "edid": "85" },
    { "ide": "018", "edid": "85" },
    { "ide": "019", "edid": "85" },
    { "ide": "020", "edid": "85" },
    { "ide": "021", "edid": "85" },
    { "ide": "022", "edid": "85" },
    { "ide": "023", "edid": "85" },
    { "ide": "024", "edid": "85" },
    { "ide": "025", "edid": "85" },
    { "ide": "026", "edid": "85" },
    { "ide": "027", "edid": "85" },
    { "ide": "028", "edid": "85" },
    { "ide": "029", "edid": "85" },
    { "ide": "030", "edid": "85" }
]

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:3000/users/${ownerId.value}/cards`);
        ownedCards.value = response.data;
    } catch (error) {
        console.error('Error al cargar las cartas:', error);
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
    right: 0;
    top: 0;
    
    z-index: -1;
    text-align: center;
}

header {
    width: 90%;
    max-width: 1103px;
    position: absolute;
    left: 50%;
    top: 22px;
    transform: translateX(-50%);
    
    background-color: var(--primary-background-color);
}

.cards {
    width: 90%;
    max-width: 1103px;
    position: absolute;
    left: 50%;
    top: 160px;
    transform: translateX(-50%);

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 10px 60px;

    overflow-y: scroll visible;
    overflow-x: visible;
    scrollbar-width: none;
}
</style>
