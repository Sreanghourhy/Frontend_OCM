<template>
  <ChartCard title="សរុបមន្ត្រីតាមអាយុ" icon="calendar" description="សរុបចំនួនមន្ត្រីតាមក្រុមនៃអាយុ">
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
        label: 'ចំនួនមន្ត្រីតាមអាយុ',
        data: props.data.data,
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: '#ef4444',
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.7,
        categoryPercentage: 0.8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: 'top',
          labels: { font: { size: 12 } }
        },
        tooltip: { 
          callbacks: { 
            label: (ctx) => `${ctx.raw} មន្ត្រី (${((ctx.raw / ctx.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)` 
          } 
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'ចំនួនមន្ត្រី',
            font: { size: 12 }
          },
          grid: { color: '#e5e7eb' }
        },
        x: {
          title: {
            display: true,
            text: 'ក្រុមអាយុ',
            font: { size: 12 }
          }
        }
      }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>