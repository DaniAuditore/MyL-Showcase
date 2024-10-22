<template>
    <div>
        <button>
            Borrar
        </button>
    </div>
</template>

<script setup>
</script>

<style scoped>
button {
    width: 150px;
    height: fit-content;

    cursor: pointer;
    text-align: center;
    font: 1000;
    font-size: xx-large;
    
    color: var(--primary-border-color);
    background-color: transparent;
    border-radius: 30px;
    border: 5px solid var(--primary-text-color)
}
button:hover {
    filter: brightness(115%);
}
</style>
