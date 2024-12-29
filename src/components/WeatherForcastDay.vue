<script setup>
import { useBreakpoints } from '@/composables/useBreakpoints'

const { isMobile } = useBreakpoints()
defineProps({ day: Object })
</script>

<template>
    <div class="mb-2 md:mb-3 flex items-center justify-between">
        <table class="w-full">
            <tr class="text-sm md:text-base">
                <!-- day of the week -->
                <td class="w-1/3 py-1 md:py-2">
                    {{ isMobile
                        ? new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })
                        : new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })
                    }}
                </td>

                <!-- icon -->
                <td class="w-1/3">
                    <img :src="day.day.condition.icon" alt="icon" class="mx-auto w-6 md:w-8 lg:w-10" />
                </td>

                <!-- high/low temp -->
                <td class="w-1/3 text-right">
                    <span class="font-medium">{{ Math.round(day.day.maxtemp_c) }}</span>
                    <span class="text-white/80">&nbsp;/&nbsp;</span>
                    <span class="text-white/80">{{ Math.round(day.day.mintemp_c) }}</span>
                </td>
            </tr>
        </table>
    </div>
</template>