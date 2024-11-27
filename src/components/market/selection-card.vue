<template>
    <div class="selection_card">
        <div class="frame">
            <mylCard :card="card" :edid="edid"/>
        </div>
        <router-link 
          v-if="card.ide" 
          :to="{ name: 'make-offer', params: { cardId: card.ide } }" 
          class="select-btn"
        >
          Seleccionar
        </router-link>
        <p v-else class="error-message">Error: Carta no válida</p>
    </div>
</template>
    
<script>
    import mylCard from '../myl-card.vue';
    
    export default {
        components: {
            mylCard
        },
        props: {
            card: {
                type: Object,
                required: true
            },
            edid: {
                type: String,
                required: true
            },
        },
        mounted() {
            if (!this.card || !this.card.ide) {
                console.error("Error: La carta no tiene un 'ide' válido.");
            }
        }
    };
</script>
    
<style scoped>
    .error-message {
        color: red;
        font-weight: bold;
    }
    
    .selection_card {
        width: 100%;
        height: 100%;
        position: relative;
        overflow: visible;
    }
    
    .frame {
        width: fit-content;
        height: fit-content;
        padding: 10px;
        background-color: var(--secondary-background-color);
        border-radius: 10px;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    }
    
    .select-btn {
        display: block;
        margin-top: 10px;
        background-color: transparent;
        color: var(--secondary-border-color);
        border: 2px solid var(--secondary-border-color);
        padding: 10px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
    }
    
    .select-btn:hover {
        border-color: var(--primary-text-color);
        color: var(--primary-text-color);
    }
</style>
    