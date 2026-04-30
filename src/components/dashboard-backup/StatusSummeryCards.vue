<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-green-600 text-sm font-semibold">Active Officers</p>
          <p class="text-3xl font-bold text-green-700">{{ activeOfficers }}</p>
          <p class="text-xs text-green-500 mt-2">Currently serving</p>
        </div>
        <i class="fas fa-user-check text-4xl text-green-500"></i>
      </div>
    </div>
    
    <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-blue-600 text-sm font-semibold">On Probation</p>
          <p class="text-3xl font-bold text-blue-700">{{ probationOfficers }}</p>
          <p class="text-xs text-blue-500 mt-2">Interns in probation period</p>
        </div>
        <i class="fas fa-clock text-4xl text-blue-500"></i>
      </div>
    </div>
    
    <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-lg p-6 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-purple-600 text-sm font-semibold">Ready for Promotion</p>
          <p class="text-3xl font-bold text-purple-700">{{ readyPromotion }}</p>
          <p class="text-xs text-purple-500 mt-2">Completed 1+ year probation</p>
        </div>
        <i class="fas fa-arrow-up text-4xl text-purple-500"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activeOfficers: { type: Number, required: true },
  probationOfficers: { type: Number, required: true },
  readyPromotion: { type: Number, required: true }
})
</script>