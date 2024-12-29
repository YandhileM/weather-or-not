<script setup>
import { ref } from 'vue'
import BorderLine from './BorderLine.vue'
import WeatherForcastDay from './WeatherForcastDay.vue'
import WeatherInfo from './WeatherInfo.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()
defineProps({
    place: Object,
})
const emit = defineEmits(['delete-place'])
const removePlace = (placeName) => {
    emit('delete-place', placeName)
    showDetail.value = false
}
const showDetail = ref(false)
</script>

<template>
    <div class="text-white p-4 md:p-6 lg:p-10 rounded-lg shadow-lg gap-4 md:gap-6 mb-4 md:mb-6 relative overflow-hidden"
        :class="place.current.is_day === 1 ? 'bg-day' : 'bg-night'">
        <!-- Location & time -->
        <div class="mb-2 flex justify-between items-center">
            <div class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-location-dot text-sm md:text-base"></i>
                <h1 class="text-xl md:text-2xl lg:text-3xl">{{ place.location.name }}</h1>
            </div>
            <div class="flex items-center justify-center gap-2">
                <i class="fa-solid fa-clock text-sm md:text-base"></i>
                <h1 class="text-xl md:text-2xl lg:text-3xl">
                    {{ new Date(place.location.localtime).getHours() }}:{{
                        new Date(place.location.localtime).getMinutes()
                    }}
                </h1>
            </div>
        </div>

        <!-- current weather -->
        <div class="text-center flex-1">
            <img :src="place.current.condition.icon" alt="icon" :class="isMobile ? 'w-32' : 'w-40 lg:w-48'"
                class="mx-auto -mb-6 md:-mb-8 lg:-mb-10" />
            <h1 class="text-6xl md:text-7xl lg:text-9xl mb-2">{{ Math.round(place.current.temp_c) }}&deg;</h1>
            <p class="text-lg md:text-xl lg:text-2xl">{{ place.current.condition.text }}</p>
        </div>

        <BorderLine />

        <!-- forecast -->
        <div v-for="(day, index) in place.forecast.forecastday" :key="index">
            <WeatherForcastDay :day="day" />
        </div>

        <!-- info -->
        <Transition name="fade">
            <div v-show="showDetail">
                <WeatherInfo :place="place" @close-info="showDetail = false"
                    @remove-place="removePlace(place.location.name)" />
            </div>
        </Transition>

        <!-- forecast btn -->
        <div class="flex justify-end items-center gap-1 mt-6 md:mt-8 lg:mt-10">
            <button @click="showDetail = true" class="text-sm md:text-base">
                More <i class="fa-solid fa-arrow-right text-xs md:text-sm -mb-px"></i>
            </button>
        </div>
    </div>
</template>

<style scoped>
.bg-day {
    background-color: #8ec5fc;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
}

.bg-night {
    background-color: #07223d;
    background-image: linear-gradient(62deg, #0a2a4a 0%, #270845 100%);
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>