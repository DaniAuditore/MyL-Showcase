import { createWebHistory, createRouter } from "vue-router" 
import HomePage from "../pages/home-page.vue"

const links = [
{   path: "/",     
    name: "Home",     
    component: HomePage,
},/*
{   path: "/about",
    name: "About",     
    component: () => import("../pages/about-page.vue")      alt way to import
}*/
]

const router = createRouter({   
history: createWebHistory(),
    routes: links, 
})  

export default router
