<template>
  <div class="relative z-0 isolate w-full min-w-0 flex flex-col">
    <!-- Top action panel of crud -->
    <div class="flex title-bar border-b border-gray-200 bg-white">
      <!-- Title strip: empty spacer so bar height/width match other pages -->
      <div class="flex w-64 h-10 shrink-0 py-1 px-4 items-center">
        <div
          class="font-moul text-sm leading-8 truncate"
          v-html="model.title"
        />
      </div>
      <!-- Actions button of the crud -->
      <div
        class="flex-grow action-buttons flex items-center justify-end px-4 gap-3"
      >
        <!-- Right actions -->
        <div class="mt-0 mr-0 flex flex-wrap justify-end">
          <n-dropdown
            trigger="click"
            :options="reportDropdownOptions"
            size="small"
            @select="onReportMenuSelect"
          >
            <n-tooltip trigger="hover" placement="top">
              <template #trigger>
                <div
                  class="inline-flex items-center cursor-pointer hover:text-green-500 duration-300 ml-2 h-8 mr-2 border rounded px-4 border-gray-400 hover:border-green-500 duration-300"
                >
                  <svg
                    class="w-6 h-6 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 18h8v2h-8z" fill="currentColor"></path>
                    <path d="M10 13h12v2H10z" fill="currentColor"></path>
                    <path d="M10 23h5v2h-5z" fill="currentColor"></path>
                    <path
                      d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM12 4h8v4h-8zm13 24H7V7h3v3h12V7h3z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  របាយការណ៍
                </div>
              </template>
              សូមជ្រើសរើសអង្គភាពដើម្បីធ្វើរបាយការណ៍
            </n-tooltip>
          </n-dropdown>
          <n-dropdown
            v-if="
              (!$hasPermission || $hasPermission('portal_staff_listing')) &&
              hasAnyLockedTypes(['politician']) &&
              hasAnyLockedTypes(['admin_official'])
            "
            trigger="click"
            :options="createOfficerDropdownOptions"
            size="small"
            @select="onCreateOfficerMenuSelect"
          >
            <button
              type="button"
              class="inline-flex items-center gap-1 px-3 h-8 ml-2 rounded border border-green-600 bg-green-600 text-white hover:bg-green-700 hover:border-green-700 duration-200"
            >
              <svg
                class="h-4 w-4 flex-shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <span class="font-sr leading-none">បញ្ចូលទិន្នន័យ</span>
            </button>
          </n-dropdown>
          <button
            v-else-if="
              !$hasPermission || $hasPermission('portal_staff_listing')
            "
            type="button"
            class="inline-flex items-center gap-1 px-3 h-8 ml-2 rounded border border-green-600 bg-green-600 text-white hover:bg-green-700 hover:border-green-700 duration-200"
            @click="openCreateProfileDraftPage"
          >
            <svg
              class="h-4 w-4 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              aria-hidden="true"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span class="font-sr leading-none">បញ្ចូលទិន្នន័យ</span>
          </button>
          <!-- 
          <n-tooltip trigger="hover">
            <template #trigger>
              <div @click="thumbnailView()" class="flex cursor-pointer hover:text-green-500 duration-300 ml-2 leading-8" >
                <svg class="w-6 h-6 mt-1 mr-1 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M8 30H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4v-4z" fill="currentColor"></path><path d="M18 30h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4v-4z" fill="currentColor"></path><path d="M28 30h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4v-4z" fill="currentColor"></path><path d="M8 20H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4v-4z" fill="currentColor"></path><path d="M18 20h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4v-4z" fill="currentColor"></path><path d="M28 20h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4v-4z" fill="currentColor"></path><path d="M8 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zM4 4v4h4V4z" fill="currentColor"></path><path d="M18 10h-4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4V4z" fill="currentColor"></path><path d="M28 10h-4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2zm-4-6v4h4V4z" fill="currentColor"></path></svg>
                ប្រអប់
              </div>
            </template>
            បង្ហាញជារាងប្រអប់
          </n-tooltip>
          <n-tooltip v-if="$hasPermission('portal_staff_creating')" trigger="hover">
            <template #trigger>
              <div @click="showCreateModal()" class="flex cursor-pointer hover:text-green-500 duration-300 ml-2 leading-8" >
                <svg class="w-7 h-7 mr-1 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
                មន្ត្រីមានអត្តលេខ
              </div>
            </template>
            មន្ត្រីរាជការមុខងារសាធារណៈ
          </n-tooltip>
          <n-tooltip v-if="$hasPermission('portal_staff_creating')" trigger="hover">
            <template #trigger>
              <div @click="showCreateNonOfficerModal()" class="flex cursor-pointer hover:text-green-500 duration-300 ml-2 leading-8" >
                <svg class="w-7 h-7 mr-1 " xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M9 12h6"></path><path d="M12 9v6"></path></g></svg>
                មន្ត្រីគ្មានអត្តលេខ
              </div>
            </template>
            មន្ត្រីនយោបាយ
          </n-tooltip>
          
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg class="mx-1 w-7 h-7 p-1 bg-white rounded-full border border-gray-300 cursor-pointer hover:text-green-500 duration-300" @click="$router.push('/people/export')" 
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0 0 42 42h216v494zM514.1 580.1l-61.8-102.4c-2.2-3.6-6.1-5.8-10.3-5.8h-38.4c-2.3 0-4.5.6-6.4 1.9c-5.6 3.5-7.3 10.9-3.7 16.6l82.3 130.4l-83.4 132.8a12.04 12.04 0 0 0 10.2 18.4h34.5c4.2 0 8-2.2 10.2-5.7L510 664.8l62.3 101.4c2.2 3.6 6.1 5.7 10.2 5.7H620c2.3 0 4.5-.7 6.5-1.9c5.6-3.6 7.2-11 3.6-16.6l-84-130.4l85.3-132.5a12.04 12.04 0 0 0-10.1-18.5h-35.7c-4.2 0-8.1 2.2-10.3 5.8l-61.2 102.3z" fill="currentColor"></path></svg>
            </template>
            នាំចេញទិន្នន័យ
          </n-tooltip> -->
        </div>
      </div>
    </div>
    <!-- Table of crud -->
    <div class="vcb-table-panel relative min-w-0 overflow-hidden bg-white">
      <div class="vcb-filters-bar">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="filter-title font-moul">
              សូមជ្រើសរើសលលក្ខខណ្ឌ សម្រង់ទិន្នន័យ
            </div>
            <div class="filter-actions">
              <div class="filter-action flex" style="width: 240px !important">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <div class="w-full relative">
                      <input
                        type="text"
                        @keypress.enter="filterRecords(false)"
                        v-model="table.search"
                        class="bg-gray-50 px-2 h-8 w-full rounded border border-gray-200 focus:border-green-600 hover:border-green-600 duration-300"
                        placeholder="ស្វែងរក"
                      />
                      <svg
                        class="absolute right-1 top-1 w-6 h-6 text-gray-400 cursor-pointer"
                        @click="filterRecords(false)"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 20 20"
                      >
                        <g fill="none">
                          <path
                            d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z"
                            fill="currentColor"
                          ></path>
                        </g>
                      </svg>
                    </div>
                  </template>
                  ស្វែងរកតាមរយៈ ឈ្មោះខ្មែរ ឈ្មោះជាឡាតាំង លេខអត្តសញ្ញាណបណ្ណ
                </n-tooltip>
                <!-- <n-tooltip trigger="hover" v-if="isWildSearch===true" >
                  <template #trigger>
                    <svg 
                      @click="toggleWildSearch()"
                      class="cursor-pointer w-9 h-8 text-green-600 ml-2 p-1 border border-green-600 rounded hover:bg-green-200 duration-300 " 
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M2 4.5A2.5 2.5 0 0 1 4.5 2h6A2.5 2.5 0 0 1 13 4.5V7h2.5A2.5 2.5 0 0 1 18 9.5v6a2.5 2.5 0 0 1-2.5 2.5h-6A2.5 2.5 0 0 1 7 15.5V13H4.5A2.5 2.5 0 0 1 2 10.5v-6zm10 0A1.5 1.5 0 0 0 10.5 3h-6A1.5 1.5 0 0 0 3 4.5v6A1.5 1.5 0 0 0 4.5 12H7V9.5a2.491 2.491 0 0 1 1.416-2.253A2.5 2.5 0 0 1 9.5 7H12V4.5zm-4 6.207V12h.293L12 8.293V8h-1.293L8 10.707zm.017-1.43l1.26-1.26c-.65.097-1.163.61-1.26 1.26zM13 8v2.5a2.5 2.5 0 0 1-2.5 2.5H8v2.5A1.5 1.5 0 0 0 9.5 17h6a1.5 1.5 0 0 0 1.5-1.5v-6A1.5 1.5 0 0 0 15.5 8H13zm-3.293 4h.793a1.5 1.5 0 0 0 1.5-1.5v-.793L9.707 12z" fill="currentColor"></path></g></svg>
                  </template>
                  ស្វែងរកព័ត៌មានដែលដូចគ្នា។
                </n-tooltip>
                <n-tooltip trigger="hover" v-if="isWildSearch===false" >
                  <template #trigger>
                    <svg 
                      @click="toggleWildSearch()"
                      class="cursor-pointer w-9 h-8 text-blue-500 ml-2 p-1 border border-blue-500 rounded hover:bg-blue-200 duration-300 " 
                      xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><g fill="none"><path d="M5.25 2A3.25 3.25 0 0 0 2 5.25v8a3.23 3.23 0 0 0 .555 1.817c.258.382.596.707.989.95a3.23 3.23 0 0 0 1.409.47h.006a3.3 3.3 0 0 0 .291.013H7.5v2.25a3.243 3.243 0 0 0 2.226 3.085c.322.107.666.165 1.024.165h8A3.25 3.25 0 0 0 22 18.75v-8a3.246 3.246 0 0 0-3.25-3.25H16.5V5.25a3.23 3.23 0 0 0-.555-1.817a3.268 3.268 0 0 0-.989-.95a3.23 3.23 0 0 0-1.409-.47h-.006A3.29 3.29 0 0 0 13.25 2h-8zm.69 1.5L3.5 5.94v-.69c0-.966.784-1.75 1.75-1.75h.69zM3.5 8.06L8.06 3.5h1.88L3.5 9.94V8.06zm8.56-4.56h1.19c.206 0 .404.036.588.101L3.601 13.838a1.748 1.748 0 0 1-.101-.588v-1.19l8.56-8.56zM14.9 4.662c.065.184.101.382.101.588v1.19L6.44 15H5.25c-.206 0-.404-.036-.588-.101L14.899 4.662zm.104 3.895A.5.5 0 0 0 15.5 9h.94L9 16.44v-.94a.5.5 0 0 0-.443-.497l6.446-6.446zM18.561 9h.189c.468 0 .893.184 1.207.483L9.483 19.957A1.744 1.744 0 0 1 9 18.75v-.19L18.56 9zm1.939 2.06v1.88l-7.56 7.56h-1.88l9.44-9.44zm0 4v1.88l-3.56 3.56h-1.88l5.44-5.44zm-.034 4.035a1.752 1.752 0 0 1-1.371 1.371l1.371-1.371z" fill="currentColor"></path></g></svg>
                  </template>
                  ស្វែងរកព័ត៌មានដែលមានភាពប្រហាក់ប្រហែល។
                </n-tooltip> -->
              </div>
              <!--
              <div
                v-if="hasAnyLockedTypes(['admin_official', 'politician'])"
                class="filter-action"
                style="width: 200px !important"
              >
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedAnks"
                      filterable
                      clearable
                      @update:value="onKrobkhanFilterChange"
                      placeholder="ក្របខ័ណ្ឌ"
                      :options="optionAnks"
                      class="w-full"
                    />
                  </template>
                  ជ្រើសរើសក្របខ័ណ្ឌ
                </n-tooltip>
              </div>
              -->
              <div
                v-if="
                  hasAnyLockedTypes(['admin_official', 'politician']) &&
                  selectedAnks != null &&
                  selectedAnks?.length > 0
                "
                class="filter-action"
                style="width: 200px !important"
              >
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedRanks"
                      filterable
                      clearable
                      multiple
                      @update:value="filterRecords(false)"
                      placeholder="ឋានន្តរស័ក្តិ និងថ្នាក់"
                      :options="optionRanks"
                      class="w-full"
                    />
                  </template>
                  ជ្រើសរើសឋានន្តរស័ក្តិ និងថ្នាក់
                </n-tooltip>
              </div>
              <div class="filter-action">
                <!-- Organizations -->
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedOrganizations"
                      filterable
                      clearable
                      multiple
                      @update:value="filterRecords(false)"
                      placeholder="ស្ថាប័ន / អង្គភាព"
                      :options="optionOrganizations"
                    />
                  </template>
                  ជ្រើសរើសស្ថាប័ន ឬ អង្គភាព
                </n-tooltip>
              </div>
              <div
                v-if="hasAnyLockedTypes(['admin_official', 'politician'])"
                class="filter-action"
              >
                <!-- Positions -->
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedPositions"
                      filterable
                      clearable
                      multiple
                      @update:value="filterRecords(false)"
                      placeholder="មុខតំណែង"
                      :options="optionPositions"
                    />
                  </template>
                  ជ្រើសរើសមុខតំណែង
                </n-tooltip>
              </div>
              <!-- <div v-if="lockedOfficerType=='politician'" class="filter-action">
                <n-select
                  v-model:value="selectedUnofficialPositions"
                  filterable
                  clearable
                  multiple
                  @update:value="filterRecords(false)"
                  placeholder="ឋានៈស្មើ"
                  :options="optionPositions"
                />
              </div> -->
              <div class="filter-action">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedEducationLevels"
                      filterable
                      clearable
                      multiple
                      @update:value="filterRecords(false)"
                      placeholder="កម្រិតអប់រំ"
                      :options="optionEducationLevels"
                    />
                  </template>
                  ជ្រើសរើសកម្រិតអប់រំ
                </n-tooltip>
              </div>
              <div class="filter-action filter-action-date">
                <n-tooltip
                  class="ocm-age-filter-tooltip w-full max-w-full"
                  trigger="hover"
                  placement="top"
                >
                  <template #trigger>
                    <n-popover
                      class="ocm-age-filter-popover w-full"
                      trigger="click"
                      placement="bottom-start"
                      :show-arrow="false"
                    >
                      <template #trigger>
                        <div
                          class="ocm-age-range-trigger w-full min-w-0 flex items-center justify-between gap-1 rounded border border-gray-200 bg-white px-2 text-sm leading-none text-gray-800 duration-300 hover:border-green-600 cursor-pointer"
                        >
                          <div
                            v-if="ageRangeFilterLabel"
                            class="min-w-0 flex-1 flex items-center gap-1.5"
                          >
                            <span
                              class="shrink-0 text-xs font-sr text-gray-500 leading-none"
                            >អាយុពី</span>
                            <span
                              class="ocm-age-range-value inline-flex h-6 max-h-6 max-w-full min-w-0 items-center rounded border border-gray-200 bg-white px-2 py-0 text-xs font-sr font-medium leading-tight text-gray-800 shadow-sm"
                            >
                              <span class="truncate leading-tight">{{
                                ageRangeFilterLabel
                              }}</span>
                            </span>
                          </div>
                          <span
                            v-else
                            class="truncate leading-none text-gray-400"
                          >អាយុ</span>
                          <div
                            v-if="ageRangeFilterLabel"
                            class="flex shrink-0 items-center"
                          >
                            <button
                              type="button"
                              class="ocm-age-range-clear inline-flex h-5 w-5 items-center justify-center rounded text-gray-400 hover:bg-gray-200/90 hover:text-gray-700"
                              aria-label="សម្អាតអាយុ"
                              @click.stop="clearAgeRangeFilter"
                            >
                              <svg
                                class="h-3.5 w-3.5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                                />
                              </svg>
                            </button>
                          </div>
                          <svg
                            class="h-4 w-4 flex-shrink-0 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </div>
                      </template>
                      <div
                        class="flex flex-nowrap items-center gap-1.5 px-1 py-0.5"
                      >
                        <span
                          class="shrink-0 text-xs font-sr text-gray-600 leading-none"
                        >ចាប់ពី</span>
                        <n-select
                          v-model:value="ageRangeFrom"
                          :options="ageSelectOptions"
                          filterable
                          clearable
                          size="small"
                          :consistent-menu-width="false"
                          placeholder="—"
                          class="ocm-age-range-select w-[4.75rem] shrink-0"
                          @update:value="onAgeRangeUpdate"
                        />
                        <span
                          class="shrink-0 text-xs font-sr text-gray-600 leading-none"
                        >ដល់</span>
                        <n-select
                          v-model:value="ageRangeTo"
                          :options="ageSelectOptions"
                          filterable
                          clearable
                          size="small"
                          :consistent-menu-width="false"
                          placeholder="—"
                          class="ocm-age-range-select w-[4.75rem] shrink-0"
                          @update:value="onAgeRangeUpdate"
                        />
                      </div>
                    </n-popover>
                  </template>
                  ជ្រើសរើសអាយុ (ចាប់ពី – ដល់)
                </n-tooltip>
              </div>
              <!-- <div class="filter-action-date" >
                <n-date-picker v-model:value="unofficial_date_ts" type="month" clearable placeholder="ខែឆ្នាំចូលបម្រើការ" @update:value="filterRecords(false)"/>
              </div> -->
              <div
                v-if="isTypeLocked('admin_official')"
                class="filter-action filter-action-date filter-action--official-year"
              >
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-date-picker
                      v-model:value="official_date_ts"
                      type="year"
                      clearable
                      :actions="[]"
                      placeholder="ឆ្នាំតាំងស៊ប់"
                      class="ocm-official-year-picker w-full"
                      @update:value="filterRecords(false)"
                    />
                  </template>
                  ជ្រើសរើសឆ្នាំតាំងស៊ប់
                </n-tooltip>
              </div>
              <div class="filter-action-gender">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedGender"
                      filterable
                      clearable
                      @update:value="filterRecords(false)"
                      placeholder="ភេទ"
                      :options="[
                        { label: 'ទាំងអស់', value: null },
                        { label: 'ស្រី', value: 0 },
                        { label: 'ប្រុស', value: 1 },
                      ]"
                    />
                  </template>
                  ជ្រើសរើសភេទ
                </n-tooltip>
              </div>
              <div
                v-if="hasActiveFilters"
                class="filter-action filter-action--clear-filters"
              >
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-button
                      quaternary
                      type="error"
                      size="small"
                      class="h-8"
                      @click="clearAllFilters"
                    >
                      <span
                        class="inline-flex items-center justify-center gap-1.5"
                      >
                        <svg
                          class="w-4 h-4 shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          aria-hidden="true"
                        >
                          <polygon
                            points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"
                          />
                          <line x1="2" y1="2" x2="22" y2="22" />
                        </svg>
                        <span>សម្អាត</span>
                      </span>
                    </n-button>
                  </template>
                  លុបលក្ខខណ្ឌជ្រើសរើសទាំងអស់ និងផ្ទុកបញ្ជីដើមឡើងវិញ
                </n-tooltip>
              </div>
            </div>
          </div>

          <div class="flex-shrink-0 pt-6">
            <n-popover
              trigger="click"
              placement="bottom-end"
              :show-arrow="false"
              :width="320"
            >
              <template #trigger>
                <button class="vcb-table-toggle-btn" type="button">
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M4 6h24v20H4V6zm2 2v4h20V8H6zm0 6v4h6v-4H6zm8 0v4h12v-4H14zM6 20v4h6v-4H6zm8 0v4h12v-4H14z"
                      fill="currentColor"
                    ></path>
                  </svg>
                  កំណត់ការបង្ហាញតារាង
                </button>
              </template>
              <div class="vcb-table-toggle-panel">
                <div class="flex items-center justify-between">
                  <div class="vcb-table-toggle-title">ទិដ្ឋភាពតារាង</div>
                  <div class="flex items-center gap-2">
                    <span class="text-[11px] text-gray-600">រូបថត</span>
                    <button
                      type="button"
                      class="relative w-10 h-5 rounded-full transition-colors duration-200 focus:outline-none"
                      :class="
                        columnVisibility.avatar ? 'bg-blue-600' : 'bg-gray-300'
                      "
                      @click="
                        columnVisibility.avatar = !columnVisibility.avatar
                      "
                      aria-label="toggle avatar column"
                    >
                      <span
                        class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200"
                        :class="
                          columnVisibility.avatar
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        "
                      ></span>
                    </button>
                  </div>
                </div>
                <div class="vcb-table-toggle-section-label">
                  បង្ហាញ / លាក់ជួរឈរ
                </div>

                <div class="vcb-table-toggle-items">
                  <n-checkbox v-model:checked="columnVisibility.code"
                    >អត្តលេខមន្ត្រី</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.nid"
                    >លេខអត្តសញ្ញាណបណ្ណ</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.khName"
                    >ឈ្មោះខ្មែរ</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.enName"
                    >ឈ្មោះឡាតាំង</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.dob"
                    >ថ្ងៃខែឆ្នាំកំណើត</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.unofficialDate"
                    >ថ្ងៃខែឆ្នាំចូលធ្វើការ</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.officialDate"
                    >ថ្ងៃតាំងស៊ប់</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.organization"
                    >អង្គភាព</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.position"
                    >តួនាទី</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.rank"
                    >ឋានន្តរស័ក្កិ</n-checkbox
                  >
                  <n-checkbox
                    v-model:checked="columnVisibility.unofficialPosition"
                    >ឋានៈស្មើ</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.certificate"
                    >កម្រិតអប់រំ</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.email"
                    >អាសយដ្ឋានអេឡិចត្រូនិច</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.phone"
                    >លេខទូរស័ព្ទ</n-checkbox
                  >
                  <n-checkbox v-model:checked="columnVisibility.userCreatedAt"
                    >ថ្ងៃបង្កើត</n-checkbox
                  >
                </div>

                <div class="vcb-table-toggle-footer">
                  <button
                    class="vcb-table-toggle-link"
                    type="button"
                    @click="setAllColumns(true)"
                  >
                    បង្ហាញជួរឈរទាំងអស់
                  </button>
                  <button
                    class="vcb-table-toggle-link"
                    type="button"
                    @click="setAllColumns(false)"
                  >
                    លាក់ជួរឈរទាំងអស់
                  </button>
                </div>
              </div>
            </n-popover>
          </div>
        </div>
      </div>
      <div
        class="otc-table-hscroll min-w-0 overflow-x-auto overscroll-x-contain"
      >
        <Transition name="fade">
          <table
            v-if="
              Array.isArray(table.records.matched) &&
              table.records.matched.length > 0
            "
            class="otc-table"
          >
            <thead>
              <tr class="otc-header-row">
                <th>ល.រ</th>
                <th v-if="columnVisibility.code" class="text-left">
                  អត្តលេខមន្ត្រី
                </th>
                <th v-if="columnVisibility.nid" class="text-left">
                  លេខអត្តសញ្ញាណបណ្ណ
                </th>
                <th
                  v-if="columnVisibility.khName"
                  class="text-left min-w-[200px]"
                >
                  ឈ្មោះខ្មែរ
                </th>
                <th v-if="columnVisibility.enName" class="text-left">
                  ឈ្មោះឡាតាំង
                </th>
                <th v-if="columnVisibility.dob" class="text-left">
                  ថ្ងៃខែឆ្នាំកំណើត
                </th>
                <th v-if="columnVisibility.unofficialDate" class="text-left">
                  ថ្ងៃខែឆ្នាំចូលធ្វើការ
                </th>
                <th v-if="columnVisibility.officialDate" class="text-left">
                  ថ្ងៃខែឆ្នាំតាំងស៊ប់
                </th>
                <th
                  style="white-space: nowrap"
                  v-if="columnVisibility.rank"
                  class="text-left"
                >
                  ឋានន្តរស័ក្កិ
                </th>
                <th
                  v-if="columnVisibility.organization"
                  class="text-left min-w-[11rem] max-w-[15rem] whitespace-nowrap"
                >
                  អង្គភាព
                </th>
                <th
                  v-if="columnVisibility.position"
                  class="text-left min-w-[13rem] max-w-[17rem] whitespace-nowrap"
                >
                  តួនាទី
                </th>
                <th
                  style="white-space: nowrap"
                  v-if="columnVisibility.unofficialPosition"
                  class="text-left"
                >
                  ឋានៈស្មើ
                </th>
                <th v-if="columnVisibility.certificate" class="text-left">
                  កម្រិតអប់រំ
                </th>
                <th v-if="columnVisibility.email" class="text-left">
                  អាសយដ្ឋានអេឡិចត្រូនិច
                </th>
                <th v-if="columnVisibility.phone" class="text-left">
                  លេខទូរស័ព្ទ
                </th>
                <th v-if="columnVisibility.userCreatedAt" class="text-left">
                  ថ្ងៃបង្កើត
                </th>
                <th
                  class="otc-col-actions otc-col-actions-head text-xs font-medium text-black whitespace-nowrap text-left"
                  scope="col"
                >
                  សកម្មភាព
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(record, index) in table.records.matched"
                :key="index"
                class="otc-body-row"
              >
                <td>
                  {{
                    $toKhmer(
                      (table.pagination.page - 1) * table.pagination.perPage +
                        (index + 1),
                    )
                  }}
                </td>
                <td
                  v-if="columnVisibility.code"
                  class="text-left"
                  v-html="
                    $toKhmer(
                      highlightMultipleTerms(
                        record.code,
                        table.pagination.search,
                      ),
                    )
                  "
                ></td>
                <td
                  v-if="columnVisibility.nid"
                  class="text-left"
                  v-html="
                    $toKhmer(
                      highlightMultipleTerms(
                        record.people.nid,
                        table.pagination.search,
                      ),
                    )
                  "
                ></td>
                <td
                  v-if="columnVisibility.khName"
                  class="text-left min-w-[200px]"
                >
                  <div class="flex items-center gap-3">
                    <img
                      v-if="columnVisibility.avatar"
                      class="w-8 h-8 rounded-full object-cover border border-gray-200"
                      :src="
                        record.image != null &&
                        record.image !== false &&
                        record.image !== undefined &&
                        record.image !== ''
                          ? record.image
                          : ocmLogoUrl
                      "
                      alt="avatar"
                      loading="lazy"
                    />
                    <span
                      v-html="
                        (record.countesy != null
                          ? record.countesy.name + '<br/>'
                          : '') +
                        (highlightMultipleTerms(
                          record.people.lastname,
                          table.pagination.search,
                        ) +
                          ' ' +
                          highlightMultipleTerms(
                            record.people.firstname,
                            table.pagination.search,
                          ))
                      "
                    ></span>
                  </div>
                </td>
                <td
                  v-if="columnVisibility.enName"
                  class="text-left"
                  v-html="
                    highlightMultipleTerms(
                      record.people.enlastname,
                      table.pagination.search,
                    ) +
                    ' ' +
                    highlightMultipleTerms(
                      record.people.enfirstname,
                      table.pagination.search,
                    )
                  "
                ></td>
                <td v-if="columnVisibility.dob" class="text-left">
                  {{
                    $toKhmer(
                      dateFormat(new Date(record.people.dob), "dd-mm-yyyy"),
                    )
                  }}
                </td>
                <td v-if="columnVisibility.unofficialDate" class="text-left">
                  {{
                    $toKhmer(
                      dateFormat(
                        new Date(record.unofficial_date),
                        "dd-mm-yyyy",
                      ),
                    )
                  }}
                </td>
                <td v-if="columnVisibility.officialDate" class="text-left">
                  {{
                    $toKhmer(
                      dateFormat(new Date(record.official_date), "dd-mm-yyyy"),
                    )
                  }}
                </td>
                <td v-if="columnVisibility.rank" class="text-center">
                  {{
                    record.rank != null
                      // ? record.rank.name + " - " + record.rank.prefix
                      ? record.rank.prefix
                      : ""
                  }}
                </td>
                <td
                  v-if="columnVisibility.organization"
                  class="text-left min-w-[11rem] max-w-[15rem] align-center py-1.5"
                >
                  <div class="line-clamp-2 break-words leading-7 text-[13px]">
                    {{
                      record.current_job?.organization_structure_position
                        ?.organization_structure.organization?.name
                    }}
                  </div>
                </td>
                <td
                  v-if="columnVisibility.position"
                  class="text-left min-w-[13rem] max-w-[17rem] align-center py-1.5"
                >
                  <div class="line-clamp-2 break-words leading-7 text-[13px]">
                    {{
                      record.current_job?.organization_structure_position
                        ?.position?.name
                    }}
                  </div>
                </td>
                <td
                  v-if="columnVisibility.unofficialPosition"
                  class="text-left"
                >
                  {{ record.current_job?.unofficial_position?.name }}
                </td>
                <td v-if="columnVisibility.certificate" class="text-left">
                  {{ getOfficerCertificateText(record) }}
                </td>
                <td v-if="columnVisibility.email" class="text-left">
                  {{ record.people.email }}
                </td>
                <td v-if="columnVisibility.phone" class="text-left">
                  {{
                    record.people != null && record.people != undefined
                      ? record.people.mobile_phone
                      : ""
                  }}
                </td>
                <td v-if="columnVisibility.userCreatedAt" class="text-left">
                  <template
                    v-if="
                      record.user != null &&
                      record.user.created_at != null &&
                      record.user.created_at !== ''
                    "
                  >
                    {{
                      $toKhmer(
                        dateFormat(
                          new Date(record.user.created_at),
                          "dd-mm-yyyy",
                        ),
                      )
                    }}
                  </template>
                </td>
                <td
                  class="otc-col-actions otc-col-actions-cell text-left align-middle"
                >
                  <div class="flex items-center gap-1 whitespace-nowrap">
                    <button
                      v-if="
                        $hasPermission('portal_staff_background_information')
                      "
                      type="button"
                      class="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 shadow-sm hover:shadow duration-200"
                      @click="goToOfficerPrintProfile(record.id)"
                    >
                      <svg
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 5c-5.5 0-9.5 4.1-10.8 6.2a1.5 1.5 0 0 0 0 1.6C2.5 14.9 6.5 19 12 19s9.5-4.1 10.8-6.2a1.5 1.5 0 0 0 0-1.6C21.5 9.1 17.5 5 12 5zm0 12c-4.5 0-7.9-3.3-9.2-5c1.3-1.7 4.7-5 9.2-5s7.9 3.3 9.2 5c-1.3 1.7-4.7 5-9.2 5zm0-8a3 3 0 1 0 0 6a3 3 0 0 0 0-6z"
                        />
                      </svg>
                      <span class="text-xs leading-none">មើល</span>
                    </button>
                    <button
                      v-if="
                        $hasPermission('portal_staff_print_preview_officer_card')
                      "
                      type="button"
                      class="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md border border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100 hover:border-violet-300 shadow-sm hover:shadow duration-200"
                      @click="showOfficialCardModal(record)"
                    >
                      <svg
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 28 28"
                      >
                        <g fill="none">
                          <path
                            d="M15 11.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 3.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm-4.5-3.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0zM7 14.5h5a1 1 0 0 1 1 1v.5s-.5 2.5-3.5 2.5S6 16 6 16v-.5a1 1 0 0 1 1-1zM2.004 6.75A2.75 2.75 0 0 1 4.754 4H23.25A2.75 2.75 0 0 1 26 6.75v14.5A2.75 2.75 0 0 1 23.25 24H4.755a2.75 2.75 0 0 1-2.75-2.75V6.75zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H23.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25H4.755z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                      <span class="text-xs leading-none">កាត</span>
                    </button>
                    <button
                      v-if="
                        $hasPermission('portal_staff_background_information')
                      "
                      type="button"
                      class="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md border border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:border-amber-300 shadow-sm hover:shadow duration-200"
                      @click="goToOfficerProfile(record.id)"
                    >
                      <svg
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <!-- simple edit pencil -->
                        <path
                          fill="currentColor"
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06l.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83l3.75 3.75l1.84-1.82z"
                        />
                      </svg>
                      <span class="text-xs leading-none">កែប្រែ</span>
                      <span class="hidden text-xs leading-none"
                        >កែប្រវត្តិរូបមន្ត្រី</span
                      >
                    </button>
                    <button
                      v-if="$hasPermission('portal_staff_delete')"
                      type="button"
                      class="inline-flex items-center gap-1.5 px-2.5 h-7 rounded-md border border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 shadow-sm hover:shadow duration-200"
                      @click="deleteOfficer(record)"
                    >
                      <svg
                        class="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                        />
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-miterlimit="10"
                          stroke-width="32"
                          d="M80 112h352"
                          fill="currentColor"
                        />
                        <path
                          d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                          d="M256 176v224"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                          d="M184 176l8 224"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="32"
                          d="M328 176l-8 224"
                        />
                      </svg>
                      <span class="text-xs leading-none">លុប</span>
                    </button>
                  </div>
                  <!-- <table-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" /> -->
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <div v-if="Array.isArray( table.records.matched ) && table.records.matched.length > 0 " class="vcb-thumbnail mb-12" >
          <div v-for="(record, index) in table.records.matched" :key='index' class="item" >
            <div class="content" >
              <div v-if="record.image != false && record.image != null && record.image != undefined " class="image bg-cover bg-no-repeat " :style=" 'background-image: url(' + record.image +');' " ></div>
              <div v-if="record.image == false || record.image == null || record.image == undefined " class="image bg-contain bg-center bg-no-repeat " :style=" 'background-image: url('+ocmLogoUrl+');' " ></div>
              <div class="flex flex-wrap " >
                <div class="w-full py-2" >
                  <div v-if="record.countesy != undefined && record.countesy != null " class="w-full text-center font-moul mr-2" >{{  record.countesy.name }}</div>
                  <div v-if="record.people != undefined && record.people != null " class="w-full text-center font-moul leading-6 tracking-wider" >{{ record.people.lastname + " " + record.people.firstname }}<br/>{{ record.people.enlastname + " " + record.people.enfirstname }}</div>
                </div>
                <div class="w-full flex flex-wrap justify-between text-gray-600" >
                  <div class="w-1/2 flex flex-wrap " >
                    <div v-if=" ( record.official_date != undefined && record.official_date != null ) " class="text-left text-xxs mt-1 leading-5 tracking-wider w-full" >{{ $toKhmer( dateFormat( new Date( record.official_date ) , 'dd-mm-yyyy' ) ) }}<br/></div>
                    <div v-if=" record.current_job != undefined && record.current_job != null " class="text-left text-xxs leading-5 tracking-wider w-full" >{{ 
                      record.current_job.organization_structure_position != undefined && record.current_job.organization_structure_position != null 
                        ? record.current_job.organization_structure_position.position != undefined && record.current_job.organization_structure_position.position != null 
                          ? record.current_job.organization_structure_position.position.name 
                          : '' 
                        : '' 
                    }}</div>
                  </div>
                  <div v-if=" record.current_job != undefined && record.current_job != null " class="w-1/2 text-right text-xxs my-1  leading-5 tracking-wide" >{{ 
                    record.current_job.organization_structure_position != undefined && record.current_job.organization_structure_position != null 
                        ? record.current_job.organization_structure_position.organization_structure != undefined && record.current_job.organization_structure_position.organization_structure != null 
                          ? record.current_job.organization_structure_position.organization_structure.organization.name 
                          : 'ok' 
                        : 'no'  
                  }}</div>
                </div>
                <div v-if="record.card != null && record.card != undefined && record.card.id > 0" class="absolute left-1 top-1 text-vcb-xs text-left font-bold leading-6 tracking-wider" >{{ $toKhmer( record.card.number ) }}</div>
                <div v-if="(record.card == null || record.card == undefined ) && ( record.organization != undefined && record.organization != null ) " class="absolute left-1 top-1 text-xxs text-left font-bold leading-6 tracking-wider" v-html=" $toKhmer( ( record.organization != undefined && record.organization.prefix != null && record.organization.prefix != '' ? record.organization.prefix + '-'  : '' ) + ( record.id + '' ).padStart( 4 , '0' ) )" ></div>
                <div v-if="record.rank != null && record.rank != undefined " class="absolute left-1 top-5 text-vcb-xs text-left font-bold leading-6 tracking-wider text-xxs " v-html=" $toKhmer( record.rank.prefix + ' ' + record.rank.name )" ></div>
                <div v-if=" record.current_job != undefined && record.current_job != null " class="absolute right-10 top-2 w-1 h-1 bg-green-400 rounded-full " ></div>
              </div>
              <thumbnail-actions-form v-bind:model="model" v-bind:record="record" :onClose="closeActions" />
            </div>
          </div>
        </div> -->
        </Transition>
      </div>
      <!-- Loading -->
      <Transition name="slide-fade">
        <div
          v-if="table.loading == true"
          class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-90 z-50"
        >
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg
                class="animate-spin w-16 mx-auto text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
              >
                <path
                  d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z"
                  fill="currentColor"
                ></path>
              </svg>
              <br /><br />កំពុងអាន...
            </div>
          </div>
          <div
            class="absolute top-2 right-2 cursor-pointer bg-white rounded-full"
            @click="closeTableLoading"
          >
            <svg
              class="w-10 mx-auto text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="32"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M320 320L192 192"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M192 320l128-128"
              ></path>
            </svg>
          </div>
        </div>
      </Transition>
      <!-- Pagination of crud -->
      <div class="fixed left-0 right-0 bottom-8 flex flex-wrap">
        <Transition name="slide-fade">
          <!-- This pagination is for the media side with from Medium up -->
          <div
            v-if="table.pagination.totalPages > 1"
            class="vcb-table-pagination bg-blue-300 mx-auto"
          >
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-popselect
                  trigger="click"
                  v-model:value="table.pagination.perPage"
                  :options="[
                    { label: 5, value: 5 },
                    { label: 10, value: 10 },
                    { label: 20, value: 20 },
                    { label: 30, value: 30 },
                    { label: 40, value: 40 },
                    { label: 50, value: 50 },
                    { label: 100, value: 100 },
                    { label: 200, value: 200 },
                    { label: 500, value: 500 },
                  ]"
                  size="small"
                  scrollable
                  @update:value="goTo(1)"
                >
                  <div
                    class="cursor-pointer font-pvh rounded-full p-2 px-4 border border-gray-200 text-blue-600"
                  >
                    {{ $toKhmer(table.pagination.perPage) }}
                  </div>
                </n-popselect>
              </template>
              ចំនួនព័ត៌មានបង្ហាញម្ដង
            </n-tooltip>
            <!-- Information -->
            <div
              class="vcb-table-pagination-info font-pvh text-blue-600 p-1 mx-2"
            >
              {{
                table.pagination.totalRecords > 0
                  ? $toKhmer(table.pagination.totalRecords) + " ឯកសារ"
                  : ""
              }}
            </div>
            <div
              class="vcb-table-pagination-info font-pvh text-blue-600 p-1 mx-2"
            >
              {{
                table.pagination.totalPages > 0
                  ? $toKhmer(table.pagination.totalPages) + " ទំព័រ"
                  : ""
              }}
            </div>
            <!-- Pages (7) -->
            <div
              v-for="(page, index) in table.pagination.buttons"
              :key="index"
              :class="
                table.pagination.page == page
                  ? ' vcb-pagination-page-active '
                  : ' vcb-pagination-page '
              "
              @click="table.pagination.page == page ? false : goTo(page)"
            >
              {{ $toKhmer(page) }}
            </div>
            <!-- First -->
            <div
              v-if="table.pagination.page > 1"
              class="vcb-pagination-page p-1"
              @click="first()"
            >
              <svg
                class="w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18.29 17.29a.996.996 0 0 0 0-1.41L14.42 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L12.3 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z"
                  fill="currentColor"
                ></path>
                <path
                  d="M11.7 17.29a.996.996 0 0 0 0-1.41L7.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L5.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <!-- Previous -->
            <Transition name="slide-fade">
              <div
                v-if="table.pagination.page > 1"
                class="vcb-pagination-page p-1"
                @click="previous()"
              >
                <svg
                  class="w-5 h-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Transition>
            <!-- Next -->
            <Transition name="slide-fade">
              <div
                v-if="table.pagination.page < table.pagination.totalPages"
                class="vcb-pagination-page p-1"
                @click="next()"
              >
                <svg
                  class="w-5 h-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
            </Transition>
            <!-- Last -->
            <div
              v-if="table.pagination.page < table.pagination.totalPages"
              class="vcb-pagination-page p-1"
              @click="last()"
            >
              <svg
                class="w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.7 6.71a.996.996 0 0 0 0 1.41L9.58 12L5.7 15.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L7.12 6.71c-.39-.39-1.03-.39-1.42 0z"
                  fill="currentColor"
                ></path>
                <path
                  d="M12.29 6.71a.996.996 0 0 0 0 1.41L16.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7c-.38-.38-1.02-.38-1.41.01z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <!-- Go to -->
            <!-- Total per page -->
          </div>
        </Transition>
      </div>
    </div>
    <!-- Form create account -->
    <create-form
      v-if="createModal.show"
      v-bind:model="model"
      v-bind:show="createModal.show"
      :onClose="closeCreateModal"
    />
    <create-non-officer-form
      v-if="createNonOfficerModal.show"
      v-bind:model="model"
      v-bind:show="createNonOfficerModal.show"
      :onClose="closeCreateNonOfficerModal"
    />
    <detail-form
      v-if="detailModal.show"
      v-bind:model="model"
      v-bind:record="detailModal.record"
      v-bind:show="detailModal.show"
      :onClose="closeDetailModal"
    />
    <official-card-form
      v-if="officialCardModal.show"
      v-bind:model="model"
      v-bind:record="officialCardModal.record"
      v-bind:show="officialCardModal.show"
      :onClose="closeOfficialCardModal"
    />
    <n-modal
      v-model:show="printProfileModal.show"
      :mask-closable="true"
      style="width: min(96vw, 1400px)"
    >
      <div
        class="relative rounded-lg overflow-hidden bg-white shadow-xl"
        style="height: 90vh"
      >
        <button
          type="button"
          class="absolute top-3 right-3 z-10 inline-flex items-center justify-center w-11 h-11 rounded-full border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 hover:border-red-300 shadow-sm duration-200"
          @click="closePrintProfileModal"
          aria-label="close preview"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.3 5.71a1 1 0 0 0-1.42 0L12 10.59L7.12 5.7A1 1 0 1 0 5.7 7.12L10.59 12L5.7 16.88a1 1 0 1 0 1.42 1.42L12 13.41l4.88 4.89a1 1 0 0 0 1.42-1.42L13.41 12l4.89-4.88a1 1 0 0 0 0-1.41z"
            />
          </svg>
        </button>

        <div
          class="w-full bg-gray-100 overflow-auto flex items-center justify-center"
          style="height: 90vh"
        >
          <div class="print-preview-stage">
            <iframe
              v-if="printProfileModal.url"
              :src="printProfileModal.url"
              class="print-preview-iframe"
              frameborder="0"
              scrolling="auto"
            ></iframe>
          </div>
        </div>
      </div>
    </n-modal>
    <!-- Popup Filter panel of crud -->
    <!-- <Transition name="slide-fade" >
      <div v-if="filter" class="vcb-filters-panel ">
        <svg @click="toggleFilter()" class="absolute bg-white rounded-full shadow p-2 right-2 top-2 w-10 h-10 border border-gray-200 cursor-pointer hover:text-green-500 duration-300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M18 28h-4a2 2 0 0 1-2-2v-7.59L4.59 11A2 2 0 0 1 4 9.59V6a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v3.59a2 2 0 0 1-.59 1.41L20 18.41V26a2 2 0 0 1-2 2zM6 6v3.59l8 8V26h4v-8.41l8-8V6z" fill="currentColor"></path></svg>
        <div class="filter-title font-moul" >លក្ខណ សម្រង់ទិន្នន័យ៖</div>
        <div class="filter-actions" >
          <div class="filter-action" >
            <n-select v-model:value="selectedPositions" filterable clearable multiple @update:value="filterRecords(false)" placeholder="មុខតំណែង" :options="optionPositions" />
          </div>
          <div class="filter-action" >
            <n-select v-model:value="selectedOrganizations" filterable clearable multiple @update:value="filterRecords(false)" placeholder="ស្ថាប័ន / អង្គភាព" :options="optionOrganizations" />
          </div>
        </div>
      </div>
    </Transition> -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="reportToggle" class="ocm-officer-report-overlay">
          <div class="report-body w-full min-h-96 overflow-auto">
            <report-component />
          </div>
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg
                @click="reportToggleFunc()"
                class="absolute top-2 right-2 w-8 cursor-pointer leading-5 h-8 rounded-full text-red-500 bg-white"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
              >
                <path
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  stroke-width="32"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M320 320L192 192"
                ></path>
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M192 320l128-128"
                ></path>
              </svg>
            </template>
            បិទរបាយការណ៍
          </n-tooltip>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
<script>
import { reactive, ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import QrcodeVue from "qrcode.vue";
import Vue3Barcode from "vue3-barcode";
import {
  useDialog,
  useMessage,
  useNotification,
} from "naive-ui";
import ocmLogoUrl from "./../../../assets/logo.svg";
import dateFormat from "dateformat";
/**
 * CRUD component form
 */
import CreateForm from "./../widgets/create.vue";
import CreateNonOfficerForm from "./../widgets/createnonofficer.vue";
import TableActionsForm from "./actions/table-action.vue";
import DetailForm from "./../widgets/detail.vue";
import OfficialCardForm from "./../widgets/officialcard.vue";
import ReportComponent from "./../../reports/officersinorg/tablestyle-div.vue";
export default {
  name: "People",
  props: {
    /**
     * When set, the listing is fixed to this officer type.
     */
    lockedOfficerType: {
      type: String,
      default: null,
      validator: (v) =>
        v == null ||
        v === "politician" ||
        v === "admin_official",
    },

    lockedOfficerTypes: {
      type: Array,
      default: () => [],
      validator: (arr) =>
        Array.isArray(arr) &&
        arr.every(
          (v) =>
            v === "politician" ||
            v === "admin_official",
        ),
    },

    lockedOfficerTitle: {
      type: String,
      default: null,
    },
  },
  components: {
    QrcodeVue,
    Vue3Barcode,
    DetailForm,
    OfficialCardForm,
    /**
     * Forms
     */
    CreateForm,
    CreateNonOfficerForm,
    TableActionsForm,
    ReportComponent,
  },
  setup(props) {
    const ALLOWED_LOCKED_TYPES = ["politician", "admin_official"];

    function normalizeLockedOfficerTypes(types) {
      if (!Array.isArray(types)) return [];
      return types.filter((t) => ALLOWED_LOCKED_TYPES.includes(t));
    }

    function resolveLockedOfficerTypes() {
      const multi = normalizeLockedOfficerTypes(props.lockedOfficerTypes);
      if (multi.length > 0) return multi;
      return props.lockedOfficerType ? [props.lockedOfficerType] : [];
    }

    function isTypeLocked(type) {
      return resolveLockedOfficerTypes().includes(type);
    }

    function hasAnyLockedTypes(types = []) {
      const active = resolveLockedOfficerTypes();
      return Array.isArray(types) && types.some((t) => active.includes(t));
    }

    const store = useStore();
    const route = useRoute();
    const dialog = useDialog();
    const message = useMessage();
    const notify = useNotification();
    const router = useRouter();

    const isWildSearch = ref(false);

    const peopleIds = ref(
      route.params.ids != undefined && route.params.ids.trim().length > 0
        ? route.params.ids.split(",")
        : null,
    );

    function listingTitleForLock(lock) {
      if (lock === "politician") return "មន្ត្រីនយោបាយ";
      if (lock === "admin_official") return "មន្ត្រីមុខងារសាធារណៈ";
      return "មន្ត្រីរាជការមុខងារសាធារណៈ";
    }

    function listingTitleForTypes(types) {
      if (!Array.isArray(types) || types.length === 0) {
        return "មន្ត្រីរាជការមុខងារសាធារណៈ";
      }
      if (types.length === 1) {
        return listingTitleForLock(types[0]);
      }
      return "គ្រប់គ្រងព័ត៌មានមន្ត្រី";
    }

    function resolveListingTitle(types) {
      if (
        typeof props.lockedOfficerTitle === "string" &&
        props.lockedOfficerTitle.trim().length > 0
      ) {
        return props.lockedOfficerTitle.trim();
      }
      return listingTitleForTypes(types);
    }

    const initialLockedOfficerTypes = resolveLockedOfficerTypes();

    const model = reactive({
      name: "officer",
      module: "officers",
      title: resolveListingTitle(initialLockedOfficerTypes),
    });

    const table = reactive({
      loading: false,
      search: "",
      records: {
        all: [],
        matched: [],
      },
      columns: {
        searchable: {
          username: "",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          active: "",
        },
        format: {
          username: "",
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          active: "",
        },
      },
      pagination: {
        perPage: 20,
        page: 1,
        totalPages: 0,
        totalRecords: 0,
        start: 0,
        end: 0,
        buttons: [],
      },
    });
    let filterRecordsDebounceTimer = null;

    const columnVisibility = reactive({
      code: true,
      nid: true,
      avatar: true,
      khName: true,
      enName: true,
      dob: true,
      unofficialDate: true,
      officialDate: true,
      organization: true,
      position: true,
      rank: false,
      unofficialPosition: false,
      certificate: false,
      email: false,
      phone: false,
      userCreatedAt: false,
    });

    const COLUMN_VISIBILITY_STORAGE_KEY =
      "ocm.hr.officer.listing.table.columnVisibility.v2";

    function loadColumnVisibility() {
      try {
        if (typeof window === "undefined" || !window.localStorage) return;
        const raw = window.localStorage.getItem(COLUMN_VISIBILITY_STORAGE_KEY);
        if (!raw) return;
        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") return;

        Object.keys(columnVisibility).forEach((k) => {
          if (typeof parsed[k] === "boolean") {
            columnVisibility[k] = parsed[k];
          }
        });
      } catch (e) {}
    }

    function persistColumnVisibility() {
      try {
        if (typeof window === "undefined" || !window.localStorage) return;
        window.localStorage.setItem(
          COLUMN_VISIBILITY_STORAGE_KEY,
          JSON.stringify({ ...columnVisibility }),
        );
      } catch (e) {}
    }

    loadColumnVisibility();

    let persistColumnVisibilityTimer = null;
    watch(
      columnVisibility,
      () => {
        if (persistColumnVisibilityTimer)
          clearTimeout(persistColumnVisibilityTimer);
        persistColumnVisibilityTimer = setTimeout(() => {
          persistColumnVisibility();
        }, 200);
      },
      { deep: true },
    );

    const selectedOfficerTypes = ref(initialLockedOfficerTypes);

    function setAllColumns(isVisible) {
      Object.keys(columnVisibility).forEach((k) => {
        columnVisibility[k] = isVisible;
      });
    }

    function filterRecords(helper = true) {
      if (helper) {
        table.records.matched = [];
        if (table.search != "") {
          for (var index in table.records.all) {
            for (var field in table.records.all[index]) {
              if (
                ("" + table.records.all[index][field]).includes(
                  table.search,
                ) !== false
              ) {
                table.records.matched.push(table.records.all[index]);
                break;
              }
            }
          }
        }
        if (table.records.matched.length <= 0) {
          table.records.matched = table.records.all;
        }
      } else {
        if (filterRecordsDebounceTimer) {
          clearTimeout(filterRecordsDebounceTimer);
        }
        filterRecordsDebounceTimer = setTimeout(function () {
          table.pagination.page = 1;
          getRecords();
        }, 500);
      }
    }

    /**
     * Age range filter: selectable ages and API DOB range (min = first working age 18)
     */
    const AGE_FILTER_MIN = 18;
    const AGE_FILTER_MAX = 150;

    /**
     * Functions
     */
    function agesToDobRangeString(ageFrom, ageTo) {
      if (ageFrom == null || ageTo == null) {
        return false;
      }
      let a = Number(ageFrom);
      let b = Number(ageTo);
      if (Number.isNaN(a) || Number.isNaN(b)) {
        return false;
      }
      a = Math.max(AGE_FILTER_MIN, Math.min(AGE_FILTER_MAX, a));
      b = Math.max(AGE_FILTER_MIN, Math.min(AGE_FILTER_MAX, b));
      if (a > b) {
        const t = a;
        a = b;
        b = t;
      }
      const now = new Date();
      const minDob = new Date(
        now.getFullYear() - b,
        now.getMonth(),
        now.getDate(),
      );
      const maxDob = new Date(
        now.getFullYear() - a,
        now.getMonth(),
        now.getDate(),
      );
      return (
        dateFormat(minDob, "yyyy-mm-dd") + "," + dateFormat(maxDob, "yyyy-mm-dd")
      );
    }

    function personAgeFromDob(dob) {
      if (dob == null || dob === "") {
        return null;
      }
      const s = String(dob);
      const m = s.slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})/);
      const now = new Date();
      if (m) {
        const y = parseInt(m[1], 10);
        const mo = parseInt(m[2], 10) - 1;
        const d = parseInt(m[3], 10);
        if (Number.isNaN(y) || Number.isNaN(mo) || Number.isNaN(d)) {
          return null;
        }
        const birth = new Date(y, mo, d);
        let age = now.getFullYear() - birth.getFullYear();
        const md = now.getMonth() - birth.getMonth();
        if (md < 0 || (md === 0 && now.getDate() < birth.getDate())) {
          age -= 1;
        }
        return age;
      }
      const t = new Date(s);
      if (Number.isNaN(t.getTime())) {
        return null;
      }
      let age = now.getFullYear() - t.getFullYear();
      const md = now.getMonth() - t.getMonth();
      if (md < 0 || (md === 0 && now.getDate() < t.getDate())) {
        age -= 1;
      }
      return age;
    }

    function filterListByClientAgeRange(records, fromVal, toVal) {
      if (!Array.isArray(records)) {
        return [];
      }
      if (fromVal == null || toVal == null) {
        return records;
      }
      let lo = Number(fromVal);
      let hi = Number(toVal);
      if (Number.isNaN(lo) || Number.isNaN(hi)) {
        return records;
      }
      if (lo > hi) {
        const t = lo;
        lo = hi;
        hi = t;
      }
      return records.filter((r) => {
        const age = personAgeFromDob(r?.people?.dob);
        if (age == null) {
          return false;
        }
        return age >= lo && age <= hi;
      });
    }

    function getRecords() {
      table.loading = true;
      const requestParams = {
        search: table.search,
        perPage: table.pagination.perPage,
        page: table.pagination.page,
        positions: selectedPositions.value,

        unofficial_position_ids: selectedUnofficialPositions.value,
        educatoin_levels: getSelectedEducationLevelIds(),
        ranks: selectedRanks.value,
        gender: selectedGender.value,

        // Search with wild card or not
        wild_search: isWildSearch.value == true ? 1 : 0,

        organizations: selectedOrganizations.value,
        ids: peopleIds.value,

        officer_types: selectedOfficerTypes.value,
        dob_range: agesToDobRangeString(ageRangeFrom.value, ageRangeTo.value),
        dob:
          parseInt(dob_ts.value) > 0
            ? dateFormat(new Date(dob_ts.value), "yyyy-mm")
            : "",
        unofficial_date:
          parseInt(unofficial_date_ts.value) > 0
            ? dateFormat(new Date(unofficial_date_ts.value), "yyyy-mm")
            : "",
        official_date:
          parseInt(official_date_ts.value) > 0
            ? dateFormat(new Date(official_date_ts.value), "yyyy")
            : "",
      };

      store
        .dispatch(model.name + "/list", requestParams)
        .then((res) => {
          const raw = res.data.records;
          table.records.all = table.records.matched = filterListByClientAgeRange(
            Array.isArray(raw) ? raw : [],
            ageRangeFrom.value,
            ageRangeTo.value,
          );
          table.pagination = res.data.pagination;

          var paginationNumberList = 10;
          if (
            table.pagination.page - (parseInt(paginationNumberList / 2) + 1) <
            1
          ) {
            table.pagination.start = 1;
            table.pagination.end =
              table.pagination.totalPages > paginationNumberList
                ? paginationNumberList
                : table.pagination.totalPages;
          } else {
            table.pagination.start =
              table.pagination.page - parseInt(paginationNumberList / 2);
            table.pagination.end =
              table.pagination.page >= table.pagination.totalPages
                ? table.pagination.totalPages
                : table.pagination.page + parseInt(paginationNumberList / 2);
          }
          /**
           * Create pagination buttons
           */
          table.pagination.buttons = [];
          for (var i = table.pagination.start; i <= table.pagination.end; i++) {
            i <= table.pagination.totalPages
              ? table.pagination.buttons.push(i)
              : false;
          }

          closeTableLoading();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          table.loading = false;
        });
    }

    function closeTableLoading() {
      table.loading = false;
    }

    /** Clear search/filters (not officer type). Used when route scope changes so political ↔ civil-service does not keep prior filters. */
    function resetListingFilterState() {
      if (filterRecordsDebounceTimer) {
        clearTimeout(filterRecordsDebounceTimer);
        filterRecordsDebounceTimer = null;
      }
      table.search = "";
      selectedAnks.value = DEFAULT_ANK;
      selectedRanks.value = null;
      selectedOrganizations.value = null;
      selectedPositions.value = null;
      selectedUnofficialPositions.value = null;
      selectedEducationLevels.value = null;
      selectedGender.value = null;
      dob_ts.value = null;
      ageRangeFrom.value = null;
      ageRangeTo.value = null;
      ageRangeFilterWasActive.value = false;
      unofficial_date_ts.value = null;
      official_date_ts.value = null;
      isWildSearch.value = false;
      peopleIds.value = null;
    }

    watch(
      () => [
        props.lockedOfficerType,
        JSON.stringify(props.lockedOfficerTypes || []),
        props.lockedOfficerTitle,
      ],
      () => {
        resetListingFilterState();
        const nextTypes = resolveLockedOfficerTypes();
        selectedOfficerTypes.value = nextTypes;
        model.title = resolveListingTitle(nextTypes);
        // New officer-type scope may have fewer pages; keep prior page (e.g. 2) → empty list + hidden table
        table.pagination.page = 1;
        getRecords();
      },
    );

    /**
     * Pagination functions
     */
    function first() {
      goTo(table.pagination.totalPages > 0 ? 1 : 0);
    }
    function previous() {
      goTo(table.pagination.page <= 1 ? 1 : table.pagination.page - 1);
    }
    function next() {
      goTo(
        table.pagination.page >= table.pagination.totalPages
          ? table.pagination.totalPages
          : table.pagination.page + 1,
      );
    }
    function last() {
      goTo(table.pagination.totalPages > 0 ? table.pagination.totalPages : 0);
    }
    function goTo(page) {
      table.pagination.page =
        page >= table.pagination.totalPages
          ? table.pagination.totalPages
          : page < 1
            ? 1
            : page;
      getRecords();
    }
    function updatePerpage(perPage) {
      table.pagination.perPage =
        perPage < 5 ? 5 : perPage > 100 ? 100 : perPgae;
      table.pagination.page = 1;
      getRecords();
    }

    /**
     * Create modal handling
     */
    var createModal = reactive({ show: false });
    function showCreateModal() {
      void Promise.allSettled([
        getOrganizations(),
        getPositions(),
        getCountesies(),
      ]);
      createModal.show = true;
    }

    function closeCreateModal(actionStatus) {
      createModal.show = false;
      if (parseInt(actionStatus) > 0) getRecords();
    }

    /**
     * Create non officer modal handling
     */
    var createNonOfficerModal = reactive({ show: false });
    function showCreateNonOfficerModal() {
      void Promise.allSettled([
        getOrganizations(),
        getPositions(),
        getCountesies(),
      ]);
      createNonOfficerModal.show = true;
    }

    function closeCreateNonOfficerModal(actionStatus) {
      createNonOfficerModal.show = false;
      if (parseInt(actionStatus) > 0) getRecords();
    }

    function closeActions(actionStatus) {
      if (parseInt(actionStatus) > 0) getRecords();
    }

    const detailModal = reactive({ show: false, record: null });
    function showDetailModal(record) {
      void Promise.allSettled([getCertificates(), getRanks()]);
      detailModal.record = record;
      detailModal.show = true;
    }
    function closeDetailModal() {
      detailModal.show = false;
      detailModal.record = null;
    }

    /**
     * Load positions
     */
    const selectedPositions = ref(null);
    const optionPositions = computed(() => {
      let positions =
        Array.isArray(store.getters["position/getRecords"]) &&
        store.getters["position/getRecords"].length > 0
          ? store.getters["position/getRecords"]
          : [];

      positions = positions.map((p) => {
        return { label: p.name, value: p.id };
      });
      positions.unshift({ label: "មុនតំណែង", value: null });
      return positions;
    });
    function hasPositionRecords() {
      return (
        Array.isArray(store.getters["position/getRecords"]) &&
        store.getters["position/getRecords"].length > 0
      );
    }
    function getPositions() {
      if (hasPositionRecords()) return Promise.resolve();
      return store
        .dispatch("position/structurePosition", {
          page: 1,
          perPage: 1000,
          search: "",
        })
        .then((res) => {
          store.commit("position/setRecords", res.data.records);
        })
        .catch((err) => {
          notify.error({
            title: "អានតំណែង",
            description: "មានបញ្ហាពេលអានតំណែង។",
          });
          console.log(err);
        });
    }

    /**
     * Load positions
     */
    const selectedOrganizations = ref(null);
    const optionOrganizations = computed(() => {
      let organizations =
        Array.isArray(store.getters["organization/getRecords"]) &&
        store.getters["organization/getRecords"].length > 0
          ? store.getters["organization/getRecords"]
          : [];
      organizations = organizations.map((p) => {
        return { label: p.name, value: p.id };
      });
      organizations.unshift({
        label: "ស្ថាប័ន / អង្គភាព",
        value: null,
      });
      return organizations;
    });
    function hasOrganizationRecords() {
      return (
        Array.isArray(store.getters["organization/getRecords"]) &&
        store.getters["organization/getRecords"].length > 0
      );
    }
    function getOrganizations() {
      if (hasOrganizationRecords()) return Promise.resolve();
      return store
        .dispatch("organization/organizationStructure", {
          page: 1,
          perPage: 1000,
          search: "",
          id: 0,
        })
        .then((res) => {
          store.commit("organization/setRecords", res.data.records);
        })
        .catch((err) => {
          notify.error({
            title: "អានអង្គភាព",
            description: "មានបញ្ហាពេលអានអានអង្គភាព។",
          });
          console.log(err);
        });
    }

    const reportSelectedOrganization = ref(null);
    function openCreateProfileDraftPage() {
      if (
        props.lockedOfficerType === "politician" ||
        props.lockedOfficerType === "admin_official"
      ) {
        router.push({
          path: "/officer/create",
          query: { officerType: props.lockedOfficerType },
        });
        return;
      }
      router.push("/officer/create");
    }

    function goToOfficerProfile(id) {
      router.push("/officer/profile/" + id);
    }

    function goToOfficerPrintProfile(id) {
      printProfileModal.url =
        window.location.origin + "/#/officer/print/profile/" + id;
      printProfileModal.show = true;
    }

    const printProfileModal = reactive({
      show: false,
      url: "",
    });

    function closePrintProfileModal() {
      printProfileModal.show = false;
    }

    const officialCardModal = reactive({
      show: false,
      record: null,
    });

    function showOfficialCardModal(record) {
      officialCardModal.record = record;
      officialCardModal.show = true;
    }

    function closeOfficialCardModal() {
      officialCardModal.show = false;
      officialCardModal.record = null;
    }

    function deleteOfficer(record) {
      dialog.warning({
        title: "លុបមន្ត្រី",
        content: "តើអ្នកចង់លុបមន្ត្រីនេះមែនទេ?",
        positiveText: "លុប",
        negativeText: "បោះបង់",
        onPositiveClick: () => {
          store
            .dispatch(model.name + "/delete", { id: record.id })
            .then((res) => {
              if (res.data.ok) {
                notify.success({
                  title: "លុបមន្ត្រី",
                  description: res.data.message || "លុបមន្ត្រីបានសម្រេច។",
                  duration: 3000,
                });
                getRecords();
              } else {
                notify.error({
                  title: "លុបមន្ត្រី",
                  description: res.data.message || "មិនអាចលុបមន្ត្រីនេះបានទេ។",
                  duration: 3000,
                });
              }
            })
            .catch((err) => {
              message.error(String(err));
            });
        },
      });
    }

    function goToReportByOrganization(organizationId) {
      reportToggleFunc();
      // if (organizationId == null) return false;
      // router.push({ path: "/report", query: { organizationId } });
    }

    /**
     * Load positions
     */
    const selectedCountesies = ref(null);
    const optionCountesies = computed(() => {
      let countesies =
        Array.isArray(store.getters["countesy/getRecords"]) &&
        store.getters["countesy/getRecords"].length > 0
          ? store.getters["countesy/getRecords"]
          : [];
      countesies = countesies.map((p) => {
        return { label: p.name, value: p.id };
      });
      countesies.unshift({ label: "ងារ", value: null });
      return countesies;
    });
    function hasCountesyRecords() {
      return (
        Array.isArray(store.getters["countesy/getRecords"]) &&
        store.getters["countesy/getRecords"].length > 0
      );
    }
    function getCountesies() {
      if (hasCountesyRecords()) return Promise.resolve();
      return store
        .dispatch("countesy/list", {
          page: 1,
          perPage: 1000,
          search: "",
        })
        .then((res) => {
          store.commit("countesy/setRecords", res.data.records);
        })
        .catch((err) => {
          notify.error({
            title: "អានងារ",
            description: "មានបញ្ហាពេលអានងារ។",
          });
          console.log(err);
        });
    }

    /**
     * Load Education level
     */
    const selectedEducationLevels = ref(null);
    const MERGED_EDUCATION_LEVEL_VALUE_PREFIX = "__merged_education_level__:";
    function formatEducationLevelOptionLabel(record) {
      const normalizeEducationLabel = (value) => {
        if (typeof value !== "string") return "";

        const normalizedValue = value.trim();
        if (
          normalizedValue.startsWith("កម្រិតវប្បធម") &&
          normalizedValue.includes(" - ")
        ) {
          return normalizedValue.split(" - ").pop().trim();
        }

        return normalizedValue;
      };

      const primaryLabel = normalizeEducationLabel(record?.name);
      if (primaryLabel !== "") {
        return primaryLabel;
      }

      const fallbackLabel = [record?.education_level, record?.name]
        .filter((value) => typeof value === "string" && value.trim() !== "")
        .map((value) => value.trim())
        .join(" - ");

      if (
        fallbackLabel.startsWith("កម្រិតវប្បធម") &&
        fallbackLabel.includes(" - ")
      ) {
        return fallbackLabel.split(" - ").pop().trim();
      }

      return fallbackLabel;
    }
    const educationLevelIdsMap = computed(() => {
      const educationLevels =
        Array.isArray(store.getters["certificate/getGroups"]) &&
        store.getters["certificate/getGroups"].length > 0
          ? store.getters["certificate/getGroups"]
          : [];

      return educationLevels.reduce((groups, educationLevel) => {
        const label = formatEducationLevelOptionLabel(educationLevel);

        if (!groups.has(label)) {
          groups.set(label, []);
        }

        groups.get(label).push(educationLevel.id);
        return groups;
      }, new Map());
    });
    function getEducationLevelOptionOrder(label) {
      const normalizedLabel = String(label || "").trim();

      if (normalizedLabel === "ផ្សេងៗ") return 2;
      if (normalizedLabel.includes("វិញ្ញាប")) return 1;

      return 0;
    }
    const optionEducationLevels = computed(() => {
      return Array.from(educationLevelIdsMap.value.entries())
        .sort(
          ([leftLabel], [rightLabel]) =>
            getEducationLevelOptionOrder(leftLabel) -
            getEducationLevelOptionOrder(rightLabel),
        )
        .map(([label, ids]) => {
          const value =
            ids.length > 1
              ? `${MERGED_EDUCATION_LEVEL_VALUE_PREFIX}${ids.join(",")}`
              : ids[0];

          return { label, value };
        });
    });
    function getSelectedEducationLevelIds() {
      if (!Array.isArray(selectedEducationLevels.value)) {
        return selectedEducationLevels.value;
      }

      return Array.from(
        new Set(
          selectedEducationLevels.value.flatMap((value) => {
            if (
              typeof value === "string" &&
              value.startsWith(MERGED_EDUCATION_LEVEL_VALUE_PREFIX)
            ) {
              return value
                .slice(MERGED_EDUCATION_LEVEL_VALUE_PREFIX.length)
                .split(",")
                .map((id) => Number(id));
            }

            return value == null ? [] : [value];
          }),
        ),
      );
    }
    function hasCertificateRecords() {
      return (
        Array.isArray(store.getters["certificate/getGroups"]) &&
        store.getters["certificate/getGroups"].length > 0
      );
    }
    function getCertificates() {
      if (hasCertificateRecords()) return Promise.resolve();
      return store
        .dispatch("certificate/group", {
          page: 1,
          perPage: 1000,
          search: "",
        })
        .then((res) => {
          store.commit("certificate/setGroups", res.data.records);
        })
        .catch((err) => {
          notify.error({
            title: "អានកម្រិតអប់រំ",
            description: "មានបញ្ហាពេលអានកម្រិតអប់រំ។",
          });
          console.log(err);
        });
    }

    /**
     * Load Education level
     */
    const selectedUnofficialPositions = ref(null);
    const selectedRanks = ref(null);
    function hasRankRecords() {
      return (
        Array.isArray(store.getters["rank/records"]?.all) &&
        store.getters["rank/records"].all.length > 0
      );
    }
    const DEFAULT_ANK = "រដ្ឋបាលទូទៅ";
    const selectedAnks = ref(DEFAULT_ANK);
    const anks = ref([]);
    function getAnks() {
      anks.value =
        Array.isArray(store.getters["rank/records"]?.all) &&
        store.getters["rank/records"].all.length > 0
          ? store.getters["rank/records"]?.all.reduce((acc, item) => {
              const key = item.ank;
              if (!acc[key]) {
                acc[key] = [];
              }

              acc[key].push(item);
              return acc;
            }, {})
          : [];
    }

    const optionAnks = computed(() => {
      let ranks = hasRankRecords() ? store.getters["rank/records"].all : [];
      let krobkhan = [];
      ranks.reduce((acc, item) => {
        const key = item.ank;
        if (!acc[key]) {
          krobkhan.push(key);
          acc[key] = [];
        }

        acc[key].push(item);
        return acc;
      }, {});

      return krobkhan.map((k) => {
        return { label: k, value: k };
      });
    });

    const optionRanks = computed(() => {
      const ank = selectedAnks.value;
      if (ank == null || ank === "") {
        return [];
      }
      if (!hasRankRecords()) {
        return [];
      }
      const ranks = store.getters["rank/records"].all;
      return ranks
        .filter((item) => item.ank == ank)
        .map((k) => ({ label: k.prefix, value: k.id }));
    });

    function onKrobkhanFilterChange() {
      selectedRanks.value = null;
      // filterRecords(false);
    }

    function clearAllFilters() {
      resetListingFilterState();
      table.pagination.page = 1;
      getRecords();
    }

    function isNonEmptySelection(v) {
      if (v == null) return false;
      if (Array.isArray(v)) return v.length > 0;
      return v !== "";
    }

    const hasActiveFilters = computed(() => {
      if (String(table.search || "").trim().length > 0) return true;
      if (
        selectedAnks.value != null &&
        selectedAnks.value !== "" &&
        selectedAnks.value !== DEFAULT_ANK
      ) {
        return true;
      }
      if (isNonEmptySelection(selectedRanks.value)) return true;
      if (isNonEmptySelection(selectedOrganizations.value)) return true;
      if (isNonEmptySelection(selectedPositions.value)) return true;
      if (isNonEmptySelection(selectedUnofficialPositions.value)) return true;
      if (isNonEmptySelection(selectedEducationLevels.value)) return true;
      if (selectedGender.value != null) return true;
      if (dob_ts.value != null && parseInt(dob_ts.value, 10) > 0) return true;
      if (ageRangeFrom.value != null && ageRangeTo.value != null) {
        return true;
      }
      if (unofficial_date_ts.value != null && parseInt(unofficial_date_ts.value, 10) > 0) {
        return true;
      }
      if (official_date_ts.value != null && parseInt(official_date_ts.value, 10) > 0) {
        return true;
      }
      if (isWildSearch.value === true) return true;
      if (Array.isArray(peopleIds.value) && peopleIds.value.length > 0) {
        return true;
      }
      return false;
    });
    function getRanks() {
      if (hasRankRecords()) {
        getAnks();
        return Promise.resolve();
      }
      return store
        .dispatch("rank/list", {
          page: 1,
          perPage: 1000,
          search: "",
        })
        .then((res) => {
          store.commit("rank/setAllRecords", res.data.records);
          getAnks();
        })
        .catch((err) => {
          notify.error({
            title: "អានក្របខ័ណ្ឌនិងឋានៈ",
            description: "មានបញ្ហាពេលអានក្របខ័ណ្ឌនិងឋានៈ។",
          });
          console.log(err);
        });
    }

    const filter = ref(true);
    function toggleFilter() {
      filter.value = !filter.value;
    }

    function getRankStructure() {
      if (!hasRankRecords()) {
        store
          .dispatch("rank/structure")
          .then((res) => {
            if (res.data.ok) {
              store.commit("rank/setAllRecords", res.data.records);
            } else {
              notify.info({
                title: "អានព័ត៌មានតួនាទី",
                content: res.data.message,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    function thumbnailView() {
      router.push("/officer/thumbnail");
    }

    function getTermsMultipleDelimiters(
      sentence,
      delimiters = [" ", ",", ";", "|"],
    ) {
      // Create regex pattern from delimiters
      const pattern = delimiters
        .map(
          (d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), // Escape special characters
        )
        .join("|");

      const regex = new RegExp(pattern, "g");
      return sentence.split(regex).filter((term) => term.trim() !== "");
    }

    function highlightMultipleTerms(text, searchTerms) {
      if (text == undefined || text == null) return text;
      if (searchTerms == undefined || searchTerms == null) return text;
      if (text.length > 0 && searchTerms.length > 0) {
        let terms = getTermsMultipleDelimiters(searchTerms);
        if (terms.length <= 0) return text;
        terms.forEach((term) => {
          // console.log( term + ' => ' + ( text.toLowerCase().includes(term.toLowerCase()) ? ' Y ' : ' N ' ) )
          if (text.toLowerCase().includes(term.toLowerCase())) {
            const regex = new RegExp(`(${term})`, "gi");
            text = text.replace(regex, "<mark>$1</mark>");
          }
        });
      }
      return text;
    }

    function getOfficerCertificateGroupName(certificateGroupId) {
      const groups = Array.isArray(store.getters["certificate/getGroups"])
        ? store.getters["certificate/getGroups"]
        : [];

      const matchedGroup = groups.find(
        (group) => Number(group?.id || 0) === Number(certificateGroupId || 0),
      );

      return String(matchedGroup?.name || "").trim();
    }

    function getOfficerCertificateLabel(certificate) {
      const certificateGroupId = Number(
        certificate?.certificate_group_id || certificate?.group?.id || 0,
      );
      const certificateNote = String(
        certificate?.certificate_note || "",
      ).trim();
      const groupName =
        String(certificate?.group?.name || "").trim() ||
        getOfficerCertificateGroupName(certificateGroupId);

      if (
        (certificateGroupId === 3 || certificateGroupId === 8) &&
        certificateNote !== ""
      ) {
        return certificateNote;
      }

      return groupName || certificateNote;
    }

    function getOfficerCertificateText(record) {
      const certificates = Array.isArray(record?.people?.certificates)
        ? record.people.certificates
        : [];

      return Array.from(
        new Set(
          certificates
            .map((certificate) => getOfficerCertificateLabel(certificate))
            .filter((label) => label !== ""),
        ),
      ).join(", ");
    }

    function toggleWildSearch() {
      isWildSearch.value = !isWildSearch.value;
    }

    const dob_ts = ref(null);
    const ageRangeFrom = ref(null);
    const ageRangeTo = ref(null);
    /** True when both ages were set and we applied the range; used to refetch if user then clears one side. */
    const ageRangeFilterWasActive = ref(false);

    const ageSelectOptions = Array.from(
      { length: AGE_FILTER_MAX - AGE_FILTER_MIN + 1 },
      (_, i) => {
        const n = AGE_FILTER_MIN + i;
        return { label: String(n), value: n };
      },
    );

    const ageRangeFilterLabel = computed(() => {
      if (ageRangeFrom.value == null || ageRangeTo.value == null) {
        return "";
      }
      const a = Number(ageRangeFrom.value);
      const b = Number(ageRangeTo.value);
      if (Number.isNaN(a) || Number.isNaN(b)) {
        return "";
      }
      return `${Math.min(a, b)} - ${Math.max(a, b)}`;
    });

    function onAgeRangeUpdate() {
      const from = ageRangeFrom.value;
      const to = ageRangeTo.value;
      const both = from != null && to != null;
      const neither = from == null && to == null;
      if (both) {
        ageRangeFilterWasActive.value = true;
        filterRecords(false);
        return;
      }
      if (neither) {
        ageRangeFilterWasActive.value = false;
        filterRecords(false);
        return;
      }
      if (ageRangeFilterWasActive.value) {
        ageRangeFilterWasActive.value = false;
        filterRecords(false);
      }
    }

    function clearAgeRangeFilter() {
      ageRangeFrom.value = null;
      ageRangeTo.value = null;
      ageRangeFilterWasActive.value = false;
      filterRecords(false);
    }

    const unofficial_date_ts = ref(null);
    const official_date_ts = ref(null);

    const reportToggle = ref(false);
    const reportDropdownOptions = [
      {
        label: "បញ្ជីមន្ត្រីតាមឋានានុក្រមអង្គភាព",
        key: "officersByOrganizational",
      },
    ];
    const createOfficerDropdownOptions = [
      {
        label: "បញ្ចូលទិន្នន័យមន្ត្រីនយោបាយ",
        key: "politician",
      },
      {
        label: "បញ្ចូលទិន្នន័យមន្ត្រីមុខងារសាធារណៈ",
        key: "admin_official",
      },
    ];
    function reportToggleFunc() {
      reportToggle.value = !reportToggle.value;
    }
    function onReportMenuSelect(key) {
      if (key === "officersByOrganizational") {
        reportToggleFunc();
      }
    }
    function onCreateOfficerMenuSelect(key) {
      if (key !== "politician" && key !== "admin_official") return;
      router.push({
        path: "/officer/create",
        query: { officerType: key },
      });
    }

    const selectedGender = ref(null);

    /**
     * Initial the data
     */
    void Promise.allSettled([
      getOrganizations(),
      getPositions(),
      getCountesies(),
      getCertificates(),
      getRanks(),
    ]);
    getRecords();

    return {
      /**
       * Variables
       */
      model,
      table,
      columnVisibility,
      setAllColumns,
      ocmLogoUrl,
      reportToggle,
      reportToggleFunc,
      reportDropdownOptions,
      onReportMenuSelect,
      createOfficerDropdownOptions,
      onCreateOfficerMenuSelect,
      selectedGender,

      dob_ts,
      ageRangeFrom,
      ageRangeTo,
      ageSelectOptions,
      ageRangeFilterLabel,
      onAgeRangeUpdate,
      clearAgeRangeFilter,
      unofficial_date_ts,
      official_date_ts,

      /**
       * Table
       */
      filterRecords,
      /**
       * Pagination functions
       */
      updatePerpage,
      goTo,
      previous,
      next,
      first,
      last,
      /**
       * Loading overlay
       */
      closeTableLoading,
      /**
       * Creating
       */
      createModal,
      showCreateModal,
      closeCreateModal,
      /**
       * Creating non officer
       */
      createNonOfficerModal,
      showCreateNonOfficerModal,
      closeCreateNonOfficerModal,
      detailModal,
      showDetailModal,
      closeDetailModal,
      closeActions,
      /**
       * Functions
       */
      filterRecords,
      highlightMultipleTerms,
      getOfficerCertificateText,
      /**
       * Filters
       */
      onKrobkhanFilterChange,
      clearAllFilters,
      hasActiveFilters,
      optionAnks,
      optionRanks,
      optionPositions,
      optionEducationLevels,
      optionPositions,

      selectedAnks,
      selectedRanks,
      selectedUnofficialPositions,
      selectedEducationLevels,

      selectedPositions,
      selectedCountesies,
      optionOrganizations,
      selectedOrganizations,
      openCreateProfileDraftPage,
      goToOfficerProfile,
      goToOfficerPrintProfile,
      showOfficialCardModal,
      closeOfficialCardModal,
      officialCardModal,
      deleteOfficer,
      printProfileModal,
      closePrintProfileModal,
      reportSelectedOrganization,
      goToReportByOrganization,
      dateFormat,
      thumbnailView,

      toggleWildSearch,
      isWildSearch,
      lockedOfficerType: computed(() => props.lockedOfficerType),
      lockedOfficerTypes: computed(() => props.lockedOfficerTypes),
      isTypeLocked,
      hasAnyLockedTypes,
    };
  },
};
</script>
<style type="text/css" scoped>
/* scrollbar stylin */
.otc-table-hscroll {
  scrollbar-width: thin;
  scrollbar-color: rgba(148, 163, 184, 0.55) transparent;
  scroll-behavior: smooth;
}

.otc-table-hscroll::-webkit-scrollbar {
  height: 6px;
}
.otc-table-hscroll::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 0;
}
.otc-table-hscroll::-webkit-scrollbar-thumb {
  background-color: rgba(148, 163, 184, 0.45);
  border-radius: 3px;
  border: 2px solid transparent;
  background-clip: padding-box;
  min-width: 32px;
}
.otc-table-hscroll::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 116, 139, 0.55);
  background-clip: padding-box;
}
.otc-table-hscroll::-webkit-scrollbar-thumb:active {
  background-color: rgba(71, 85, 105, 0.65);
  background-clip: padding-box;
}

.otc-table {
  @apply min-w-full w-max shadow-md border-collapse text-black;
}
.otc-table .otc-header-row {
  @apply bg-[#E5EAF2];
}
.otc-table .otc-header-row th {
  @apply p-2 flex-nowrap text-black border border-gray-200;
}
.otc-table .otc-col-actions {
  position: sticky;
  right: 0;
  min-width: 10.5rem;
  width: 1%;
}
.otc-table .otc-col-actions-head {
  z-index: 2;
  background-color: #e5eaf2;
  box-shadow: -6px 0 14px -6px rgba(15, 23, 42, 0.14);
  vertical-align: middle;
}
.otc-table .otc-col-actions-cell {
  z-index: 1;
  background-color: #fff;
  box-shadow: -6px 0 14px -6px rgba(15, 23, 42, 0.12);
  border-left: 1px solid rgb(229 231 235);
  vertical-align: middle;
}
.otc-table .otc-body-row {
  @apply border-b border-gray-100;
}
.otc-table .otc-body-row td {
  @apply p-2 leading-5 border border-gray-200 ;
}
.otc-table .otc-body-row {
  @apply relative;
}
.otc-table .otc-body-row:hover td {
  background-color: rgb(249 250 251);
}
.vcb-table-pagination-info {
  @apply leading-7;
}
.vcb-filters-panel {
  @apply fixed left-40 top-10 right-0 bottom-0 bg-opacity-60 bg-white;
}
.vcb-filters-bar {
  @apply bg-transparent px-0 pt-2 pb-3 mt-0;
}
.vcb-filters-bar .filter-title {
  @apply w-full text-left pb-2;
}
.vcb-filters-bar .filter-actions {
  @apply w-full text-left flex flex-wrap gap-3;
}
.vcb-filters-bar .filter-actions .filter-action {
  @apply bg-transparent w-full md:w-[240px];
}
.vcb-filters-bar .filter-actions .filter-action-gender {
  @apply bg-transparent w-full md:w-[150px];
}
/* Year-only “តាំងស៊ប់” picker: no panel footer actions; narrow trigger */
.vcb-filters-bar .filter-actions .filter-action.filter-action--official-year {
  @apply w-full max-w-full md:max-w-[7rem] md:w-[7rem] flex-none;
}
.vcb-filters-bar .ocm-official-year-picker {
  @apply w-full cursor-pointer;
}
.vcb-filters-bar .ocm-official-year-picker :deep(.n-input),
.vcb-filters-bar .ocm-official-year-picker :deep(.n-input__input),
.vcb-filters-bar .ocm-official-year-picker :deep(.n-input__input-el),
.vcb-filters-bar .ocm-official-year-picker :deep(input) {
  cursor: pointer;
}
/* Clear-all control: last in row, not full 320px field width */
.vcb-filters-bar .filter-actions .filter-action.filter-action--clear-filters {
  @apply w-full md:w-auto min-w-0 flex items-end;
}
.vcb-filters-bar .filter-actions .filter-action.filter-action--clear-filters :deep(.n-button) {
  @apply w-full sm:w-auto;
}
/* Same outer height as Naive n-select (medium) in the filter bar */
.vcb-filters-bar .ocm-age-range-trigger {
  box-sizing: border-box;
  height: 34px;
  min-height: 34px;
  max-height: 34px;
  overflow: hidden;
}
.vcb-filters-bar .ocm-age-filter-tooltip {
  display: block;
  width: 100%;
  max-width: 100%;
}
.vcb-filters-bar .ocm-age-filter-popover {
  display: block;
  width: 100%;
  max-width: 100%;
}
.vcb-table-toggle-btn {
  @apply flex items-center gap-2 px-3 h-8 my-1 rounded border border-gray-200 bg-gray-100 text-gray-700 hover:border-blue-600 focus:border-blue-600 hover:text-gray-800 duration-200;
}
.vcb-table-toggle-panel {
  @apply p-3;
}
.vcb-table-toggle-title {
  @apply font-semibold text-gray-800 mb-2;
}
.vcb-table-toggle-section-label {
  @apply text-[11px] text-gray-500 tracking-wide mb-2;
}
.vcb-table-toggle-items {
  @apply flex flex-col gap-2;
}
.vcb-table-toggle-footer {
  @apply flex items-center justify-between mt-3 pt-2 border-t border-gray-200;
}
.vcb-table-toggle-link {
  @apply text-sm text-blue-600 hover:text-blue-800 duration-200;
}
.highlighted-term {
  @apply bg-yellow-100;
}

.otc-horizontal-filters-panel {
  @apply w-full mb-4 flex flex-wrap p-2 bg-white shadow border border-gray-200;
}
.otc-horizontal-filters-panel .filter-title {
  @apply w-full text-left pb-2;
}
.otc-horizontal-filters-panel .filter-actions {
  @apply w-full text-left p-2 flex flex-wrap justify-center;
}
.otc-horizontal-filters-panel .filter-actions .filter-action {
  @apply m-2 bg-white w-4/6 sm:w-2/5 md:w-1/3 lg:w-1/4 xl:w-2/6;
}

.print-preview-stage {
  width: min(94vw, 1320px);
  height: 88vh;
}

.print-preview-iframe {
  width: 100%;
  height: 100%;
  border: 0;
  background: #fff;
  overflow: hidden;
}
</style>
<style>
/* Unscoped: body.app_snav_open + teleported overlay; z-index above .app_snav (49), outside parent isolate stacking */
.ocm-officer-report-overlay {
  position: fixed;
  top: 3rem;
  right: 0;
  bottom: 0;
  left: 60px;
  z-index: 60;
  overflow: auto;
  background: #fff;
  padding: 0.5rem;
  transition: left 0.2s ease;
}
body.app_snav_open .ocm-officer-report-overlay {
  left: 230px;
}
</style>
