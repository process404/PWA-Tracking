<template>
    <nav class="bg-black w-full min-h-16 p-2 flex pl-4 pr-4 items-center justify-center">
        <div v-if="ver === 'main'" class="max-w-[1000px] flex items-center justify-between w-full gap-4">
            <div class="flex gap-4 items-center">
                <h2 class="text-white text-2xl font-semibold">Travel-Track</h2>
                <div class="flex h-full">
                    <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-red-600 block"></span>
                    <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-blue-600 block"></span>
                    <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-neutral-400 block"></span>
                </div>
            </div>
            <!-- <div>
                <button class="flex items-center" @click="goToSettings" aria-label="Settings">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear-fill fill-white w-5 h-5 opacity-30 hover:opacity-100 duration-300 active:rotate-180" viewBox="0 0 16 16">
                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                    </svg>
                </button>
            </div> -->
        </div>
        <div v-if="ver === 'back'" class="max-w-[1000px] flex justify-between w-full">
            <button @click="goBack" class="button tonal x-padding text-white bg-neutral-700 p-2 rounded-sm pl-4 pr-4">Go Back</button>
            <div class="flex h-full mt-auto">
                <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-red-600 block"></span>
                <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-blue-600 block"></span>
                <span style="clip-path: polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%);" class="w-6 h-2 bg-neutral-400 block"></span>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    props: ['ver'],
    methods: {
        goBack() {
            window.history.back();
        },
        goToSettings() {
            window.location.href = 'settings';
        }
    }
}
</script>

<style scoped>
/* Add any scoped styles here */
</style>