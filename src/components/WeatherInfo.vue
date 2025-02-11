<script setup>
import { useBreakpoints } from '@/composables/useBreakpoints'

// const { isMobile } = useBreakpoints()
defineProps({ place: Object })
</script>

<template>
    <div class="absolute bg-white/80 backdrop-blur-sm text-slate-900 inset-x-0 bottom-0 rounded-t-lg p-4 md:p-6 lg:p-8">
        <!-- Close button -->
        <div class="flex justify-end mb-6 md:mb-8 lg:mb-10">
            <button @click="$emit('close-info')" class="p-1">
                <i class="fa-solid fa-xmark text-lg md:text-xl"></i>
            </button>
        </div>

        <div class="flex items-center justify-between gap-4 md:gap-6 mb-12 md:mb-16 lg:mb-20">
            <!-- Wind speed -->
            <div class="text-center flex-1">
                <i class="fa-solid fa-wind text-xl md:text-2xl mb-2"></i>
                <p class="text-lg md:text-xl font-bold">{{ place.current.wind_kph }} km/h</p>
                <p class="text-sm md:text-base">wind</p>
            </div>
            <!-- Humidity level -->
            <div class="text-center flex-1">
                <i class="fa-solid fa-droplet text-xl md:text-2xl mb-2"></i>
                <p class="text-lg md:text-xl font-bold">{{ place.current.humidity }}%</p>
                <p class="text-sm md:text-base">humidity</p>
            </div>
            <!-- Precipitation -->
            <div class="text-center flex-1">
                <i class="fa-solid fa-umbrella text-xl md:text-2xl mb-2"></i>
                <p class="text-lg md:text-xl font-bold">{{ place.current.precip_mm }} mm</p>
                <p class="text-sm md:text-base">precipitation</p>
            </div>
        </div>

        <div class="flex items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8 lg:mb-10">
            <!-- Other metrics -->
            <div class="text-center flex-1">
                <i class="fa-solid fa-fan text-xl md:text-2xl mb-2"></i>
                <p class="text-lg md:text-xl font-bold">{{ place.current.win_dir }}</p>
                <p class="text-sm md:text-base">direction</p>
            </div>
            <div class="text-center flex-1">
                <i class="fa-solid fa-temperature-half text-xl md:text-2xl mb-2"></i>
                <p class="text-lg md:text-xl font-bold">{{ Math.round(place.current.feelslike_c) }}&deg;</p>
            </div>
            <div class="text-center flex-1">
                <i class="fa-solid fa-sun text-xl md:text-2xl mb-2"></i>
                <p class="text-lg md:text-xl font-bold">{{ place.current.uv }}</p>
                <p class="text-sm md:text-base">UV index</p>
            </div>
        </div>

        <!-- Last update and delete -->
        <div class="flex justify-between items-center text-sm md:text-base">
            <h3 class="text-slate-900/50">last update: {{ place.current.last_updated }}</h3>
            <button @click="$emit('remove-place')">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    </div>
</template>