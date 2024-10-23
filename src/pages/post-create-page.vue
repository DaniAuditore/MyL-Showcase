<template>
<div class="body">
    <nav>
        <SideBar/>
    </nav>

    <div class="content">
        <main>
            <input type="text" placeholder="Titulo" class="post_title">
            <textarea id="" placeholder="Cuerpo" class="post_body"></textarea>

            <div class="publish_space">
                <button class="publish_button">
                    Publicar
                </button>
            </div>
        </main>


    </div>
</div>
</template>

<script setup>
import SideBar from '@/components/Side-bar.vue';
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

main {
    width: 100%;
    height: fit-content;
    position: absolute;
    top: 90px;
}

.post_title {
    width: 90%;
    max-width: 1079px;
    height: 69px;
    
    padding: 10px;
    font-size: 30px;
    
    color: var(--primary-border-color);
    background-color: transparent;
    border: 2px solid var(--primary-border-color);
    border-radius: 30px;
}

.post_body {
    width: 90%;
    max-width: 1079px;
    height: 208px;
    
    padding: 10px;
    margin: 10px 0;
    font-size: 30px;
    resize: none;

    color: var(--primary-border-color);
    background-color: transparent;
    border: 2px solid var(--primary-border-color);
    border-radius: 30px;
}

.publish_space {
    width: 90%;
    max-width: 1103px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
}

.publish_button {
    width: 144px;
    height: 82px;
    position: absolute;
    right: 0px;

    font-size: 30px;

    color: var(--primary-background-color);
    border: 2px solid var(--primary-border-color);
    background-color: var(--primary-border-color);
    border-radius: 30px;
}
.publish_button:hover {
    background-color: transparent;
    color: var(--primary-border-color);
}
</style>
