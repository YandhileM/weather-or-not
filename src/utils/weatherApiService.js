import httpService from './httpService'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

const weatherApiService = {
  searchPlaces: (query) => {
    return httpService.get(`/search.json?key=${API_KEY}&q=${query}`)
  },

  getForecast: (locationId) => {
    return httpService.get(
      `/forecast.json?key=${API_KEY}&q=id:${locationId}&days=3&aqi=no&alerts=no`,
    )
  },
}

export default weatherApiService
