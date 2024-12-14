
<template>
  <Nav :ver="ver"/>
  <router-view class="h-full"></router-view>
  <Footer></Footer>
</template>

<script>
  import Nav from './components/Nav.vue';
  import Footer from './components/Footer.vue';
  import { startTracking, stopTracking } from './services/tracking.js';

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
      }
    }
  }
  
</script>
<style scoped>

</style>
