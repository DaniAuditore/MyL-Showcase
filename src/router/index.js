import { createWebHistory, createRouter } from "vue-router" 
import HomePage from "../pages/home-page.vue"
import ProfilePage from "../pages/Profile-page.vue"
import GlossaryPage from "../pages/glossary-page.vue"

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
},
{   path: "/forum",
    name: "Forum",
    component: () => import("../pages/forum-page.vue")
},
{
    path: "/rules",
    name: "rules",
    component: () => import("../pages/rules-page.vue")
},
{
    path: "/library",
    name: "library",
    component: () => import("../pages/library-page.vue")
},
{
    path: "/deckbuilder",
    name: "deckbuilder",
    component: () => import("../pages/deck-builder-page.vue")
},
{
    path: "/glossary",
    name: "glossary",
    component: GlossaryPage,
  }
]

const router = createRouter({   
history: createWebHistory(),
    routes: links, 
})  

export default router
