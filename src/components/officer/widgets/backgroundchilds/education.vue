<template>
  <section class="mb-10 bg-white pt-[2%] transition-all duration-300">
    <!-- HEADER -->
    <div class="flex items-center justify-between mb-2 pb-2 pl-0 pr-4">
      <div
        class="w-full text-left font-moul text-lg text-[#1E3A8A] leading-tight"
      >
        ឃ. កំរិតវប្បធម៌ទូទៅ ការបណ្ដុះបណ្ដាលមុខវិជ្ជាជីវៈ និងការបណ្ដុះបណ្ដាលបន្ត
      </div>

      <!-- /----/ hidden old header controls for later use /----/
      <div class="flex shrink-0 items-center gap-2 self-start">
        <select
          v-model="selectedSectionIndex"
          class="h-9 border border-[#D8DEE8] rounded px-3 text-[13px] font-sr"
        >
          <option
            v-for="(section, index) in sections"
            :key="section.id"
            :value="index"
          >
            {{ section.title || `ផ្នែកទី ${index + 1}` }}
          </option>
        </select>

        <button
          type="button"
          class="inline-flex items-center gap-1 rounded-md bg-[#1E3A8A] px-3 py-1.5 text-[13px] text-white font-sr hover:bg-[#162E6B] duration-200 flex-shrink-0"
          @click="addRow"
        >
          <svg
            class="w-3.5 h-3.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3z"
              clip-rule="evenodd"
            />
          </svg>
          <span>បន្ថែម</span>
        </button>
      </div>
      /----/ -->

    </div>

    <!-- TABLE -->
    <div v-if="officer" class="">
      <div class="bg-white border border-[#D8DEE8] rounded-sm">
        <table class="w-full border-collapse min-w-[980px]">
        <thead>
          <tr>
            <th class="th">វគ្គ <br></br>ឬកម្រិតសិក្សា</th>
            <th class="th">គ្រឹះស្ថានសិក្សា <br></br>បណ្តុះបណ្ដាល</th>
            <th class="th">រាជធានី <br>ខេត្តឬប្រទេស</th>
            <th class="th">សញ្ញាបត្រ</th>
            <th class="th">ជំនាញ</th>
            <th class="th">ថ្ងៃខែឆ្នាំ <br>ចូលសិក្សា</th>
            <th class="th">ថ្ងៃខែឆ្នាំ <br>បញ្ចប់សិក្សា</th>
            <th v-if="hasRows" class="th w-40 text-center">សកម្មភាព</th>
          </tr>
        </thead>
       

        <tbody>
          <template
            v-for="(section, sectionIndex) in sections"
            :key="section.id"
          >
            <tr>
              <td colspan="8" class="bg-white p-2 border-b border-[#E5E7EB]">
                <div class="flex items-center justify-between gap-3">
                  <input
                    :value="section.title"
                    class="w-full bg-transparent border-none outline-none text-[13px] leading-6 font-semibold text-[#1E3A8A]"
                    readonly
                  />

                  <button
                    type="button"
                    class="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#1E3A8A] px-3 py-1.5 text-[13px] text-white font-sr hover:bg-[#162E6B] duration-200"
                    @click="addRow(sectionIndex)"
                  >
                    <svg
                      class="w-3.5 h-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>បន្ថែម</span>
                  </button>
                </div>
              </td>
            </tr>

            <tr
              v-for="(row, rowIndex) in section.rows"   
              :key="row._key"
              :ref="(el) => setRowRef(sectionIndex, row._key, el)"
              :class="
                isRowChangedFromBaseline(sectionIndex, row)
                  ? 'bg-[#FEE2E2]'
                  : 'bg-white'
              "
            >
              <td class="td">
                <input
                  :value="educationLevelForSection(sectionIndex)"
                  class="input bg-[#F8FAFC] text-[#334155] text-center"
                  readonly
                />
              </td>

              <td class="td">
                <input
                  :ref="(el) => setFieldRef(sectionIndex, row._key, 'place_name', el)"
                  v-model="row.place_name"
                  class="input text-center"
                />
              </td>

              <td class="td">
                            <n-select
                  :ref="(el) => setFieldRef(sectionIndex, row._key, 'location', el)"
                  v-model:value="row.location"
                  :options="locationOptionsForRow(row)"
                  placeholder="ខេត្ត/ក្រុង"
                  filterable
                  clearable
                  size="small"
                  class="education-inline-select"
                >
                  <option value="">ខេត្ត/ក្រុង</option>
                  <option
                    v-for="option in locationOptionsForRow(row)"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </n-select>
              </td>

              <td class="td">
                <n-select
                  :ref="(el) => setFieldRef(sectionIndex, row._key, 'certificate', el)"
                  v-model:value="row.certificate"
                  :options="certificateOptions(sectionIndex)"
                  placeholder="ជ្រើសរើស"
                  filterable
                  clearable
                  size="small"
                  class="education-inline-select"
                >
                  <option value="">ជ្រើសរើស</option>
                  <option
                    v-for="cert in certificateOptions(sectionIndex)"
                    :key="cert.value"
                    :value="cert.value"
                  >
                    {{ cert.label }}
                  </option>
                </n-select>
              </td>

              <td class="td">
                <input
                  :ref="(el) => setFieldRef(sectionIndex, row._key, 'field_name', el)"
                  v-model="row.field_name"
                  class="input text-center"
                />
              </td>

              <td class="td">
                <officer-date-input
                  :ref="(el) => setFieldRef(sectionIndex, row._key, 'start', el)"
                  v-model="row.start"
                  :max="row.end"
                  wrapper-class="relative inline-block align-middle w-full"
                  input-class="input w-full text-center"
                />
              </td>

              <td class="td">
                <officer-date-input
                  :ref="(el) => setFieldRef(sectionIndex, row._key, 'end', el)"
                  v-model="row.end"
                  :min="row.start"
                  wrapper-class="relative inline-block align-middle w-full"
                  input-class="input w-full text-center"
                />
              </td>

              <td v-if="hasRows" class="td text-center">
                <div class="action-toolbar">
                  <n-tooltip trigger="hover" placement="top">
                    <template #trigger>
                      <span class="action-trigger">
                        <button
                          type="button"
                          :class="[
                            'action-button',
                            row.pendingPdfFile
                              ? 'action-upload-pending'
                              : 'action-upload',
                          ]"
                          @click="openUploadDialog(row)"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"
                            />
                          </svg>
                        </button>
                      </span>
                    </template>
                    {{
                      row.pendingPdfFile
                        ? 'បានជ្រើស PDF រួចហើយ។ សូមរក្សាទុកព័ត៌មាន។'
                        : 'បញ្ជូលឯកសារ'
                    }}
                  </n-tooltip>
                  <n-tooltip trigger="hover">
                    <template #trigger>
                      <svg
                        @click="rowHasPreview(row) ? togglePdfModal(row) : false"
                        :class="[
                          'pdf-previewer',
                          'w-5',
                          'h-5',
                          rowHasPreview(row)
                            ? 'text-[#4F46E5] cursor-pointer'
                            : 'text-[#D1D5DB] cursor-not-allowed',
                        ]"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1024 1024"
                      >
                        <path
                          d="M509.2 490.8c-.7-1.3-1.4-1.9-2.2-2c-2.9 3.3-2.2 31.5 2.7 51.4c4-13.6 4.7-40.5-.5-49.4zm-1.6 120.5c-7.7 20-18.8 47.3-32.1 71.4c4-1.6 8.1-3.3 12.3-5c17.6-7.2 37.3-15.3 58.9-20.2c-14.9-11.8-28.4-27.7-39.1-46.2z"
                          fill-opacity=".15"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M534 352V136H232v752h560V394H576a42 42 0 0 1-42-42zm55 287.6c16.1-1.9 30.6-2.8 44.3-2.3c12.8.4 23.6 2 32 5.1c.2.1.3.1.5.2c.4.2.8.3 1.2.5c.5.2 1.1.4 1.6.7c.1.1.3.1.4.2c4.1 1.8 7.5 4 10.1 6.6c9.1 9.1 11.8 26.1 6.2 39.6c-3.2 7.7-11.7 20.5-33.3 20.5c-21.8 0-53.9-9.7-82.1-24.8c-25.5 4.3-53.7 13.9-80.9 23.1c-5.8 2-11.8 4-17.6 5.9c-38 65.2-66.5 79.4-84.1 79.4c-4.2 0-7.8-.9-10.8-2c-6.9-2.6-12.8-8-16.5-15c-.9-1.7-1.6-3.4-2.2-5.2c-1.6-4.8-2.1-9.6-1.3-13.6l.6-2.7c.1-.2.1-.4.2-.6c.2-.7.4-1.4.7-2.1c0-.1.1-.2.1-.3c4.1-11.9 13.6-23.4 27.7-34.6c12.3-9.8 27.1-18.7 45.9-28.4c15.9-28 37.6-75.1 51.2-107.4c-10.8-41.8-16.7-74.6-10.1-98.6c.9-3.3 2.5-6.4 4.6-9.1c.2-.2.3-.4.5-.6c.1-.1.1-.2.2-.2c6.3-7.5 16.9-11.9 28.1-11.5c16.6.7 29.7 11.5 33 30.1c1.7 8 2.2 16.5 1.9 25.7v.7c0 .5 0 1-.1 1.5c-.7 13.3-3 26.6-7.3 44.7c-.4 1.6-.8 3.2-1.2 5.2l-1 4.1l-.1.3c.1.2.1.3.2.5l1.8 4.5c.1.3.3.7.4 1c.7 1.6 1.4 3.3 2.1 4.8v.1c8.7 18.8 19.7 33.4 33.9 45.1c4.3 3.5 8.9 6.7 13.9 9.8c1.8-.5 3.5-.7 5.3-.9z"
                          fill-opacity=".15"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M391.5 761c5.7-4.4 16.2-14.5 30.1-34.7c-10.3 9.4-23.4 22.4-30.1 34.7zm270.9-83l.2-.3h.2c.6-.4.5-.7.4-.9c-.1-.1-4.5-9.3-45.1-7.4c35.3 13.9 43.5 9.1 44.3 8.6z"
                          fill-opacity=".15"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0 0 42 42h216v494z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M535.9 585.3c-.8-1.7-1.5-3.3-2.2-4.9c-.1-.3-.3-.7-.4-1l-1.8-4.5c-.1-.2-.1-.3-.2-.5l.1-.3l.2-1.1c4-16.3 8.6-35.3 9.4-54.4v-.7c.3-8.6-.2-17.2-2-25.6c-3.8-21.3-19.5-29.6-32.9-30.2c-11.3-.5-21.8 4-28.1 11.4c-.1.1-.1.2-.2.2c-.2.2-.4.4-.5.6c-2.1 2.7-3.7 5.8-4.6 9.1c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.4-51.2 107.4v.1c-27.7 14.3-64.1 35.8-73.6 62.9c0 .1-.1.2-.1.3c-.2.7-.5 1.4-.7 2.1c-.1.2-.1.4-.2.6c-.2.9-.5 1.8-.6 2.7c-.9 4-.4 8.8 1.3 13.6c.6 1.8 1.3 3.5 2.2 5.2c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-2.6-2.6-6-4.8-10.1-6.6c-.1-.1-.3-.1-.4-.2c-.5-.2-1.1-.4-1.6-.7c-.4-.2-.8-.3-1.2-.5c-.2-.1-.3-.1-.5-.2c-16.2-5.8-41.7-6.7-76.3-2.8l-5.3.6c-5-3-9.6-6.3-13.9-9.8c-14.2-11.3-25.1-25.8-33.8-44.7zM391.5 761c6.7-12.3 19.8-25.3 30.1-34.7c-13.9 20.2-24.4 30.3-30.1 34.7zM507 488.8c.8.1 1.5.7 2.2 2c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4zm-19.2 188.9c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2zm175.4-.9c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </template>
                    មើលឯកសារយោង។
                  </n-tooltip>
                  <!-- <n-tooltip trigger="hover" placement="top">
                    <template #trigger>
                      <span class="action-trigger">
                        <button
                          type="button"
                          :class="[
                            'action-button',
                            'action-download',
                            'action-button-disabled',
                          ]"
                          @click="false"
                        >
                          <svg
                            class="w-5 h-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="1.8"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M12 3v11m0 0l4-4m-4 4l-4-4M4 17.5v.75A1.75 1.75 0 0 0 5.75 20h12.5A1.75 1.75 0 0 0 20 18.25v-.75"
                            />
                          </svg>
                        </button>
                      </span>
                    </template>
                    មុខងារទាញយកឯកសារ ត្រូវបានផ្អាកបណ្តោះអាសន្ន
                  </n-tooltip>
                  <span class="action-divider" aria-hidden="true"></span> -->
                  <delete-confirm-button-component
                    @confirm="removeRow(sectionIndex, rowIndex)"
                  />
                </div>
              </td>
            </tr>
          </template>

          <tr v-if="sections.length === 0">
            <td colspan="8" class="text-center text-gray-500 p-4">
              មិនទាន់មានទិន្នន័យ
            </td>
          </tr>
        </tbody>
        </table>
      </div>
    </div>

    <div v-else class="text-center text-red-500 p-8">
      សូមបញ្ជាកព័ត៌មានមន្ត្រីជាមុនសិន។
    </div>

    <career-save-footer-component
      v-if="showFooter"
      :visible="hasSectionChanges"
      :changed-count="changedSectionCount"
      :can-navigate="canNavigateChanges"
      @cancel-all="cancelAllSections"
      @save-all="saveEducation"
    />

    <input
      ref="referenceDocumentInput"
      type="file"
      class="hidden"
      accept=".pdf,application/pdf"
      @change="fileChange"
    />

    <pdf-preview
      v-model:model="model"
      v-model:record="selectedCertificate"
      v-bind:show="pdfToggle"
      :onClose="togglePdfModal"
    />
  </section>
</template>

<script>
import { computed, nextTick, reactive, ref, watch } from "vue";
import { useNotification } from "naive-ui";
import { useStore } from "vuex";
import crud from "../../../../api/crud";
import CareerSaveFooterComponent from "./career-save-footer.vue";
import DeleteConfirmButtonComponent from "./delete-confirm-button.vue";
import PdfPreview from "./pdfpreview.vue";

export default {
  name: "EducationBackground",
  emits: ["changed"],

  components: {
    CareerSaveFooterComponent,
    DeleteConfirmButtonComponent,
    PdfPreview,
  },

  props: {
    officer: Object,
    showFooter: {
      type: Boolean,
      default: false,
    },
  },

  setup(props, { emit }) {
    const store = useStore();
    const notify = useNotification();

    /* ---------------- CONSTANTS ---------------- */

    const EDUCATION_LEVEL_GROUPS = [
      {
        level: "កម្រិតវប្បធម៌ទូទៅ",
        certificateOptions: ["បឋមភូមិ", "ទុតិយភូមិ", "ផ្សេងៗ"],
      },
      {
        level: "កម្រិតបណ្ដុះបណ្ដាលវិជ្ជាជីវៈ",
        certificateOptions: [
          "បរិញ្ញាបត្ររង",
          "បរិញ្ញាបត្រ",
          "បរិញ្ញាបត្រជាន់ខ្ពស់",
          "បណ្ឌិត",
          "ផ្សេងៗ",
        ],
      },
      {
        level: "វគ្គបណ្ដុះបណ្ដាលបន្ត",
        certificateOptions: ["វិញ្ញាប័ណ្ណបត្រ","វិញ្ញាប័ណ្ណបត្រភូមិន្ទរដ្ឋបាល","សញ្ញាបត្រភូមិន្ទរដ្ឋបាល","ផ្សេងៗ"],
      },
    ];

    const EDUCATION_LEVEL_OPTIONS = EDUCATION_LEVEL_GROUPS.map(
      (group) => group.level,
    );

    const CERTIFICATE_GROUP_IDS_BY_SECTION = {
      1: [1, 2, 3],
      2: [4, 5, 6, 7, 8],
      3: [9, 10, 11, 12],
    };

    const REQUIRED_EDUCATION_FIELDS = [
      "education_level",
      "place_name",
      "location",
      "certificate",
      "field_name",
      "start",
      "end",
    ];

    const EDITABLE_ROW_FIELDS = [
      "place_name",
      "location",
      "certificate",
      "field_name",
      "start",
      "end",
    ];

    /* ---------------- STATE ---------------- */

    const sections = ref([
      { id: 1, title: "១. កម្រិតវប្បធម៌ទូទៅ (សូមបំពេញកម្រិតចុងក្រោយ)", rows: [] },
      { id: 2, title: "២. កម្រិតបណ្ដុះបណ្ដាលវិជ្ជាជីវៈមូលដ្ឋាន និងក្រោយមូលដ្ឋាន (សូមបំពេញតាមលំដាប់ថ្មីទៅចាស់)", rows: [] },
      { id: 3, title: "៣. វគ្គបណ្ដុះបណ្ដាលផ្សេងៗ (សូមបំពេញវគ្គសក្សាថ្មី សំខាន់ៗ និងចាំបាច់)", rows: [] },
    ]);

    const selectedSectionIndex = ref(0);
    let rowSeed = 0;

    const baselineSections = ref(cloneSections(sections.value));

    const hasRows = computed(() =>
      sections.value.some((section) => section.rows.length > 0),
    );

    const changedSectionIndexes = computed(() => {
      return sections.value.reduce((indexes, section, index) => {
        if (
          sectionSignature(section) !==
          sectionSignature(baselineSections.value[index])
        ) {
          indexes.push(index);
        }
        return indexes;
      }, []);
    });

    const changedSectionCount = computed(
      () => changedSectionIndexes.value.length,
    );
    const hasSectionChanges = computed(() => changedSectionCount.value > 0);
    const canNavigateChanges = computed(() => changedSectionCount.value > 0);

    const model = reactive({
      name: "certificate",
      module: "certificates",
      title: "កម្រិតអប់រំ",
    });

    const selectedCertificate = ref(null);
    const pdfToggle = ref(false);
    const referenceDocumentInput = ref(null);
    const isHydrating = ref(false);
    const rowRefs = ref({});
    const fieldRefs = ref({});
    const lastInvalidTarget = ref(null);

    /* ---------------- UTIL ---------------- */

    const certificatesUrl = `${import.meta.env.VITE_API_SERVER}/certificates`;
    const EDUCATION_FOCUSABLE_FIELDS = [
      "place_name",
      "location",
      "certificate",
      "field_name",
      "start",
      "end",
    ];

    const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];

    const khmerNumber = (numberValue) => {
      return String(numberValue)
        .split("")
        .map((digit) => khmerDigits[digit])
        .join("");
    };

    function getPeopleId() {
      return Number(props?.officer?.people?.id || props?.officer?.people_id || 0);
    }

    function getProvinceRecords() {
      return store.getters["province/records"]?.all || [];
    }

    const provinceLocationOptions = computed(() => {
      return getProvinceRecords().map((province) => ({
        label: province.name_kh,
        value: province.name_kh,
      }));
    });

    function locationOptionsForRow(row) {
      const options = [...provinceLocationOptions.value];
      const currentValue = toText(row?.location);

      if (
        currentValue !== "" &&
        !options.some((option) => option.value === currentValue)
      ) {
        options.unshift({
          label: currentValue,
          value: currentValue,
        });
      }

      return options;
    }

    function educationLevelForSection(sectionIndex) {
      return EDUCATION_LEVEL_OPTIONS[sectionIndex] || "";
    }

    function rowRefKey(sectionIndex, rowKey) {
      return `${sectionIndex}:${rowKey}`;
    }

    function fieldRefKey(sectionIndex, rowKey, field) {
      return `${sectionIndex}:${rowKey}:${field}`;
    }

    function setRowRef(sectionIndex, rowKey, el) {
      const key = rowRefKey(sectionIndex, rowKey);
      if (el) {
        rowRefs.value[key] = el;
        return;
      }
      delete rowRefs.value[key];
    }

    function setFieldRef(sectionIndex, rowKey, field, el) {
      const key = fieldRefKey(sectionIndex, rowKey, field);
      if (el) {
        fieldRefs.value[key] = el;
        return;
      }
      delete fieldRefs.value[key];
    }

    function getFocusableEducationField(missingFields = []) {
      return (
        EDUCATION_FOCUSABLE_FIELDS.find((field) =>
          missingFields.includes(field),
        ) || "place_name"
      );
    }

    async function focusInvalidEducationTarget(target = lastInvalidTarget.value) {
      if (!target) return false;

      await nextTick();

      const row = sections.value[target.sectionIndex]?.rows?.[target.rowIndex];
      if (!row?._key) return false;

      const rowEl = rowRefs.value[rowRefKey(target.sectionIndex, row._key)];
      if (typeof rowEl?.scrollIntoView === "function") {
        rowEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      window.setTimeout(() => {
        const fieldRef =
          fieldRefs.value[
            fieldRefKey(target.sectionIndex, row._key, target.field)
          ];
        if (typeof fieldRef?.focus === "function") {
          fieldRef.focus();
          return;
        }
        fieldRef?.$el?.focus?.();
        fieldRef?.$el?.querySelector?.("input")?.focus?.();
      }, 180);

      return true;
    }

    function focusFirstInvalidField() {
      return focusInvalidEducationTarget();
    }

    const newRow = () => ({
      _key: `row-${++rowSeed}`,
      id: null,
      education_level: "",
      place_name: "",
      location: "",
      certificate: null,
      field_name: "",
      start: "",
      end: "",
      pdf: false,
      pendingPdfFile: null,
    });

    function cloneRows(rows = []) {
      return rows.map((row) => ({ ...row }));
    }

    function cloneSections(value = []) {
      return value.map((section) => ({
        ...section,
        rows: cloneRows(section.rows),
      }));
    }

    function sectionComparable(section) {
      if (!section) {
        return {
          title: "",
          rows: [],
        };
      }

      return {
        title: section.title || "",
        rows: (section.rows || []).map((row) => normalizeComparableRow(row)),
      };
    }

    function sectionSignature(section) {
      return JSON.stringify(sectionComparable(section));
    }

    function normalizeComparableRow(row) {
      return {
        id: Number(row?.id || 0) > 0 ? Number(row.id) : null,
        education_level: toText(row?.education_level),
        place_name: toText(row?.place_name),
        location: toText(row?.location),
        certificate: toText(row?.certificate),
        field_name: toText(row?.field_name),
        start: toDateString(row?.start),
        end: toDateString(row?.end),
        pdf_state: rowDocumentSignature(row),
      };
    }

    function rowSignature(row) {
      return JSON.stringify(normalizeComparableRow(row));
    }

    function rowDocumentSignature(row) {
      if (row?.pendingPdfFile instanceof File) {
        return `pending:${row.pendingPdfFile.name}:${row.pendingPdfFile.size}`;
      }

      return row?.pdf ? "stored" : "";
    }

    function isRowChangedFromBaseline(sectionIndex, row) {
      const baselineSection = baselineSections.value[sectionIndex];
      if (!baselineSection) return true;

      const rowId = Number(row?.id || 0) > 0 ? Number(row.id) : null;
      if (rowId != null) {
        const baselineRow = (baselineSection.rows || []).find(
          (item) => Number(item?.id || 0) === rowId,
        );
        if (!baselineRow) return true;
        return rowSignature(row) !== rowSignature(baselineRow);
      }

      return true;
    }

    function snapshotSectionsState() {
      baselineSections.value = cloneSections(sections.value);
    }

    function markSaved() {
      snapshotSectionsState();
      emit("changed", false);
    }

    function restoreSectionFromBaseline(sectionIndex) {
      const baselineSection = baselineSections.value[sectionIndex];
      if (!baselineSection) return;

      sections.value[sectionIndex] = {
        ...sections.value[sectionIndex],
        title: baselineSection.title,
        rows: cloneRows(baselineSection.rows),
      };
    }

    function cancelCurrentSection() {
      const changed = changedSectionIndexes.value;
      if (changed.length <= 0) return;

      const targetSectionIndex = changed.includes(selectedSectionIndex.value)
        ? selectedSectionIndex.value
        : changed[0];

      isHydrating.value = true;
      restoreSectionFromBaseline(targetSectionIndex);
      selectedSectionIndex.value = targetSectionIndex;
      isHydrating.value = false;
      emit("changed", hasSectionChanges.value);
    }

    function cancelAllSections() {
      isHydrating.value = true;
      sections.value = cloneSections(baselineSections.value);
      isHydrating.value = false;
      emit("changed", false);
    }

    function cancelChanges() {
      cancelAllSections();
    }

    function currentChangedSectionPosition() {
      if (changedSectionIndexes.value.length <= 0) return -1;
      const position = changedSectionIndexes.value.indexOf(
        selectedSectionIndex.value,
      );
      return position >= 0 ? position : 0;
    }

    function goToNextChangedSection() {
      const changed = changedSectionIndexes.value;
      if (changed.length <= 0) return;

      const currentPosition = currentChangedSectionPosition();
      const nextPosition = (currentPosition + 1) % changed.length;
      selectedSectionIndex.value = changed[nextPosition];
    }

    function goToPreviousChangedSection() {
      const changed = changedSectionIndexes.value;
      if (changed.length <= 0) return;

      const currentPosition = currentChangedSectionPosition();
      const previousPosition =
        (currentPosition - 1 + changed.length) % changed.length;
      selectedSectionIndex.value = changed[previousPosition];
    }

    /* ---------------- ROW ---------------- */

    function addRow(sectionIndex = selectedSectionIndex.value) {
      const row = newRow();
      row.education_level = educationLevelForSection(
        sectionIndex,
      );
      sections.value[sectionIndex].rows.push(row);
    }

    function removeRow(sectionIndex, rowIndex) {
      sections.value[sectionIndex].rows.splice(rowIndex, 1);
    }

    /* ---------------- CERTIFICATE ---------------- */

    function certificateOptions(sectionIndex) {
      const labels =
        EDUCATION_LEVEL_GROUPS[sectionIndex]?.certificateOptions || [];
      const ids = CERTIFICATE_GROUP_IDS_BY_SECTION[sectionIndex + 1] || [];

      return labels.map((label, index) => ({
        value: ids[index] ?? null,
        label,
      }));
    }

    /* ---------------- BUILD PAYLOAD ---------------- */

    function resolveSectionIndex(certificateGroupId) {
      const id = Number(certificateGroupId);
      if ([1, 2, 3].includes(id)) return 0;
      if ([4, 5, 6, 7, 8].includes(id)) return 1;
      if ([9, 10, 11, 12].includes(id)) return 2;
      return -1;
    }

    function resolveCertificateGroupId(section, row) {
      const asNumber = Number(row?.certificate);
      if (Number.isInteger(asNumber) && asNumber > 0) {
        return asNumber;
      }

      const options =
        EDUCATION_LEVEL_GROUPS[section.id - 1]?.certificateOptions || [];
      const optionIndex = options.findIndex(
        (option) => option === row?.certificate,
      );
      const ids = CERTIFICATE_GROUP_IDS_BY_SECTION[section.id] || [];
      if (optionIndex >= 0) {
        return ids[optionIndex] ?? null;
      }

      // Keep new rows inside the selected section when no certificate is chosen yet.
      return ids[0] ?? null;
    }

    function toDateString(value) {
      return typeof value === "string" ? value.trim() : "";
    }

    function toText(value) {
      return String(value ?? "").trim();
    }

    function normalizeEducationBackgroundRow(row) {
      return {
        education_level: toText(row?.education_level),
        place_name: toText(row?.place_name),
        location: toText(row?.location),
        certificate: toText(row?.certificate),
        field_name: toText(row?.field_name),
        start: toDateString(row?.start),
        end: toDateString(row?.end),
      };
    }

    function isMissingField(field, value) {
      const text = toText(value);
      if (text === "") return true;
      if (field === "certificate") return text === "0";
      return false;
    }

    function hasEditableRowValues(row) {
      return EDITABLE_ROW_FIELDS.some(
        (field) => !isMissingField(field, row?.[field]),
      );
    }

    function isEmptyEducationRow(row) {
      return !hasEditableRowValues(row);
    }

    function toDateInputString(value) {
      const text = toText(value);
      if (text === "") return "";

      if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
      if (/^\d{4}$/.test(text)) return `${text}-01-01`;

      const dayMonthYearMatch = text.match(/^(\d{1,2})-(\d{1,2})-(\d{4})$/);
      if (dayMonthYearMatch) {
        const [, day, month, year] = dayMonthYearMatch;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }

      const yearMonthDaySlashMatch = text.match(
        /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/,
      );
      if (yearMonthDaySlashMatch) {
        const [, year, month, day] = yearMonthDaySlashMatch;
        return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
      }

      const parsedDate = new Date(text);
      if (Number.isNaN(parsedDate.getTime())) return "";

      return [
        parsedDate.getFullYear(),
        String(parsedDate.getMonth() + 1).padStart(2, "0"),
        String(parsedDate.getDate()).padStart(2, "0"),
      ].join("-");
    }

    function toTargetSectionSet(sectionIndexes) {
      if (Array.isArray(sectionIndexes) && sectionIndexes.length > 0) {
        return new Set(sectionIndexes);
      }
      return null;
    }

    function shouldProcessSection(sectionIndex, targetSectionSet) {
      return targetSectionSet == null || targetSectionSet.has(sectionIndex);
    }

    function pruneEmptyNewRows(sectionIndexes) {
      const targetSectionSet = toTargetSectionSet(sectionIndexes);
      let removedCount = 0;

      sections.value.forEach((section, sectionIndex) => {
        if (!shouldProcessSection(sectionIndex, targetSectionSet)) return;

        const beforeLength = section.rows.length;
        section.rows = section.rows.filter((row) => {
          const rowId = Number(row?.id || 0);
          if (rowId > 0) return true;
          return !isEmptyEducationRow(normalizeEducationBackgroundRow(row));
        });
        removedCount += beforeLength - section.rows.length;
      });

      return removedCount;
    }

    function buildEducationBackgroundPayload(sectionIndexes) {
      const peopleId = getPeopleId();
      const records = [];
      const errors = [];
      const targetSectionSet = toTargetSectionSet(sectionIndexes);

      if (peopleId <= 0) {
        return {
          records,
          errors: [
            {
              sectionIndex: -1,
              rowIndex: -1,
              missingFields: ["people_id"],
            },
          ],
          valid: false,
        };
      }

      sections.value.forEach((section, sectionIndex) => {
        if (!shouldProcessSection(sectionIndex, targetSectionSet)) return;

        section.rows.forEach((row, rowIndex) => {
          const normalized = normalizeEducationBackgroundRow(row);
          if (!isRowChangedFromBaseline(sectionIndex, row)) return;

          const missingFields = REQUIRED_EDUCATION_FIELDS.filter((field) =>
            isMissingField(field, normalized[field]),
          );

          if (missingFields.length > 0) {
            errors.push({
              sectionIndex,
              rowIndex,
              missingFields,
            });
            return;
          }

          records.push({
            id: Number(row?.id || 0) > 0 ? Number(row.id) : null,
            people_id: peopleId,
            education_level: normalized.education_level,
            place_name: normalized.place_name,
            location: normalized.location,
            certificate: normalized.certificate,
            field_name: normalized.field_name,
            start: normalized.start,
            end: normalized.end,
          });
        });
      });

      return {
        records,
        errors,
        valid: errors.length === 0,
      };
    }

    function buildEducationPayload(sectionIndexes) {
      const peopleId = getPeopleId();
      const records = [];
      const targetSectionSet = toTargetSectionSet(sectionIndexes);

      sections.value.forEach((section, sectionIndex) => {
        if (!shouldProcessSection(sectionIndex, targetSectionSet)) return;

        section.rows
          .filter(
            (row) => !isEmptyEducationRow(normalizeEducationBackgroundRow(row)),
          )
          .forEach((row) => {
            if (!isRowChangedFromBaseline(sectionIndex, row)) return;

            const normalized = normalizeEducationBackgroundRow(row);

            records.push({
              rowRef: row,
              id: Number(row?.id || 0) > 0 ? Number(row.id) : null,
              people_id: peopleId > 0 ? peopleId : null,
              education_level: normalized.education_level,
              place_name: normalized.place_name,
              location: normalized.location,
              certificate_group_id: resolveCertificateGroupId(section, row),
              field_name: normalized.field_name,
              start_date: normalized.start,
              end_date: normalized.end,
            });
          });
      });

      return { records };
    }

    function buildLocalCertificateRecord(section, row) {
      const normalized = normalizeEducationBackgroundRow(row);
      const certificateGroupId = resolveCertificateGroupId(section, row);

      return {
        id: Number(row?.id || 0) > 0 ? Number(row.id) : null,
        people_id: getPeopleId() || null,
        education_level: normalized.education_level,
        place_name: normalized.place_name,
        location: normalized.location,
        certificate_group_id: certificateGroupId,
        field_name: normalized.field_name,
        start: normalized.start,
        end: normalized.end,
        start_date: normalized.start,
        end_date: normalized.end,
        pdf: Boolean(row?.pdf),
      };
    }

    function flattenOfficerCertificateRecords(value) {
      if (Array.isArray(value)) {
        return value;
      }

      if (value && typeof value === "object") {
        return Object.values(value).flatMap((entry) =>
          Array.isArray(entry) ? entry : [],
        );
      }

      return [];
    }

    function syncOfficerCertificatesFromSections() {
      if (!props?.officer?.people) return;

      const records = sections.value.flatMap((section) =>
        (section.rows || [])
          .filter(
            (row) => !isEmptyEducationRow(normalizeEducationBackgroundRow(row)),
          )
          .map((row) => buildLocalCertificateRecord(section, row)),
      );

      const currentCertificates = props.officer.people.certificates;
      if (
        currentCertificates &&
        typeof currentCertificates === "object" &&
        !Array.isArray(currentCertificates)
      ) {
        props.officer.people.certificates = {
          ...currentCertificates,
          first: records.filter(
            (record) => resolveSectionIndex(record.certificate_group_id) === 0,
          ),
          middle: records.filter(
            (record) => resolveSectionIndex(record.certificate_group_id) === 1,
          ),
          others: records.filter(
            (record) => resolveSectionIndex(record.certificate_group_id) === 2,
          ),
        };
        return;
      }

      props.officer.people.certificates = records;
    }

    function collectDeletedRecordIds(sectionIndexes) {
      const targetSectionSet = toTargetSectionSet(sectionIndexes);
      const deletedIds = [];

      baselineSections.value.forEach((baselineSection, sectionIndex) => {
        if (!shouldProcessSection(sectionIndex, targetSectionSet)) return;

        const currentSection = sections.value[sectionIndex];
        const currentIds = new Set(
          (currentSection?.rows || [])
            .map((row) => Number(row?.id || 0))
            .filter((id) => id > 0),
        );

        (baselineSection?.rows || []).forEach((row) => {
          const rowId = Number(row?.id || 0);
          if (rowId > 0 && !currentIds.has(rowId)) {
            deletedIds.push(rowId);
          }
        });
      });

      return [...new Set(deletedIds)];
    }

    /* ---------------- LOAD DATA ---------------- */

    function mapRecords(records) {
      sections.value.forEach((section) => {
        section.rows = [];
      });

      records.forEach((record) => {
        const sectionIndex = resolveSectionIndex(record.certificate_group_id);
        if (sectionIndex === -1) return;

        sections.value[sectionIndex].rows.push({
          id: record.id,
          _key: `row-${++rowSeed}`,
          education_level: educationLevelForSection(sectionIndex),
          place_name: record.place_name || "",
          location: record.location || "",
          certificate: record.certificate_group_id ?? null,
          field_name: record.field_name || "",
          start: toDateInputString(record.start ?? record.start_date ?? ""),
          end: toDateInputString(record.end ?? record.end_date ?? ""),
          pdf: Boolean(record.pdf),
          pendingPdfFile: null,
        });
      });
    }

    function hydrateCertificatesFromOfficer() {
      const peopleId = getPeopleId();
      if (peopleId <= 0) {
        isHydrating.value = true;
        sections.value.forEach((section) => {
          section.rows = [];
        });
        markSaved();
        isHydrating.value = false;
        return;
      }

      const records = flattenOfficerCertificateRecords(
        props?.officer?.people?.certificates,
      );

      isHydrating.value = true;
      mapRecords(records);
      markSaved();
      isHydrating.value = false;
    }

    /* ---------------- PDF ---------------- */

    function togglePdfModal(record) {
      selectedCertificate.value =
        record == null || record == undefined ? null : record;
      pdfToggle.value = !pdfToggle.value;
    }

    function openUploadDialog(record) {
      selectedCertificate.value = record;
      clickUpload();
    }

    function clickUpload() {
      const activeElement = document.activeElement;
      if (activeElement instanceof HTMLElement) {
        activeElement.blur();
      }

      window.setTimeout(() => {
        referenceDocumentInput.value?.click();
      }, 0);
    }

    function isPdfFile(file) {
      const allowedMimeTypes = [
        "application/pdf",
        "application/x-pdf",
        "application/acrobat",
      ];
      const mimeType = String(file?.type || "").trim().toLowerCase();
      const filename = String(file?.name || "").trim().toLowerCase();

      return allowedMimeTypes.includes(mimeType) || filename.endsWith(".pdf");
    }

    function validatePdfFile(file) {
      const allowedSizeMb = 25;

      if (!isPdfFile(file)) {
        notify.error({
          title: "ឯកសារយោង",
          description: `អនុញ្ញាតតែឯកសារ PDF ប៉ុណ្ណោះ។ ឯកសារដែលបានជ្រើសគឺ ${file?.name || "មិនស្គាល់ឈ្មោះ"}.`,
          duration: 3000,
        });
        return false;
      }

      if (file.size > allowedSizeMb * 1024 * 1024) {
        notify.error({
          title: "ឯកសារយោង",
          description: `ទំហំនៃឯកសារគឺ៖ ${(file.size / 1024 / 1024).toFixed(2)} មេកាបៃ (MB) លើសទំហំដែលកំណត់គឺ 25 មេកាបៃ។`,
          duration: 3000,
        });
        return false;
      }

      return true;
    }

    function fileChange(event) {
      const file = event.target.files?.[0];
      event.target.value = "";
      if (event.target instanceof HTMLElement) {
        event.target.blur();
      }

      if (!file || !selectedCertificate.value) {
        return;
      }

      if (!validatePdfFile(file)) {
        return;
      }

      selectedCertificate.value.pendingPdfFile = file;
      notify.info({
        title: "ឯកសារយោង",
        description:
          "បានជ្រើស PDF រួចហើយ។ សូមរក្សាទុកព័ត៌មានជាមុនសិន ដើម្បីបញ្ចូលឯកសារនេះ។",
        duration: 3000,
      });
    }

    async function uploadPendingPdf(row) {
      if (!row?.id || !row?.pendingPdfFile) {
        return false;
      }

      const formData = new FormData();
      formData.append("id", row.id);
      formData.append("file", row.pendingPdfFile, row.pendingPdfFile.name);

      await store.dispatch(`${model.name}/upload`, formData);
      row.pdf = true;
      row.pendingPdfFile = null;
      return true;
    }

    function rowHasPreview(row) {
      return Number(row?.id || 0) > 0 && Boolean(row?.pdf);
    }

    function rowHasDownload(row) {
      return Boolean(row?.pendingPdfFile || row?.pdf);
    }

    function triggerBrowserDownload(url, filename) {
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = filename;
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }

    async function downloadPdf(row) {
      try {
        if (row?.pendingPdfFile instanceof File) {
          const downloadUrl = URL.createObjectURL(row.pendingPdfFile);
          try {
            triggerBrowserDownload(
              downloadUrl,
              row.pendingPdfFile.name || "education-certificate.pdf",
            );
          } finally {
            URL.revokeObjectURL(downloadUrl);
          }
          return;
        }

        if (!rowHasPreview(row)) {
          return;
        }

        const res = await store.dispatch(`${model.name}/pdf`, { id: row.id });
        triggerBrowserDownload(
          res?.data?.pdf,
          res?.data?.filename || `certificate-${row.id}.pdf`,
        );
      } catch (error) {
        console.error(error);
        notify.error({
          title: "ទាញយកឯកសារយោង",
          description: "មានបញ្ហាពេលទាញយកឯកសារយោង។",
          duration: 3000,
        });
      }
    }

    /* ---------------- API ---------------- */

    function notifyDirty() {
      if (isHydrating.value) return;
      emit("changed", hasSectionChanges.value);
    }

    function notifyValidationErrors(errors = []) {
      const firstError = errors[0];
      if (!firstError) return;

      selectedSectionIndex.value = Math.max(firstError.sectionIndex || 0, 0);

      const rowLabel = khmerNumber((firstError.rowIndex || 0) + 1);
      const sectionLabel = khmerNumber((firstError.sectionIndex || 0) + 1);
      lastInvalidTarget.value = {
        sectionIndex: Math.max(firstError.sectionIndex || 0, 0),
        rowIndex: Math.max(firstError.rowIndex || 0, 0),
        field: getFocusableEducationField(firstError.missingFields || []),
      };

      notify.error({
        title: "កំរិតអប់រំ",
        description: `សូមបំពេញទិន្នន័យឱ្យគ្រប់ជាមុនសិន នៅផ្នែកទី ${sectionLabel} ជួរទី ${rowLabel}។`,
        duration: 3500,
      });

      focusInvalidEducationTarget(lastInvalidTarget.value);
    }

    async function persistChanges() {
      const peopleId = getPeopleId();
      if (peopleId <= 0) {
        notify.error({
          title: "កំរិតអប់រំ",
          description: "មិនអាចរក្សាទុកបានទេ។ សូមរក្សាទុកព័ត៌មានមន្ត្រីជាមុនសិន។",
          duration: 3500,
        });
        return false;
      }

      const targetSectionIndexes = [...changedSectionIndexes.value];
      if (targetSectionIndexes.length <= 0) {
        markSaved();
        return true;
      }

      const validationResult =
        buildEducationBackgroundPayload(targetSectionIndexes);
      if (validationResult.valid !== true) {
        notifyValidationErrors(validationResult.errors);
        return false;
      }

      const { records } = buildEducationPayload(targetSectionIndexes);
      const deletedIds = collectDeletedRecordIds(targetSectionIndexes);

      if (records.length <= 0 && deletedIds.length <= 0) {
        markSaved();
        return true;
      }

      try {
        for (const id of deletedIds) {
          await crud.delete(certificatesUrl, { id });
        }

        for (const { id, rowRef, ...record } of records) {
          const response = await (id != null
            ? crud.update(certificatesUrl, { id, ...record })
            : crud.create(certificatesUrl, record));

          const savedId =
            id != null
              ? id
              : Number(response?.data?.record?.id || response?.data?.id || 0);

          if (savedId > 0 && rowRef) {
            rowRef.id = savedId;
          }

          if (rowRef?.pendingPdfFile) {
            await uploadPendingPdf(rowRef);
          }
        }

        syncOfficerCertificatesFromSections();
        markSaved();
        return true;
      } catch (error) {
        console.error("Save error", error?.response?.data || error);
        notify.error({
          title: "កំរិតអប់រំ",
          description: "មានបញ្ហាក្នុងការរក្សាទុកទិន្នន័យផ្នែកនេះ។",
          duration: 3500,
        });
        return false;
      }
    }

    async function saveEducation() {
      return persistChanges();
    }

    /* ---------------- WATCH ---------------- */

    watch(
      () => props?.officer?.people?.certificates,
      () => {
        hydrateCertificatesFromOfficer();
      },
      { immediate: true, deep: true },
    );
    watch(sections, notifyDirty, { deep: true });

    return {
      sections,
      selectedSectionIndex,
      educationLevelForSection,
      addRow,
      removeRow,
      certificateOptions,
      isRowChangedFromBaseline,
      khmerNumber,
      saveEducation,
      hasRows,
      hasSectionChanges,
      changedSectionCount,
      canNavigateChanges,
      goToPreviousChangedSection,
      goToNextChangedSection,
      cancelChanges,
      cancelCurrentSection,
      cancelAllSections,
      persistChanges,
      markSaved,
      model,
      selectedCertificate,
      pdfToggle,
      togglePdfModal,
      openUploadDialog,
      referenceDocumentInput,
      fileChange,
      rowHasPreview,
      rowHasDownload,
      downloadPdf,
      locationOptionsForRow,
      setRowRef,
      setFieldRef,
      focusFirstInvalidField,
    };
  },
};
</script>

<style scoped>
.th {
  background: #E5EAF2;
  padding: 8px;
  font-size: 13px;
  font-weight: 600;
  border-bottom: 1px solid #D8DEE8;
}

.td {
  padding: 8px;
  border-bottom: 1px solid #E5E7EB;
}

.input {
  width: 100%;
  border: 1px solid #D8DEE8;
  padding: 6px;
  border-radius: 4px;
  font-size: 13px;
  background: white;
}

:deep(.education-inline-select .n-base-selection) {
  min-height: 34px;
  border-color: #d8dee8;
}

:deep(.education-inline-select .n-base-selection-label) {
  font-size: 13px;
}

.action-toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.action-trigger {
  display: inline-flex;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 36px;
  min-height: 36px;
  padding: 6px;
  border-radius: 6px;
  color: #6b7280;
  background: #f3f4f6;
  transition: all 0.2s ease;
  cursor: pointer;
  border: 1px solid transparent;
}

.action-button:hover {
  background: #e5e7eb;
  color: #1f2937;
}

.action-button:active {
  transform: scale(0.95);
}

.action-toolbar :deep(button) {
  min-width: 32px;
  min-height: 32px;
  padding: 4px;
  border-radius: 9999px;
}

.action-toolbar :deep(button svg) {
  width: 1.25rem;
  height: 1.25rem;
}

.action-upload {
  color: #16a34a;
}

.action-upload:hover {
  color: #15803d;
}

.action-upload-pending {
  color: #d97706;
}

.action-upload-pending:hover {
  color: #b45309;
}

.action-preview {
  color: #2563eb;
}

.action-preview:hover {
  color: #1d4ed8;
}

.action-download {
  color: #6b7280;
} 

.action-download:hover {
  color: #475569;
}

.action-button-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.action-button-disabled:hover {
  color: #9ca3af;
}

.action-divider {
  width: 1px;
  height: 16px;
  background: #d8dee8;
}

.education-pdf-shell {
  position: fixed;
  inset: 8px;
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.35);
  overflow: hidden;
}

.education-pdf-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 14px 16px;
  border-bottom: 1px solid #d8dee8;
  background: #f8fafc;
  flex: 0 0 auto;
}

.education-pdf-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-width: 92px;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 9999px;
  color: #dc2626;
  background: #fef2f2;
  font-size: 14px;
  font-weight: 600;
}

.education-pdf-close:hover {
  background: #fee2e2;
}

.education-pdf-body {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  background: #eef2f7;
}

.education-pdf-scroll {
  height: 100%;
  overflow-y: auto;
  overflow-x: auto;
  padding: 12px;
}

.education-pdf-loading {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.92);
  color: #1e3a8a;
  font-size: 15px;
  font-weight: 600;
}

.education-pdf-spinner {
  width: 52px;
  height: 52px;
  color: #2563eb;
  animation: education-pdf-spin 1s linear infinite;
}

.education-pdf-viewer {
  width: 100%;
}

.education-pdf-viewer :deep(.vue-pdf-embed__page) {
  margin-bottom: 12px;
}

.education-pdf-viewer :deep(.vue-pdf-embed__page canvas) {
  display: block;
  width: min(100%, 920px) !important;
  height: auto !important;
  margin: 0 auto;
  border: 1px solid #d8dee8;
  border-radius: 8px;
  background: white;
}

@media (min-width: 768px) {
  .education-pdf-shell {
    inset: 24px;
  }

  .education-pdf-scroll {
    padding: 16px;
  }
}

@keyframes education-pdf-spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
