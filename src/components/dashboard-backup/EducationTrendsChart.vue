<template>
  <ChartCard title="Education Trends Over Years" icon="chart-line" description="Number of graduates by education level over time" :height="400">
    <canvas ref="chartCanvas"></canvas>
  </ChartCard>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import ChartCard from './ChartCard.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
    validator: (value) => value.years && value.phd && value.masters && value.bachelors
  }
})

const chartCanvas = ref(null)
let chart = null

const createChart = () => {
  if (chart) chart.destroy()
  
  chart = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: props.data.years,
      datasets: [
        {
          label: 'PhD Graduates',
          data: props.data.phd,
          borderColor: '#8b5cf6',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          tension: 0.4,
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: '#8b5cf6'
        },
        {
          label: "Master's Graduates",
          data: props.data.masters,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: '#3b82f6'
        },
        {
          label: "Bachelor's Graduates",
          data: props.data.bachelors,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: false,
          pointRadius: 5,
          pointBackgroundColor: '#10b981'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'top' } }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>