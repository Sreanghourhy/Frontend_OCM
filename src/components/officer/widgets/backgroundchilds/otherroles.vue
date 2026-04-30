<template>
  <div class="mb-10">
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="font-moul text-[#1E3A8A] text-[15px] text-left">
        <!-- តួនាទីផ្សេងៗ -->
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-1 bg-[#1E3A8A] text-white rounded-md px-3 py-1.5 text-[13px] hover:bg-[#162E6B] duration-200 flex-shrink-0"
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

    <section class="bg-white border border-[#D8DEE8] rounded-sm">
      <div v-if="officer != undefined" class="overflow-x-auto">
        <table class="w-full border-collapse min-w-[980px]">
          <thead>
            <tr>
              <th
                class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]"
              >
                ថ្ងៃខែឆ្នាំចូលបម្រើការងារ
              </th>
              <th
                class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]"
              >
                ថ្ងៃខែឆ្នាំបញ្ចប់ការងារ
              </th>
              <th
                class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]"
              >
                ក្រសួង-ស្ថាប័ន
              </th>
              <th
                class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]"
              >
                នាយកដ្ឋាន-អង្គភាព
              </th>
              <th
                class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]"
              >
                មុខតំណែង
              </th>
              <th
                class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]"
              >
                ជំនាញ/បច្ចេកទេស<br />ក្នុងមុខតំណែង
              </th>
              <th
                class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8] w-44 text-center"
              >
                សកម្មភាព
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row._key"
              :class="rowEdited(row) ? 'bg-[#FEE2E2]' : 'bg-white'"
            >
              <td class="p-2 border-b border-[#E5E7EB]">
                <officer-date-input v-model="row.start" :max="row.end" />
              </td>
              <td class="p-2 border-b border-[#E5E7EB]">
                <officer-date-input v-model="row.end" :min="row.start" />
              </td>
              <td class="p-2 border-b border-[#E5E7EB]">
                <n-select
                  v-model:value="row.organization"
                  filterable
                  clearable
                  size="small"
                  :consistent-menu-width="false"
                  :menu-props="wideSelectMenuProps"
                  :options="organizationSelectOptions(row.organization)"
                  @update:value="onOrganizationChange(row)"
                  placeholder="ជ្រើសរើសស្ថាប័ន"
                  class="w-full uniform-select text-center"
                />
              </td>
              <td class="p-2 border-b border-[#E5E7EB] align-top">
                <n-select
                  v-if="shouldUseStructuredFields(row)"
                  v-model:value="row.sub_organization"
                  multiple
                  filterable
                  clearable
                  :max-tag-count="1"
                  size="small"
                  :consistent-menu-width="false"
                  :menu-props="wideSelectMenuProps"
                  :options="specialSubOrganizationOptions(row)"
                  :loading="generalDepartmentLoading"
                  placeholder="ជ្រើសរើសនាយកដ្ឋាន-អង្គភាព"
                  class="w-full uniform-select text-center"
                  @update:value="onSubOrganizationChange(row)"
                />
                <input
                  v-else
                  v-model="row.sub_organization"
                  type="text"
                  autocomplete="off"
                  placeholder="បញ្ចូលអង្គភាព"
                  class="field-input w-full text-center border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
                />
              </td>
              <td class="p-2 border-b border-[#E5E7EB] align-top">
                <n-select
                  v-if="shouldUseStructuredFields(row)"
                  v-model:value="row.position"
                  filterable
                  clearable
                  size="small"
                  :consistent-menu-width="false"
                  :menu-props="wideSelectMenuProps"
                  :options="specialPositionOptions(row)"
                  :loading="positionLoading"
                  :disabled="!hasValue(row.sub_organization)"
                  placeholder="ជ្រើសរើសមុខតំណែង"
                  class="w-full uniform-select text-center"
                />
                <input
                  v-else
                  v-model="row.position"
                  type="text"
                  autocomplete="off"
                  placeholder="បញ្ចូលមុខតំណែង"
                  class="field-input w-full text-center border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
                />
              </td>
              <td class="p-2 border-b border-[#E5E7EB]">
                <input
                  v-model="row.skill_of_position"
                  type="text"
                  class="field-input w-full text-center border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
                />
              </td>
              <td class="p-2 border-b border-[#E5E7EB] text-center">
                <row-document-action-bar
                  :input-id="`otherroles-document-${row._key}`"
                  :upload-pending="Boolean(documentFileMap[row._key])"
                  :preview-disabled="!rowHasPreview(row)"
                  :download-disabled="!rowHasDownload(row)"
                  :clear-disabled="!rowHasDownload(row)"
                  @select="(file) => onDocumentFileChange(row, file)"
                  @preview="openPdfPreview(row)"
                  @download="downloadRowDocument(row)"
                  @clear="clearDocumentFile(row)"
                  @remove="removeRow(index)"
                />
              </td>
            </tr>
            <tr v-if="rows.length <= 0">
              <td
                colspan="7"
                class="bg-white p-4 text-center text-gray-500 border-b border-[#E5E7EB]"
              >
                មិនទាន់មានទិន្នន័យ
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="officer == undefined"
        class="w-full p-8 text-center text-red-500"
      >
        សូមបញ្ជាក់ព័ត៌មានមន្ត្រីជាមុនសិន។
      </div>
      <pdf-preview
        :model="model"
        :record="selectedPdfRecord"
        :show="pdfToggle"
        :onClose="openPdfPreview"
      />
    </section>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import PdfPreview from "./pdfpreview.vue";
import RowDocumentActionBar from "./row-document-action-bar.vue";
import { useRowDocumentUpload } from "./use-row-document-upload";

export default {
  emits: ["changed"],
  props: {
    officer: {
      type: Object,
      default: undefined,
    },
  },
  components: {
    PdfPreview,
    RowDocumentActionBar,
  },
  setup(props, { emit }) {
    const store = useStore();
    const rows = ref([]);
    const savedSnapshot = ref("[]");
    const savedRowsByKey = ref({});
    const deletedIds = ref([]);
    const generalDepartmentOptions = ref([]);
    const generalDepartmentLoading = ref(false);
    const positionOptionsForStructuredOrganization = ref([]);
    const positionLoading = ref(false);
    const {
      documentFileMap,
      storedFileLabel,
      onDocumentFileChange,
      clearDocumentFile,
      buildPreviewRecord,
      resetDocumentFiles,
      rowHasPreview,
      rowHasDownload,
      shouldClearStoredPdf,
      uploadDocumentIfNeeded,
      downloadDocument,
    } = useRowDocumentUpload(store, "officerjobbackground/upload");
    const ministryRecords = ref([]);
    const MULTI_VALUE_SEPARATOR = ",";
    const STRUCTURED_ORGANIZATION_NAME = "ទីស្ដីការគណៈរដ្ឋមន្ត្រី";
    const wideSelectMenuProps = {
      style: {
        minWidth: "340px",
        maxWidth: "80vw",
      },
    };
    const model = reactive({
      name: "officerjobbackground",
      module: "officerjobbackgrounds",
      title: "តួនាទីផ្សេងៗ",
    });
    const selectedPdfRecord = ref(null);
    const pdfToggle = ref(false);
    let seed = 0;

    function nextKey() {
      seed += 1;
      return `other-role-${seed}`;
    }

    function toInputDate(value) {
      if (!value) return "";
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return String(value).slice(0, 10);
      return d.toISOString().slice(0, 10);
    }

    async function loadMinistries() {
      try {
        const res = await store.dispatch("organization/getministry");
        const records = Array.isArray(res?.data)
          ? res.data
          : Array.isArray(res?.data?.records)
            ? res.data.records
            : [];
        ministryRecords.value = Array.isArray(records) ? records : [];
      } catch (error) {
        ministryRecords.value = [];
      }
    }

    async function loadGeneralDepartmentOptions() {
      generalDepartmentLoading.value = true;
      try {
        const res = await store.dispatch(
          "organization/listorganizationbygeneraldepartment",
        );
        const records =
          res?.data?.records ||
          res?.data?.record ||
          res?.data?.data ||
          res?.data ||
          [];
        generalDepartmentOptions.value = buildTextOptions(
          Array.isArray(records) ? records : [],
          ["name_kh", "name", "title", "organization_name"],
        );
      } catch (error) {
        generalDepartmentOptions.value = [];
      } finally {
        generalDepartmentLoading.value = false;
      }
    }

    async function loadPositionOptions() {
      positionLoading.value = true;
      try {
        const res = await store.dispatch("organization/listposition");
        const records =
          res?.data?.records ||
          res?.data?.record ||
          res?.data?.data ||
          res?.data ||
          [];
        positionOptionsForStructuredOrganization.value = buildTextOptions(
          Array.isArray(records) ? records : [],
          ["name_kh", "name", "title", "position_name"],
        );
      } catch (error) {
        positionOptionsForStructuredOrganization.value = [];
      } finally {
        positionLoading.value = false;
      }
    }

    function buildTextOptions(records, keys = []) {
      if (!Array.isArray(records)) return [];

      const seen = new Set();
      return records.reduce((options, record) => {
        const value = keys
          .map((key) => String(record?.[key] || "").trim())
          .find(Boolean);

        if (!value || seen.has(value)) return options;

        seen.add(value);
        options.push({
          label: value,
          value,
        });
        return options;
      }, []);
    }

    function normalizeText(value) {
      return String(value || "").trim();
    }

    function normalizeTextArray(value) {
      if (Array.isArray(value)) {
        return value
          .map((item) => normalizeText(item))
          .filter(Boolean);
      }

      return normalizeText(value)
        .split(MULTI_VALUE_SEPARATOR)
        .map((item) => normalizeText(item))
        .filter(Boolean);
    }

    function serializeSubOrganization(value) {
      if (Array.isArray(value)) {
        return normalizeTextArray(value).join(`${MULTI_VALUE_SEPARATOR} `);
      }

      return normalizeText(value);
    }

    function parseSubOrganizationValue(organization, value) {
      if (normalizeText(organization) === STRUCTURED_ORGANIZATION_NAME) {
        return normalizeTextArray(value);
      }

      return normalizeText(value);
    }

    function shouldUseStructuredFields(row) {
      return normalizeText(row?.organization) === STRUCTURED_ORGANIZATION_NAME;
    }

    const organizationOptions = computed(() => {
      const preferred =
        Array.isArray(ministryRecords.value) && ministryRecords.value.length > 0
          ? ministryRecords.value
          : store.getters["organization/getRecords"];
      const records = Array.isArray(preferred) ? preferred : [];

      const normalized = records
        .map((organization) => ({
          id: organization?.id,
          name: String(organization?.name || "").trim(),
        }))
        .filter((organization) => organization.name);

      const seen = new Set();
      return normalized.filter((organization) => {
        if (seen.has(organization.name)) return false;
        seen.add(organization.name);
        return true;
      });
    });

    function hydrateRows() {
      const source = props.officer?.job_backgrounds || [];
      rows.value = source
        .filter((job) => parseInt(job?.sector || 0) === 2)
        .map((job) => ({
          id: parseInt(job?.id || 0) || null,
          _key: nextKey(),
          start: toInputDate(job?.start),
          end: toInputDate(job?.end),
          organization: job?.organization || "",
          sub_organization: parseSubOrganizationValue(
            job?.organization,
            job?.sub_organization,
          ),
          position: job?.position || "",
          skill_of_position: job?.skill_of_position || "",
          pdf: storedFileLabel(job?.pdf),
          _storedPdf: storedFileLabel(job?.pdf),
        }));
      markSaved();
    }

    function addRow() {
      rows.value.push({
        id: null,
        _key: nextKey(),
        start: "",
        end: "",
        organization: "",
        sub_organization: "",
        position: "",
        skill_of_position: "",
        pdf: "",
        _storedPdf: "",
      });
    }

    function removeRow(index) {
      const row = rows.value[index];
      if (parseInt(row?.id || 0) > 0) {
        deletedIds.value.push(parseInt(row.id));
      }
      if (row) clearDocumentFile(row);
      rows.value.splice(index, 1);
    }

    function hasValue(value) {
      if (Array.isArray(value)) {
        return value.some((item) => normalizeText(item) !== "");
      }
      return String(value ?? "").trim() !== "";
    }

    function findInvalidRowIndex() {
      return rows.value.findIndex(
        (row) =>
          !hasValue(row.start) ||
          !hasValue(row.end) ||
          !hasValue(row.organization) ||
          !hasValue(row.sub_organization) ||
          !hasValue(row.position) ||
          !hasValue(row.skill_of_position),
      );
    }

    function validateSectionBeforeSave() {
      if (rows.value.length <= 0) {
        return deletedIds.value.length > 0;
      }

      if (findInvalidRowIndex() > -1) {
        return false;
      }

      return true;
    }

    function toPayload() {
      return rows.value.map(({ _key, _storedPdf, ...item }) => ({
        ...item,
        sub_organization: serializeSubOrganization(item.sub_organization),
      }));
    }

    function normalizeRow(row) {
      const { _key, _storedPdf, ...item } = row;
      return {
        ...item,
        sub_organization: serializeSubOrganization(item.sub_organization),
      };
    }

    function markSaved() {
      const payload = toPayload();
      savedSnapshot.value = JSON.stringify(payload);
      const mapped = {};
      rows.value.forEach((row) => {
        mapped[row._key] = JSON.stringify(normalizeRow(row));
      });
      savedRowsByKey.value = mapped;
      deletedIds.value = [];
      resetDocumentFiles();
      emit("changed", false);
    }

    function rowEdited(row) {
      const snapshotRow = savedRowsByKey.value[row._key];
      if (snapshotRow === undefined) return true;
      return JSON.stringify(normalizeRow(row)) !== snapshotRow;
    }

    function notifyDirty() {
      emit("changed", JSON.stringify(toPayload()) !== savedSnapshot.value);
    }

    function cancelChanges() {
      hydrateRows();
    }

    function openPdfPreview(record) {
      selectedPdfRecord.value = buildPreviewRecord(record);
      pdfToggle.value = !pdfToggle.value;
    }

    async function downloadRowDocument(row) {
      try {
        await downloadDocument(row, `${model.name}/pdf`);
      } catch (error) {
        console.error("Other roles download error:", error);
        window.alert("Unable to download attachment.");
      }
    }

    async function persistChanges() {
      const officerId = parseInt(props.officer?.id || 0);
      if (officerId <= 0) return false;

      if (!validateSectionBeforeSave()) {
        return false;
      }

      for (const id of deletedIds.value) {
        await store.dispatch("officerjobbackground/delete", { id });
      }

      for (const row of rows.value) {
        const payload = {
          officer_id: officerId,
          organization: row.organization || "",
          sub_organization: serializeSubOrganization(row.sub_organization),
          position: row.position || "",
          start: row.start || "",
          end: row.end || "",
          skill_of_position: row.skill_of_position || "",
          pdf: row.pdf || "",
          clear_pdf: shouldClearStoredPdf(row._key) ? 1 : 0,
          sector: 2,
          is_primary: false,
        };
        if (parseInt(row.id || 0) > 0) {
          await store.dispatch("officerjobbackground/update", {
            id: parseInt(row.id),
            ...payload,
          });
        } else {
          const res = await store.dispatch(
            "officerjobbackground/create",
            payload,
          );
          row.id = parseInt(res?.data?.record?.id || 0) || null;
        }
        await uploadDocumentIfNeeded(row.id, row);
        row._storedPdf = row.pdf || "";
      }

      markSaved();
      return true;
    }

    function organizationSelectOptions(currentValue) {
      const options = Array.isArray(organizationOptions.value)
        ? [...organizationOptions.value]
        : [];
      const values = options.map((organization) => organization.name);
      if (currentValue && !values.includes(currentValue)) {
        options.unshift({ id: null, name: currentValue });
      }
      return options.map((organization) => ({
        label: organization.name,
        value: organization.name,
      }));
    }

    function textSelectOptions(options, currentValue) {
      const normalizedOptions = Array.isArray(options) ? [...options] : [];
      const currentValues = Array.isArray(currentValue)
        ? normalizeTextArray(currentValue)
        : [normalizeText(currentValue)].filter(Boolean);

      currentValues.forEach((current) => {
        if (
          current &&
          !normalizedOptions.some((option) => option?.value === current)
        ) {
          normalizedOptions.unshift({
            label: current,
            value: current,
          });
        }
      });

      return normalizedOptions;
    }

    function specialSubOrganizationOptions(row) {
      return textSelectOptions(generalDepartmentOptions.value, row?.sub_organization);
    }

    function specialPositionOptions(row) {
      return textSelectOptions(
        positionOptionsForStructuredOrganization.value,
        row?.position,
      );
    }

    function onOrganizationChange(row) {
      row.sub_organization = shouldUseStructuredFields(row) ? [] : "";
      row.position = "";
    }

    function onSubOrganizationChange(row) {
      if (shouldUseStructuredFields(row)) {
        row.sub_organization = normalizeTextArray(row.sub_organization);
      } else {
        row.sub_organization = normalizeText(row.sub_organization);
      }
      row.position = "";
    }

    watch(() => props.officer?.job_backgrounds, hydrateRows, {
      immediate: true,
      deep: true,
    });
    watch(rows, notifyDirty, { deep: true });
    onMounted(() => {
      loadMinistries();
      loadGeneralDepartmentOptions();
      loadPositionOptions();
    });

    return {
      rows,
      wideSelectMenuProps,
      generalDepartmentLoading,
      positionLoading,
      documentFileMap,
      model,
      selectedPdfRecord,
      pdfToggle,
      organizationSelectOptions,
      shouldUseStructuredFields,
      specialSubOrganizationOptions,
      specialPositionOptions,
      onOrganizationChange,
      onSubOrganizationChange,
      hasValue,
      onDocumentFileChange,
      clearDocumentFile,
      rowHasPreview,
      rowHasDownload,
      openPdfPreview,
      downloadRowDocument,
      addRow,
      removeRow,
      cancelChanges,
      persistChanges,
      markSaved,
      rowEdited,
    };
  },
};
</script>

<style scoped>
.field-input {
  height: 32px;
  box-sizing: border-box;
}

:deep(.uniform-select .n-base-selection) {
  min-height: 32px !important;
  height: 32px !important;
  box-sizing: border-box;
  background-color: #fff !important;
}

:deep(.uniform-select .n-base-selection-label) {
  height: 100%;
  background-color: #fff !important;
}
</style>
