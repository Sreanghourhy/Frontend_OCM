<template>
  <div class="mb-10">
    <div class="flex items-center justify-between gap-3 mb-4">
      <div class="font-moul text-[#1E3A8A] text-[15px] text-left">
        ច.៣.ការដំឡើងឋានន្តរស័ក្តិ និងថ្នាក់តាមសញ្ញាបត្រ (សូមបំពេញតាមលំដាប់ ពីថ្មីទៅចាស់)
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
        <table class="w-full border-collapse min-w-[1080px]">
        <thead>
          <tr>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ថ្ងៃខែឆ្នាំ<br/>សុពលភាព</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">គ្រឹះស្ថានបណ្ដុះបណ្ដាល</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ទីកន្លែងសិក្សា</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">សញ្ញាបត្របានទទួល</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ក្របខ័ណ្ឌ ឋានន្តរ<br/>ស័ក្ដិ<br/>និងថ្នាក់ចាស់</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ក្របខ័ណ្ឌ ឋានន្តរ<br/>ស័ក្ដិ<br/>និងថ្នាក់ថ្មី</th>
            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8] w-44 text-center">សកម្មភាព</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in rows" :key="row._key" :class="rowEdited(row) ? 'bg-[#FEE2E2]' : 'bg-white'">
            <td class="p-2 border-b border-[#E5E7EB]">
              <officer-date-input
                v-model="row.date"

              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <input
                v-model="row.organization"
                type="text"
                autocomplete="off"
                placeholder="គ្រឹះស្ថានបណ្ដុះបណ្ដាល"
                class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <input v-model="row.location" type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <input v-model="row.certificate" type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <n-select
                v-model:value="row.previous_rank_id"
                filterable
                clearable
                size="small"
                :consistent-menu-width="false"
                :menu-props="wideSelectMenuProps"
                :options="previousRankSelectOptions(row)"
                placeholder="ជ្រើសរើសថ្នាក់ចាស់"
                class="w-full uniform-select"
                @update:value="(value) => onPreviousRankChange(value, row)"
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB]">
              <n-select
                v-model:value="row.rank_id"
                filterable
                clearable
                size="small"
                :consistent-menu-width="false"
                :menu-props="wideSelectMenuProps"
                :options="rankSelectOptions(row)"
                placeholder="ជ្រើសរើសថ្នាក់ថ្មី"
                class="w-full uniform-select"
                @update:value="(value) => onRankChange(value, row)"
              />
            </td>
            <td class="p-2 border-b border-[#E5E7EB] text-center">
              <row-document-action-bar
                :input-id="`rankbycertificate-document-${row._key}`"
                :upload-pending="Boolean(certificateFileMap[row._key] || row._hasPendingPdf)"
                :preview-disabled="!rowHasPreview(row)"
                :download-disabled="!rowHasDownload(row)"
                :clear-disabled="!rowHasDownload(row)"
                @select="(file) => onCertificateFileChange(row, file)"
                @preview="openPdfPreview(row)"
                @download="downloadCertificate(row)"
                @clear="clearCertificateFile(row)"
                @remove="removeRow(index)"
              />
            </td>
          </tr>
          <tr v-if="rows.length <= 0">
            <td colspan="7" class="bg-white p-4 text-center text-gray-500 border-b border-[#E5E7EB]">មិនទាន់មានទិន្នន័យ</td>
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
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import PdfPreview from './pdfpreview.vue'
import RowDocumentActionBar from './row-document-action-bar.vue'
import { formatRankCodeLabel } from '@utils/rank'

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
    const certificateFileMap = ref({})
    const clearStoredPdfMap = ref({})
    const savedPdfOverridesById = ref({})
    const deletedIds = ref([])
    const rankRecords = computed(() => {
      const rankState = store.getters['rank/records']
      return Array.isArray(rankState?.all) ? rankState.all : []
    })
    const rankOptions = computed(() => mapRankOptions(rankRecords.value))
    const NO_PREVIOUS_RANK_VALUE = 0
    const NO_PREVIOUS_RANK_LABEL = 'គ្មានក្របខ័ណ្ឌ ឋានន្តរ'
    const wideSelectMenuProps = {
      style: {
        minWidth: '340px',
        maxWidth: '80vw'
      }
    }
    const model = reactive({
      name: 'officerrankbycertificate',
      module: 'officerrankbycertificates',
      title: 'ការដំឡើងឋានន្តរស័ក្តិ និងថ្នាក់តាមសញ្ញាបត្រ'
    })
    const selectedPdfRecord = ref(null)
    const pdfToggle = ref(false)
    let seed = 0

    function nextKey() {
      seed += 1
      return `rank-certificate-${seed}`
    }

    function toInputDate(value) {
      if (!value) return ''
      const d = new Date(value)
      if (Number.isNaN(d.getTime())) return String(value).slice(0, 10)
      return d.toISOString().slice(0, 10)
    }

    function normalizeId(value) {
      const parsed = parseInt(value || 0)
      return parsed > 0 ? parsed : null
    }

    function isNoPreviousRankSelection(value, label = '') {
      return parseInt(value, 10) === NO_PREVIOUS_RANK_VALUE
        || normalizeOptionLabel(label) === normalizeOptionLabel(NO_PREVIOUS_RANK_LABEL)
    }

    function normalizeLabel(value) {
      return String(value || '').trim()
    }

    function normalizeOptionLabel(value) {
      return normalizeLabel(value).replace(/\s+/g, ' ')
    }

    function storedFileLabel(value) {
      const raw = typeof value === 'string' ? value.trim() : ''
      if (!raw) return ''
      const normalized = raw.split('?')[0]
      const parts = normalized.split('/').filter(Boolean)
      const filename = parts[parts.length - 1] || raw
      const decodedFilename = (() => {
        try {
          return decodeURIComponent(filename)
        } catch (err) {
          return filename
        }
      })()
      const markerIndex = decodedFilename.indexOf('__')
      if (markerIndex > -1 && markerIndex + 2 < decodedFilename.length) {
        return decodedFilename.slice(markerIndex + 2)
      }
      return decodedFilename
    }

    function hasStoredPdfValue(value) {
      if (value === true || value === 1) return false
      if (value === false || value === 0 || value == null) return false

      if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase()
        if (!normalized || normalized === '0' || normalized === 'false' || normalized === 'null' || normalized === 'undefined') {
          return false
        }
        return true
      }

      return Boolean(value)
    }

    const KHMER_DIGIT_MAP = {
      '០': '0',
      '១': '1',
      '២': '2',
      '៣': '3',
      '៤': '4',
      '៥': '5',
      '៦': '6',
      '៧': '7',
      '៨': '8',
      '៩': '9'
    }

    function toLatinDigits(value) {
      return String(value || '').replace(/[០-៩]/g, (digit) => KHMER_DIGIT_MAP[digit] || digit)
    }

    function parseSortNumber(value) {
      const normalized = toLatinDigits(value).replace(/[^0-9]/g, '')
      if (!normalized) return Number.NaN
      return parseInt(normalized, 10)
    }

    function compareRankPart(left, right) {
      const leftLabel = normalizeLabel(left)
      const rightLabel = normalizeLabel(right)

      const leftNumber = parseSortNumber(leftLabel)
      const rightNumber = parseSortNumber(rightLabel)
      const leftHasNumber = Number.isFinite(leftNumber)
      const rightHasNumber = Number.isFinite(rightNumber)

      if (leftHasNumber && rightHasNumber && leftNumber !== rightNumber) {
        return leftNumber - rightNumber
      }

      if (leftHasNumber !== rightHasNumber) {
        return leftHasNumber ? -1 : 1
      }

      return leftLabel.localeCompare(rightLabel, 'km')
    }

    function compareRankRecord(left, right) {
      const byKrobkhan = compareRankPart(left?.krobkhan, right?.krobkhan)
      if (byKrobkhan !== 0) return byKrobkhan

      const byRank = compareRankPart(left?.rank, right?.rank)
      if (byRank !== 0) return byRank

      const byThnak = compareRankPart(left?.thnak, right?.thnak)
      if (byThnak !== 0) return byThnak

      return compareRankPart(left?.name, right?.name)
    }

    function formatRankLabel(rank) {
      return formatRankCodeLabel(rank)
    }

    function mapRankOptions(records) {
      if (!Array.isArray(records)) return []
      const sortedRecords = [...records].sort(compareRankRecord)
      const seen = new Set()
      const seenLabels = new Set()
      const options = []
      sortedRecords.forEach((item) => {
        const id = normalizeId(item?.id)
        const display = formatRankLabel(item)
        const label = normalizeOptionLabel(display || `#${id}`)
        if (!id || seen.has(id)) return
        if (label && seenLabels.has(label)) return
        seen.add(id)
        if (label) seenLabels.add(label)
        options.push({
          label,
          value: id
        })
      })
      return options
    }

    function findOptionByLabel(options, label) {
      const target = normalizeOptionLabel(label)
      if (!target) return null
      return options.find((option) => normalizeOptionLabel(option?.label) === target) || null
    }

    function syncRowRankIdsToOptions() {
      const options = Array.isArray(rankOptions.value) ? rankOptions.value : []
      if (rows.value.length <= 0 || options.length <= 0) return false

      let changed = false
      rows.value.forEach((row) => {
        const hasCurrentRank = options.some((option) => option.value === normalizeId(row?.rank_id))
        if (!hasCurrentRank) {
          const matchedRank = findOptionByLabel(options, row?.rank)
          if (matchedRank && matchedRank.value !== row.rank_id) {
            row.rank_id = matchedRank.value
            row.rank = matchedRank.label
            changed = true
          }
        }

        const hasCurrentPreviousRank = options.some((option) => option.value === normalizeId(row?.previous_rank_id))
        if (!hasCurrentPreviousRank) {
          const matchedPreviousRank = findOptionByLabel(options, row?.previous_rank)
          if (matchedPreviousRank && matchedPreviousRank.value !== row.previous_rank_id) {
            row.previous_rank_id = matchedPreviousRank.value
            row.previous_rank = matchedPreviousRank.label
            changed = true
          }
        }
      })

      return changed
    }

    function hydrateRows() {
      const source = props.officer?.ranking_by_certificates || []
      rows.value = source.map((rank) => ({
        id: parseInt(rank?.id || 0) || null,
        _key: nextKey(),
        date: toInputDate(rank?.date),
        organization: rank?.organization || '',
        location: rank?.location || '',
        certificate: rank?.certificate || '',
        pdf: resolveStoredPdfLabel(rank),
        _storedCertificate: rank?.certificate || '',
        _storedPdf: resolveStoredPdfLabel(rank),
        _localPdfFile: null,
        _hasPendingPdf: false,
        previous_rank_id: parseInt(rank?.previous_rank_id || rank?.previous_rank?.id || 0) || null,
        previous_rank: formatRankLabel(rank?.previous_rank) || rank?.previous_rank?.thnak || rank?.previous_rank?.name || '',
        rank_id: parseInt(rank?.rank_id || rank?.rank?.id || 0) || null,
        rank: formatRankLabel(rank?.rank) || rank?.rank?.thnak || rank?.rank?.name || ''
      }))
      syncRowRankIdsToOptions()
      markSaved()
    }

    function resolveStoredPdfLabel(rank) {
      const recordId = parseInt(rank?.id || 0) || null
      if (recordId && Object.prototype.hasOwnProperty.call(savedPdfOverridesById.value, recordId)) {
        return savedPdfOverridesById.value[recordId]
      }

      return storedFileLabel(rank?.pdf)
    }

    function addRow() {
      rows.value.push({
        id: null,
        _key: nextKey(),
        date: '',
        organization: '',
        location: '',
        certificate: '',
        pdf: '',
        _storedCertificate: '',
        _storedPdf: '',
        _localPdfFile: null,
        _hasPendingPdf: false,
        previous_rank_id: null,
        previous_rank: '',
        rank_id: null,
        rank: ''
      })
    }

    function removeRow(index) {
      const row = rows.value[index]
      if (parseInt(row?.id || 0) > 0) {
        deletedIds.value.push(parseInt(row.id))
      }
      if (row) clearCertificateFile(row)
      rows.value.splice(index, 1)
    }

    function hasValue(value) {
      return String(value ?? '').trim() !== ''
    }

    function findInvalidRowIndex() {
      return rows.value.findIndex((row) => (
        !hasValue(row.date)
        || !hasValue(row.organization)
        || !hasValue(row.location)
        || !hasValue(row.certificate)
        || (!normalizeId(row.previous_rank_id) && !isNoPreviousRankSelection(row.previous_rank_id, row.previous_rank))
        || !normalizeId(row.rank_id)
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
      return rows.value.map(({ _key, _storedCertificate, _storedPdf, _localPdfFile, _hasPendingPdf, ...item }) => ({ ...item }))
    }

    function normalizeRow(row) {
      const { _key, _storedCertificate, _storedPdf, _localPdfFile, _hasPendingPdf, ...item } = row
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
      certificateFileMap.value = {}
      deletedIds.value = []
      clearStoredPdfMap.value = {}
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

    function resolveRankId(name, fallbackId = null) {
      const numeric = parseInt(name || 0)
      if (numeric > 0) return numeric
      const target = String(name || '').trim()
      if (!target) return parseInt(fallbackId || 0) || 0
      const matched = rankRecords.value.find((rank) => {
        const formatted = formatRankLabel(rank)
        const thnak = String(rank?.thnak || '').trim()
        const label = String(rank?.name || '').trim()
        return formatted === target || thnak === target || label === target
      })
      if (matched) return parseInt(matched.id || 0) || 0
      return parseInt(fallbackId || 0) || 0
    }

    async function uploadCertificateIfNeeded(recordId, row) {
      const file = certificateFileMap.value[row._key] || row?._localPdfFile
      if (!file || parseInt(recordId || 0) <= 0) return false
      const formData = new FormData()
      formData.append('id', String(recordId))
      formData.append('file', file)
      await store.dispatch('officerrankbycertificate/upload', formData)
      delete certificateFileMap.value[row._key]
      row._localPdfFile = null
      row._hasPendingPdf = false
      delete clearStoredPdfMap.value[row._key]
      return true
    }

    async function persistChanges() {
      const officerId = parseInt(props.officer?.id || 0)
      if (officerId <= 0) return false

      if (!validateSectionBeforeSave()) {
        return false
      }

      for (const id of deletedIds.value) {
        await store.dispatch('officerrankbycertificate/delete', { id })
        delete savedPdfOverridesById.value[id]
      }

      for (const row of rows.value) {
        const payload = {
          officer_id: officerId,
          organization: row.organization || '',
          location: row.location || '',
          date: row.date || '',
          rank_id: normalizeId(row.rank_id) || resolveRankId(row.rank, row.rank_id),
          previous_rank_id: normalizeId(row.previous_rank_id) || resolveRankId(row.previous_rank, row.previous_rank_id),
          certificate: row.certificate || '',
          pdf: row.pdf || '',
          clear_pdf: shouldClearStoredPdf(row._key) ? 1 : 0
        }
        if (parseInt(row.id || 0) > 0) {
          await store.dispatch('officerrankbycertificate/update', {
            id: parseInt(row.id),
            ...payload
          })
        } else {
          const res = await store.dispatch('officerrankbycertificate/create', payload)
          row.id = parseInt(res?.data?.record?.id || 0) || null
        }
        row.rank_id = payload.rank_id
        row.previous_rank_id = payload.previous_rank_id
        const uploaded = await uploadCertificateIfNeeded(row.id, row)
        if (uploaded) {
          row._storedPdf = row.pdf || ''
          row._storedCertificate = row.certificate || ''
          row._localPdfFile = null
          row._hasPendingPdf = false
          if (parseInt(row.id || 0) > 0) {
            savedPdfOverridesById.value[parseInt(row.id)] = row._storedPdf
          }
        } else if (payload.clear_pdf === 1) {
          row.pdf = ''
          row._storedPdf = ''
          row._storedCertificate = row.certificate || ''
          row._localPdfFile = null
          row._hasPendingPdf = false
          delete clearStoredPdfMap.value[row._key]
          if (parseInt(row.id || 0) > 0) {
            savedPdfOverridesById.value[parseInt(row.id)] = ''
          }
        } else {
          row._storedCertificate = row.certificate || ''
          row.pdf = row._storedPdf || ''
          if (parseInt(row.id || 0) > 0) {
            savedPdfOverridesById.value[parseInt(row.id)] = row._storedPdf || ''
          }
        }
      }

      markSaved()
      return true
    }

    function previousRankSelectOptions(row) {
      const options = Array.isArray(rankOptions.value) ? [...rankOptions.value] : []
      options.unshift({
        label: NO_PREVIOUS_RANK_LABEL,
        value: NO_PREVIOUS_RANK_VALUE
      })
      const currentId = normalizeId(row?.previous_rank_id)
      const currentLabel = normalizeOptionLabel(row?.previous_rank)
      const hasSameLabel = currentLabel && options.some((option) => normalizeOptionLabel(option.label) === currentLabel)
      if (currentId && !options.some((option) => option.value === currentId) && !hasSameLabel) {
        options.unshift({
          label: currentLabel || `#${currentId}`,
          value: currentId
        })
      }
      return options
    }

    function rankSelectOptions(row) {
      const options = Array.isArray(rankOptions.value) ? [...rankOptions.value] : []
      const currentId = normalizeId(row?.rank_id)
      const currentLabel = normalizeOptionLabel(row?.rank)
      const hasSameLabel = currentLabel && options.some((option) => normalizeOptionLabel(option.label) === currentLabel)
      if (currentId && !options.some((option) => option.value === currentId) && !hasSameLabel) {
        options.unshift({
          label: currentLabel || `#${currentId}`,
          value: currentId
        })
      }
      return options
    }

    function onPreviousRankChange(value, row) {
      if (parseInt(value, 10) === NO_PREVIOUS_RANK_VALUE) {
        row.previous_rank_id = NO_PREVIOUS_RANK_VALUE
        row.previous_rank = NO_PREVIOUS_RANK_LABEL
        return
      }
      const rankId = normalizeId(value)
      row.previous_rank_id = rankId
      if (!rankId) {
        row.previous_rank = ''
        return
      }
      const matched = rankOptions.value.find((option) => option.value === rankId)
      row.previous_rank = matched?.label || row.previous_rank || ''
    }

    function onRankChange(value, row) {
      const rankId = normalizeId(value)
      row.rank_id = rankId
      if (!rankId) {
        row.rank = ''
        return
      }
      const matched = rankOptions.value.find((option) => option.value === rankId)
      row.rank = matched?.label || row.rank || ''
    }

    function onCertificateFileChange(row, file) {
      if (!file || !row) return
      const normalizedType = String(file.type || '').trim().toLowerCase()
      const normalizedName = String(file.name || '').trim().toLowerCase()
      const isPdf = normalizedType === 'application/pdf' || normalizedName.endsWith('.pdf')
      if (!isPdf) {
        window.alert('សូមជ្រើសរើសឯកសារ PDF តែប៉ុណ្ណោះ។')
        return
      }
      certificateFileMap.value[row._key] = file
      row._localPdfFile = file
      row._hasPendingPdf = true
      delete clearStoredPdfMap.value[row._key]
      row.pdf = file.name
    }

    function clearCertificateFile(row) {
      if (!row) return
      const hasPendingLocalFile = Boolean(certificateFileMap.value[row._key] || row._localPdfFile)
      delete certificateFileMap.value[row._key]
      row._localPdfFile = null
      row._hasPendingPdf = false
      if (hasPendingLocalFile) {
        row.pdf = row._storedPdf || ''
        return
      }
      if (hasStoredPdfValue(row._storedPdf)) {
        clearStoredPdfMap.value[row._key] = true
      }
      row.pdf = ''
      row._storedPdf = ''
    }

    function shouldClearStoredPdf(rowKey) {
      return Boolean(clearStoredPdfMap.value[rowKey])
    }

    function rowHasPreview(row) {
      if (!row) return false
      if (row._hasPendingPdf === true) return true
      if (typeof File !== 'undefined' && (certificateFileMap.value[row._key] instanceof File || row._localPdfFile instanceof File)) return true
      return parseInt(row.id || 0) > 0 && hasStoredPdfValue(row._storedPdf)
    }

    function rowHasDownload(row) {
      if (!row) return false
      if (row._hasPendingPdf === true) return false
      if (typeof File !== 'undefined' && (certificateFileMap.value[row._key] instanceof File || row._localPdfFile instanceof File)) {
        return false
      }
      return parseInt(row.id || 0) > 0 && hasStoredPdfValue(row._storedPdf)
    }

    function triggerBrowserDownload(url, filename) {
      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = filename
      anchor.style.display = 'none'
      document.body.appendChild(anchor)
      anchor.click()
      document.body.removeChild(anchor)
    }

    function openPdfPreview(record) {
      const localFile = certificateFileMap.value[record?._key] || record?._localPdfFile
      const hasLocalFile = typeof File !== 'undefined' && localFile instanceof File
      const hasStoredPdf = parseInt(record?.id || 0) > 0 && hasStoredPdfValue(record?._storedPdf)
      selectedPdfRecord.value = record == null
        ? null
        : {
            ...record,
            pdf: record._storedPdf || '',
            __localPdfFile: hasLocalFile ? localFile : null,
            __storedPdfLabel: hasStoredPdf ? (record._storedPdf || '') : '',
            __compareStoredPdf: Boolean(hasLocalFile && hasStoredPdf)
          }
      pdfToggle.value = !pdfToggle.value
    }

    async function downloadCertificate(row) {
      try {
        const localFile = certificateFileMap.value[row?._key] || row?._localPdfFile
        if (localFile instanceof File) {
          const objectUrl = window.URL.createObjectURL(localFile)
          triggerBrowserDownload(objectUrl, localFile.name || 'certificate.pdf')
          window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000)
          return
        }

        if (!rowHasPreview(row)) {
          return
        }

        const res = await store.dispatch(`${model.name}/pdf`, { id: parseInt(row.id || 0) })
        const fileUrl = res?.data?.pdf
        if (!fileUrl) {
          throw new Error('Certificate file URL is missing')
        }

        triggerBrowserDownload(
          fileUrl,
          res?.data?.filename || row.certificate || `certificate-${row.id}.pdf`
        )
      } catch (error) {
        console.error('Rank by certificate download error:', error)
        window.alert('Unable to download attachment.')
      }
    }

    watch(() => props.officer?.ranking_by_certificates, hydrateRows, { immediate: true, deep: true })
    watch(rankOptions, () => {
      if (syncRowRankIdsToOptions()) {
        markSaved()
      }
    }, { deep: true })
    watch(rows, notifyDirty, { deep: true })

    return {
      rows,
      model,
      selectedPdfRecord,
      pdfToggle,
      rankOptions,
      wideSelectMenuProps,
      certificateFileMap,
      rankSelectOptions,
      previousRankSelectOptions,
      onPreviousRankChange,
      onRankChange,
      onCertificateFileChange,
      clearCertificateFile,
      shouldClearStoredPdf,
      rowHasDownload,
      rowHasPreview,
      openPdfPreview,
      downloadCertificate,
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
