<template>
    <main class="w-full h-full lg:h-screen bg-teal-900 bg-opacity-50 flex items-center justify-center lg:pt-4 lb:pb-4 pt-16 pb-16">
        <div class="w-full h-full max-w-[1400px] flex items-center justify-center lg:gap-24 md:gap-12 xl:gap-48 md:pl-12 md:pr-12 pr-6 pl-6 lg:flex-row flex-col">
            <div class="xl:max-w-[75ch] max-w-[60ch] flex flex-col gap-8">
                <h1 class="text-white text-6xl mb-4 font-semibold text-center">Live Tracking</h1>
                <p class="text-white text-center">Live Tracking is a way to track your journeys automatically based on your device location. By using the location and several factors such as speed, distance and time, the journey start / end points aswell as the mode of transport use can be calculated. You can request your statistics and see your data on the <router-link to="/dashboard" class="line teal">dashboard page</router-link><br><br>This not not only allows you to break free of manually 'noting' down your journeys, but also allows you to see how sustainable your travel is and how much you are active per day from a fitness perspective.<br><br>As with any location services, be mindful as to the extra battery usage that using this tracking tool may cause.</p>
            </div>
            <hr class="w-full border-white lg:hidden block mt-12 mb-12 md:mt-0 md:mb-0">
            <div class="w-full flex items-center justify-center flex-col gap-4 h-full lg:pt-8 lg:pb-8">
                <h2 class="text-white text-3xl font-semibold italic text-center">Ready to start?</h2>
                <p class="text-white text-center mt-4">Simply click the button below to start tracking<br><br>On the <router-link class="line teal" to="/dashboard">dashboard page</router-link> you can request a overview of your recent activity any time. All location data is stored on the device and you can manage this at any time from the <span><router-link class="line teal" to="/settings">settings page</router-link></span>, data is only used outside of your device to process activity overviews. </p>
                <div class="border-[1px] border-white border-opacity-50 p-4 rounded-sm w-full mt-8 flex flex-col">
                    <h3 v-if="!tracking" class="text-white w-full text-center italic m-0 font-semibold text-xl">Click the button to enable tracking</h3>
                    <h3 v-else class="text-white w-full text-center italic m-0 font-semibold text-xl">Click the button to stop tracking</h3>
                    <h4 v-if="!tracking" class="w-full text-center text-white text-opacity-50 italic hidden sm:inline-block">Currently not enabled</h4>
                    <h4 v-else class="w-full text-center text-white mt-0 text-opacity-50 italic hidden sm:inline-block">Tracking enabled, location logs: {{trackCount}} </h4>
                    <button class="w-full h-64 group border-[1px] border-white border-opacity-50 bg-black bg-opacity-20 rounded-md mt-4 flex items-center" @click="toggle()" :aria-label="tracking ? 'Stop tracking' : 'Start tracking'">  
                        <div class="w-full h-full relative flex items-center justify-center">
                            <svg v-if="!tracking" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-full h-full absolute stroke-white opacity-70 group-hover:opacity-5 duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <svg v-if="tracking" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-full h-full absolute stroke-white opacity-0 md:group-hover:opacity-100 duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                            <svg v-if="!tracking" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-1/2 h-1/2 absolute stroke-white opacity-20 group-hover:opacity-100 duration-200">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <svg v-if="tracking" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-1/2 h-1/2 absolute stroke-white opacity-100 md:group-hover:opacity-20 duration-200 pulse group-hover:animate-none">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                        </div>
                    </button>
                    <h4 v-if="!tracking" class="w-full text-center mt-3 text-white text-opacity-50 italic sm:hidden inline-block">Currently not enabled</h4>
                    <h4 v-else class="w-full text-center text-white mt-3 text-opacity-50 italic sm:hidden inline-block">Tracking enabled, location logs: {{trackCount}} </h4>
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import { checkIfTracking } from '../services/tracking.js';
import { getCount } from '../services/db.js';
export default {
    data(){
        return{
            tracking: false,
            trackCount: 0
        }
    },
    methods:{
        async toggle(){
            await this.$root.toggleTracking();
            this.tracking = await checkIfTracking();
        },
        async updateTrackCount() {
            this.trackCount = await getCount();
        }
    },
    mounted() {
        window.scrollTo(0, 0);
        this.tracking = false;
        this.updateTrackCount();
        this.interval = setInterval(async () => {
            this.tracking = await checkIfTracking();
            console.log(this.tracking);
            await this.updateTrackCount();
        }, 60000);
    },
    beforeDestroy() {
        clearInterval(this.interval);
    }
}
</script>
<style>
    .anim1{
        opacity: 0;
    }
    .anim2{
        opacity: 0;
    }
    .anim3{
        opacity: 0;
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; }
        50% { opacity: 1; }
    }

    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }

    .anim1 {
        animation: fadeInOut 2s infinite;
        animation-delay: 0s;
    }

    .anim2 {
        animation: fadeInOut 2s infinite;
        animation-delay: 1s;
    }

    .anim3 {
        animation: fadeInOut 2s infinite;
        animation-delay: 2s;
    }

    .pulse{
        animation: pulse 1s infinite;
    }
</style>
