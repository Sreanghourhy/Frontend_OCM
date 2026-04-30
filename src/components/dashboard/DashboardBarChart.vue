<template>
  <div class="relative h-full min-w-0">
    <div class="rounded-[7px] border border-gray-200 bg-white p-5 font-btb shadow-sm text-left overflow-hidden flex flex-col min-h-0">
      <div class="mb-4 pb-4 border-b border-gray-100 flex-shrink-0">
        <span class="text-base font-semibold text-gray-800">ចំនួនមន្ត្រីសរុបតាមកម្រិតអប់រំ</span>
      </div>
      <div ref="chartEl" class="chart-bar-wrap w-full flex-1 min-h-[360px] overflow-hidden"></div>
    </div>
  </div>
</template>

<script>
import { ref, watch, onMounted } from 'vue'
import * as d3 from 'd3'
import { parseNumber } from '@/utils/khmer'

export default {
  name: 'DashboardBarChart',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const chartEl = ref(null)
    const barColors = ['#3b82f6', '#1d4ed8']

    function draw() {
      if (!chartEl.value || !Array.isArray(props.data)) return
      const data = props.data
        .filter(d => d && (d.value > 0 || d.label))
        .filter(d => d.label !== 'បឋមសិក្សា')
      if (data.length === 0) {
        chartEl.value.innerHTML = ''
        return
      }
      d3.select(chartEl.value).selectAll('*').remove()

      d3.select(document.body).selectAll('.dashboard-bar-chart-tooltip').remove()

      const tooltip = d3
        .select(document.body)
        .append('div')
        .attr('class', 'dashboard-bar-chart-tooltip chart-tooltip')
        .style('position', 'fixed')
        .style('opacity', 0)
        .style('left', '0px')
        .style('top', '0px')
        .style('pointer-events', 'none')
        .style('z-index', '9999')

      const AXIS_LABEL_MAX_CHARS = 17
      function ellipsizeAxisLabel(s) {
        const str = String(s ?? '')
        const chars = [...str]
        if (chars.length <= AXIS_LABEL_MAX_CHARS) return str
        return `${chars.slice(0, AXIS_LABEL_MAX_CHARS - 1).join('')}…`
      }

      const containerWidth = chartEl.value.getBoundingClientRect().width
      const containerHeight = Math.max(300, chartEl.value.getBoundingClientRect().height || 300)
      const width = Math.max(0, containerWidth)
      const height = Math.max(300, containerHeight)
      const maxAxisLabelLen = Math.max(
        5,
        ...data.map(d => [...ellipsizeAxisLabel(d.label)].length)
      )
      const margin = {
        top: 12,
        right: 14,
        bottom: 36,
        left: Math.min(118, Math.max(54, 6 + maxAxisLabelLen * 6.15))
      }
      const innerWidth = Math.max(0, width - margin.left - margin.right)
      const innerHeight = Math.max(0, height - margin.top - margin.bottom)

      const rawVal = d => Number(d.value) || 0
      const formatCount = v =>
        parseNumber((Number(v) || 0).toLocaleString('en-US'))

      function positionTooltipForDatum(event, d) {
        const ttNode = tooltip.node()
        if (!ttNode || !chartEl.value) return

        const ttWidth = ttNode.offsetWidth
        const ttHeight = ttNode.offsetHeight

        let left = event.clientX - ttWidth / 2
        let top = event.clientY - ttHeight - 10

        left = Math.max(4, Math.min(left, window.innerWidth - ttWidth - 4))
        top = Math.max(4, Math.min(top, window.innerHeight - ttHeight - 4))

        tooltip.style('left', `${left}px`).style('top', `${top}px`)
      }

      const svg = d3.select(chartEl.value)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height])
        .attr('preserveAspectRatio', 'none')
        .style('max-width', '100%')
        .style('overflow', 'hidden')

      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

      const rowIndex = d3.range(data.length)
      const yScale = d3.scaleBand()
        .domain(rowIndex)
        .range([0, innerHeight])
        .padding(0.38)

      const maxCount = d3.max(data, rawVal) || 1
      const xMax = Math.max(maxCount * 1.045, maxCount + Math.max(1, maxCount * 0.02), 1)
      const xScale = d3.scaleLinear().domain([0, xMax]).range([0, innerWidth])

      const rx = 2

      const xAxisGrid = d3.axisBottom(xScale)
        .ticks(5)
        .tickSize(-innerHeight)
        .tickFormat(() => '')
      const xGridG = g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxisGrid)
      xGridG.select('.domain').remove()
      xGridG.selectAll('.tick line').attr('stroke', '#e5e7eb').attr('stroke-opacity', 0.85)

      g.selectAll('.bar')
        .data(data)
        .join('rect')
        .attr('class', 'bar')
        .attr('x', xScale(0))
        .attr('y', (_, i) => yScale(i))
        .attr('width', d => Math.max(0, xScale(rawVal(d)) - xScale(0)))
        .attr('height', yScale.bandwidth())
        .attr('rx', rx)
        .attr('ry', rx)
        .attr('fill', (_, i) => barColors[i % barColors.length])
        .attr('opacity', 0.92)
        .style('cursor', 'pointer')
        .on('mouseenter', function (event, d) {
          tooltip
            .style('opacity', 1)
            .html(
              `ចំនួនមន្រ្តីសរុបដែលមាន ${d.label}: <span class="tt-amt">${formatCount(
                d.value
              )}</span>`
            )
          positionTooltipForDatum(event, d)
        })
        .on('mousemove', function (event, d) {
          positionTooltipForDatum(event, d)
        })
        .on('mouseleave', function () {
          tooltip.style('opacity', 0)
        })

      const countLabelMinInnerPx = 44
      g.selectAll('.bar-label')
        .data(data)
        .join('text')
        .attr('class', 'bar-label')
        .attr('x', d => {
          const barW = xScale(rawVal(d)) - xScale(0)
          const inside = barW >= countLabelMinInnerPx
          return inside ? xScale(rawVal(d)) - 7 : xScale(rawVal(d)) + 5
        })
        .attr('y', (_, i) => yScale(i) + yScale.bandwidth() / 2)
        .attr('dy', '0.35em')
        .attr('text-anchor', d => {
          const barW = xScale(rawVal(d)) - xScale(0)
          return barW >= countLabelMinInnerPx ? 'end' : 'start'
        })
        .attr('fill', d => {
          const barW = xScale(rawVal(d)) - xScale(0)
          return barW >= countLabelMinInnerPx ? '#ffffff' : '#9ca3af'
        })
        .attr('stroke', d => {
          const barW = xScale(rawVal(d)) - xScale(0)
          return barW >= countLabelMinInnerPx ? 'rgba(0,0,0,0.28)' : 'none'
        })
        .attr('stroke-width', d => (xScale(rawVal(d)) - xScale(0) >= countLabelMinInnerPx ? 0.6 : 0))
        .attr('paint-order', 'stroke fill')
        .style('font-size', '11px')
        .style('font-weight', '600')
        .text(d => formatCount(d.value))

      const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickFormat(d => formatCount(Math.round(Number(d))))
      const xAxisG = g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(xAxis)
      xAxisG.selectAll('.tick line').attr('stroke', '#e5e7eb')
      xAxisG.selectAll('.tick text').attr('fill', '#6b7280').attr('font-size', '11px')
      xAxisG.select('.domain').attr('stroke', '#e5e7eb')

      const yAxis = d3.axisLeft(yScale)
        .tickFormat(i => ellipsizeAxisLabel(data[i].label))
        .tickSize(0)
      const yAxisG = g.append('g').call(yAxis)
      yAxisG.selectAll('.tick line').remove()
      yAxisG.selectAll('.tick text')
        .attr('fill', '#4b5563')
        .attr('font-size', '10px')
        .attr('dx', -2)
        .each(function (d) {
          const full = data[d].label
          d3.select(this).selectAll('title').remove()
          d3.select(this).append('title').text(full)
        })
      yAxisG.select('.domain').attr('stroke', '#e5e7eb')
    }

    onMounted(draw)
    watch(() => props.data, draw, { deep: true })

    return { chartEl }
  }
}
</script>

<style scoped>
.chart-bar-wrap {
  min-width: 0;
  max-width: 100%;
  display: block;
}
.chart-bar-wrap svg {
  min-width: 0;
  width: 100%;
  max-width: 100%;
  display: block;
}
</style>

<style>
/* Body-mounted tooltip for bar chart (same look as other dashboard tooltips) */
.dashboard-bar-chart-tooltip.chart-tooltip {
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(17, 24, 39, 0.92);
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}
.dashboard-bar-chart-tooltip.chart-tooltip .tt-amt {
  font-weight: 700;
}
</style>
