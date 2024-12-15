
<template>
  <Nav :ver="ver"/>
  <router-view class="h-auto min-h-full lg:h-full lg:min-h-0"></router-view>
  <Footer></Footer>
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
