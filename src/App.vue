
<template>
  <Nav :ver="ver"/>
  <router-view></router-view>
  <Footer class="mt-auto"></Footer>
</template>

<script>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';
  import { startTracking, stopTracking, checkIfTracking } from './services/tracking.js';
  import { getCount } from './services/db.js';

  export default {
    components: {
      Nav,
      Footer
    },
    data() {
      return {
        ver: 'main',
        tracking: false,
        darkMode: false 
      };
    },
    methods:{
      toggleTracking(){
        this.tracking = !this.tracking;
        if(this.tracking){
          startTracking();
        }else{
          stopTracking();
        }
      },
      async getTrackCount(){
        return await getCount();
      },
    },
    async mounted(){
      document.documentElement.classList.toggle(
      'dark',
        localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
      this.darkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      this.tracking = await checkIfTracking();

    }
  }
  
</script>
<style scoped>

</style>
