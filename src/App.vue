<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'
import WeatherCard from './components/WeatherCard.vue'
import { useBreakpoints } from '@/composables/useBreakpoints'

const places = ref([])
const { isMobile, isTablet, isDesktop } = useBreakpoints()

const addPlace = (data) => {
  places.value.push(data)
}

const deletePlace = (name) => {
  if (confirm('Are you sure you want to delete this place?')) {
    places.value = places.value.filter((place) => place.location.name !== name)
  }
}
</script>

<template>
  <!-- Date -->
  <div class="text-center mb-4 md:mb-6 text-sm md:text-base">
    {{
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }}
  </div>

  <!-- Search -->
  <div class="px-4 md:px-6 lg:px-8 mb-4 md:mb-6">
    <SearchInput @place-data="addPlace" />
  </div>

  <!-- Weather cards -->
  <div class="grid gap-4 px-4 md:px-6 lg:px-8" :class="{
    'grid-cols-1': isMobile,
    'grid-cols-2': isTablet,
    'grid-cols-3': isDesktop
  }">
    <div v-for="(place, index) in places" :key="index">
      <WeatherCard :place="place" @delete-place="deletePlace" />
    </div>
  </div>
</template>