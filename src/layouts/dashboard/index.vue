<template>
  <div class="min-h-screen absolute left-0 top-12 right-0 flex flex-wrap system-layout" oncontextmenu="return false;">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <div class="relative w-full">
      <!-- Content area -->
      <div class="p-4 space-y-4">
        <div class="w-full text-left">
          <div class="font-moul text-base text-gray-800 text-left">{{ title }}</div>
        </div>
        <DashboardStats
          :totals="filteredStaffTotals"
          :trend="filteredTrend"
          :gender-ratio="filteredGenderRatio"
          :employees-by-position="filteredEmployeesByPosition"
        />
        <div class="grid grid-cols-1 gap-4 min-w-0">
          <!-- <DashboardDepartmentChart :data="filteredEmployeesByDepartment" /> -->
        </div>
        <div class="grid grid-cols-1 gap-4 min-w-0 lg:grid-cols-2 lg:items-stretch">
          <DashboardBarChart :data="filteredEducationDistribution" />
          <DashboardDisabledOfficersCard
            :count="disabledOfficersCount"
            :total-workforce="totalWorkforceCount"
            :male-count="disabledOfficersByGender.male"
            :female-count="disabledOfficersByGender.female"
          />
        </div>
      </div>
    </div>
    <!-- <float-top-menu v-bind:title="title" /> -->
    <float-top-menu :title="' '" />
    <sidebar />
  </div>
</template>

<script>
import { ref , reactive , computed } from 'vue'
import FloatTopMenu from '@components/menu/topmenu-float-items.vue'
import Sidebar from '@components/widgets/Sidebar.vue'
import DashboardStats from '@components/dashboard/DashboardStats.vue'
import DashboardDepartmentChart from '@components/dashboard/DashboardDepartmentChart.vue'
import DashboardBarChart from '@components/dashboard/DashboardBarChart.vue'
import DashboardDisabledOfficersCard from '@components/dashboard/DashboardDisabledOfficersCard.vue'
import {
  staffTotalsMock,
  totalEmployeeTrendMock,
  employeesByDepartmentMock,
  employeesByPositionMock,
  educationDistributionMock,
  genderRatioMock,
  disabledOfficersCountMock,
  disabledOfficersByGenderMock
} from '@/data/dashboardMock'

export default {
  components: {
    FloatTopMenu ,
    Sidebar ,
    DashboardStats ,
    DashboardDepartmentChart,
    DashboardBarChart,
    DashboardDisabledOfficersCard
  },
  setup() {
    const title = ref("ស្ថានភាព")
    const staffTotals = reactive({ ...staffTotalsMock })
    /** Employees by department for department chart */
    const employeesByDepartment = reactive(
      employeesByDepartmentMock.map(d => ({ ...d }))
    )
    /** Education level distribution: [{ label: string, value: number }] */
    const educationDistribution = reactive(
      educationDistributionMock.map(d => ({ ...d }))
    )
    /** Male / female counts */
    const genderRatio = reactive({ ...genderRatioMock })
    /** Employees per position for donut chart: [{ label: string, value: number }] */
    const employeesByPosition = reactive(
      employeesByPositionMock.map(d => ({ ...d }))
    )
    /** Total employee trend by year for line chart (raw data) */
    const totalEmployeeTrend = reactive(totalEmployeeTrendMock.map(d => ({ ...d })))
    /** Count of officers marked with disability (body_condition === 1); swap for API. */
    const disabledOfficersCount = ref(Number(disabledOfficersCountMock) || 0)
    const disabledOfficersByGender = reactive({ ...disabledOfficersByGenderMock })

    const totalWorkforceCount = computed(() => {
      const t = staffTotals
      return (
        (Number(t.political) || 0) +
        (Number(t.publicService) || 0) +
        (Number(t.contract) || 0) +
        (Number(t.agreement) || 0)
      )
    })

    const filteredTrend = computed(() => totalEmployeeTrend)
    const filteredStaffTotals = computed(() => staffTotals)
    const filteredGenderRatio = computed(() => genderRatio)
    const filteredEmployeesByDepartment = computed(() => employeesByDepartment)
    const filteredEducationDistribution = computed(() => educationDistribution)
    const filteredEmployeesByPosition = computed(() => employeesByPosition)
    return {
      title ,
      staffTotals ,
      totalEmployeeTrend: filteredTrend ,
      filteredTrend ,
      filteredStaffTotals ,
      filteredGenderRatio ,
      filteredEmployeesByDepartment ,
      filteredEducationDistribution ,
      filteredEmployeesByPosition ,
      disabledOfficersCount,
      disabledOfficersByGender,
      totalWorkforceCount
    }
  },
  name: "DashboardPage",
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {}
}
</script>

<style scoped>
.system-layout {
  margin-left: 60px;
  transition: margin-left 0.2s ease;
}
.app_snav_open .system-layout {
  margin-left: 230px;
}
</style>
