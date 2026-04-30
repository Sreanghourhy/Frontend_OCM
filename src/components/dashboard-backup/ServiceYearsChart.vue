<template>
  <ChartCard title="រយះពេលបម្រើការងារ" icon="chart-line" description="ចំនួនមន្ត្រីតាមរយះពេលនៃឆ្នាំបម្រើការងារ">
    <canvas ref="chartCanvas"></canvas>
  </ChartCard>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Chart from 'chart.js/auto'
import ChartCard from './ChartCard.vue'

const props = defineProps({
  data: { type: Object, required: true }
})

const chartCanvas = ref(null)
let chart = null

const createChart = () => {
  if (chart) chart.destroy()
  
  chart = new Chart(chartCanvas.value, {
    type: 'line',
    data: {
      labels: props.data.labels,
      datasets: [{
        label: 'ចំនួនមន្ត្រី',
        data: props.data.data,
        borderColor: '#10b981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: '#10b981'
      }]
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