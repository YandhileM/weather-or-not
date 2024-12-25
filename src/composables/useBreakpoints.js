// src/composables/useBreakpoints.js
import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useBreakpoints() {
  const windowWidth = ref(window.innerWidth)
  const onWidthChange = () => (windowWidth.value = window.innerWidth)

  onMounted(() => window.addEventListener('resize', onWidthChange))
  onUnmounted(() => window.removeEventListener('resize', onWidthChange))

  const breakpoint = computed(() => {
    if (windowWidth.value < 320) return 'xxs' // Extra extra small devices
    if (windowWidth.value < 375) return 'xs' // Extra small devices (older phones)
    if (windowWidth.value < 425) return 'sm' // Small devices (phones)
    if (windowWidth.value < 640) return 'mdsm' // Medium small devices (large phones)
    if (windowWidth.value < 768) return 'md' // Medium devices (tablets)
    if (windowWidth.value < 1024) return 'lg' // Large devices (laptops/desktops)
    if (windowWidth.value < 1280) return 'xl' // Extra large devices (large laptops)
    if (windowWidth.value < 1440) return '2xl' // 2X large devices (desktop)
    if (windowWidth.value < 1536) return '3xl' // 3X large devices (large desktop)
    if (windowWidth.value < 1920) return '4xl' // 4X large devices (extra large desktop)
    return '5xl' // 5X large devices (4K and up)
  })

  // Device-specific computed properties
  const isExtraExtraSmall = computed(() => breakpoint.value === 'xxs') // < 320px
  const isExtraSmall = computed(() => breakpoint.value === 'xs') // 320px - 374px
  const isSmall = computed(() => breakpoint.value === 'sm') // 375px - 424px
  const isMediumSmall = computed(() => breakpoint.value === 'mdsm') // 425px - 639px
  const isMedium = computed(() => breakpoint.value === 'md') // 640px - 767px
  const isLarge = computed(() => breakpoint.value === 'lg') // 768px - 1023px
  const isExtraLarge = computed(() => breakpoint.value === 'xl') // 1024px - 1279px
  const is2XLarge = computed(() => breakpoint.value === '2xl') // 1280px - 1439px
  const is3XLarge = computed(() => breakpoint.value === '3xl') // 1440px - 1535px
  const is4XLarge = computed(() => breakpoint.value === '4xl') // 1536px - 1919px
  const is5XLarge = computed(() => breakpoint.value === '5xl') // ≥ 1920px

  // Common device type computed properties
  const isMobile = computed(() => ['xxs', 'xs', 'sm', 'mdsm'].includes(breakpoint.value))
  const isTablet = computed(() => ['md', 'lg'].includes(breakpoint.value))
  const isDesktop = computed(() => ['xl', '2xl'].includes(breakpoint.value))
  const isLargeDesktop = computed(() => ['3xl', '4xl', '5xl'].includes(breakpoint.value))

  // Additional helper computed properties
  const isTouchDevice = computed(() => isMobile.value || isTablet.value)
  const isLandscape = computed(() => window.innerWidth > window.innerHeight)

  return {
    breakpoint,
    windowWidth,
    // Individual breakpoint checks
    isExtraExtraSmall,
    isExtraSmall,
    isSmall,
    isMediumSmall,
    isMedium,
    isLarge,
    isExtraLarge,
    is2XLarge,
    is3XLarge,
    is4XLarge,
    is5XLarge,
    // Device type categories
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,
    // Additional helpers
    isTouchDevice,
    isLandscape,
  }
}
