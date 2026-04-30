<template>
  <div class="mb-10">
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="font-moul text-[#1E3A8A] text-[15px] text-left">
        ច.១.២. ប្រវត្តិក្នុងវិស័យឯកជន
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
        <table class="w-full border-collapse min-w-[900px]">
        <thead>
          <tr>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ថ្ងៃខែឆ្នាំចូលបម្រើការងារ</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ថ្ងៃខែឆ្នាំបញ្ចប់ការងារ</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">គ្រឹះស្ថាន-អង្គភាព</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">តួនាទី</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ជំនាញ/បច្ចេកទេស</th>
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
              <input
                v-model="row.organization"
                type="text"
                autocomplete="off"
                placeholder="បញ្ចូលគ្រឹះស្ថាន-អង្គភាព"
                class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <input
                v-model="row.position"
                type="text"
                autocomplete="off"
                placeholder="បញ្ចូលតួនាទី"
                class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <input v-model="row.skill_of_position" type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
            </td>
            <td class="p-2 border-b border-[#E5E7EB] text-center">
              <row-document-action-bar
                :input-id="`privatework-document-${row._key}`"
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
            <td colspan="6" class="bg-white p-4 text-center text-gray-500 border-b border-[#E5E7EB]">មិនទាន់មានទិន្នន័យ</td>
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
import { reactive, ref, watch } from 'vue'
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
    } = useRowDocumentUpload(store, 'officerjobbackground/upload')
    const model = reactive({
      name: 'officerjobbackground',
      module: 'officerjobbackgrounds',
      title: 'ប្រវត្តិក្នុងវិស័យឯកជន'
    })
    const selectedPdfRecord = ref(null)
    const pdfToggle = ref(false)
    let seed = 0

    function nextKey() {
      seed += 1
      return `private-${seed}`
    }

    function toInputDate(value) {
      if (!value) return ''
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return String(value).slice(0, 10)
      return d.toISOString().slice(0, 10)
    }

    function hydrateRows() {
      const source = props.officer?.job_backgrounds || []
      rows.value = source
        .filter((job) => parseInt(job?.sector || 0) === 1)
        .map((job) => ({
          id: parseInt(job?.id || 0) || null,
          _key: nextKey(),
          start: toInputDate(job?.start),
          end: toInputDate(job?.end),
          organization: job?.organization || '',
          position: job?.position || '',
          skill_of_position: job?.skill_of_position || '',
          pdf: storedFileLabel(job?.pdf),
          _storedPdf: storedFileLabel(job?.pdf)
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
        skill_of_position: '',
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
        || !hasValue(row.skill_of_position)
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
        console.error('Private work download error:', error)
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
        await store.dispatch('officerjobbackground/delete', { id })
      }

      for (const row of rows.value) {
        const payload = {
          officer_id: officerId,
          organization: row.organization || '',
          sub_organization: '',
          position: row.position || '',
          start: row.start || '',
          end: row.end || '',
          skill_of_position: row.skill_of_position || '',
          pdf: row.pdf || '',
          clear_pdf: shouldClearStoredPdf(row._key) ? 1 : 0,
          sector: 1
        }
        if (parseInt(row.id || 0) > 0) {
          await store.dispatch('officerjobbackground/update', {
            id: parseInt(row.id),
            ...payload
          })
        } else {
          const res = await store.dispatch('officerjobbackground/create', payload)
          row.id = parseInt(res?.data?.record?.id || 0) || null
        }
        await uploadDocumentIfNeeded(row.id, row)
        row._storedPdf = row.pdf || ''
      }

      markSaved()
      return true
    }

    watch(() => props.officer?.job_backgrounds, hydrateRows, { immediate: true, deep: true })
    watch(rows, notifyDirty, { deep: true })

    return {
      rows,
      documentFileMap,
      model,
      selectedPdfRecord,
      pdfToggle,
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
</style>
