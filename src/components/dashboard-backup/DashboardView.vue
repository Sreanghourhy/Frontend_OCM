<template>
  <div class="container mx-auto px-4 py-8 max-w-7xl">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Officer Management Dashboard</h1>
      <p class="text-gray-600 mt-2">Comprehensive analytics and insights for officer workforce management</p>
    </div>

    <!-- Loading State -->
    <div v-if="store.loading" class="py-16 text-center text-gray-500">
      Loading dashboard...
    </div>

    <!-- Dashboard Content -->
    <template v-else>
      <!-- Key Metrics -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard title="មន្ត្រីសរុប" :value="store.metrics.totalOfficers" icon="users" trend="↑ 12% from last year" />
        <MetricCard title="មធ្យមភាគអាយុមន្ត្រី" :value="new Intl.NumberFormat('kh-KH').format(store.metrics.avgAge)" icon="calendar" />
        <!-- <MetricCard title="មធ្យមភាគនៃការបម្រើការ(ឆ្នាំ)" :value="new Intl.NumberFormat('kh-KH').format(store.metrics.avgServiceYears)" icon="briefcase" /> -->
        <!-- <MetricCard title="Departments" :value="24" icon="building" /> -->
      </div>

  

      <!-- Education & Officer Type Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <EducationChart :data="store.educationData" />
        <OfficerTypeChart :data="store.officerTypeData" />
      </div>

      <!-- Career & Service Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ServiceYearsChart :data="store.serviceYearsData" />
        <AgeDistributionChart :data="store.ageGroupsData" />
      </div>

      <!-- Rank & Medal Section -->
      <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <RankDistributionChart :data="store.rankData" />
        <MedalDistributionChart :data="store.medalData" />
      </div> -->

      <!-- Organization & Fill Rate Section -->
      <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <OrganizationChart :data="store.organizationData" />
        <FillRateChart :data="store.fillRateData" />
      </div> -->

      <!-- Education Trends -->
      <!-- <EducationTrendsChart :data="store.educationTrendsData" class="mb-8" /> -->

      <!-- Career Progression -->
      <!-- <CareerProgressionChart :data="store.careerProgressionData" class="mb-8" /> -->

      <!-- Status Summary Cards -->
      <StatusSummaryCards 
        :active-officers="store.metrics.activeOfficers"
        :probation-officers="store.metrics.probationOfficers"
        :ready-promotion="store.metrics.readyPromotion"
      />
    </template>
  </div>
</template>

<script setup>
import { onMounted, reactive } from 'vue'
import MetricCard from './MetricCard.vue'
import EducationChart from './EducationChart.vue'
import OfficerTypeChart from './OfficerTypeChart.vue'
import ServiceYearsChart from './ServiceYearsChart.vue'
import AgeDistributionChart from './AgeDistributionChart.vue'
import StatusSummaryCards from './StatusSummeryCards.vue'

const store = reactive({
  loading: true,
  metrics: {
    totalOfficers: 0,
    avgAge: 0,
    activeOfficers: 0,
    probationOfficers: 0,
    readyPromotion: 0
  },
  educationData: { labels: [], data: [] },
  officerTypeData: { labels: [], data: [] },
  serviceYearsData: { labels: [], data: [] },
  ageGroupsData: { labels: [], data: [] },
  fetchDashboardData() {
    // Temporary local data for backup dashboard preview.
    this.metrics = {
      totalOfficers: 1890,
      avgAge: 36,
      activeOfficers: 1712,
      probationOfficers: 124,
      readyPromotion: 54
    }
    this.educationData = {
      labels: ['បណ្ឌិត', 'អនុបណ្ឌិត', 'បរិញ្ញាបត្រ', 'ផ្សេងៗ'],
      data: [36, 198, 1250, 406]
    }
    this.officerTypeData = {
      labels: ['នយោបាយ', 'មុខងារសាធារណៈ', 'ជាប់កិច្ចសន្យា'],
      data: [220, 1430, 240]
    }
    this.serviceYearsData = {
      labels: ['< 1 year', '1-5 years', '6-10 years', '10+ years'],
      data: [124, 530, 670, 566]
    }
    this.ageGroupsData = {
      labels: ['20-29', '30-39', '40-49', '50+'],
      data: [420, 900, 430, 140]
    }
    this.loading = false
  }
})

onMounted(() => store.fetchDashboardData())
</script>