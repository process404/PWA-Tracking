
<template>
  <Nav :ver="ver"/>
  <router-view></router-view>
  <Footer class="mt-auto"></Footer>
</template>

<script>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';
  import { startTracking, stopTracking, getCount, checkIfTracking } from './services/tracking.js';

  export default {
    components: {
      Nav,
      Footer
    },
    data() {
      return {
        ver: 'main',
        tracking: false
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
      async checkIfTracking(){
        return await checkIfTracking();
      }
    },
    mounted(){
      this.tracking = this.checkIfTracking();
    }
  }
  
</script>
<style scoped>

</style>
