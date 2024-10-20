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
            <!-- <deckView class="deck" @click="expand(this.id)"/> -->
            <deckView class="deck"/>
        </main>
    </div>
</div>
</template>

<script setup>
import sideBar from '../components/SideBar.vue';
import createButton from '../components/create-button.vue';
// import filterButton from '../components/filter-button.vue';
import deckView from '../components/deck-view.vue';


// var deck_expan = document.querySelectorAll('.deck');
// const expand = (id) => {
//     deck_expan[id].classList.toggle('deck-expanded');
// }
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
    left: 130px;
    
    z-index: -1;
    text-align: center;
}

header {
    width: 1103px;
    height: fit-content;
    position: relative;
    top: 22px;
    left: calc(50% - 551px);

    text-align: left;
    border: 1px solid #f0c;
}

.decks {
    width: 100%;
    height: 83%;
    position: absolute;
    top: 160px;
    
    overflow-y: scroll;
}
</style>
