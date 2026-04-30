<template>
  <div class="relative h-full min-w-0">
    <div class="rounded-[7px] border border-gray-200 bg-white p-5 font-moul shadow-sm text-left overflow-hidden flex flex-col min-h-0 h-full">
      <div class="mb-3 flex-shrink-0">
        <div class="text-base font-semibold text-gray-800">ចំនួនមន្ត្រីតាមក្របខណ្ឌ</div>
        <div class="text-2xl font-bold text-gray-900 mt-0.5">{{ selectedTotalFormatted }}</div>
      </div>
      <div class="mb-3 flex items-center gap-2 flex-wrap">
        <button
          type="button"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeTab === 'political' }"
          @click="activeTab = 'political'"
        >
          មន្ត្រីនយោបាយ
        </button>
        <button
          type="button"
          class="tab-btn"
          :class="{ 'tab-btn--active': activeTab === 'publicService' }"
          @click="activeTab = 'publicService'"
        >
          មន្ត្រីមុខងារសាធារណៈ
        </button>
      </div>
      <div ref="chartEl" class="chart-trend-wrap w-full flex-1 min-h-[330px] overflow-hidden"></div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import * as d3 from 'd3'
import { parseNumber } from '@/utils/khmer'

const POSITION_ORDER = [
  'ឧត្តមមន្ត្រី',
  'អនុមន្ត្រី',
  'ក្រមការដើមខ្សែ',
  'មន្ត្រីលេខាធិការរដ្ឋបាល',
  'វរមន្ត្រី',
  'ក្រមការ',
  'នាយក្រមការ'
]

function distributeInteger(total, weights) {
  const n = weights.length
  if (n === 0) return []
  const t = Math.max(0, Math.round(Number(total) || 0))
  const wsum = weights.reduce((a, b) => a + b, 0)
  if (wsum <= 0) return weights.map(() => 0)
  const raw = weights.map(w => (w / wsum) * t)
  const floors = raw.map(x => Math.floor(x))
  let rem = t - floors.reduce((a, b) => a + b, 0)
  const order = raw
    .map((x, i) => ({ i, r: x - Math.floor(x) }))
    .sort((a, b) => b.r - a.r)
  for (let k = 0; k < rem; k++) floors[order[k].i]++
  return floors
}

export default {
  name: 'DashboardTotalEmployeeChart',
  props: {
    totalCount: {
      type: [Number, String],
      default: 0
    },
    totals: {
      type: Object,
      default: () => ({ political: 0, publicService: 0 })
    },
    genderRatio: {
      type: Object,
      default: () => ({ male: 0, female: 0 })
    },
    employeesByPosition: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const chartEl = ref(null)
    const activeTab = ref('political')
    const tabColor = computed(() => (activeTab.value === 'political' ? '#2563eb' : '#059669'))

    const selectedTotal = computed(() => {
      const key = activeTab.value
      return Math.max(0, Math.round(Number(props.totals?.[key]) || 0))
    })
    const selectedTotalFormatted = computed(() =>
      parseNumber(Math.max(0, selectedTotal.value).toLocaleString('en-US'))
    )
    const maleRatio = computed(() => {
      const male = Math.max(0, Number(props.genderRatio?.male) || 0)
      const female = Math.max(0, Number(props.genderRatio?.female) || 0)
      const total = male + female
      if (total <= 0) return 0.5
      return male / total
    })

    const dataForSelectedTab = computed(() => {
      const positionMap = new Map(
        (Array.isArray(props.employeesByPosition) ? props.employeesByPosition : []).map((item) => [
          String(item?.label || '').trim(),
          Math.max(0, Number(item?.value) || 0)
        ])
      )
      const orderedBase = POSITION_ORDER.map((label) => ({
        label,
        value: positionMap.get(label) || 0
      }))
      const distributed = distributeInteger(
        selectedTotal.value,
        orderedBase.map((d) => d.value)
      )
      return orderedBase.map((d, i) => ({
        label: d.label,
        value: distributed[i] || 0
      }))
    })

    function draw() {
      if (!chartEl.value) return
      const data = dataForSelectedTab.value
      if (data.length === 0) {
        chartEl.value.innerHTML = '<p class="text-sm text-gray-500 p-2">មិនមានទិន្នន័យ</p>'
        return
      }

      d3.select(chartEl.value).selectAll('*').remove()
      d3.select(document.body).selectAll('.dashboard-total-employee-chart-tooltip').remove()

      const tooltip = d3
        .select(document.body)
        .append('div')
        .attr('class', 'dashboard-total-employee-chart-tooltip chart-tooltip')
        .style('position', 'fixed')
        .style('opacity', 0)
        .style('left', '0px')
        .style('top', '0px')
        .style('pointer-events', 'none')
        .style('z-index', '9999')

      const containerWidth = chartEl.value.getBoundingClientRect().width
      const containerHeight = Math.max(330, chartEl.value.getBoundingClientRect().height || 330)
      const width = Math.max(0, containerWidth)
      const height = Math.max(330, containerHeight)
      const margin = { top: 12, right: 12, bottom: 60, left: 48 }
      const innerWidth = Math.max(0, width - margin.left - margin.right)
      const innerHeight = Math.max(0, height - margin.top - margin.bottom)

      const svg = d3.select(chartEl.value)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('preserveAspectRatio', 'none')

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

      const xScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, innerWidth])
        .padding(0.24)
      const xStep = xScale.step()
      const centerX = (d) => (xScale(d.label) || 0) + xScale.bandwidth() / 2
      const maxVal = d3.max(data, d => Number(d.value) || 0) || 1
      const yDomainMax = Math.max(1, maxVal * 1.15)
      const yScale = d3.scaleLinear()
        .domain([0, yDomainMax])
        .range([innerHeight, 0])
        .nice(5)
      const yTicks = yScale.ticks(5)

      function positionTooltipForDatum(d, barCenterX, barTopY) {
        const ttNode = tooltip.node()
        if (!ttNode || !chartEl.value) return

        const rect = chartEl.value.getBoundingClientRect()
        const ttWidth = ttNode.offsetWidth
        const ttHeight = ttNode.offsetHeight

        const pointX = margin.left + barCenterX
        const pointY = margin.top + barTopY

        let left = rect.left + pointX - ttWidth / 2
        let top = rect.top + pointY - ttHeight - 10

        // Keep tooltip inside viewport bounds.
        left = Math.max(4, Math.min(left, window.innerWidth - ttWidth - 4))
        top = Math.max(4, Math.min(top, window.innerHeight - ttHeight - 4))

        tooltip.style('left', `${left}px`).style('top', `${top}px`)
      }

      const barWidth = Math.min(36, xScale.bandwidth())

      // Hash-style background grid (#) behind bars.
      const bgGrid = g.append('g').attr('class', 'bg-grid')
      bgGrid
        .selectAll('.h-line')
        .data(yTicks)
        .join('line')
        .attr('class', 'h-line')
        .attr('x1', 0)
        .attr('x2', innerWidth)
        .attr('y1', d => yScale(d))
        .attr('y2', d => yScale(d))
        .attr('stroke', '#e5e7eb')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.9)

      bgGrid
        .selectAll('.v-line')
        .data(data)
        .join('line')
        .attr('class', 'v-line')
        .attr('x1', d => centerX(d) - xStep / 2)
        .attr('x2', d => centerX(d) - xStep / 2)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', '#eef2f7')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)

      const lastCenter = centerX(data[data.length - 1] || { label: '' })
      bgGrid
        .append('line')
        .attr('class', 'v-line v-line-end')
        .attr('x1', lastCenter + xStep / 2)
        .attr('x2', lastCenter + xStep / 2)
        .attr('y1', 0)
        .attr('y2', innerHeight)
        .attr('stroke', '#eef2f7')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)

      const bars = g
        .selectAll('.bar-visual')
        .data(data)
        .join('path')
        .attr('class', 'bar-visual')
        .attr('d', d => {
          const x = centerX(d) - barWidth / 2
          const y = yScale(Number(d.value) || 0)
          const h = Math.max(0, innerHeight - y)
          const r = Math.min(4, barWidth / 2, h)
          if (h <= 0) return ''
          return `M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + barWidth - r},${y} Q${x + barWidth},${y} ${x + barWidth},${y + r} L${x + barWidth},${y + h} L${x},${y + h} Z`
        })
        .attr('fill', tabColor.value)
        .style('pointer-events', 'none')

      g
        .selectAll('.bar-value-label')
        .data(data)
        .join('text')
        .attr('class', 'bar-value-label')
        .attr('x', d => centerX(d))
        .attr('y', d => Math.max(10, yScale(Number(d.value) || 0) - 6))
        .attr('text-anchor', 'middle')
        .attr('fill', '#6b7280')
        .attr('font-size', '10px')
        .attr('font-weight', '600')
        .text(d => parseNumber(Number(d.value || 0).toLocaleString('en-US')))

      g.selectAll('.bar-hit')
        .data(data)
        .join('rect')
        .attr('class', 'bar-hit')
        .attr('x', d => xScale(d.label))
        .attr('y', 0)
        .attr('width', xScale.bandwidth())
        .attr('height', innerHeight)
        .attr('fill', 'transparent')
        .style('cursor', 'pointer')
        .on('mouseenter', function (event, d) {
          bars
            .filter(dd => dd.label === d.label)
            .attr('fill', d3.color(tabColor.value)?.darker(0.8)?.toString() || tabColor.value)
          tooltip
            .style('opacity', 1)
          {
            const total = Math.max(0, Math.round(Number(d.value) || 0))
            const male = Math.round(total * maleRatio.value)
            const female = Math.max(0, total - male)
            tooltip.html(
              `<div class="tt-title">${d.label}</div>` +
              `<div class="tt-gender-row">` +
                `<span class="tt-gender-item">` +
                  `<span class="tt-swatch tt-swatch--male"></span>` +
                  `ប្រុស <span class="tt-amt">${parseNumber(male.toLocaleString('en-US'))}</span>` +
                `</span>` +
                `<span class="tt-gender-item">` +
                  `<span class="tt-swatch tt-swatch--female"></span>` +
                  `ស្រី <span class="tt-amt">${parseNumber(female.toLocaleString('en-US'))}</span>` +
                `</span>` +
              `</div>`
            )
          }
          const x = centerX(d)
          const y = yScale(Number(d.value) || 0)
          positionTooltipForDatum(d, x, y)
        })
        .on('mousemove', function (event, d) {
          const x = centerX(d)
          const y = yScale(Number(d.value) || 0)
          positionTooltipForDatum(d, x, y)
        })
        .on('mouseleave', function (event, d) {
          bars.filter(dd => dd.label === d.label).attr('fill', tabColor.value)
          tooltip.style('opacity', 0)
        })

      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d => d)
        .tickSize(0)
        .tickPadding(10)
      const xAxisG = g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
      xAxisG
        .selectAll('.tick text')
        .attr('fill', '#6b7280')
        .attr('font-size', '10px')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-20)')
      xAxisG.select('.domain').attr('stroke', '#e5e7eb')

      const yAxis = d3.axisLeft(yScale)
        .tickValues(yTicks)
        .tickFormat(d => parseNumber(d3.format(',')(d)))
        .tickSize(0)
      const yAxisG = g.append('g').call(yAxis)
      yAxisG.selectAll('.tick line').remove()
      yAxisG.selectAll('.tick text').attr('fill', '#6b7280').attr('font-size', '11px')
      yAxisG.select('.domain').attr('stroke', '#e5e7eb')
      yAxisG
        .selectAll('.tick')
        .filter(d => Number(d) === 0)
        .select('text')
        .attr('dy', '-0.25em')
    }

    onMounted(draw)
    watch([activeTab, dataForSelectedTab], draw, { deep: true })

    return { chartEl, activeTab, selectedTotalFormatted }
  }
}
</script>

<style scoped>
.chart-trend-wrap {
  min-width: 0;
  max-width: 100%;
  display: block;
  position: relative;
}
.chart-trend-wrap svg {
  min-width: 0;
  max-width: 100%;
  display: block;
}

.tab-btn {
  border: 1px solid #d1d5db;
  background: #fff;
  color: #374151;
  border-radius: 9999px;
  padding: 3px 10px;
  font-size: 12px;
  line-height: 1.25rem;
  transition: all 0.2s ease;
}

.tab-btn--active {
  border-color: #2563eb;
  background: #eff6ff;
  color: #1d4ed8;
}

.chart-trend-wrap :deep(.chart-tooltip) {
  position: absolute;
  z-index: 10;
  pointer-events: none;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(17, 24, 39, 0.92);
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transform: translateZ(0);
  white-space: nowrap;
}

.chart-trend-wrap :deep(.chart-tooltip .tt-amt) {
  font-weight: 700;
}
</style>

<style>
.dashboard-total-employee-chart-tooltip.chart-tooltip {
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(17, 24, 39, 0.92);
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}
.dashboard-total-employee-chart-tooltip.chart-tooltip .tt-amt {
  font-weight: 700;
}
.dashboard-total-employee-chart-tooltip.chart-tooltip .tt-title {
  margin-bottom: 4px;
}
.dashboard-total-employee-chart-tooltip.chart-tooltip .tt-gender-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.dashboard-total-employee-chart-tooltip.chart-tooltip .tt-gender-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.dashboard-total-employee-chart-tooltip.chart-tooltip .tt-swatch {
  width: 8px;
  height: 8px;
  border-radius: 2px;
  display: inline-block;
}
.dashboard-total-employee-chart-tooltip.chart-tooltip .tt-swatch--male {
  background: #2563eb;
}
.dashboard-total-employee-chart-tooltip.chart-tooltip .tt-swatch--female {
  background: #db2777;
}
</style>
