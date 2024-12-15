<template>
   <div id="map" style="height:90vh;"></div>
</template>

<script>
import { ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { openDB, getAllLocations } from '../services/db.js'

const initialMap = ref(null);

export default {
    data(){
        return{
            locations: null,
        }
    },
    async mounted(){
        window.scrollTo(0, 0);
        await openDB();
        this.locations = await getAllLocations();
        console.log(this.locations);

        initialMap.value = L.map('map').setView([55.3781, -3.4360], 6);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(initialMap.value);

        this.locations.forEach(location => {
            if (location.coords && location.coords.latitude && location.coords.longitude) {
            L.marker([location.coords.latitude, location.coords.longitude]).addTo(initialMap.value)
            .bindPopup(`<b>${location.name || 'Location'}</b><br>${location.description || ''}<br><i>${new Date(location.timestamp).toLocaleString()}</i>`);
            }
        });
    }
}
</script>
<style>
    
</style>