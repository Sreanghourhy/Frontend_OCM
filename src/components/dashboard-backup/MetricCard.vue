<template>
  <div class="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
    <div class="flex items-center justify-between">
      <div class="w-full ">
        <p class="text-gray-500 text-sm font-semibold text-center">{{ title }}</p>
        <p class="text-3xl font-bold text-gray-900 text-center ">{{ value }}</p>
        <p v-if="trend" class="text-xs mt-2" :class="trendColor">
          {{ trend }}
        </p>
      </div>
      <i :class="['text-4xl', iconClass]"></i>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  value: { type: [String, Number], required: true },
  icon: { type: String, required: true },
  trend: { type: String, default: null },
  trendType: { type: String, default: 'up' } // 'up' or 'down'
})

const iconClass = computed(() => {
  const icons = {
    'users': 'fas fa-users text-blue-500',
    'calendar': 'fas fa-calendar text-purple-500',
    'briefcase': 'fas fa-briefcase text-green-500',
    'building': 'fas fa-building text-orange-500',
    'user-check': 'fas fa-user-check text-green-500',
    'clock': 'fas fa-clock text-blue-500',
    'arrow-up': 'fas fa-arrow-up text-purple-500'
  }
  return icons[props.icon] || 'fas fa-chart-line text-gray-500'
})

const trendColor = computed(() => {
  if (!props.trend) return ''
  return props.trendType === 'up' ? 'text-green-500' : 'text-red-500'
})
</script>