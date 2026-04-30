<template>
  <ChartCard title="Current Rank Distribution" icon="star" description="Distribution of current officer ranks">
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
        label: 'Officers',
        data: props.data.data,
        backgroundColor: 'rgba(245, 158, 11, 0.7)',
        borderColor: '#f59e0b',
        borderWidth: 1,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      plugins: { legend: { position: 'top' } }
    }
  })
}

onMounted(() => createChart())
watch(() => props.data, () => createChart(), { deep: true })
</script>