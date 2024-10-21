<template>
<div>
    <button class="filter-button">Filtro</button>
</div>
</template>

<script setup>
</script>

<style>
.filter-button {
    width: 147px;
    height: 85px;
    position: absolute;
    right: 0;
    top: 0;

    align-content: center;
    text-align: center;
    font-size: 200%;
    font-weight: 100;

    cursor: pointer;
    
    color: var(--primary-border-color);
    background-color: var(--primary-background-color);
    border-radius: 30px;
    border: 2px solid var(--primary-border-color);
}

.filter-button:hover {
    color: var(--primary-text-color);
}

.filter-button:active {
    filter: brightness(125%);
}
</style>
