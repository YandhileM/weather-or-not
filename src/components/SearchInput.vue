<script setup>
import { reactive } from 'vue'
import weatherApiService from '@/utils/weatherApiService'
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()
const emit = defineEmits(['place-data'])
const searchTerm = reactive({
    query: ``,
    timeout: null,
    results: [],
})

const handleSearch = () => {
    clearTimeout(searchTerm.timeout)
    searchTerm.timeout = setTimeout(async () => {
        if (searchTerm.query !== '') {
            try {
                const { data } = await weatherApiService.searchPlaces(searchTerm.query)
                searchTerm.results = data
            } catch (error) {
                console.error('Search error:', error)
                searchTerm.results = []
            }
        } else {
            searchTerm.results = []
        }
    }, 500)
}

const getWeather = async (id) => {
    try {
        const { data } = await weatherApiService.getForecast(id)
        emit('place-data', data)
        searchTerm.query = ''
        searchTerm.results = []
    } catch (error) {
        console.error('Forecast error:', error)
    }
}
</script>

<template>
    <div class="w-full max-w-2xl mx-auto">
        <!-- search field -->
        <form>
            <div class="bg-white border border-indigo-600/30 rounded-lg shadow-lg flex items-center">
                <i class="fa-solid fa-magnifying-glass p-2 md:p-3 text-indigo-600"></i>
                <input type="text" placeholder="Search place"
                    class="rounded-r-lg p-2 md:p-3 text-sm md:text-base border-0 outline-0 focus:ring-2 focus:ring-indigo-600 ring-inset w-full"
                    v-model="searchTerm.query" @input="handleSearch" />
            </div>
        </form>
        <!-- search suggestions -->
        <div class="bg-white my-2 rounded-lg shadow-lg">
            <div v-if="searchTerm.results.length !== null">
                <div v-for="place in searchTerm.results" :key="place.id">
                    <button @click="getWeather(place.id)"
                        class="px-3 py-2 md:py-3 text-sm md:text-base hover:text-indigo-600 hover:font-bold w-full text-left">
                        {{ place.name }}, {{ place.region }}, {{ place.country }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>