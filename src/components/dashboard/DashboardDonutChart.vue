<template>
  <div class="relative h-full min-w-0">
    <div class="donut-chart-card">
      <div class="donut-chart-card__header mb-4 pb-4 border-b border-gray-100 flex-shrink-0">
        <span class="donut-chart-card__title text-base font-semibold text-gray-800">មន្ត្រីផ្សេងៗ</span>
      </div>
      <div class="donut-chart-card__chart-wrap">
        <div ref="chartEl" class="donut-chart-card__chart"></div>
      </div>
      <div v-if="legendItems.length > 0" class="donut-chart-card__legend">
        <div
          v-for="(item, i) in legendItems"
          :key="i"
          class="donut-chart-card__legend-item"
        >
          <span class="donut-chart-card__legend-dot" :style="{ background: item.fill }"></span>
          <span class="donut-chart-card__legend-label" :title="item.label">{{ item.label }}</span>
          <span class="donut-chart-card__legend-value">{{ item.valueFormatted }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted, computed } from 'vue'
import * as d3 from 'd3'

const COLORS = [
  '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#6366f1',
  '#14b8a6', '#f97316', '#a855f7', '#84cc16'
]

export default {
  name: 'DashboardDonutChart',
  props: {
    employeesByPosition: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const chartEl = ref(null)

    const dataFiltered = computed(() => {
      const list = Array.isArray(props.employeesByPosition) ? props.employeesByPosition : []
      return list
        .map(d => ({ label: String(d.label || '').trim() || '—', value: Number(d.value) || 0 }))
        .filter(d => d.value > 0)
    })
    const colorScale = computed(() =>
      d3.scaleOrdinal(COLORS).domain(dataFiltered.value.map(d => d.label))
    )
    const legendItems = computed(() => {
      const scale = colorScale.value
      return dataFiltered.value.map(d => ({
        label: d.label,
        value: d.value,
        valueFormatted: d.value.toLocaleString('en-US'),
        fill: scale(d.label)
      }))
    })

    function draw() {
      if (!chartEl.value) return
      const data = dataFiltered.value
      if (data.length === 0) {
        chartEl.value.innerHTML = '<p class="donut-chart-card__empty">មិនមានទិន្នន័យ</p>'
        return
      }
      d3.select(chartEl.value).selectAll('*').remove()
      d3.select(document.body).selectAll('.dashboard-donut-chart-tooltip').remove()

      const tooltip = d3
        .select(document.body)
        .append('div')
        .attr('class', 'dashboard-donut-chart-tooltip chart-tooltip')
        .style('position', 'fixed')
        .style('opacity', 0)
        .style('left', '0px')
        .style('top', '0px')
        .style('pointer-events', 'none')
        .style('z-index', '9999')

      function positionTooltip(event) {
        const ttNode = tooltip.node()
        if (!ttNode) return
        const ttWidth = ttNode.offsetWidth
        const ttHeight = ttNode.offsetHeight
        let left = event.clientX - ttWidth / 2
        let top = event.clientY - ttHeight - 10
        left = Math.max(4, Math.min(left, window.innerWidth - ttWidth - 4))
        top = Math.max(4, Math.min(top, window.innerHeight - ttHeight - 4))
        tooltip.style('left', `${left}px`).style('top', `${top}px`)
      }

      const scale = colorScale.value
      const dataWithFill = data.map(d => ({ ...d, fill: scale(d.label) }))
      const total = d3.sum(dataWithFill, d => Number(d.value) || 0)
      const totalFormatted = total.toLocaleString('en-US')

      const containerWidth = chartEl.value.getBoundingClientRect().width || 260
      const size = Math.max(190, Math.min(containerWidth, 260))
      const radius = size / 2 - 12
      const innerRadius = radius * 0.58

      const svg = d3.select(chartEl.value)
        .append('svg')
        .attr('width', size)
        .attr('height', size)
        .attr('viewBox', [0, 0, size, size])
        .attr('class', 'donut-chart-svg')
      const g = svg.append('g').attr('transform', `translate(${size / 2},${size / 2})`)

      const pie = d3.pie().value(d => d.value).sort(null).padAngle(0.012)
      const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(radius)
        .cornerRadius(3)

      g.selectAll('path')
        .data(pie(dataWithFill))
        .join('path')
        .attr('d', arc)
        .attr('fill', d => d.data.fill)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2.5)
        .attr('class', 'donut-chart-arc')
        .style('cursor', 'pointer')
        .on('mouseenter', function (event, d) {
          const datum = d.data || d
          const amount = (datum.value || 0).toLocaleString('en-US')
          tooltip
            .style('opacity', 1)
            .html(`<span class="tt-label">${datum.label}</span>: <span class="tt-amt">${amount}</span>`)
          positionTooltip(event)
        })
        .on('mousemove', positionTooltip)
        .on('mouseleave', function () {
          tooltip.style('opacity', 0)
        })

      const labelRadius = innerRadius + (radius - innerRadius) * 0.45
      const labelArc = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius)
      g.selectAll('.donut-value-label')
        .data(pie(dataWithFill))
        .join('text')
        .attr('class', 'donut-value-label')
        .attr('transform', d => `translate(${labelArc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('dominant-baseline', 'middle')
        .attr('fill', '#fff')
        .attr('stroke', 'rgba(0,0,0,0.2)')
        .attr('stroke-width', 1)
        .attr('paint-order', 'stroke fill')
        .style('font-size', '11px')
        .style('font-weight', '700')
        .text(d => (Number(d.data?.value) || 0).toLocaleString('en-US'))

      const centerFs = Math.max(16, Math.round(size * 0.092))
      const centerSubFs = Math.max(10, Math.round(size * 0.046))
      const centerYOffset = Math.max(5, Math.round(size * 0.028))
      const center = g
        .append('g')
        .attr('class', 'donut-chart-center')
        .attr('transform', `translate(0,${centerYOffset})`)
      center
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '-0.35em')
        .attr('fill', '#111827')
        .style('font-size', `${centerFs}px`)
        .style('font-weight', '700')
        .text(totalFormatted)
      center
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '1em')
        .attr('fill', '#6b7280')
        .style('font-size', `${centerSubFs}px`)
        .style('font-weight', '500')
        .text('សរុប')
    }

    onMounted(draw)
    watch(dataFiltered, draw, { deep: true })

    return { chartEl, legendItems }
  }
}
</script>

<style scoped>
.donut-chart-card {
  width: 100%;
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #fff;
  padding: 1rem 1.25rem;
  font-family: 'btb', 'Battambang', sans-serif;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.donut-chart-card__header {
  display: flex;
  align-items: center;
}

.donut-chart-card__title {
  display: inline-block;
}

.donut-chart-card__chart-wrap {
  position: relative;
  width: 100%;
  min-height: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donut-chart-card__chart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-width: 180px;
  min-height: 180px;
  overflow: hidden;
}

.donut-chart-card__legend {
  margin-top: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px solid #f3f4f6;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem 0.75rem;
  max-height: 140px;
  overflow-y: auto;
}

.donut-chart-card__legend-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  min-width: 0;
  font-size: 0.75rem;
}

.donut-chart-card__legend-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
}

.donut-chart-card__legend-label {
  flex: 1;
  min-width: 0;
  color: #374151;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.donut-chart-card__legend-value {
  flex-shrink: 0;
  font-weight: 600;
  color: #111827;
}

.donut-chart-card__empty {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
  padding: 2rem 1rem;
}

:deep(.donut-chart-arc) {
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.08));
}
</style>

<style>
/* hover */
.dashboard-donut-chart-tooltip.chart-tooltip {
  padding: 6px 10px;
  border-radius: 6px;
  background: rgba(17, 24, 39, 0.92);
  color: #fff;
  font-size: 12px;
  line-height: 18px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}
.dashboard-donut-chart-tooltip.chart-tooltip .tt-label {
  font-weight: 500;
}
.dashboard-donut-chart-tooltip.chart-tooltip .tt-amt {
  font-weight: 700;
}
</style>
