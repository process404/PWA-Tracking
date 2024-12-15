<template>
    <main class="relative h-full backgroundImg overflow-hidden">
        <div class="lg:h-full min-h-screen w-full top-0 left-0 flex lg:flex-row flex-col items-center justify-center gap-16 h-auto p-8 relative" style="z-index: 1;">
            <div class="flex lg:max-w-[600px] flex-col items-center justify-start h-auto pb-8 gap-4 bg-neutral-900 rounded-md p-4 lg:p-8 w-full z-10">
                <h1 class="text-white text-4xl font-semibold">Travel-Track</h1>
                <hr class="border-neutral-700 h-[1px] w-full outline-none">
                <p class="text-white text-center mt-4">Travel-Track is an app to automatically track your travels on a map. You can toggle automatic location logging and then the application will work out what journeys you have undertaken by foot, bike, train, plane or car. <br><br>This is useful for people who are concious about their sustainability and fitness and would like to know data about how they are meeting those goals, aswell as those who like to see their travels mapped out on a map. Wether that be people who would like to know their sustainability, fitness or general travel statistics, this app aims to meet those needs. <br><br>By working out the journeys automatically, it saves you time in not inputting data manually, allowing you to set the app to track and to get out there without worrying about constantly inputting data.</p>
                <div class="border-[1px] border-neutral-700 w-full rounded-md p-4 mt-8">
                    <!-- <h2 class="text-white text-xl font-semibold italic w-full text-center">You can begin here</h2> -->
                    <router-link to="/tracking" class="button teal homeMods">Go to Tracking</router-link>
                    <router-link to="/dashboard" class="button teal homeMods mt-2">Go to Dashboard</router-link>
                </div>
            </div>
            <img src="../images/map.jpg" class="lg:w-1/3 lg:max-w-[600px] min-h-[400px] h-[33vw] lg:max-h-none w-full rounded-md" alt="preview_img">
        </div>
    </main>
</template>
<script>
export default {
    
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
        background-image: url('../images/map.jpg');
        background-size: cover;
        background-position: center;
        filter: blur(8px);
        z-index: 0;
    }
</style>