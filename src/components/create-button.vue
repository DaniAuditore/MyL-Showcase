<template>
    <button>
        +
    </button>
</template>

<style scoped>
button {
    width: 147px;
    height: 85px;
    border-radius: 30px;
    border: 5px solid var(--primary-border-color);
    align-content: center;
    text-align: center;
    color: var(--primary-border-color);
    font-size: 300%;
    font-weight: 900;
}
button:hover {
    background-color: var(--secondary-border-color);
    color: var(--primary-text-color);
}
button:active {
    filter: brightness(125%);
}
</style>