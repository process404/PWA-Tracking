<template>
   <div id="map" style="height:90vh;"></div>
</template>

<script>
import { ref } from 'vue';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { openDB, getAllLocations } from '../services/db.js'

const initialMap = ref(null);

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});

var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'png'
});



export default {
    data(){
        return{
            locations: null,
        }
    },
    async mounted(){
        await openDB();
        this.locations = await getAllLocations();

        initialMap.value = L.map('map').setView([55.3781, -3.4360], 6);
        
        const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const tileLayer = isDarkMode ? Stadia_AlidadeSmoothDark : Stadia_AlidadeSmooth;
        
        tileLayer.addTo(initialMap.value);

        this.locations.forEach(location => {
            if (location.latitude && location.longitude) {
            L.marker([location.latitude, location.longitude]).addTo(initialMap.value)
            .bindPopup(`<b>${location.name}</b><br>${location.description}<br><i>${new Date(location.timestamp).toLocaleString()}</i>`);
            }
        });
    }
}
</script>
<style>
    
</style>