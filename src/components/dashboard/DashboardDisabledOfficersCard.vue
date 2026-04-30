<template>
  <div class="relative h-full min-w-0">
    <div
      class="rounded-[7px] border border-gray-200 bg-white p-5 font-btb shadow-sm text-left overflow-hidden flex flex-col min-h-0"
    >
      <div class="mb-4 pb-4 border-b border-gray-100 flex-shrink-0">
        <span class="text-base font-semibold text-gray-800">ចំនួនមន្ត្រីពិការភាព</span>
      </div>
      <div
        class="flex w-full flex-1 min-h-[360px] flex-col overflow-hidden"
      >
        <div
          class="flex min-h-0 flex-1 flex-col items-center justify-center gap-1 px-2 py-2 text-center"
        >
          <span class="text-xs font-medium text-gray-500">សរុប</span>
          <p
            class="mt-1 w-full text-[2.5rem] font-bold tabular-nums text-gray-800 leading-none sm:text-[2.65rem]"
          >
            {{ formattedCount }}
          </p>
          <p class="mt-1 text-sm text-gray-500">មន្ត្រី</p>
          <p
            v-if="totalWorkforceDisplay"
            class="mt-2 max-w-[95%] text-xs leading-relaxed text-gray-500"
          >
            ក្នុងចំណោមមន្ត្រីសរុប
            <span class="font-semibold text-gray-700">{{ totalWorkforceDisplay }}</span>
            នាក់
          </p>
        </div>

        <div class="grid flex-shrink-0 grid-cols-1 gap-3 pt-2 sm:grid-cols-3">
          <div
            class="rounded-[5px] border border-gray-200 bg-gray-50/80 px-3 py-3 text-center"
          >
            <p class="text-xs font-medium text-gray-500">ភាគរយ</p>
            <p class="mt-1 text-lg font-bold tabular-nums text-gray-800 sm:text-xl">
              {{ percentDisplay }}
            </p>
            <p class="mt-0.5 text-xs text-gray-500">នៃមន្ត្រីទាំងអស់</p>
          </div>
          <div
            class="rounded-[5px] border border-gray-200 bg-blue-50/60 px-3 py-3 text-center"
          >
            <p class="text-xs font-medium text-blue-600">ប្រុស</p>
            <p class="mt-1 text-lg font-bold tabular-nums text-blue-600 sm:text-xl">
              {{ formattedMale }}
            </p>
            <p class="mt-0.5 text-xs text-gray-500">នាក់</p>
          </div>
          <div
            class="rounded-[5px] border border-gray-200 bg-pink-50/60 px-3 py-3 text-center"
          >
            <p class="text-xs font-medium text-pink-600">ស្រី</p>
            <p class="mt-1 text-lg font-bold tabular-nums text-pink-600 sm:text-xl">
              {{ formattedFemale }}
            </p>
            <p class="mt-0.5 text-xs text-gray-500">នាក់</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { parseNumber } from '@/utils/khmer'

export default {
  name: 'DashboardDisabledOfficersCard',
  props: {
    count: {
      type: Number,
      default: 0
    },
    totalWorkforce: {
      type: Number,
      default: 0
    },
    maleCount: {
      type: Number,
      default: 0
    },
    femaleCount: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    function W(n) {
      return Number(n) || 0
    }

    const formattedCount = computed(() =>
      parseNumber(Math.max(0, W(props.count)).toLocaleString('en-US'))
    )
    const formattedMale = computed(() =>
      parseNumber(Math.max(0, W(props.maleCount)).toLocaleString('en-US'))
    )
    const formattedFemale = computed(() =>
      parseNumber(Math.max(0, W(props.femaleCount)).toLocaleString('en-US'))
    )

    const totalWorkforceDisplay = computed(() => {
      const t = W(props.totalWorkforce)
      if (t <= 0) return ''
      return parseNumber(t.toLocaleString('en-US'))
    })

    const percentDisplay = computed(() => {
      const t = W(props.totalWorkforce)
      const c = W(props.count)
      if (t <= 0) return '—'
      const pct = (c / t) * 100
      const rounded = Math.round(pct * 100) / 100
      const str = Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(2).replace(/\.?0+$/, '')
      return parseNumber(`${str}%`)
    })

    return {
      formattedCount,
      formattedMale,
      formattedFemale,
      totalWorkforceDisplay,
      percentDisplay
    }
  }
}
</script>
