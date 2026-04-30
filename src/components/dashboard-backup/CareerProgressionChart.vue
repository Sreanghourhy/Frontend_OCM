<template>
  <ChartCard title="Career Progression Timeline" icon="chart-line" description="Average time to promotion by rank level" :height="400">
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
    validator: (value) => value.ranks && value.avgYears
  }
})

const chartCanvas = ref(null)
let chart = null

const createChart = () => {
  if (chart) chart.destroy()
  
  chart = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: props.data.ranks,
      datasets: [{
        label: 'Average Years to Promotion',
        data: props.data.avgYears,
        backgroundColor: 'rgba(249, 115, 22, 0.7)',
        borderColor: '#f97316',
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
            label: (ctx) => `${ctx.raw} years (${Math.floor(ctx.raw)} years, ${Math.round((ctx.raw % 1) * 12)} months)` 
          } 
        }
      },
      scales: {
        y: { 
          title: { 
            display: true, 
            text: 'Years', 
            font: { size: 12 } 
          }, 
          beginAtZero: true,
          max: Math.max(...props.data.avgYears) + 2,
          grid: { color: '#e5e7eb' },
          ticks: {
            callback: (value) => `${value} years`
          }
        },
        x: {
          title: { 
            display: true, 
            text: 'Promotion Path', 
            font: { size: 12 } 
          },
          ticks: {
            maxRotation: 25,
            minRotation: 25,
            font: { size: 11 }
          }
        }
      },
      layout: {
        padding: { bottom: 10 }
      }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>