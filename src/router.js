// filepath: /E:/uni/travel-track/src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Tracking from './views/Tracking.vue'
import Dashboard from './views/Dashboard.vue'
import Settings from './views/Settings.vue' 
import Locations from './views/Locations.vue' 

const routes = [
    { path: '/', component: Home },
    { path: '/tracking', component: Tracking },
    { path: '/dashboard', component: Dashboard },
    { path: '/settings', component: Settings },
    { path: '/locations', component: Locations } 
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router