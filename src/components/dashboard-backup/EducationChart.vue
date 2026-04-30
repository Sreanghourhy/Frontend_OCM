<template>
  <ChartCard title="កម្រិតអប់រំ" icon="graduation" description="ការប្រៀបធៀបកម្រិតអប់រំក្នុងជួរមន្ត្រី">
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
    type: 'bar',
    data: {
      labels: props.data.labels,
      datasets: [{
        label: 'ចំនួនមន្ត្រី',
        data: props.data.data,
        backgroundColor: 'rgba(103, 126, 234, 0.7)',
        borderColor: 'rgba(103, 126, 234, 1)',
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        tooltip: { callbacks: { label: (ctx) => `${ctx.raw} មន្ត្រី` } }
      }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>