<template>
        <section class="mb-1 bg-white">
            <div class="flex items-start justify-between gap-3 pb-1 bg-[#FCFDFE] align-center">
                <h3 class="w-full text-left text-[15px] text-[#1E3A8A] font-moul">
                    ឆ.១-ការលើកសរសើរ (គ្រឿងឥស្សរិយយស មេដាយ បណ្ណសរសើរ)
                </h3>
                <button
                    type="button"
                    class="inline-flex shrink-0 items-center gap-1 bg-[#1E3A8A] text-white rounded-md px-3 py-1.5 text-[13px] hover:bg-[#162E6B] duration-200"
                    @click="addRow"
                >
                    <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3z" clip-rule="evenodd" />
                    </svg>
                    <span>បន្ថែម</span>
                </button>
            </div>
            <div class="overflow-x-auto bg-white">
                <table class="w-full border min-w-[980px]">
                    <thead>
                        <tr>
                            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">លេខលិខិត</th>
                            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">កាលបរិច្ឆេទ</th>
                            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ក្រសួង/ស្ថាប័ន/រាជធានី/ខេត្ត<br/>(ស្នើសុំ)</th>
                            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">បរិយាយ</th>
                            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8]">ប្រភេទ</th>
                            <th class="bg-[#E5EAF2] text-[#2C3E50] font-semibold text-[13px] p-2 border-b border-[#D8DEE8] w-44 text-center">សកម្មភាព</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-if="rows.length > 0" v-for="(row, idx) in rows" :key="row._key" :class="rowEdited(row) ? 'bg-[#FEE2E2]' : 'bg-white'">
                            <td class="p-2 border-b border-[#E5E7EB]">
                                <input v-model="row.fid" :class="inputClass(row, 'fid')" />
                            </td>
                            <td class="p-2 border-b border-[#E5E7EB]">
                                <officer-date-input
                                    v-model="row.date"
                           
                                />
                            </td>
                            <td class="p-2 border-b border-[#E5E7EB]">
                                <input v-model="row.organization" :class="inputClass(row, 'organization')" />
                            </td>
                            <td class="p-2 border-b border-[#E5E7EB]">
                                <input v-model="row.desp" :class="inputClass(row, 'desp')" />
                            </td>
                            <td class="p-2 border-b border-[#E5E7EB]">
                                <input v-model="row.type" :class="inputClass(row, 'type')" />
                            </td>
                            <td class="p-2 border-b border-[#E5E7EB] text-center">
                                <row-document-action-bar
                                    :input-id="`medal-document-${row._key}`"
                                    :upload-pending="Boolean(documentFileMap[row._key])"
                                    :preview-disabled="!rowHasPreview(row)"
                                    :download-disabled="!rowHasDownload(row)"
                                    @select="(file) => onDocumentFileChange(row, file)"
                                    @preview="togglePdfModal(row)"
                                    @download="downloadRowDocument(row)"
                                    @clear="clearDocumentFile(row)"
                                    @remove="removeRow(idx)"
                                />
                            </td>
                        </tr>
                        <tr v-else>
                            <td colspan="6" class="bg-white p-4 text-center text-gray-500 border border-[#E5E7EB]">មិនទាន់មានទិន្នន័យ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <pdf-preview
                :model="pdfModel"
                :record="selectedRecord"
                v-bind:show="pdfToggle"
                :onClose="togglePdfModal"
            />
        </section>
</template>
<script>
import { reactive, ref, watch } from 'vue'
import { useMessage } from 'naive-ui'
import { useStore } from 'vuex'
import PdfPreview from './pdfpreview.vue'
import RowDocumentActionBar from './row-document-action-bar.vue'
import { useRowDocumentUpload } from './use-row-document-upload'

export default {
    name: 'MedalHistoryComponent',
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
        const message = useMessage()
        const rows = ref([])
        const validationAttempted = ref(false)
        const savedSnapshot = ref('[]')
        const savedRowsByKey = ref({})
        const deletedIds = ref([])
        const {
            documentFileMap,
            onDocumentFileChange,
            clearDocumentFile,
            buildPreviewRecord,
            resetDocumentFiles,
            rowHasPreview,
            rowHasDownload,
            shouldClearStoredPdf,
            resolveStoredDisplayName,
            uploadDocumentIfNeeded,
            downloadDocument
        } = useRowDocumentUpload(store, 'officermedalhistory/upload')
        let seed = 0

        const requiredFields = ['fid', 'date', 'organization', 'desp', 'type']

        const pdfModel = reactive({
            name: 'officermedalhistory',
            module: 'officermedalhistories',
            title: 'ប្រវត្តិគ្រឿងឥស្សរិយយស'
        })
        const selectedRecord = ref(null)
        const pdfToggle = ref(false)

        const nextKey = () => {
            seed += 1
            return `medal-${seed}`
        }

        const normalizeRow = (row) => {
            const { _key, _storedPdf, ...item } = row
            return item
        }

        const toPayload = () => rows.value.map(normalizeRow)

        const trimValue = (value) => String(value || '').trim()

        const findFirstIncompleteRowIndex = () => rows.value.findIndex((row) => requiredFields.some((field) => trimValue(row[field]) === ''))

        const rowFieldInvalid = (row, field) => validationAttempted.value === true && trimValue(row[field]) === ''

        const inputClass = (row, field) => ([
            'w-full border text-center rounded px-2 py-1.5 text-[13px] bg-white',
            rowFieldInvalid(row, field) ? 'border-red-500 bg-red-50' : 'border-[#D8DEE8]'
        ])

        const toInputDate = (value) => {
            if (!value) return ''
            const d = new Date(value)
            if (Number.isNaN(d.getTime())) return String(value).slice(0, 10)
            return d.toISOString().slice(0, 10)
        }

        const hydrateRows = () => {
            const source = props.officer?.medal_histories || []
            rows.value = source.map((row) => ({
                id: parseInt(row?.id || 0) || null,
                _key: nextKey(),
                fid: row?.fid || '',
                date: toInputDate(row?.date),
                organization: row?.organization || '',
                desp: row?.desp || '',
                type: row?.type || '',
                pdf: resolveStoredDisplayName(parseInt(row?.id || 0), row?.pdf),
                _storedPdf: resolveStoredDisplayName(parseInt(row?.id || 0), row?.pdf)
            }))
            markSaved()
        }

        const markSaved = () => {
            const payload = toPayload()
            savedSnapshot.value = JSON.stringify(payload)
            const mapped = {}
            rows.value.forEach((row) => {
                mapped[row._key] = JSON.stringify(normalizeRow(row))
            })
            savedRowsByKey.value = mapped
            deletedIds.value = []
            validationAttempted.value = false
            resetDocumentFiles()
            emit('changed', false)
        }

        const rowEdited = (row) => {
            const snapshotRow = savedRowsByKey.value[row._key]
            if (snapshotRow === undefined) return true
            return JSON.stringify(normalizeRow(row)) !== snapshotRow
        }

        const notifyDirty = () => {
            emit('changed', JSON.stringify(toPayload()) !== savedSnapshot.value)
        }

        const addRow = () => {
            rows.value.push({
                id: null,
                _key: nextKey(),
                fid: '',
                date: '',
                organization: '',
                desp: '',
                type: '',
                pdf: '',
                _storedPdf: ''
            })
        }

        const removeRow = (idx) => {
            const row = rows.value[idx]
            if (parseInt(row?.id || 0) > 0) {
                deletedIds.value.push(parseInt(row.id))
            }
            if (row) clearDocumentFile(row)
            rows.value.splice(idx, 1)
        }

        const cancelChanges = () => {
            hydrateRows()
        }

        const togglePdfModal = (row) => {
            selectedRecord.value = buildPreviewRecord(row)
            pdfToggle.value = !pdfToggle.value
        }

        const downloadRowDocument = async (row) => {
            try {
                await downloadDocument(row, `${pdfModel.name}/pdf`)
            } catch (error) {
                console.error('Medal history download error:', error)
                window.alert('Unable to download attachment.')
            }
        }

        const persistChanges = async () => {
            const officerId = parseInt(props.officer?.id || 0)
            if (officerId <= 0) return false

            validationAttempted.value = true
            const incompleteRowIndex = findFirstIncompleteRowIndex()
            if (incompleteRowIndex >= 0) {
                message.error(`សូមបំពេញទិន្នន័យឱ្យគ្រប់ជាមុនសិន នៅជួរទី ${incompleteRowIndex + 1} មុនពេលរក្សាទុក។`, {
                    duration: 3500,
                    closable: true
                })
                return false
            }

            for (const id of deletedIds.value) {
                await store.dispatch('officermedalhistory/delete', { id })
            }

            for (const row of rows.value) {
                const payload = {
                    officer_id: officerId,
                    fid: row.fid || '',
                    date: row.date || '',
                    organization: row.organization || '',
                    desp: row.desp || '',
                    type: row.type || '',
                    pdf: row.pdf || '',
                    clear_pdf: shouldClearStoredPdf(row._key) ? 1 : 0
                }

                if (parseInt(row.id || 0) > 0) {
                    await store.dispatch('officermedalhistory/update', {
                        id: parseInt(row.id),
                        ...payload
                    })
                } else {
                    const res = await store.dispatch('officermedalhistory/create', payload)
                    row.id = parseInt(res?.data?.record?.id || 0) || null
                }

                await uploadDocumentIfNeeded(row.id, row)
                row._storedPdf = row.pdf || ''
            }

            markSaved()
            return true
        }

        watch(() => props.officer?.medal_histories, hydrateRows, { immediate: true, deep: true })
        watch(rows, notifyDirty, { deep: true })

        return {
            rows,
            cancelChanges,
            persistChanges,
            markSaved,
            rowEdited,
            inputClass,
            addRow,
            removeRow,
            documentFileMap,
            onDocumentFileChange,
            clearDocumentFile,
            rowHasPreview,
            rowHasDownload,
            pdfModel,
            pdfToggle,
            selectedRecord,
            togglePdfModal,
            downloadRowDocument
        }
    }
}
</script>
