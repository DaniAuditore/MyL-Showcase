import { createWebHistory, createRouter } from "vue-router" 
import HomePage from "../pages/home-page.vue"
import ProfilePage from "@/pages/profile/Profile-page.vue"

const links = [
{   path: "/",     
    name: "Home",     
    component: HomePage,
},/*
{   path: "/about",
    name: "About",     
    component: () => import("../pages/about-page.vue")      alt way to import
}*/
{   
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
},
{   path: "/inventory",
    name: "Inventory",     
    component: () => import("../pages/inventory-page.vue")
}
]

const router = createRouter({   
history: createWebHistory(),
    routes: links, 
})  

export default router
