<template>
    <div class="menu">
        <button>
            <img src="../assets/menu-icon.png" alt="">
        </button>
    </div>
</template>

<style scoped>
.menu {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 35px;
    top: 40px;
}
.menu:hover {
    filter: brightness(120%);
}
button {
    width: 22px;
    height: 22px;
    position: absolute;
    cursor: pointer;
    background-color: #2C2C2E;
    border: 0;
}
img {
    width: 22px;
    height: 22px;
    position: absolute;
    right: 0px;
    top: 0px;
}
</style>