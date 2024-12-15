<template>
    <footer class="dark:bg-black dark:bg-opacity-20 opacity-100 bg-opacity-20 bg-neutral-400 w-full min-h-[50px] p-2 flex items-center justify-between">
        <h1 class="text-center dark:text-white text-neutral-900 text-xs dark:opacity-70 italic">Travel-Track / 2024-2025</h1>
        <div class="flex gap-3">
            <button class="button text-sm mods p-1" @click="navigateTo('/')">Home</button>
            <!-- <button class="button text-sm mods p-1" @click="navigateTo('/settings')">Settings</button> -->
        </div>
    </footer>
</template>

<script>
export default {
    methods: {
        navigateTo(path) {
            window.location.href = path;
        }
    }
}
</script>

<style>
.mods {
    @apply text-neutral-200;
}
</style>