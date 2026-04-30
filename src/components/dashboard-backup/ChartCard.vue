<template>
  <div class="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-xl font-semibold text-gray-900">{{ title }}</h2>
      <i :class="['text-2xl', iconClass]"></i>
    </div>
    <div class="relative" :style="{ height: height + 'px' }">
      <slot></slot>
    </div>
    <div class="mt-4 text-sm text-gray-600 text-center">
      {{ description }}
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  icon: { type: String, required: true },
  description: { type: String, required: true },
  height: { type: Number, default: 300 }
})

const iconClass = computed(() => {
  const icons = {
    'graduation': 'fas fa-graduation-cap text-purple-500',
    'users': 'fas fa-users text-blue-500',
    'chart-line': 'fas fa-chart-line text-green-500',
    'calendar': 'fas fa-calendar-alt text-red-500',
    'star': 'fas fa-star text-yellow-500',
    'medal': 'fas fa-medal text-yellow-600',
    'building': 'fas fa-building text-indigo-500',
    'chart-pie': 'fas fa-chart-pie text-teal-500'
  }
  return icons[props.icon] || 'fas fa-chart-bar text-gray-500'
})
</script>