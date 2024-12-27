<script setup>
import { ref } from 'vue'
import SearchInput from './components/SearchInput.vue'
import WeatherCard from './components/WeatherCard.vue'

const places = ref([])

const addPlace = (data) => {
  places.value.push(data)
  // console.log(data)
}

const deletePlace = (name) => {
  // console.log(name)
  if (confirm('Are you sure you want to delete this place?')) {
    places.value = places.value.filter((place) => place.location.name !== name)
  }
}
</script>

<template>
  <!-- Date -->

  <div class="text-center mb-6">
    {{
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    }}
  </div>
  <!-- Search  -->
  <div>
    <SearchInput @place-data="addPlace" />
  </div>

  <!-- Weather cards -->
  <div class="grid grid-cols-2 gap-4">
    <div v-for="(place, index) in places" :key="index">
      <WeatherCard :place="place" @delete-place="deletePlace" />
    </div>
  </div>
</template>
