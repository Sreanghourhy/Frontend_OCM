<template>
  <div class="dashboard-stats grid grid-cols-1 gap-4 lg:grid-cols-4 xl:grid-cols-5 min-w-0">
    <div class="flex flex-col gap-2 lg:col-span-4 xl:col-span-5 min-w-0">
      <Transition name="stat-layout" mode="out-in">
        <div
          v-if="!showBarStatLayout"
          key="stat-simple"
          class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6 min-w-0"
        >
          <DashboardStatCard
            :title="cardLabels.all"
            :value="totalEmployees"
            icon="people"
            icon-color="slate"
            :gender-male-count="Number(genderRatio?.male) || 0"
            :gender-female-count="Number(genderRatio?.female) || 0"
          />
          <DashboardStatCard
            class="cursor-pointer"
            @click="goToOfficerPage('political')"
            :title="cardLabels.political"
            :value="totals.political"
            icon="people"
            icon-color="blue"
            :gender-male-count="genderSplitFor(totals.political).male"
            :gender-female-count="genderSplitFor(totals.political).female"
          />
          <DashboardStatCard
            class="cursor-pointer"
            @click="goToOfficerPage('politicalNoPosition')"
            :title="cardLabels.politicalNoPosition"
            :value="totals.politicalNoPosition"
            icon="people"
            icon-color="blue"
            :gender-male-count="genderSplitFor(totals.politicalNoPosition).male"
            :gender-female-count="genderSplitFor(totals.politicalNoPosition).female"
          />
          <DashboardStatCard
            class="cursor-pointer"
            @click="goToOfficerPage('publicService')"
            :title="cardLabels.publicService"
            :value="totals.publicService"
            icon="people"
            icon-color="emerald"
            :gender-male-count="genderSplitFor(totals.publicService).male"
            :gender-female-count="genderSplitFor(totals.publicService).female"
          />
          <DashboardStatCard
            class="cursor-pointer"
            @click="goToOfficerPage('contract')"
            :title="cardLabels.contract"
            :value="totals.contract"
            icon="people"
            icon-color="amber"
            :gender-male-count="genderSplitFor(totals.contract).male"
            :gender-female-count="genderSplitFor(totals.contract).female"
          />
          <DashboardStatCard
            class="cursor-pointer"
            @click="goToOfficerPage('agreement')"
            :title="cardLabels.agreement"
            :value="totals.agreement"
            icon="people"
            icon-color="violet"
            :gender-male-count="genderSplitFor(totals.agreement).male"
            :gender-female-count="genderSplitFor(totals.agreement).female"
          />
        </div>
        <div
          v-else
          key="stat-bar"
          class="rounded-[7px] border border-gray-200 bg-white p-4 font-btb shadow-sm text-left min-w-0"
        >
        <div class="mb-4 pb-4 border-b border-gray-100 flex-shrink-0">
          <span class="block text-base font-semibold text-gray-800 mb-2">
            ចំនួនមន្ត្រីតាមប្រភេទ
          </span>
        
          <div
            v-if="positionLegendItems.length"
            class="flex flex-wrap items-baseline gap-x-1.5 gap-y-2 text-base text-gray-600 leading-snug"
          >
            <template v-for="(item, i) in positionLegendItems" :key="i">
              <span v-if="i > 0" class="text-gray-300 mx-0.5 select-none">,</span>
              <span class="inline-flex items-center gap-1.5 min-w-0 max-w-full">
                <span
                  class="inline-block w-3 h-3 rounded-full flex-shrink-0 ring-1 ring-gray-200/90 shadow-sm"
                  :style="{ background: item.color }"
                  :title="item.label"
                />
                <span class="text-gray-400 flex-shrink-0">:</span>
                <span class="font-medium text-gray-700 min-w-0" :title="item.label">{{ item.label }}</span>
              </span>
            </template>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6 min-w-0">
          <DashboardStatCardBar
            :title="cardLabels.all"
            :value="totalEmployees"
            icon="people"
            icon-color="slate"
            :mini-bars="miniBarsFromPositions"
            :column-colors="positionColumnColors"
            hide-below-text-labels
          />
          <DashboardStatCardBar
            class="cursor-pointer"
            @click="goToOfficerPage('political')"
            :title="cardLabels.political"
            :value="totals.political"
            icon="people"
            icon-color="blue"
            :mini-bars="miniBarsPolitical"
            :column-colors="positionColumnColors"
            hide-below-text-labels
          />
          <DashboardStatCardBar
            class="cursor-pointer"
            @click="goToOfficerPage('politicalNoPosition')"
            :title="cardLabels.politicalNoPosition"
            :value="totals.politicalNoPosition"
            icon="people"
            icon-color="blue"
            :mini-bars="miniBarsPoliticalNoPosition"
            :column-colors="positionColumnColors"
            hide-below-text-labels
          />
          <DashboardStatCardBar
            class="cursor-pointer"
            @click="goToOfficerPage('publicService')"
            :title="cardLabels.publicService"
            :value="totals.publicService"
            icon="people"
            icon-color="emerald"
            :mini-bars="miniBarsPublicService"
            :column-colors="positionColumnColors"
            hide-below-text-labels
          />
          <DashboardStatCard
            class="cursor-pointer"
            @click="goToOfficerPage('contract')"
            :title="cardLabels.contract"
            :value="totals.contract"
            icon="people"
            icon-color="amber"
            :gender-male-count="genderSplitFor(totals.contract).male"
            :gender-female-count="genderSplitFor(totals.contract).female"
            no-position-breakdown
          />
          <DashboardStatCard
            class="cursor-pointer"
            @click="goToOfficerPage('agreement')"
            :title="cardLabels.agreement"
            :value="totals.agreement"
            icon="people"
            icon-color="violet"
            :gender-male-count="genderSplitFor(totals.agreement).male"
            :gender-female-count="genderSplitFor(totals.agreement).female"
            no-position-breakdown
          />
        </div>
        </div>
      </Transition>
    </div>
    <div class="lg:col-span-3 xl:col-span-4 min-w-0 h-full">
      <DashboardTotalEmployeeChart
        :total-count="totalForChart"
        :trend="trend"
        :gender-ratio="genderRatio"
        :totals="totals"
        :employees-by-position="employeesByPosition"
      />
    </div>
    <div class="lg:col-span-1 xl:col-span-1 min-w-0 h-full">
      <DashboardPieChart class="w-full h-full" :gender-ratio="genderRatio" />
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import DashboardStatCard from './DashboardStatCard.vue'
import DashboardStatCardBar from './DashboardStatCard-backup.vue'
import DashboardTotalEmployeeChart from './DashboardTotalEmployeeChart.vue'
import DashboardPieChart from './DashboardPieChart.vue'

/** Same palette order as `DashboardDonutChart.vue` for position → color */
const POSITION_COLORS = [
  '#0ea5e9', '#8b5cf6', '#10b981', '#f59e0b', '#ec4899', '#6366f1',
  '#14b8a6', '#f97316', '#a855f7', '#84cc16'
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

function miniBarsForCard(employeesByPosition, cardTotal, maleRatio) {
  const list = Array.isArray(employeesByPosition) ? employeesByPosition : []
  const items = list
    .map(d => ({
      label: String(d.label || '').trim() || '—',
      value: Math.max(0, Number(d.value) || 0)
    }))
    .filter(d => d.value > 0)
  if (items.length === 0) return []
  const t = Math.max(0, Math.round(Number(cardTotal) || 0))
  if (t === 0) return []
  const ratio = Math.min(1, Math.max(0, Number(maleRatio) || 0))
  const weights = items.map(d => d.value)
  const distributed = distributeInteger(t, weights)
  return items.map((d, i) => {
    const tot = distributed[i]
    const male = Math.round(tot * ratio)
    const female = Math.max(0, tot - male)
    return { label: d.label, male, female }
  }).filter(x => x.male + x.female > 0)
}

export default {
  name: 'DashboardStats',
  components: {
    DashboardStatCard,
    DashboardStatCardBar,
    DashboardTotalEmployeeChart,
    DashboardPieChart
  },
  props: {
    genderRatio: {
      type: Object,
      default: () => ({ male: 0, female: 0 })
    },
    totals: {
      type: Object,
      default: () => ({
        political: 0,
        politicalNoPosition: 0,
        publicService: 0,
        contract: 0,
        agreement: 0
      })
    },
    trend: {
      type: Array,
      default: () => []
    },
    employeesByPosition: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const router = useRouter()
    const showBarStatLayout = ref(false)

    const maleRatio = computed(() => {
      const male = Math.max(0, Number(props.genderRatio?.male) || 0)
      const female = Math.max(0, Number(props.genderRatio?.female) || 0)
      const total = male + female
      if (total <= 0) return 0.5
      return male / total
    })

    const genderSplitFor = (total) => {
      const cardTotal = Math.max(0, Math.round(Number(total) || 0))
      const male = Math.round(cardTotal * maleRatio.value)
      const female = Math.max(0, cardTotal - male)
      return { male, female }
    }

    const totalEmployees = computed(() => {
      const t = props.totals
      return (Number(t.political) || 0) + (Number(t.publicService) || 0) + (Number(t.contract) || 0) + (Number(t.agreement) || 0)
    })
    const totalForChart = computed(() => {
      const trend = props.trend || []
      if (trend.length) return Number(trend[trend.length - 1]?.value) || totalEmployees.value
      return totalEmployees.value
    })

    const cardLabels = {
      all: 'មន្ត្រីសរុប',
      political: 'មន្ត្រីនយោបាយមានក្របខណ្ឌ',
      politicalNoPosition: 'មន្ត្រីនយោបាយមិនមានក្របខណ្ឌ',
      publicService: 'មន្ត្រីមុខងារសាធារណៈ',
      contract: 'មន្ត្រីជាប់កិច្ចសន្យា',
      agreement: 'មន្ត្រីផ្សេងៗ'
    }

    const miniBarsFromPositions = computed(() => {
      const source = Array.isArray(props.employeesByPosition) ? props.employeesByPosition : []
      return source
        .map((item) => {
          const value = Math.max(0, Number(item?.value) || 0)
          const male = Math.round(value * maleRatio.value)
          const female = Math.max(0, value - male)
          return {
            label: String(item?.label || '').trim() || '—',
            male,
            female
          }
        })
        .filter((item) => item.male + item.female > 0)
    })

    const miniBarsPolitical = computed(() =>
      miniBarsForCard(props.employeesByPosition, props.totals?.political, maleRatio.value)
    )
    const miniBarsPoliticalNoPosition = computed(() =>
      miniBarsForCard(props.employeesByPosition, props.totals?.politicalNoPosition, maleRatio.value)
    )
    const miniBarsPublicService = computed(() =>
      miniBarsForCard(props.employeesByPosition, props.totals?.publicService, maleRatio.value)
    )

    const positionLegendItems = computed(() =>
      miniBarsFromPositions.value.map((item, i) => ({
        label: item.label,
        color: POSITION_COLORS[i % POSITION_COLORS.length]
      }))
    )

    const positionColumnColors = computed(() =>
      positionLegendItems.value.map((item) => item.color)
    )
    const routeNameByCard = {
      political: 'OfficerListPolitical',
      politicalNoPosition: 'OfficerListPolitical',
      publicService: 'OfficerListCivilService',
      contract: 'OfficerContractList',
      agreement: 'OfficerOthersList'
    }
    const goToOfficerPage = (type) => {
      const name = routeNameByCard[type]
      if (!name) return
      router.push({ name })
    }

    return {
      showBarStatLayout,
      totalEmployees,
      totalForChart,
      cardLabels,
      genderSplitFor,
      miniBarsFromPositions,
      miniBarsPolitical,
      miniBarsPoliticalNoPosition,
      miniBarsPublicService,
      positionLegendItems,
      positionColumnColors,
      goToOfficerPage
    }
  }
}
</script>

<style scoped>
:deep(.cursor-pointer) {
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease;
}

:deep(.cursor-pointer:hover) {
  transform: translateY(-2px);
  filter: brightness(1.01);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.12);
}

:deep(.cursor-pointer:active) {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(15, 23, 42, 0.1);
}

.stat-layout-enter-active,
.stat-layout-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}
.stat-layout-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.stat-layout-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
