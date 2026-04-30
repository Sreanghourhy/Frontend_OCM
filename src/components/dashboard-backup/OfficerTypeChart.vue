<template>
  <ChartCard title="ប្រភេទមន្ត្រី" icon="users" description="ការបែងចែកមន្ត្រីតាមប្រភេទ">
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
    validator: (value) => value.labels && value.data
  }
})

const chartCanvas = ref(null)
let chart = null

const createChart = () => {
  if (chart) chart.destroy()
  
  chart = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: props.data.labels,
      datasets: [{
        data: props.data.data,
        backgroundColor: ['#667eea', '#764ba2', '#f59e0b', '#10b981', '#ef4444'],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'bottom' },
        tooltip: { callbacks: { label: (ctx) => `${ctx.label}: ${ctx.raw} មន្ត្រី` } }
      }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>