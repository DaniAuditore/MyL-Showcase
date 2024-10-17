<template>
    <input type="checkbox" id="sidebar-click">
        <label class="sidebar" for="sidebar-click">
            <ul>
                <li><router-link to="/library" class="sidebar-button" :class="{ active: isActive('/') }">
                    <img src="../assets/sidebar-icons/library-icon.png" alt="Libreria">
                    <h1>Libreria</h1>
                </router-link></li>
                <li><router-link to="/inventory" class="sidebar-button" :class="{ active: isActive('/inventario') }">
                    <img src="../assets/sidebar-icons/inventory-icon.png" alt="">
                    <h1>Inventario</h1>
                </router-link></li>
                <li><router-link to="/forum" class="sidebar-button" :class="{ active: isActive('/foro') }">
                    <img src="../assets/sidebar-icons/forum-icon.png" alt="">
                    <h1>Foro</h1>
                </router-link></li>
                <li><router-link to="/rules" class="sidebar-button" :class="{ active: isActive('/reglas') }">
                    <img src="../assets/sidebar-icons/rules-icon.png" alt="">
                    <h1>Reglas</h1>
                </router-link></li>
                <li><router-link to="/glossary" class="sidebar-button" :class="{ active: isActive('/glosario') }">
                    <img src="../assets/sidebar-icons/glossary-icon.png" alt="">
                    <h1>Glosario</h1>
                </router-link></li>
                <li><router-link to="/profile" class="sidebar-button" :class="{ active: isActive('/profile') }">
                    <img src="../assets/sidebar-icons/profile-icon.png" alt="">
                    <h1>Perfil</h1>
                    </router-link>
                </li>
            </ul>

            
        </label>
</template>

<script>
export default {
    computed: {
        isActive() {
            return (route) => this.$route.path === route;
        }
    }
}
</script>

<style>

    :root {
        --primary-background-color: #2c2c2e;
        --secondary-background-color: #373739;
        --primary-text-color: #A40000;
        --secondary-text-color: #CB0000;
        --primary-border-color: #E3CFCF;
        --secondary-border-color: #FFEBEB;
        --font-style: 'Open Sans', sans-serif;
        --test-border-color: #008000;
    }

    .sidebar {
        z-index: 10;
        display: block;
        width: 123px;
        height: calc(100%);
        min-height: 400px;
        background-color: var(--primary-background-color);
        display: flex;
        position: fixed;
        top: 0px;
        left: 0px;
        flex-direction: column;
        justify-content: space-between;
        overflow: hidden;
        padding: 20px 0;
        transition: 0.5s;
        border-right: 5px solid var(--primary-border-color);
        /*border: 4px solid var(--test-border-color);*/
    }

    :checked + .sidebar {
        transition: 0.5s;
        width: 300px;
    }

    #sidebar-click {
        display: none;
    }

    .sidebar ul {
        list-style: none;
        padding-left: 0;
        margin-bottom: 0;
        display: flex;
        flex-direction: column;
        flex-grow: 1; 
        justify-content: flex-start; /* Make sure the icons are at the top */
    }

    .sidebar ul li {
        width: 63px;
        height: 44.2px;
        margin-bottom: 40px;
    }

    .sidebar ul li:last-child{
        margin-top: auto;
        margin-bottom: 60px;
    }

    .sidebar h1 {
        position: relative;
        left: 130px;
        top: -70px;
        color: var(--primary-text-color);
    }

    .sidebar a {
        height: 44.2px;
        padding-left: 27px;
    }

    .sidebar-button {
        position: relative;
        text-decoration: none;
    }

    .sidebar-button.active img{
        border-left: 5px solid var(--primary-text-color);
    }

    .sidebar-button img:hover, h1:hover{
        filter: brightness(150%);
    }

</style>