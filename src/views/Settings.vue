<template>
    <main style="display: flex; flex-direction: column; overflow-x:hidden" class="pt-8 pl-4 pr-4 w-full" id="app">
        <section class="h-auto w-full flex flex-col items-center">
            <div class="max-w-[1000px] w-full h-auto flex flex-col items-center border-[1px] rounded-md border-neutral-700 sm:ml-8 ml-4 mr-4 sm:mr-8 sm:pt-6 sm:pb-6 pl-2 pr-2 sm:pl-12 sm:pr-12 pb-2">
                <h2 class="dark:text-white text-2xl font-semibold sm:mt-1 mt-4 mb-4">Settings</h2>
                <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                    <div class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3">
                        <div class="w-[125px] flex items-center justify-center">
                            <input type="checkbox" class="switch blue" v-model="darkMode" @click="toggleDarkMode">
                        </div>
                        <div class="w-full">
                            <h3 class="dark:text-neutral-300 mb-2">Dark Mode</h3>
                            <p class="dark:text-neutral-400 text-sm italic">Change website appearance between Dark and Light modes.</p>
                        </div>
                    </div>
                </div>
                <div class="border-[1px] border-neutral-700 rounded-md w-full flex flex-col mt-4">
                    <button class="w-full flex justify-between p-4 items-center group" @click="toggleAdvancedDropdown">
                        <h3 class="dark:text-white text-xl font-semibold">Advanced</h3>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down-fill w-5 h-5 opacity-50 group-hover:opacity-100 duration-100 dark:fill-neutral-200" viewBox="0 0 16 16" :class="{ 'rotate-180': advancedDropdown }">
                            <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                        </svg>
                    </button>
                    <template v-if="advancedDropdown">
                        <div class="border-neutral-700 border-[1px] m-4">
                            <article class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3 md:flex-row flex-col">
                                <div class="md:w-3/4 w-full">
                                    <h3 class="dark:text-neutral-300 mb-2">Control frequency and accuracy of tracking</h3>
                                    <p class="dark:text-neutral-400 text-sm italic">Control frequency and accuracy of tracking requests to suit battery usage requirements.</p>
                                </div>
                                <div class="w-full flex items-center justify-center flex-col gap-2  border-[1px] p-2 border-neutral-700 rounded-sm">
                                    <div class="w-full">
                                        <label for="trackingFrequency" class="dark:text-neutral-300 w-full">Tracking Frequency</label>
                                        <input type="range" id="trackingFrequency" min="10" max="3600" class="w-full mt-2" v-model="trackingFrequency" @input="updateTrackingFrequency">
                                        <div class="flex items-center">
                                            <p class="dark:text-neutral-400 text-sm italic w-full">{{ trackingFrequency }} seconds ( {{ trackingFrequencyInMinutes() }} minutes )</p>
                                            <input type="number" min="10" max="3600" class="input reduced" v-model="trackingFrequency" @input="updateTrackingFrequency">
                                        </div>
                                    </div>
                                    <hr class="h-[1px] bg-neutral-700 border-none w-full">
                                    <div class="w-full flex justify-between gap-4">
                                        <label for="trackingAccuracy" class="dark:text-neutral-300">Tracking Accuracy</label>
                                        <input type="checkbox" class="switch blue" v-model="trackingAccuracy" @change="updateTrackingAccuracy">
                                    </div>
                                    <hr class="h-[1px] bg-neutral-700 border-none w-full">
                                    <div class="w-full flex justify-between gap-4">
                                        <label for="trackingMoving" class="dark:text-neutral-300 w-2/3">Do not add to DB during long periods of inactivity</label>
                                        <input type="checkbox" class="switch blue" v-model="trackingMoving" @change="updateTrackingMoving">
                                    </div>
                                
                                </div>
                            </article>
                            <article class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3 md:flex-row flex-col">
                                <div class="md:w-3/4 w-full">
                                    <h3 class="dark:text-neutral-300 mb-2">Print database data to console</h3>
                                    <p class="dark:text-neutral-400 text-sm italic">Print data from database to console to check or store elsewhere</p>
                                </div>
                                <div class="md:w-1/3 w-full flex items-center justify-center flex-col gap-2">
                                    <button class="button w-full hover:before:bg-blue-800 hover:before:bg-opacity-80 md:max-w-[170px]" @click="printData('loc')">Print Locations</button>
                                </div>
                            </article>
                            <article class="flex items-center gap-6 pt-4 pb-4 pl-3 pr-3 md:flex-row flex-col">
                                <div class="md:w-3/4 w-full">
                                    <h3 class="dark:text-neutral-300 mb-2">Manage Data</h3>
                                    <p class="dark:text-neutral-400 text-sm italic">Clear parts of or all of the data stored. Either to free up storage, clear old plans or because of a technical issue. <br><br><span class="dark:text-yellow-300 text-yellow-800 font-semibold dark:font-normal">Warning! These actions are permanent and cannot be reversed (except getting stations from the database).</span></p>
                                </div>
                                <div class="md:w-1/3 w-full flex items-center justify-center">
                                    <template v-if="understood">
                                        <div class="w-full flex justify-end items-center flex-col gap-2">
                                            <button class="button red md:max-w-[170px] darkbefore w-full text-sm" @click="clearLocations()">Clear Locations</button>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <button class="button w-full md:max-w-[200px]" @click="understood = true">Click to reveal options<br><span class="text-xs">(Acknowledge warning)</span></button>
                                    </template>
                                </div>
                            </article>
                        </div>
                    </template>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import {getAllLocations, clearLocations} from '../services/db.js';
export default {
    mounted() {
        window.scrollTo(0, 0);
        this.darkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
        // this.$router.push('/');
    },
    data(){
        return{
            darkMode: false,
            advancedDropdown: false,
            understood: false,
            trackingFrequency: 0,
            trackingAccuracy: true,
            trackingMoving: false
        }
    },
    methods:{
        toggleAdvancedDropdown(){
            this.advancedDropdown = !this.advancedDropdown;
        },
        toggleDMCode(){
            document.documentElement.classList.toggle(
            'dark',
                localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
            );
            this.$root.darkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
            this.darkMode = this.$root.darkMode;
        },
        toggleDarkMode(){
            if(this.darkMode){
                localStorage.theme = 'light';
            }else{
                localStorage.theme = 'dark';
            }
            this.darkMode = this.$root.darkMode;
            this.toggleDMCode();
        },
        async printData(type){
            if(type === 'loc'){
                console.log(await getAllLocations());
            }
        },
        async clearLocations(){
            if (confirm('Are you sure you want to clear all locations? This action cannot be undone.')) {
                await clearLocations();
                alert('Locations cleared successfully.');
                this.understood = false;
                window.location.reload();
            }else{
                this.understood = false;
                window.location.reload();
            }
        },
        trackingFrequencyInMinutes() {
            return (this.trackingFrequency / 60).toFixed(2);
        },
        updateTrackingFrequency(){
            this.$root.trackTimeout = this.trackingFrequency;
            localStorage.setItem('trackingInterval', this.trackingFrequency);
        },
        updateTrackingAccuracy(){
            this.$root.accuracy = this.trackingAccuracy;
            localStorage.setItem('acc_var', this.trackingAccuracy);
        },
        updateTrackingMoving(){
            this.$root.movementMode = this.trackingMoving;
            localStorage.setItem('time_out_var', this.trackingMoving);
        }
    },
    mounted(){
        this.trackingFrequency = this.$root.trackTimeout ?? localStorage.getItem('trackingInterval') ?? 120;
        this.trackingAccuracy = this.$root.accuracy ?? (localStorage.getItem('acc_var') === 'true');
        this.trackingMoving = this.$root.movementMode ?? (localStorage.getItem('time_out_var') === 'false');

        this.toggleDMCode();
    }
}
</script>
<style>
    
</style>