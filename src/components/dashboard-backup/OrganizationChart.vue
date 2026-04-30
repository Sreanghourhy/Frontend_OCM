<template>
  <ChartCard title="Top Organizations" icon="building" description="Organizations with highest officer count">
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
        label: 'Officer Count',
        data: props.data.data,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: '#6366f1',
        borderWidth: 2,
        borderRadius: 8,
        barPercentage: 0.6,
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
            label: (ctx) => `${ctx.raw} officers` 
          } 
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Number of Officers',
            font: { size: 12 }
          },
          grid: { color: '#e5e7eb' }
        },
        x: {
          title: {
            display: true,
            text: 'Organization',
            font: { size: 12 }
          },
          ticks: {
            maxRotation: 45,
            minRotation: 45,
            font: { size: 10 }
          }
        }
      }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>