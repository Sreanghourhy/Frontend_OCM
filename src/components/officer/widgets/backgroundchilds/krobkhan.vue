<template>
  <div class="mb-2">
    <section class="bg-white">
      <div v-if="officer != undefined" class="work-history-grid">
        <div class="work-history-row work-history-row--three">

          <div class="work-history-field work-history-field--stack" >
            <div class="work-history-label">ថ្ងៃខែឆ្នាំចូលបម្រើការរដ្ឋ ៖</div>
            <div class="work-history-control work-history-control--date ">
              <officer-date-input
                :ref="setFieldRef('unofficial_date')"
                v-model="form.unofficial_date"
              />
              <div
                v-if="shouldShowError('unofficial_date')"
                class="input-error-message"
              >
                {{ validationErrors.unofficial_date }}
              </div>
            </div>
          </div>

          <div
            v-if="showOfficialDate"
            class="work-history-field work-history-field--stack pl-4" 
          >
            <div class="work-history-label">
              ថ្ងៃខែឆ្នាំតាំងស៊ប់ក្នុងក្របខ័ណ្ឌរដ្ឋ ៖
            </div>
            <officer-date-input
              :ref="setFieldRef('official_date')"
              v-model="form.official_date"
              style="width: 120px !important; "
            />
            <div
              v-if="shouldShowError('official_date')"
              class="input-error-message"
            >
              {{ validationErrors.official_date }}
            </div>
          </div>

          <!-- <div
            v-if="showCodeField"
            class="work-history-field work-history-field--stack"
          >
            <div class="work-history-label">អត្តលេខមន្ត្រី ៖</div>
            <div class="work-history-control work-history-control--code">
              <input
                :ref="setFieldRef('code')"
                v-model="form.code"
                type="text"
                placeholder="អត្តលេខមន្ត្រី"
                :class="[textInputClass('code'), 'input--code']"
              />
              <div v-if="shouldShowError('code')" class="input-error-message">
                {{ validationErrors.code }}
              </div>
            </div>
          </div> -->
        </div>

        <div class="work-history-row work-history-row--two" style="width: 640px !important; ">
          <div class="work-history-field work-history-field--stack" >
            <div class="work-history-label " style="width: 130px !important; ">ឈ្មោះក្របខ័ណ្ឌ ៖</div>
            <div class="work-history-display text-right " style="width: 190px !important; " >
              {{ officer.rank != undefined && officer.rank.ank != '' ? officer.rank.ank  : '' }}
            </div>
          </div>

          <div class="work-history-field work-history-field--stack pl-4">
            <div class="work-history-label pl-4 " style="width: 220px !important; ">
              ក្របខ័ណ្ឌ ឋានន្តរស័ក្តិ និងថ្នាក់បច្ចុប្បន្ន ៖
            </div>
            <div class="work-history-display text-right" style="width: 120px !important; ">
            {{ officer.rank != undefined && officer.rank.prefix != '' ? officer.rank.prefix : '' }}
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { computed, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { formatRankCodeLabel } from "@utils/rank";

function normalizeString(value) {
  return String(value || "").trim();
}

function normalizeDateValue(value) {
  const time = Date.parse(value || "");
  return Number.isFinite(time) ? time : 0;
}

export default {
  emits: ["changed"],
  props: {
    officer: {
      type: Object,
      default: undefined,
    },
  },
  setup(props, { emit, expose }) {
    const store = useStore();
    const isHydrating = ref(false);
    const validationAttempted = ref(false);
    const savedSnapshot = ref("");
    const fieldRefs = reactive({
      unofficial_date: null,
      // official_date: null,
      // code: null,
    });

    const form = reactive({
      unofficial_date: "",
      official_date: "",
      // code: "",
    });
    const backendValidationErrors = reactive({
      unofficial_date: "",
      official_date: "",
      // code: "",
    });

    const officerTypeKey = computed(() =>
      normalizeString(props.officer?.additional_officer_type),
    );
    const officerTypesWithFullStateFields = ["admin_official", "politician"];
    const showOfficialDate = computed(() =>
      officerTypesWithFullStateFields.includes(officerTypeKey.value),
    );
    const showCodeField = computed(() =>
      officerTypesWithFullStateFields.includes(officerTypeKey.value),
    );
    const currentSalaryRankDisplay = computed(() => {
      const rankingByWorkings = Array.isArray(props.officer?.ranking_by_workings)
        ? props.officer.ranking_by_workings
        : [];

      const latestRankRow = rankingByWorkings.reduce((latest, current) => {
        if (!current) return latest;
        if (!latest) return current;

        const latestTime = normalizeDateValue(latest?.date);
        const currentTime = normalizeDateValue(current?.date);
        if (currentTime !== latestTime) {
          return currentTime > latestTime ? current : latest;
        }

        const latestId = parseInt(latest?.id || 0, 10) || 0;
        const currentId = parseInt(current?.id || 0, 10) || 0;
        return currentId > latestId ? current : latest;
      }, null);

      const latestRankLabel = formatRankCodeLabel(
        latestRankRow?.rank || latestRankRow?.rank_id || "",
      );

      return normalizeString(latestRankLabel);
    });

    const validationErrors = computed(() => {
      const errors = {
        unofficial_date: "",
        official_date: "",
        // code: "",
      };

      if (normalizeString(form.unofficial_date) === "") {
        errors.unofficial_date = "សូមបំពេញថ្ងៃខែឆ្នាំចូលបម្រើការរដ្ឋ";
      }

      if (
        showOfficialDate.value &&
        normalizeString(form.official_date) === ""
      ) {
        errors.official_date = "សូមបំពេញថ្ងៃខែឆ្នាំតាំងស៊ប់ក្នុងក្របខ័ណ្ឌរដ្ឋ";
      }

      // if (showCodeField.value && normalizeString(form.code) === "") {
      //   errors.code = "សូមបំពេញអត្តលេខមន្ត្រី";
      // }

      if (errors.unofficial_date === "") {
        errors.unofficial_date = backendValidationErrors.unofficial_date;
      }

      if (errors.official_date === "") {
        errors.official_date = backendValidationErrors.official_date;
      }

      // if (errors.code === "") {
      //   errors.code = backendValidationErrors.code;
      // }

      return errors;
    });

    const firstInvalidField = computed(() => {
      const orderedFields = ["unofficial_date", "official_date", "code"];
      return orderedFields.find((field) => validationErrors.value[field]) || "";
    });

    function createSnapshot() {
      return JSON.stringify({
        unofficial_date: normalizeString(form.unofficial_date),
        official_date: showOfficialDate.value
          ? normalizeString(form.official_date)
          : "",
        code: showCodeField.value ? normalizeString(form.code) : "",
        officer_type: officerTypeKey.value,
      });
    }

    function clearBackendValidationErrors() {
      backendValidationErrors.unofficial_date = "";
      backendValidationErrors.official_date = "";
      // backendValidationErrors.code = "";
    }

    function hydrateForm() {
      isHydrating.value = true;
      form.unofficial_date = normalizeString(props.officer?.unofficial_date);
      form.official_date = normalizeString(props.officer?.official_date);
      // form.code = normalizeString(props.officer?.code);
      clearBackendValidationErrors();
      savedSnapshot.value = createSnapshot();
      validationAttempted.value = false;
      emit("changed", false);
      isHydrating.value = false;
    }

    function shouldShowError(field) {
      return (
        validationAttempted.value === true &&
        normalizeString(validationErrors.value[field]) !== ""
      );
    }

    function dateInputClass(field) {
      return [
        "field-input",
        "w-full",
        "border",
        "rounded",
        "px-2",
        "text-[13px]",
        "bg-white",
        shouldShowError(field)
          ? "validation-input-invalid"
          : "border-[#D8DEE8]",
      ];
    }

    function textInputClass(field) {
      return [
        "field-input",
        "w-full",
        "border",
        "rounded",
        "px-2",
        "text-[13px]",
        "bg-white",
        shouldShowError(field)
          ? "validation-input-invalid"
          : "border-[#D8DEE8]",
      ];
    }

    function displayText(value) {
      const normalized = normalizeString(value);
      return normalized !== "" ? normalized : "-";
    }

    function notifyDirty() {
      if (isHydrating.value) return;
      emit("changed", createSnapshot() !== savedSnapshot.value);
    }

    function setFieldRef(field) {
      return (el) => {
        fieldRefs[field] = el;
      };
    }

    function focusFirstInvalidField() {
      const field = firstInvalidField.value;
      if (!field) return;

      window.setTimeout(() => {
        const target = fieldRefs[field];
        if (target && typeof target.focus === "function") {
          target.focus();
          return;
        }

        if (target && target instanceof HTMLElement) {
          target.focus();
          return;
        }

        target?.$el?.querySelector?.("input")?.focus?.();
      }, 0);
    }

    function markSaved() {
      savedSnapshot.value = createSnapshot();
      clearBackendValidationErrors();
      validationAttempted.value = false;
      emit("changed", false);
    }

    function cancelChanges() {
      hydrateForm();
    }

    function buildPayload() {
      const officerId = parseInt(props.officer?.id || 0);
      if (officerId <= 0) return null;

      return {
        id: officerId,
        unofficial_date: normalizeString(form.unofficial_date) || null,
        ...(showOfficialDate.value
          ? { official_date: normalizeString(form.official_date) || null }
          : {}),
        // ...(showCodeField.value ? { code: normalizeString(form.code) } : {}),
      };
    }

    async function persistChanges() {
      const officerId = parseInt(props.officer?.id || 0);
      if (officerId <= 0) return false;

      validationAttempted.value = true;

      if (firstInvalidField.value) {
        return false;
      }

      if (createSnapshot() === savedSnapshot.value) {
        markSaved();
        return true;
      }

      try {
        const payload = buildPayload();
        if (!payload) return false;
        clearBackendValidationErrors();

        const res = await store.dispatch("officer/updateWorkHistory", payload);

        if (!(res?.data?.ok === true || res?.status === 200)) {
          throw new Error("krobkhan-update-failed");
        }

        const record = res?.data?.record || {};
        props.officer.unofficial_date =
          record.unofficial_date ?? payload.unofficial_date;

        if (Object.prototype.hasOwnProperty.call(payload, "official_date")) {
          props.officer.official_date =
            record.official_date ?? payload.official_date;
        }

        // if (Object.prototype.hasOwnProperty.call(payload, "code")) {
        //   props.officer.code = record.code ?? payload.code;
        // }

        markSaved();
        return true;
      } catch (err) {
        const serverErrors = err?.response?.data?.errors || {};
        backendValidationErrors.unofficial_date =
          serverErrors.unofficial_date?.[0] || "";
        backendValidationErrors.official_date =
          serverErrors.official_date?.[0] || "";
        // backendValidationErrors.code = serverErrors.code?.[0] || "";
        // console.log("krobkhan persist error:", err);
        return false;
      }
    }

    watch(
      () => props.officer,
      () => {
        hydrateForm();
      },
      { immediate: true, deep: true },
    );

    watch(
      () => [
        form.unofficial_date,
        form.official_date,
        // form.code,
        officerTypeKey.value,
      ],
      () => {
        clearBackendValidationErrors();
        notifyDirty();
      },
    );

    expose({
      persistChanges,
      cancelChanges,
      markSaved,
      focusFirstInvalidField,
    });

    return {
      form,
      showOfficialDate,
      showCodeField,
      validationErrors,
      shouldShowError,
      dateInputClass,
      textInputClass,
      displayText,
      currentSalaryRankDisplay,
      setFieldRef,
      persistChanges,
      cancelChanges,
      markSaved,
    };
  },
};
</script>

<style scoped>
.work-history-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  width: 1024px; 
}

.work-history-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
}

.work-history-field {
  min-width: 0; 
}

.work-history-field--stack {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  column-gap: 12px;
}

.work-history-label {
  width: 200px;
  min-width: 0;
  padding-top: 0;
  white-space: nowrap;
  color: #1f2937;
  font-size: 13px;
  line-height: 1.45;
  text-align: left;
}

.work-history-control,
.work-history-display {
  width: 100%;
  max-width: none;
  min-width: 0;
  flex: 0 1 auto;
}

.work-history-control--date {
  max-width: none;
}

.work-history-control--code {
  max-width: none;
}

.input--code {
  height: 34px;
}

.work-history-display {
  min-height: 32px;
  padding-top: 6px;
  color: #111827;
  font-size: 13px;
  line-height: 1.45;
}

.input-error-message {
  margin-top: 4px;
  color: #dc2626;
  font-size: 12px;
  line-height: 1.35;
}

:deep(.validation-input-invalid .n-input) {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

@media (min-width: 1200px) {
  .work-history-row--three {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 16px;
  }

  .work-history-row--two {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 16px;
  }
}

@media (max-width: 767px) {
  .work-history-label {
    width: 100%;
    min-width: 0;
    padding-top: 0;
  }

  .work-history-control,
  .work-history-display {
    max-width: none;
  }
}
</style>
