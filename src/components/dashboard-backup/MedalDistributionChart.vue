<template>
  <ChartCard title="Top Medals & Awards" icon="medal" description="Most awarded medals and honors">
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

const colorPalette = ['#fbbf24', '#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6', '#ec489a', '#14b8a6']

const createChart = () => {
  if (chart) chart.destroy()
  
  chart = new Chart(chartCanvas.value, {
    type: 'polarArea',
    data: {
      labels: props.data.labels,
      datasets: [{
        data: props.data.data,
        backgroundColor: colorPalette.slice(0, props.data.labels.length),
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: { 
            font: { size: 11 },
            padding: 10
          }
        },
        tooltip: { 
          callbacks: { 
            label: (ctx) => `${ctx.label}: ${ctx.raw} awards (${((ctx.raw / ctx.dataset.data.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%)` 
          } 
        }
      },
      scales: {
        r: {
          ticks: { 
            stepSize: 5,
            backdropColor: 'transparent'
          },
          grid: { color: '#e5e7eb' }
        }
      }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>