<template>
  <div class="rounded-[7px] border border-gray-200 bg-white p-4 font-btb shadow-sm text-left">
    <div class="flex items-start gap-2 mb-3">
      <div class="flex items-center gap-2 min-w-0">
      <div class="flex-shrink-0 w-9 h-9 rounded-[5px] flex items-center justify-center" :class="iconBgClass">
        <slot name="icon">
          <svg v-if="icon === 'people'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z"/>
            <path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z"/>
          </svg>
          <svg v-else-if="icon === 'building'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5H4.5ZM6 10.5a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10.5Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Zm-9 3.75a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
          </svg>
          <svg v-else-if="icon === 'document'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor">
            <path d="M6.25 4.75A2.25 2.25 0 0 0 4 7v14a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 22 21V9.376a2.25 2.25 0 0 0-.659-1.591L17.215 2.66A2.25 2.25 0 0 0 15.624 2H6.25zM18.5 9.25V20.25a.75.75 0 0 1-.75.75H6.25a.75.75 0 0 1-.75-.75V7c0-.414.336-.75.75-.75h7.5v-2.5h.69l3.81 3.75z"/>
          </svg>
          <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97 4.72a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 0a.75.75 0 0 0 0 1.06l1.72 1.72-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06l-2.25-2.25a.75.75 0 0 0-1.06 0Z" clip-rule="evenodd"/>
          </svg>
        </slot>
      </div>
        <span class="text-base font-medium text-gray-700">
          {{ title }}
          <span class="ml-1 text-xl font-bold text-gray-800 align-middle">{{ value }}</span>
        </span>
      </div>
    </div>
    <div v-if="miniBarsNormalized.length" class="stat-mini-chart">
      <div class="stat-mini-chart__grid">
        <span class="stat-mini-chart__grid-line"></span>
        <span class="stat-mini-chart__grid-line"></span>
        <span class="stat-mini-chart__grid-line"></span>
        <span class="stat-mini-chart__grid-line"></span>
      </div>
      <div
        class="stat-mini-chart__bars"
        :style="{ gridTemplateColumns: `repeat(${miniBarsNormalized.length}, minmax(0, 1fr))` }"
      >
        <div
          v-for="(bar, i) in miniBarsNormalized"
          :key="i"
          class="stat-mini-chart__item"
        >
          <div class="stat-mini-chart__plot">
            <span
              class="stat-mini-chart__value"
              :style="{ bottom: `calc(${bar.totalPct}% + 4px)` }"
            >
              {{ bar.totalFormatted }}
            </span>
            <div class="stat-mini-chart__bar-wrap">
              <div
                class="stat-mini-chart__bar stat-mini-chart__bar--female"
                :style="{ height: `${bar.femalePct}%` }"
                @mouseenter="showBarTooltip($event, bar, 'female')"
                @mousemove="moveBarTooltip"
                @mouseleave="hideBarTooltip"
              >
            </div>
              <div
                class="stat-mini-chart__bar stat-mini-chart__bar--male"
                :style="{ height: `${bar.malePct}%` }"
                @mouseenter="showBarTooltip($event, bar, 'male')"
                @mousemove="moveBarTooltip"
                @mouseleave="hideBarTooltip"
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="hideBelowTextLabels"
        class="stat-mini-chart__dots"
        :style="{ gridTemplateColumns: `repeat(${miniBarsNormalized.length}, minmax(0, 1fr))` }"
      >
        <span
          v-for="(bar, i) in miniBarsNormalized"
          :key="`dot-${i}`"
          class="stat-mini-chart__dot"
          :style="{ background: columnColorAt(i) }"
          :title="bar.label"
        />
      </div>
      <div
        v-else
        class="stat-mini-chart__labels"
        :style="{ gridTemplateColumns: `repeat(${miniBarsNormalized.length}, minmax(0, 1fr))` }"
      >
        <span
          v-for="(bar, i) in miniBarsNormalized"
          :key="`label-${i}`"
          class="stat-mini-chart__label"
          :title="bar.label"
        >
          {{ bar.shortLabel }}
        </span>
      </div>
    </div>
    <div
      v-if="tooltip.visible"
      class="stat-mini-chart__tooltip"
      :style="{ left: `${tooltip.left}px`, top: `${tooltip.top}px` }"
    >
      {{ tooltip.text }}
    </div>
  </div>
</template>

<script>
const iconColorMap = {
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
  violet: 'bg-violet-100 text-violet-600',
  slate: 'bg-slate-100 text-slate-700'
}

export default {
  name: 'DashboardStatCard',
  data() {
    return {
      tooltip: {
        visible: false,
        left: 0,
        top: 0,
        text: ''
      }
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    icon: {
      type: String,
      default: 'people'
    },
    iconColor: {
      type: String,
      default: 'blue',
      validator: (v) => Object.keys(iconColorMap).includes(v)
    },
    trendPercent: {
      type: Number,
      default: null
    },
    trendLabel: {
      type: String,
      default: ''
    },
    miniBars: {
      type: Array,
      default: () => []
    },
    /** Per-column accent (position) color; same order as miniBars — for legend dots */
    columnColors: {
      type: Array,
      default: () => []
    },
    /** When true, hide repeated Khmer labels under bars; show color dots only */
    hideBelowTextLabels: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconBgClass() {
      return iconColorMap[this.iconColor] || iconColorMap.blue
    },
    columnColorAt() {
      return (i) => {
        const colors = Array.isArray(this.columnColors) ? this.columnColors : []
        return colors[i] || '#9ca3af'
      }
    },
    miniBarsNormalized() {
      const bars = Array.isArray(this.miniBars) ? this.miniBars : []
      if (!bars.length) return []
      const safeBars = bars.map((b) => {
        const male = Math.max(0, Number(b?.male) || 0)
        const female = Math.max(0, Number(b?.female) || 0)
        const label = String(b?.label || '')
        return { male, female, label, total: male + female }
      })
      const maxTotal = Math.max(...safeBars.map((b) => b.total), 1)
      return safeBars.map((b) => {
        // Data-driven bar height: larger total => taller bar.
        const totalPct = (b.total / maxTotal) * 100
        const label = b.label
        const shortLabel = label.length > 5 ? `${label.slice(0, 5)}...` : label
        if (b.total <= 0) {
          return {
            malePct: 0,
            femalePct: totalPct,
            label,
            shortLabel,
            maleValue: b.male,
            femaleValue: b.female,
            totalFormatted: b.total.toLocaleString('en-US'),
            totalPct
          }
        }
        return {
          malePct: (b.male / b.total) * totalPct,
          femalePct: (b.female / b.total) * totalPct,
          label,
          shortLabel,
          maleValue: b.male,
          femaleValue: b.female,
          totalFormatted: b.total.toLocaleString('en-US'),
          totalPct
        }
      })
    }
  },
  methods: {
    showBarTooltip(event, bar, gender) {
      const label = bar?.label || '—'
      const value = gender === 'male' ? Number(bar?.maleValue || 0) : Number(bar?.femaleValue || 0)
      const genderLabel = gender === 'male' ? 'ប្រុស' : 'ស្រី'
      this.tooltip.text = `${label} - ${genderLabel}: ${value.toLocaleString('en-US')}`
      this.tooltip.visible = true
      this.moveBarTooltip(event)
    },
    moveBarTooltip(event) {
      const x = Number(event?.clientX || 0)
      const y = Number(event?.clientY || 0)
      this.tooltip.left = x + 12
      this.tooltip.top = y - 28
    },
    hideBarTooltip() {
      this.tooltip.visible = false
    }
  }
}
</script>

<style scoped>
.stat-mini-chart {
  position: relative;
  height: 224px;
  margin-top: 0.25rem;
  margin-bottom: 0.1rem;
  padding: 10px 8px 6px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #fff;
}

.stat-mini-chart__grid {
  position: absolute;
  inset: 10px 8px 6px;
  display: grid;
  grid-template-rows: repeat(4, 1fr);
}

.stat-mini-chart__grid-line {
  border-top: 1px dashed #e5e7eb;
}

.stat-mini-chart__bars {
  position: relative;
  height: 164px;
  display: grid;
  gap: 0.45rem;
  align-items: stretch;
  overflow: visible;
}

.stat-mini-chart__item {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: visible;
}

.stat-mini-chart__plot {
  width: 100%;
  max-width: 20px;
  height: 100%;
  position: relative;
  margin: 0 auto;
}

.stat-mini-chart__value {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: 10px;
  line-height: 1;
  color: #374151;
  text-align: center;
  font-weight: 600;
  white-space: nowrap;
}

.stat-mini-chart__bar-wrap {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.15);
}

.stat-mini-chart__labels {
  margin-top: 8px;
  display: grid;
  gap: 0.45rem;
}

.stat-mini-chart__dots {
  margin-top: 8px;
  display: grid;
  gap: 0.45rem;
  align-items: center;
}

.stat-mini-chart__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.9);
}

.stat-mini-chart__label {
  font-size: 11px;
  line-height: 1.1;
  color: #4b5563;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.stat-mini-chart__bar {
  width: 100%;
  cursor: pointer;
}

.stat-mini-chart__bar--male {
  background: #2563eb;
  border-radius: 0;
}

.stat-mini-chart__bar--female {
  background: #ec4899;
  border-radius: 4px 4px 0 0;
}

.stat-mini-chart__tooltip {
  position: fixed;
  /* Keep tooltip below global loading overlays (often z-10/z-50) */
  z-index: 5;
  pointer-events: none;
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(17, 24, 39, 0.92);
  color: #fff;
  font-size: 12px;
  line-height: 16px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  white-space: nowrap;
}
</style>
