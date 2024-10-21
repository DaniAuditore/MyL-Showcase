<template>
    <button>
        +
    </button>
</template>

<style scoped>
button {
    width: 147px;
    height: 85px;

    align-content: center;
    text-align: center;
    font-size: 300%;
    font-weight: 100;

    cursor: pointer;
    
    color: var(--primary-border-color);
    background-color: var(--primary-background-color);
    border-radius: 30px;
    border: 2px solid var(--primary-border-color);
}
button:hover {
    color: var(--primary-text-color);
}
button:active {
    filter: brightness(125%);
}
</style>