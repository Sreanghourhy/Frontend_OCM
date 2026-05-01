<template>
  <div class="relative z-0 isolate w-full min-w-0 flex flex-col">
    <div class="flex title-bar border-b border-gray-200 bg-white">
      <div class="flex w-64 h-10 shrink-0 py-1 px-4 items-center">
        <div
          class="font-moul text-sm leading-8 truncate"
          v-html="model.title"
        />
      </div>
      <div
        class="flex-grow action-buttons flex items-center justify-end px-4 gap-3"
      >
        <div class="mt-0 mr-0 flex flex-wrap justify-end">
          <n-tooltip v-if="false" trigger="hover">
            <template #trigger>
              <n-dropdown
                trigger="click"
                :options="reportDropdownOptions"
                size="small"
                @select="onReportMenuSelect"
              >
                <div
                  class="inline-flex items-center cursor-pointer hover:text-green-500 duration-300 ml-2 h-8 mr-2 border rounded px-4 border-gray-400 hover:border-green-500"
                >
                  <svg
                    class="w-6 h-6 mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <path d="M10 18h8v2h-8z" fill="currentColor" />
                    <path d="M10 13h12v2H10z" fill="currentColor" />
                    <path d="M10 23h5v2h-5z" fill="currentColor" />
                    <path
                      d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zM12 4h8v4h-8zm13 24H7V7h3v3h12V7h3z"
                      fill="currentColor"
                    />
                  </svg>
                  របាយការណ៍
                </div>
              </n-dropdown>
            </template>
            សូមជ្រើសរើសអង្គភាពដើម្បីធ្វើរបាយការណ៍
          </n-tooltip>
          <button
            v-if="!$hasPermission || $hasPermission('portal_staff_listing')"
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
        </div>
      </div>
    </div>

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
                        v-model="table.search"
                        type="text"
                        class="bg-gray-50 px-2 h-8 w-full rounded border border-gray-200 focus:border-green-600 hover:border-green-600 duration-300"
                        placeholder="ស្វែងរក"
                        @keypress.enter="filterRecords(false)"
                      />
                      <svg
                        class="absolute right-1 top-1 w-6 h-6 text-gray-400 cursor-pointer"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        @click="filterRecords(false)"
                      >
                        <g fill="none">
                          <path
                            d="M8.5 3a5.5 5.5 0 0 1 4.227 9.02l4.127 4.126a.5.5 0 0 1-.638.765l-.07-.057l-4.126-4.127A5.5 5.5 0 1 1 8.5 3zm0 1a4.5 4.5 0 1 0 0 9a4.5 4.5 0 0 0 0-9z"
                            fill="currentColor"
                          />
                        </g>
                      </svg>
                    </div>
                  </template>
                  ស្វែងរកតាមរយៈ ឈ្មោះខ្មែរ ឈ្មោះជាឡាតាំង លេខអត្តសញ្ញាណបណ្ណ
                </n-tooltip>
              </div>
              <div class="filter-action">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedOrganizations"
                      filterable
                      clearable
                      multiple
                      :options="optionOrganizations"
                      @update:value="filterRecords(false)"
                      placeholder="ស្ថាប័ន / អង្គភាព"
                    />
                  </template>
                  ជ្រើសរើសស្ថាប័ន ឬ អង្គភាព
                </n-tooltip>
              </div>
              <div class="filter-action">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedEducationLevels"
                      filterable
                      clearable
                      multiple
                      :options="optionEducationLevels"
                      @update:value="filterRecords(false)"
                      placeholder="កម្រិតអប់រំ"
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
                              >អាយុពី</span
                            >
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
                            >អាយុ</span
                          >
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
                          >ចាប់ពី</span
                        >
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
                          >ដល់</span
                        >
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
              <div class="filter-action-gender">
                <n-tooltip trigger="hover">
                  <template #trigger>
                    <n-select
                      v-model:value="selectedGender"
                      filterable
                      clearable
                      :options="[
                        { label: 'ទាំងអស់', value: null },
                        { label: 'ស្រី', value: 0 },
                        { label: 'ប្រុស', value: 1 },
                      ]"
                      @update:value="filterRecords(false)"
                      placeholder="ភេទ"
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
                        <span>សម្អាតតម្រង</span>
                      </span>
                    </n-button>
                  </template>
                  លុបលក្ខខណ្ឌស្វែងរើសទាំងអស់ និងផ្ទុកបញ្ជីឡើងវិញ
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
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M4 6h24v20H4V6zm2 2v4h20V8H6zm0 6v4h6v-4H6zm8 0v4h12v-4H14zM6 20v4h6v-4H6zm8 0v4h12v-4H14z"
                      fill="currentColor"
                    />
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
                      aria-label="toggle avatar column"
                      @click="
                        columnVisibility.avatar = !columnVisibility.avatar
                      "
                    >
                      <span
                        class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200"
                        :class="
                          columnVisibility.avatar
                            ? 'translate-x-5'
                            : 'translate-x-0'
                        "
                      />
                    </button>
                  </div>
                </div>
                <div class="vcb-table-toggle-section-label">
                  បង្ហាញ / លាក់ជួរឈរ
                </div>
                <div class="vcb-table-toggle-items">
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
                  <n-checkbox v-model:checked="columnVisibility.organization"
                    >អង្គភាព</n-checkbox
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
                <th
                  v-if="columnVisibility.organization"
                  class="text-left min-w-[11rem] max-w-[15rem] whitespace-nowrap"
                >
                  អង្គភាព
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
                  v-if="columnVisibility.nid"
                  class="text-left"
                  v-html="
                    $toKhmer(
                      highlightMultipleTerms(
                        record.people?.nid,
                        table.pagination.search,
                      ),
                    )
                  "
                />
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
                          record.people?.lastname,
                          table.pagination.search,
                        ) +
                          ' ' +
                          highlightMultipleTerms(
                            record.people?.firstname,
                            table.pagination.search,
                          ))
                      "
                    />
                  </div>
                </td>
                <td
                  v-if="columnVisibility.enName"
                  class="text-left"
                  v-html="
                    highlightMultipleTerms(
                      record.people?.enlastname,
                      table.pagination.search,
                    ) +
                    ' ' +
                    highlightMultipleTerms(
                      record.people?.enfirstname,
                      table.pagination.search,
                    )
                  "
                />
                <td v-if="columnVisibility.dob" class="text-left">
                  {{ formatDobCellKh(record) }}
                </td>
                <td v-if="columnVisibility.unofficialDate" class="text-left">
                  {{ formatDateCellKh(record.unofficial_date) }}
                </td>
                <td
                  v-if="columnVisibility.organization"
                  class="text-left min-w-[11rem] max-w-[15rem] align-center py-1.5"
                >
                  <div class="line-clamp-2 break-words leading-7 text-[13px]">
                    {{
                      record.current_job?.organization_structure_position
                        ?.organization_structure?.organization?.name
                    }}
                  </div>
                </td>
                <td v-if="columnVisibility.certificate" class="text-left">
                  {{ getOfficerCertificateText(record) }}
                </td>
                <td v-if="columnVisibility.email" class="text-left">
                  {{ record.email }}
                </td>
                <td v-if="columnVisibility.phone" class="text-left">
                  {{ record.people?.mobile_phone ?? "" }}
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
                        <path
                          fill="currentColor"
                          d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.83H5v-.92l9.06-9.06l.92.92L5.92 20.08zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83l3.75 3.75l1.84-1.82z"
                        />
                      </svg>
                      <span class="text-xs leading-none"
                        >កែប្រវត្តិរូបមន្ត្រី</span
                      >
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </Transition>
      </div>

      <Transition name="slide-fade">
        <div
          v-if="table.loading === true"
          class="table-loading fixed flex h-screen left-0 top-0 right-0 bottom-0 bg-white bg-opacity-90 z-50"
        >
          <div class="flex mx-auto items-center">
            <div class="spinner">
              <svg
                class="animate-spin w-16 mx-auto text-blue-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z"
                  fill="currentColor"
                />
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
              viewBox="0 0 512 512"
            >
              <path
                d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="32"
              />
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M320 320L192 192"
              />
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M192 320l128-128"
              />
            </svg>
          </div>
        </div>
      </Transition>

      <div class="fixed left-0 right-0 bottom-8 flex flex-wrap">
        <Transition name="slide-fade">
          <div
            v-if="table.pagination.totalPages > 1"
            class="vcb-table-pagination bg-blue-300 mx-auto"
          >
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-popselect
                  v-model:value="table.pagination.perPage"
                  :options="perPageOptions"
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
            <div
              v-for="(page, index) in table.pagination.buttons"
              :key="index"
              :class="
                table.pagination.page === page
                  ? ' vcb-pagination-page-active '
                  : ' vcb-pagination-page '
              "
              @click="table.pagination.page === page ? false : goTo(page)"
            >
              {{ $toKhmer(page) }}
            </div>
            <div
              v-if="table.pagination.page > 1"
              class="vcb-pagination-page p-1"
              @click="first()"
            >
              <svg
                class="w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M18.29 17.29a.996.996 0 0 0 0-1.41L14.42 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L12.3 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z"
                  fill="currentColor"
                />
                <path
                  d="M11.7 17.29a.996.996 0 0 0 0-1.41L7.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L5.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <Transition name="slide-fade">
              <div
                v-if="table.pagination.page > 1"
                class="vcb-pagination-page p-1"
                @click="previous()"
              >
                <svg
                  class="w-5 h-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Transition>
            <Transition name="slide-fade">
              <div
                v-if="table.pagination.page < table.pagination.totalPages"
                class="vcb-pagination-page p-1"
                @click="next()"
              >
                <svg
                  class="w-5 h-5 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Transition>
            <div
              v-if="table.pagination.page < table.pagination.totalPages"
              class="vcb-pagination-page p-1"
              @click="last()"
            >
              <svg
                class="w-5 h-5 mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5.7 6.71a.996.996 0 0 0 0 1.41L9.58 12L5.7 15.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L7.12 6.71c-.39-.39-1.03-.39-1.42 0z"
                  fill="currentColor"
                />
                <path
                  d="M12.29 6.71a.996.996 0 0 0 0 1.41L16.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7c-.38-.38-1.02-.38-1.41.01z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>
        </Transition>
      </div>
    </div>

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
          aria-label="close preview"
          @click="closePrintProfileModal"
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
            />
          </div>
        </div>
      </div>
    </n-modal>

    <Teleport to="body">
      <Transition name="fade">
        <div v-if="reportToggle" class="ocm-officer-report-overlay">
          <div class="report-body w-full min-h-96 overflow-auto">
            <ReportComponent />
          </div>
          <n-tooltip trigger="hover">
            <template #trigger>
              <svg
                class="absolute top-2 right-2 w-8 cursor-pointer leading-5 h-8 rounded-full text-red-500 bg-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                @click="reportToggleFunc()"
              >
                <path
                  d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z"
                  fill="none"
                  stroke="currentColor"
                  stroke-miterlimit="10"
                  stroke-width="32"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M320 320L192 192"
                />
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="32"
                  d="M192 320l128-128"
                />
              </svg>
            </template>
            បិទរបាយការណ៍
          </n-tooltip>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { reactive, ref, computed, watch, getCurrentInstance } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { useNotification } from "naive-ui";
import ocmLogoUrl from "@assets/logo.svg";
import dateFormat from "dateformat";
import ReportComponent from "@components/reports/officersinorg/tablestyle-div.vue";

const store = useStore();
const router = useRouter();
const route = useRoute();
const notify = useNotification();

const OTHER_OFFICER_TYPES = ["contracted_officer"];

const model = reactive({
  name: "officer",
  module: "officers",
  title: "មន្ត្រីផ្សេងៗ",
});

const table = reactive({
  loading: false,
  search: "",
  records: { all: [], matched: [] },
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

const columnVisibility = reactive({
  nid: true,
  avatar: true,
  khName: true,
  enName: true,
  dob: true,
  unofficialDate: true,
  organization: true,
  certificate: false,
  email: false,
  phone: false,
  userCreatedAt: false,
});

const COLUMN_VISIBILITY_STORAGE_KEY =
  "ocm.hr.officer.other.listing.columnVisibility.v1";

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
  } catch {
    /* ignore */
  }
}

function persistColumnVisibility() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return;
    window.localStorage.setItem(
      COLUMN_VISIBILITY_STORAGE_KEY,
      JSON.stringify({ ...columnVisibility }),
    );
  } catch {
    /* ignore */
  }
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

function setAllColumns(isVisible) {
  Object.keys(columnVisibility).forEach((k) => {
    columnVisibility[k] = isVisible;
  });
}

const isWildSearch = ref(false);
const AGE_FILTER_MIN = 18;
const AGE_FILTER_MAX = 150;
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
const unofficialDateTs = ref(null);
const selectedGender = ref(null);
const selectedPositions = ref(null);
const selectedUnofficialPositions = ref(null);
const selectedRanks = ref(null);
const selectedOrganizations = ref(null);
const selectedEducationLevels = ref(null);

const peopleIds = ref(
  route.params.ids !== undefined && String(route.params.ids).trim().length > 0
    ? String(route.params.ids).split(",")
    : null,
);

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
  if (primaryLabel !== "") return primaryLabel;
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
    if (!groups.has(label)) groups.set(label, []);
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

const optionOrganizations = computed(() => {
  let organizations =
    Array.isArray(store.getters["organization/getRecords"]) &&
    store.getters["organization/getRecords"].length > 0
      ? store.getters["organization/getRecords"]
      : [];
  organizations = organizations.map((p) => ({ label: p.name, value: p.id }));
  organizations.unshift({ label: "ស្ថាប័ន / អង្គភាព", value: null });
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

function hasCertificateRecords() {
  return (
    Array.isArray(store.getters["certificate/getGroups"]) &&
    store.getters["certificate/getGroups"].length > 0
  );
}

function getCertificates() {
  if (hasCertificateRecords()) return Promise.resolve();
  return store
    .dispatch("certificate/group", { page: 1, perPage: 1000, search: "" })
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

let filterRecordsDebounceTimer = null;

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
  const minDob = new Date(now.getFullYear() - b, now.getMonth(), now.getDate());
  const maxDob = new Date(now.getFullYear() - a, now.getMonth(), now.getDate());
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

function filterRecords(helper = true) {
  if (helper) {
    table.records.matched = [];
    if (table.search !== "") {
      for (const index in table.records.all) {
        for (const field in table.records.all[index]) {
          if (
            String(table.records.all[index][field]).includes(table.search) !==
            false
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
    if (filterRecordsDebounceTimer) clearTimeout(filterRecordsDebounceTimer);
    filterRecordsDebounceTimer = setTimeout(() => {
      table.pagination.page = 1;
      getRecords();
    }, 500);
  }
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
    wild_search: isWildSearch.value === true ? 1 : 0,
    organizations: selectedOrganizations.value,
    ids: peopleIds.value,
    officer_types: OTHER_OFFICER_TYPES,
    dob_range: agesToDobRangeString(ageRangeFrom.value, ageRangeTo.value),
    dob: "",
    unofficial_date:
      unofficialDateTs.value != null && parseInt(unofficialDateTs.value, 10) > 0
        ? dateFormat(new Date(unofficialDateTs.value), "yyyy-mm")
        : "",
    official_date: "",
  };

  store
    .dispatch(`${model.name}/list`, requestParams)
    .then((res) => {
      const raw = res.data.records;
      table.records.all = table.records.matched = filterListByClientAgeRange(
        Array.isArray(raw) ? raw : [],
        ageRangeFrom.value,
        ageRangeTo.value,
      );
      table.pagination = res.data.pagination;
      const paginationNumberList = 10;
      if (
        table.pagination.page - (parseInt(paginationNumberList / 2, 10) + 1) <
        1
      ) {
        table.pagination.start = 1;
        table.pagination.end =
          table.pagination.totalPages > paginationNumberList
            ? paginationNumberList
            : table.pagination.totalPages;
      } else {
        table.pagination.start =
          table.pagination.page - parseInt(paginationNumberList / 2, 10);
        table.pagination.end =
          table.pagination.page >= table.pagination.totalPages
            ? table.pagination.totalPages
            : table.pagination.page + parseInt(paginationNumberList / 2, 10);
      }
      table.pagination.buttons = [];
      for (let i = table.pagination.start; i <= table.pagination.end; i++) {
        if (i <= table.pagination.totalPages) table.pagination.buttons.push(i);
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

function isNonEmptySelection(v) {
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  return v !== "";
}

function clearAllFilters() {
  if (filterRecordsDebounceTimer) {
    clearTimeout(filterRecordsDebounceTimer);
    filterRecordsDebounceTimer = null;
  }
  table.search = "";
  selectedRanks.value = null;
  selectedOrganizations.value = null;
  selectedEducationLevels.value = null;
  selectedPositions.value = null;
  selectedUnofficialPositions.value = null;
  selectedGender.value = null;
  ageRangeFrom.value = null;
  ageRangeTo.value = null;
  ageRangeFilterWasActive.value = false;
  unofficialDateTs.value = null;
  isWildSearch.value = false;
  peopleIds.value = null;
  table.pagination.page = 1;
  getRecords();
}

const hasActiveFilters = computed(() => {
  if (String(table.search || "").trim().length > 0) return true;
  if (isNonEmptySelection(selectedRanks.value)) return true;
  if (isNonEmptySelection(selectedOrganizations.value)) return true;
  if (isNonEmptySelection(selectedPositions.value)) return true;
  if (isNonEmptySelection(selectedUnofficialPositions.value)) return true;
  if (isNonEmptySelection(selectedEducationLevels.value)) return true;
  if (selectedGender.value != null) return true;
  if (ageRangeFrom.value != null && ageRangeTo.value != null) return true;
  if (
    unofficialDateTs.value != null &&
    parseInt(String(unofficialDateTs.value), 10) > 0
  ) {
    return true;
  }
  if (isWildSearch.value === true) return true;
  if (Array.isArray(peopleIds.value) && peopleIds.value.length > 0) return true;
  return false;
});

function closeTableLoading() {
  table.loading = false;
}

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

const perPageOptions = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 30, value: 30 },
  { label: 40, value: 40 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
  { label: 200, value: 200 },
  { label: 500, value: 500 },
];

function openCreateProfileDraftPage() {
  router.push("/officer-others/create");
}

function goToOfficerProfile(id) {
  router.push(`/officer-others/profile/${id}`);
}

const printProfileModal = reactive({ show: false, url: "" });

function goToOfficerPrintProfile(id) {
  printProfileModal.url = `${window.location.origin}/#/officer/print/profile/${id}`;
  printProfileModal.show = true;
}

function closePrintProfileModal() {
  printProfileModal.show = false;
}

const reportToggle = ref(false);
const reportDropdownOptions = [
  {
    label: "បញ្ជីមន្ត្រីតាមឋានានុក្រមអង្គភាព",
    key: "officersByOrganizational",
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

function getTermsMultipleDelimiters(
  sentence,
  delimiters = [" ", ",", ";", "|"],
) {
  const pattern = delimiters
    .map((d) => d.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
  const regex = new RegExp(pattern, "g");
  return sentence.split(regex).filter((term) => term.trim() !== "");
}

function highlightMultipleTerms(text, searchTerms) {
  if (text === undefined || text === null) return text;
  if (searchTerms === undefined || searchTerms === null) return text;
  let out = String(text);
  if (out.length > 0 && searchTerms.length > 0) {
    const terms = getTermsMultipleDelimiters(searchTerms);
    if (terms.length <= 0) return out;
    terms.forEach((term) => {
      if (out.toLowerCase().includes(term.toLowerCase())) {
        const regex = new RegExp(`(${term})`, "gi");
        out = out.replace(regex, "<mark>$1</mark>");
      }
    });
  }
  return out;
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
  const certificateNote = String(certificate?.certificate_note || "").trim();
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

const instance = getCurrentInstance();

function khNum(s) {
  return instance?.proxy?.$toKhmer?.(s) ?? s;
}

function formatDateCellKh(raw) {
  if (raw == null || raw === "") return "";
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return "";
  return khNum(dateFormat(d, "dd-mm-yyyy"));
}

function formatDobCellKh(record) {
  if (!record?.people?.dob) return "";
  return formatDateCellKh(record.people.dob);
}

void Promise.allSettled([getOrganizations(), getCertificates()]).then(() => {
  getRecords();
});
</script>

<style scoped>
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
  @apply p-2 leading-5 border border-gray-200;
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
.vcb-filters-bar .filter-actions .filter-action-gender {
  @apply bg-transparent w-full md:w-[150px];
}
.vcb-filters-bar .filter-actions .filter-action.filter-action--clear-filters {
  @apply w-full md:w-auto min-w-0 flex items-end;
}
.vcb-filters-bar
  .filter-actions
  .filter-action.filter-action--clear-filters
  :deep(.n-button) {
  @apply w-full sm:w-auto;
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
body.app_snav_open .ocm-officer-report-overlay {
  left: 230px;
}
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
</style>
