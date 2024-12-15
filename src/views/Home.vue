<template>
    <main class="relative h-full backgroundImg overflow-hidden">
        <div class="lg:h-full min-h-[90vh] w-full top-0 left-0 flex lg:flex-row flex-col items-center justify-center gap-8 h-auto p-8 pt-8 md:pt-0 relative pb-16" style="z-index: 1;">
            <div class="flex max-w-[1100px] lg:max-w-[90ch] lg:h-[800px] h-auto items-center justify-center pb-8 gap-4 lg:p-8 w-full z-10">
                <div class=" rounded-md p-4 lg:p-8 flex flex-col items-center justify-center gap-4 lg:h-[700px]">
                    <div class="pb-8 md:pb-16 md:pt-12 lg:pt-4 lg:pb-0">
                        <h4 class="text-center italic text-white opacity-70 mb-3">About this App</h4>
                        <h1 class="text-white text-5xl break-none md:text-7xl font-semibold text-center" style="z-index: 2;">Travel-Track</h1>
                        <hr class="border-white border-opacity-50 mt-12 mb-12 lg:mb-0">
                        <img src="/images/resized.webp" class="rounded-md inline-block lg:hidden object-cover" alt="preview_img" width="600" height="400"/>
                    </div>
                    <hr class="border-white border-opacity-50 h-[1px] w-full outline-none block lg:hidden">
                    <p class="text-white text-center mt-4 text-sm max-w-[75ch]">Travel-Track is an app to automatically track your travels on a map. You can toggle automatic location logging and then the application will work out what journeys you have undertaken by foot, bike, train, plane or car. <br><br>This is useful for people who are concious about their sustainability and fitness and would like to know data about how they are meeting those goals, aswell as those who like to see their travels mapped out on a map. Wether that be people who would like to know their sustainability, fitness or general travel statistics, this app aims to meet those needs. <br><br>By working out the journeys automatically, it saves you time in not inputting data manually, allowing you to set the app to track and to get out there without worrying about constantly inputting data.</p>
                    <div class="border-[0px]  w-full rounded-md p-4 mt-8 max-w-[75ch]">
                        <!-- <h2 class="text-white text-xl font-semibold italic w-full text-center">You can begin here</h2> -->
                        <router-link to="/tracking" class="button teal homeMods">Go to Tracking</router-link>
                        <router-link to="/dashboard" class="button teal homeMods mt-2">Go to Dashboard</router-link>
                    </div>
                </div>
            </div>
            <v-lazy-image src="/images/map.webp" src-placeholder="/images/preload.webp" class="p-4 lg:p-8 lg:max-w-[1100px] h-[500px] lg:h-[700px] lg:max-h-none lg:w-1/4 w-full rounded-md object-cover hidden lg:inline-block" alt="preview_img"/>
        </div>
    </main>
</template>
<script>
import VLazyImage from 'v-lazy-image';

export default {
    components:{
        "v-lazy-image": VLazyImage,
    },
    mounted(){
        window.scrollTo(0, 0);
    }
}
</script>
<style>
    .homeMods{
        @apply w-full min-h-[40px] text-center flex items-center justify-center;
    }

    .backgroundImg::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        z-index: 0;
        @apply bg-teal-900 bg-opacity-50
    }

    .lazyload {
    opacity: 0;
    transition: opacity 0.5s;
    }

    .lazyload.lazyloaded {
    opacity: 1;
    }


</style>