<template>
  <div class="mb-10">
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="font-moul text-[#1E3A8A] text-[15px] text-left">
        ច.៤.ស្ថានភាពស្ថិតនៅក្រៅក្របខ័ណ្ឌដើម (សូមបំពេញតាមលំដាប់ ពីថ្មីទៅចាស់)
      </div>
      <button
        type="button"
        class="inline-flex items-center gap-1 bg-[#1E3A8A] text-white rounded-md px-3 py-1.5 text-[13px] hover:bg-[#162E6B] duration-200 flex-shrink-0"
        @click="addRow"
      >
        <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3z" clip-rule="evenodd" />
        </svg>
        <span>បន្ថែម</span>
      </button>
    </div>

    <section class="bg-white border border-[#D8DEE8] rounded-sm">
      <div v-if="officer != undefined" class="overflow-x-auto">
        <table class="w-full border-collapse min-w-[860px]">
        <thead>
          <tr>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ថ្ងៃខែឆ្នាំ<br/>ចាប់ផ្ដើម</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ថ្ងៃខែឆ្នាំ<br/>បញ្ចប់</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ក្រសួង/ស្ថាប័ន</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">មុខតំណែង</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8] w-44 text-center">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row._key" :class="rowEdited(row) ? 'bg-[#FEE2E2]' : 'bg-white'">
            <td class="p-2 border-b border-[#E5E7EB]">
              <officer-date-input
                v-model="row.start"
                :max="row.end"
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <officer-date-input
                v-model="row.end"
                :min="row.start"
              />
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
                placeholder="ជ្រើសរើសស្ថាប័ន"
                class="w-full uniform-select text-center "
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <input
                v-model="row.position"
                type="text"
                autocomplete="off"
                placeholder="បញ្ចូលមុខតំណែង"
                class="field-input w-full text-center border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB] text-center">
              <row-document-action-bar
                :input-id="`outkrobkhan-document-${row._key}`"
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
            <td colspan="5" class="bg-white p-4 text-center text-gray-500 border-b border-[#E5E7EB]">មិនទាន់មានទិន្នន័យ</td>
          </tr>
        </tbody>
        </table>
      </div>

      <div v-if="officer == undefined" class="w-full p-8 text-center text-red-500">សូមបញ្ជាកព័ត៌មានមន្ត្រីជាមុនសិន។</div>
      <pdf-preview :model="model" :record="selectedPdfRecord" :show="pdfToggle" :onClose="openPdfPreview" />
    </section>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import PdfPreview from './pdfpreview.vue'
import RowDocumentActionBar from './row-document-action-bar.vue'
import { useRowDocumentUpload } from './use-row-document-upload'

export default {
  emits: ['changed'],
  props: {
    officer: {
      type: Object,
      default: undefined
    }
  },
  components: {
    PdfPreview,
    RowDocumentActionBar
  },
  setup(props, { emit }) {
    const store = useStore()
    const rows = ref([])
    const savedSnapshot = ref('[]')
    const savedRowsByKey = ref({})
    const deletedIds = ref([])
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
      downloadDocument
    } = useRowDocumentUpload(store, 'officerpendingwork/upload')
    const ministryRecords = ref([])
    async function loadMinistries() {
      try {
        const res = await store.dispatch('organization/getministry')
        const records = Array.isArray(res?.data) ? res.data : (Array.isArray(res?.data?.records) ? res.data.records : [])
        ministryRecords.value = Array.isArray(records) ? records : []
      } catch (error) {
        ministryRecords.value = []
      }
    }
    const organizationOptions = computed(() => {
      const preferred = Array.isArray(ministryRecords.value) && ministryRecords.value.length > 0
        ? ministryRecords.value
        : store.getters['organization/getRecords']
      const records = Array.isArray(preferred) ? preferred : []
      return [...new Set(records.map((organization) => String(organization?.name || '').trim()).filter(Boolean))]
    })
    const wideSelectMenuProps = {
      style: {
        minWidth: '340px',
        maxWidth: '80vw'
      }
    }
    const model = reactive({
      name: 'officerpendingwork',
      module: 'officerpendingwork',
      title: 'ស្ថានភាពស្ថិតនៅក្រៅក្របខ័ណ្ឌដើម / ទំនេរពីមុខងារ'
    })
    const selectedPdfRecord = ref(null)
    const pdfToggle = ref(false)
    let seed = 0

    function nextKey() {
      seed += 1
      return `out-krobkhan-${seed}`
    }

    function toInputDate(value) {
      if (!value) return ''
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return String(value).slice(0, 10)
      return d.toISOString().slice(0, 10)
    }

    function hydrateRows() {
      const source = props.officer?.pending_works || []
      rows.value = source
        .filter((work) => parseInt(work?.type || 0) === 0)
        .map((work) => ({
          id: parseInt(work?.id || 0) || null,
          _key: nextKey(),
          start: toInputDate(work?.start),
          end: toInputDate(work?.end),
          organization: work?.organization || '',
          position: work?.position || '',
          total_months: Number(work?.total_months || 0),
          pdf: storedFileLabel(work?.pdf),
          _storedPdf: storedFileLabel(work?.pdf)
        }))
      markSaved()
    }

    function addRow() {
      rows.value.push({
        id: null,
        _key: nextKey(),
        start: '',
        end: '',
        organization: '',
        position: '',
        total_months: 0,
        pdf: '',
        _storedPdf: ''
      })
    }

    function removeRow(index) {
      const row = rows.value[index]
      if (parseInt(row?.id || 0) > 0) {
        deletedIds.value.push(parseInt(row.id))
      }
      if (row) clearDocumentFile(row)
      rows.value.splice(index, 1)
    }

    function hasValue(value) {
      return String(value ?? '').trim() !== ''
    }

    function findInvalidRowIndex() {
      return rows.value.findIndex((row) => (
        !hasValue(row.start)
        || !hasValue(row.end)
        || !hasValue(row.organization)
        || !hasValue(row.position)
      ))
    }

    function validateSectionBeforeSave() {
      if (rows.value.length <= 0) {
        return deletedIds.value.length > 0
      }

      if (findInvalidRowIndex() > -1) {
        return false
      }

      return true
    }

    function toPayload() {
      return rows.value.map(({ _key, _storedPdf, ...item }) => ({ ...item }))
    }

    function normalizeRow(row) {
      const { _key, _storedPdf, ...item } = row
      return item
    }

    function markSaved() {
      const payload = toPayload()
      savedSnapshot.value = JSON.stringify(payload)
      const mapped = {}
      rows.value.forEach((row) => {
        mapped[row._key] = JSON.stringify(normalizeRow(row))
      })
      savedRowsByKey.value = mapped
      deletedIds.value = []
      resetDocumentFiles()
      emit('changed', false)
    }

    function rowEdited(row) {
      const snapshotRow = savedRowsByKey.value[row._key]
      if (snapshotRow === undefined) return true
      return JSON.stringify(normalizeRow(row)) !== snapshotRow
    }

    function notifyDirty() {
      emit('changed', JSON.stringify(toPayload()) !== savedSnapshot.value)
    }

    function cancelChanges() {
      hydrateRows()
    }

    function openPdfPreview(record) {
      selectedPdfRecord.value = buildPreviewRecord(record)
      pdfToggle.value = !pdfToggle.value
    }

    async function downloadRowDocument(row) {
      try {
        await downloadDocument(row, `${model.name}/pdf`)
      } catch (error) {
        console.error('Out krobkhan download error:', error)
        window.alert('Unable to download attachment.')
      }
    }

    async function persistChanges() {
      const officerId = parseInt(props.officer?.id || 0)
      if (officerId <= 0) return false

      if (!validateSectionBeforeSave()) {
        return false
      }

      for (const id of deletedIds.value) {
        await store.dispatch('officerpendingwork/delete', { id })
      }

      for (const row of rows.value) {
        const payload = {
          officer_id: officerId,
          start: row.start || '',
          end: row.end || '',
          organization: row.organization || '',
          position: row.position || '',
          total_months: Number(row.total_months || 0),
          pdf: row.pdf || '',
          clear_pdf: shouldClearStoredPdf(row._key) ? 1 : 0,
          type: 0
        }
        if (parseInt(row.id || 0) > 0) {
          await store.dispatch('officerpendingwork/update', {
            id: parseInt(row.id),
            ...payload
          })
        } else {
          const res = await store.dispatch('officerpendingwork/create', payload)
          row.id = parseInt(res?.data?.record?.id || 0) || null
        }
        await uploadDocumentIfNeeded(row.id, row)
        row._storedPdf = row.pdf || ''
      }

      markSaved()
      return true
    }

    function organizationSelectOptions(currentValue) {
      const options = Array.isArray(organizationOptions.value) ? [...organizationOptions.value] : []
      if (currentValue && !options.includes(currentValue)) options.unshift(currentValue)
      return options.map((value) => ({
        label: value,
        value
      }))
    }

    watch(() => props.officer?.pending_works, hydrateRows, { immediate: true, deep: true })
    watch(rows, notifyDirty, { deep: true })
    onMounted(loadMinistries)

    return {
      rows,
      organizationOptions,
      wideSelectMenuProps,
      documentFileMap,
      model,
      selectedPdfRecord,
      pdfToggle,
      organizationSelectOptions,
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
      rowEdited
    }
  }
}
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
