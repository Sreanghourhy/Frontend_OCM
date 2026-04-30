<template>
  <ChartCard title="Position Fill Rate" icon="chart-pie" description="Percentage of positions filled vs allocated">
    <canvas ref="chartCanvas"></canvas>
  </ChartCard>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
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

const total = computed(() => {
  return props.data.data.reduce((a, b) => a + b, 0)
})

const createChart = () => {
  if (chart) chart.destroy()
  
  chart = new Chart(chartCanvas.value, {
    type: 'pie',
    data: {
      labels: props.data.labels,
      datasets: [{
        data: props.data.data,
        backgroundColor: ['#10b981', '#ef4444'],
        borderWidth: 0,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: { 
            font: { size: 12 },
            padding: 15
          }
        },
        tooltip: { 
          callbacks: { 
            label: (ctx) => {
              const percentage = ((ctx.raw / total.value) * 100).toFixed(1)
              return `${ctx.label}: ${ctx.raw} positions (${percentage}%)`
            }
          } 
        }
      },
      cutout: '60%'
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>