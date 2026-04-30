/**
 * Mock data for the dashboard (staff totals, charts).
 * All counts are tied to {@link DASHBOARD_TOTAL_EMPLOYEES} so widgets stay consistent.
 * Replace with API calls when backend is ready.
 */

/** Canonical total headcount — staff types, gender, education, departments, positions, and latest trend year use this. */
export const DASHBOARD_TOTAL_EMPLOYEES = 2949

export const staffTotalsMock = {
  political: 120,
  politicalNoPosition: 0,
  publicService: 2400,
  contract: 300,
  agreement: 129
}

// 120 + 2400 + 300 + 129 === DASHBOARD_TOTAL_EMPLOYEES

export const staffIncreaseByTypeMock = {
  political: 5.2,
  publicService: 12.3,
  contract: 5.8,
  agreement: 8.0
}

export const educationDistributionMock = [
  // { label: 'បឋមភូមិ', value: 200 },
  { label: 'បណ្ឌិត', value: 49 },
  { label: 'បរិញ្ញាបត្រជាន់ខ្ពស់', value: 500 },
  { label: 'បរិញ្ញាបត្រ', value: 1200 },
  { label: 'បរិញ្ញាបត្ររង', value: 600 },
 { label: 'ទុតិយភូមិ', value: 400 }, 
   
]

// sum === DASHBOARD_TOTAL_EMPLOYEES

export const genderRatioMock = {
  male: 1700,
  female: 1249
}

// male + female === DASHBOARD_TOTAL_EMPLOYEES

/** Total employees by department: [{ department: string, total: number, malePercent: number, femalePercent: number }] */
export const employeesByDepartmentMock = [
  { department: 'ខុទ្ទកាល័យសម្តេចមហាបវរធិបតីនាយករដ្ឋមន្រ្តី', total: 900, malePercent: 55, femalePercent: 45 },
  { department: 'ខុទ្ទកាល័យសម្តេចនាយករដ្ឋមន្រ្តី', total: 700, malePercent: 56, femalePercent: 44 },
  { department: 'ទីស្ដីការគណៈរដ្ឋមន្ត្រី', total: 800, malePercent: 58, femalePercent: 42 },
  { department: 'ទីប្រឹក្សារាជរដ្ឋាភិបាល ទីប្រឹក្សានិងជំនួយការនាយករដ្ឋមន្រ្តី', total: 549, malePercent: 42, femalePercent: 58 }
]

// department totals sum === DASHBOARD_TOTAL_EMPLOYEES

/** Total employees per position for donut chart: [{ label: string, value: number }] — sum === DASHBOARD_TOTAL_EMPLOYEES */
export const employeesByPositionMock = [
  { label: 'ឧត្តមមន្ត្រី', value: 106 },
  { label: 'វរមន្ត្រី', value: 465 },
  { label: 'អនុមន្ត្រី', value: 210 },
  { label: 'ក្រមការ', value: 609 },
  { label: 'ក្រមការដើមខ្សែ', value: 751 },
  { label: 'នាយក្រមការ', value: 321 },
  { label: 'មន្ត្រីលេខាធិការរដ្ឋបាល', value: 487 }
]

/**
 * Total employee count by year for the trend line chart.
 * Last year matches {@link DASHBOARD_TOTAL_EMPLOYEES} (same as staff-type cards / pie / bar / donut at baseline year).
 */
export const totalEmployeeTrendMock = [
  { year: 2019, value: 2153 },
  { year: 2020, value: 2060 },
  { year: 2021, value: 2436 },
  { year: 2022, value: 2292 },
  { year: 2023, value: 2762 },
  { year: 2024, value: 2828 },
  { year: 2025, value: 2884 },
  { year: 2026, value: DASHBOARD_TOTAL_EMPLOYEES }
]

/** Officers with disability (records where body_condition === 1). Replace with API count. */
export const disabledOfficersCountMock = 47

/** Breakdown by gender for disabled-officers widget (sum should match disabledOfficersCount when from API). */
export const disabledOfficersByGenderMock = {
  male: 27,
  female: 20
}

/** Single object with all dashboard mock data */
export const dashboardMock = {
  totalEmployees: DASHBOARD_TOTAL_EMPLOYEES,
  staffTotals: staffTotalsMock,
  staffIncreaseByType: staffIncreaseByTypeMock,
  educationDistribution: educationDistributionMock,
  genderRatio: genderRatioMock,
  employeesByDepartment: employeesByDepartmentMock,
  employeesByPosition: employeesByPositionMock,
  totalEmployeeTrend: totalEmployeeTrendMock,
  disabledOfficersCount: disabledOfficersCountMock,
  disabledOfficersByGender: disabledOfficersByGenderMock
}

export default dashboardMock
