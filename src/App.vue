
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
        darkMode: true,
        trackTimeout: 120,
        accuracy: true,
        stationeryMode: false,
        movementMode: false,
      };
    },
    methods:{
      toggleTracking(){
        this.tracking = !this.tracking;
        if(this.tracking){
          // console.log("VARS ", this.trackTimeout, this.accuracy, this.movementMode);
          if (localStorage.getItem('trackingInterval')) {
            this.trackTimeout = localStorage.getItem('trackingInterval');
          }
          if (localStorage.getItem('acc_var')) {
            this.accuracy = localStorage.getItem('acc_var') === 'true';
          }
          if (localStorage.getItem('time_out_var')) {
            this.movementMode = localStorage.getItem('time_out_var') === 'true';
          }
          startTracking(this.trackTimeout,this.accuracy, this.movementMode);
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

      this.trackTimeout = localStorage.getItem('trackingInterval');
      this.movementMode = localStorage.getItem('time_out_var');
      this.accuracy = localStorage.getItem('acc_var');

      
      if(this.trackTimeout == null){
        localStorage.setItem('trackingInterval', 120);
        this.trackTimeout = 120;
      }
      
      if(this.movementMode == null){
        localStorage.setItem('time_out_var', false);
        this.movementMode = false;
      }

      if(this.accuracy == null){
        localStorage.setItem('acc_var', true);
        this.accuracy = true;
      }
      
      // console.log(this.trackTimeout);
      // console.log(this.movementMode);
      // console.log(this.accuracy);
    }
  }
  
</script>
<style scoped>

</style>
