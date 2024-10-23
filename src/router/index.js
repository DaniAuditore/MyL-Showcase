import { createWebHistory, createRouter } from "vue-router" 
import HomePage from "../pages/home-page.vue"
import ProfilePage from "../pages/Profile-page.vue"
import GlossaryPage from "../pages/glossary-page.vue"
import marketPage from "@/pages/market-page.vue"
import cardSelection from "../pages/card-offer-selection.vue"
import store from '@/store/vuex'; 

const links = [
{   path: "/",     
    name: "Home",     
    component: HomePage,
},
{
    path: "/profile/:userId",     // Include the userId parameter in the route
    name: "Profile",
    component: ProfilePage,
},
{   path: "/profile/:userId/collection",     // Include the userId parameter in the route
    name: "Collection",
    component: () => import("../pages/collection-page.vue")
},
{   path: "/inventory",
    name: "Inventory",     
    component: () => import("../pages/inventory-page.vue")
},
{   path: "/forum",
    name: "Forum",
    component: () => import("../pages/forum-page.vue")
},
{   path: "/forum/post/:postId",
    name: "ForumPost",
    component: () => import("../pages/post-page.vue")
},
{   path: "/forum/user-posts/:postId",
    name: "ForumUser",
    component: () => import("../pages/user-posts-page.vue")
},
{   path: "/forum/create-post",
    name: "ForumCreatePost",
    component: () => import("../pages/post-create-page.vue")
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
},
{
    path: "/market/:userId",   // Include the userId parameter in the route
    name: "market",
    component: marketPage
},
{
    path: '/card-selection',
    name: 'CardSelection',
    component: cardSelection,
    meta: { requiresAuth: true }, // Requiere estar autenticado
  },
  {
    path: '/make-offer/:cardId',
    name: 'make-offer',
    component: () => import('../pages/make-offer.vue'),
    meta: { requiresAuth: true }, 
  },
]

const router = createRouter({   
history: createWebHistory(),
    routes: links, 
})  

router.beforeEach((to, from, next) => {
    const currentUser = store.getters.currentUser;
  
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!currentUser) {
        next({ name: 'Login' }); // Redirect to login page if not authenticated (for later)
      } else {
        next();
      }
    } else {
      next(); // Continue if no authentication required
    }
  });

export default router
