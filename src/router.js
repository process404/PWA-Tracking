// filepath: /E:/uni/travel-track/src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Tracking from './views/Tracking.vue'
import Dashboard from './views/Dashboard.vue'
import Settings from './views/Settings.vue' // Import the Settings component

const routes = [
    { path: '/', component: Home },
    { path: '/tracking', component: Tracking },
    { path: '/dashboard', component: Dashboard },
    { path: '/settings', component: Settings } // Add the settings route
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router