<template>
  <section class="p-4">
    <div class="flex w-full flex-wrap items-center justify-between gap-3 pb-2">
      <h3 class="w-full sm:w-auto text-left text-[15px] text-[#1E3A8A]">ខ.២. ព័ត៌មានកូន</h3>
      <div class="flex gap-4 w-full ">
        <div class="text-left w-[1000px] leading-8 text-[13px] text-[#2C3E50] font-medium">មានកូនចំនួន ៖ {{ $toKhmer( rows?.length ) }} នាក់ ចំនួនស្រី ​{{ $toKhmer( rows.filter(r => { return r.gender == 'female' })?.length )}} នាក់</div>
        <button
          type="button"
          class="inline-flex items-center gap-1 bg-[#1E3A8A] text-white rounded-md px-3 py-1.5 text-[13px] hover:bg-[#162E6B] duration-200"
          @click="addRow"
        >
          <svg class="w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v5.5h5.5a.75.75 0 0 1 0 1.5h-5.5v5.5a.75.75 0 0 1-1.5 0v-5.5h-5.5a.75.75 0 0 1 0-1.5h5.5v-5.5A.75.75 0 0 1 10 3z" clip-rule="evenodd" />
          </svg>
          <span>បន្ថែម</span>
        </button>
      </div>
    </div>

    <div v-if="officer != undefined" class="w-full">
      <div v-if="loading" class="w-full p-8 text-center">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#1E3A8A]"></div>
        <p class="mt-2 text-gray-500">កំពុងផ្ទុកទិន្នន័យ...</p>
      </div>

      <div v-else class="flex flex-col gap-4">
        <div
          v-for="(row, index) in rows"
          :key="row._key"
          :ref="(el) => setRowRef(row._key, el)"
          class="pb-4 border-b border-[#E5EAF2] last:border-b-0 last:pb-0 w-[1090px]"
        >
          <div class="relative w-full pr-11 sm:pr-12">
            <div class="flex flex-col w-full min-w-0">
              <!-- ជួរទី១ — គោត្តនាម/នាមខ្លួន, ភេទ, ថ្ងៃខែឆ្នាំកំណើត -->
              <div class="grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-[180px_1fr] items-start">
                <label class="text-[13px] text-left font-medium text-[#2C3E50]">គោត្តនាម និងនាមខ្លួន</label>
                <div class="flex min-w-0 flex-wrap items-start gap-x-2 gap-y-2">
                  <div
                    class="grid w-full max-w-[280px] shrink-0 grid-cols-2 gap-2 rounded-sm p-0.5"
                    :class="[childChangedCellClass(row, ['lastname', 'firstname']), rowFieldGroupClass(row, ['lastname', 'firstname'])]"
                  >
                    <div class="flex min-w-0 flex-col">
                      <input
                        :ref="(el) => setFieldRef(row._key, 'lastname', el)"
                        v-model="row.lastname"
                        type="text"
                        :class="['field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white', childValidationInputClass(row, 'lastname')]"
                        placeholder="គោត្តនាម"
                      />
                      <p
                        v-if="getChildFieldError(row, 'lastname')"
                        class="pt-1 text-left text-[11px] leading-snug text-red-600 max-w-[14rem]"
                      >
                        {{ getChildFieldError(row, 'lastname') }}
                      </p>
                    </div>
                    <div class="flex min-w-0 flex-col">
                      <input
                        :ref="(el) => setFieldRef(row._key, 'firstname', el)"
                        v-model="row.firstname"
                        type="text"
                        :class="['field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white', childValidationInputClass(row, 'firstname')]"
                        placeholder="នាមខ្លួន"
                      />
                      <p
                        v-if="getChildFieldError(row, 'firstname')"
                        class="pt-1 text-left text-[11px] leading-snug text-red-600 max-w-[14rem]"
                      >
                        {{ getChildFieldError(row, 'firstname') }}
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2 shrink-0">
                    <span class="text-[13px] font-medium text-[#2C3E50] whitespace-nowrap">ភេទ ៖</span>
                    <div
                      class="rounded-sm p-0.5"
                      :class="childChangedCellClass(row, 'gender')"
                    >
                      <n-select
                        v-model:value="row.gender"
                        size="small"
                        :clearable="false"
                        :options="[
                          { label: 'ប្រុស', value: 'male' },
                          { label: 'ស្រី', value: 'female' }
                        ]"
                        placeholder="ជ្រើសរើស"
                        class="w-[132px] child-gender-select"
                      />
                    </div>
                  </div>
                  <div class="flex shrink-0 items-start gap-2">
                    <span class="whitespace-nowrap pt-1 text-[13px] font-medium text-[#2C3E50]">ថ្ងៃខែឆ្នាំកំណើត ៖</span>
                    <div class="flex min-w-0 flex-col">
                      <div
                        class="rounded-sm p-0.5"
                        :class="[childChangedCellClass(row, 'dob'), rowFieldGroupClass(row, 'dob')]"
                      >
                        <officer-date-input
                          :ref="(el) => setFieldRef(row._key, 'dob', el)"
                          v-model="row.dob"
                          wrapper-class="relative inline-block w-[158px] align-middle"
                          :input-class="[childValidationInputClass(row, 'dob')]"
                        />
                      </div>
                      <p
                        v-if="getChildFieldError(row, 'dob')"
                        class="pt-1 text-left text-[11px] leading-snug text-red-600 max-w-[14rem]"
                      >
                        {{ getChildFieldError(row, 'dob') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <!--
              <div class="mt-2 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-[180px_1fr] items-start">
                <label class="text-[13px] text-left font-medium text-[#2C3E50]">ឈ្មោះជាអក្សរឡាតាំង</label>
                <div class="flex min-w-0 flex-wrap items-start gap-x-2 gap-y-2">
                  <div
                    class="grid w-full max-w-[280px] shrink-0 grid-cols-2 gap-2 rounded-sm p-0.5"
                    :class="[childChangedCellClass(row, ['enlastname', 'enfirstname']), rowFieldGroupClass(row, ['enlastname', 'enfirstname'])]"
                  >
                    <div class="flex min-w-0 flex-col">
                      <input
                        :ref="(el) => setFieldRef(row._key, 'enlastname', el)"
                        v-model="row.enlastname"
                        type="text"
                        :class="['field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white', childValidationInputClass(row, 'enlastname')]"
                        placeholder="Last Name"
                      />
                      <p
                        v-if="getChildFieldError(row, 'enlastname')"
                        class="pt-1 text-left text-[11px] leading-snug text-red-600 max-w-[14rem]"
                      >
                        {{ getChildFieldError(row, 'enlastname') }}
                      </p>
                    </div>
                    <div class="flex min-w-0 flex-col">
                      <input
                        :ref="(el) => setFieldRef(row._key, 'enfirstname', el)"
                        v-model="row.enfirstname"
                        type="text"
                        :class="['field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white', childValidationInputClass(row, 'enfirstname')]"
                        placeholder="First Name"
                      />
                      <p
                        v-if="getChildFieldError(row, 'enfirstname')"
                        class="pt-1 text-left text-[11px] leading-snug text-red-600 max-w-[14rem]"
                      >
                        {{ getChildFieldError(row, 'enfirstname') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              -->

              <!-- ជួរទី២ — មុខរបរ, ក្នុងបន្ទុក ស្ថានភាព, ឯកសារ -->
              <div
                class="flex flex-wrap items-center gap-x-2 gap-y-3 w-full mt-2"
              >
                <div class="flex items-center gap-1">
                  <label class="text-[13px] text-left w-44 mr-2 font-medium text-[#2C3E50]">មុខរបរ</label>
                  <div
                    class="rounded-sm p-0.5"
                    :class="childChangedCellClass(row, 'profession')"
                  >
                    <input
                      v-model="row.profession"
                      type="text"
                      class="field-input w-48 border border-[#D8DEE8] rounded text-[13px] bg-white pl-2"
                      placeholder="មុខរបរ"
                    />
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-[13px] font-medium text-[#2C3E50] whitespace-nowrap shrink-0">ក្នុងបន្ទុក ស្ថានភាព ៖</label>
                  <div
                    class="rounded-sm p-0.5 min-w-0"
                    :class="childChangedCellClass(row, 'custody')"
                  >
                    <input
                      v-model="row.custody"
                      type="text"
                      class="field-input min-w-0 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
                    />
                  </div>
                </div>
                <div class="flex items-center gap-2">
                  <label class="text-[13px] font-medium text-[#2C3E50] whitespace-nowrap shrink-0">សំបុត្រកំណើត</label>
                  <row-document-action-bar
                    :input-id="`child-document-${row._key}`"
                    :upload-pending="Boolean(row.file)"
                    :preview-disabled="!rowHasPreview(row)"
                    :download-disabled="true"
                    :show-remove="false"
                    @select="(file) => onChildPdfSelect(row, file)"
                    @preview="() => togglePdfModal(row)"
                    @download="() => false"
                  />
                </div>
              </div>
            </div>

            <div
              v-if="!disabled"
              class="pointer-events-auto absolute right-0 bottom-0 z-10 flex -translate-y-1/2 items-center justify-center"
            >
              <delete-confirm-button-component @confirm="removeRow(index)" />
            </div>
          </div>
        </div>

        <div
          v-if="rows.length <= 0"
          class="py-10 text-center text-gray-400 italic border border-dashed border-[#D8DEE8] rounded-lg"
        >
          មិនទាន់មានទិន្នន័យកូន
        </div>
      </div>
    </div>
    <div v-else class="w-full p-8 text-center text-red-500 font-medium bg-red-50 rounded-lg">សូមបញ្ជាក់ព័ត៌មានមន្ត្រីជាមុនសិន។</div>
    <pdf-preview :model="model" :record="selectedCertificate" v-bind:show="pdfToggle" :onClose="togglePdfModal"/>
  </section>
</template>

<script>
import { ref, watch, computed , reactive, nextTick } from 'vue'
import { useStore } from 'vuex'
import PdfPreview from './pdfpreview.vue'
import RowDocumentActionBar from './row-document-action-bar.vue'
import { useRowDocumentUpload } from './use-row-document-upload'
import DeleteConfirmButtonComponent from './delete-confirm-button.vue'

export default {
  components: {
    PdfPreview,
    RowDocumentActionBar,
    DeleteConfirmButtonComponent
  },
  emits: ['changed'],
  props: {
    officer: { type: Object, default: undefined },
    // When the family section is disabled (e.g. user is 'single'), hide the row delete button.
    disabled: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const store = useStore()
    const rows = ref([])

    const originalSnapshot = ref([])
    const loading = ref(false)
    const rowRefs = ref({})
    const fieldRefs = ref({})
    const requiredChildFields = ['lastname', 'firstname', 'dob']

    function setRowRef(key, el) {
      if (!key) return
      if (el) {
        rowRefs.value[key] = el
        return
      }
      delete rowRefs.value[key]
    }

    function setFieldRef(rowKey, field, el) {
      const refKey = `${rowKey}:${field}`
      if (el) {
        fieldRefs.value[refKey] = el
        return
      }
      delete fieldRefs.value[refKey]
    }

    function trimChildValue(value) {
      return String(value ?? '').trim()
    }

    function isKhmerOnly(value) {
      const normalized = trimChildValue(value)
      if (normalized === '') return true
      return /^[\u1780-\u17FF\s]+$/u.test(normalized)
    }

    function isLatinOnly(value) {
      const normalized = trimChildValue(value)
      if (normalized === '') return true
      return /^[A-Za-z\s.'-]+$/.test(normalized)
    }

    function normalizeLatinNameForSave(value) {
      if (value == null) return ''
      return String(value).trim().toUpperCase()
    }

    function getChildFieldError(row, field) {
      if (props.disabled) return ''
      if (!row || !requiredChildFields.includes(field)) return ''

      if (field === 'lastname') {
        if (trimChildValue(row.lastname) === '') return 'សូមបំពេញគោត្តនាមជាភាសាខ្មែរ'
        if (!isKhmerOnly(row.lastname)) return 'សូមបំពេញគោត្តនាមជាអក្សរខ្មែរ'
        return ''
      }

      if (field === 'firstname') {
        if (trimChildValue(row.firstname) === '') return 'សូមបំពេញនាមខ្លួនជាភាសាខ្មែរ'
        if (!isKhmerOnly(row.firstname)) return 'សូមបំពេញនាមខ្លួនជាអក្សរខ្មែរ'
        return ''
      }

      if (field === 'enlastname') {
        if (trimChildValue(row.enlastname) === '') return 'សូមបំពេញគោត្តនាមជាអក្សរឡាតាំង'
        if (!isLatinOnly(row.enlastname)) return 'សូមបំពេញគោត្តនាមជាអក្សរឡាតាំងប៉ុណ្ណោះ'
        return ''
      }

      if (field === 'enfirstname') {
        if (trimChildValue(row.enfirstname) === '') return 'សូមបំពេញនាមខ្លួនជាអក្សរឡាតាំង'
        if (!isLatinOnly(row.enfirstname)) return 'សូមបំពេញនាមខ្លួនជាអក្សរឡាតាំងប៉ុណ្ណោះ'
        return ''
      }

      if (field === 'dob') {
        if (trimChildValue(row.dob) === '') return 'សូមបំពេញថ្ងៃខែឆ្នាំកំណើត'
      }

      return ''
    }

    function childFieldHasError(row, field) {
      return getChildFieldError(row, field) !== ''
    }

    function rowFieldGroupClass(row, fields) {
      const list = Array.isArray(fields) ? fields : [fields]
      return list.some((field) => childFieldHasError(row, field)) ? 'validation-group-invalid' : ''
    }

    function childValidationInputClass(row, field) {
      return childFieldHasError(row, field) ? 'validation-input-invalid' : ''
    }

    function findFirstInvalidChildTarget() {
      for (const row of rows.value) {
        for (const field of requiredChildFields) {
          if (childFieldHasError(row, field)) {
            return { rowKey: row._key, field }
          }
        }
      }
      return null
    }

    async function focusFirstInvalidField() {
      const target = findFirstInvalidChildTarget()
      if (!target) return false

      await nextTick()

      const rowEl = rowRefs.value[target.rowKey]
      if (rowEl && typeof rowEl.scrollIntoView === 'function') {
        rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }

      window.setTimeout(() => {
        const fieldRef = fieldRefs.value[`${target.rowKey}:${target.field}`]
        if (typeof fieldRef?.focus === 'function') {
          fieldRef.focus()
          return
        }
        fieldRef?.$el?.focus?.()
      }, 180)

      return true
    }

    async function validateChildrenBeforeSave() {
      if (props.disabled) return true
      if (rows.value.length <= 0) return true

      const target = findFirstInvalidChildTarget()
      if (!target) return true

      await focusFirstInvalidField()
      return false
    }

    function defaultNewChildCustody() {
      const p = props.officer?.people
      if (!p) return ''
      return `${p.lastname || ''} ${p.firstname || ''}`.trim()
    }

    function findOriginalChildRow(row) {
      if (row.id != null) {
        const byId = originalSnapshot.value.find((r) => r.id === row.id)
        if (byId) return byId
      }
      return originalSnapshot.value.find((r) => r._key === row._key)
    }

    function normChildVal(v) {
      if (v == null || v === undefined) return ''
      return String(v)
    }

    function isChildFieldChanged(row, field) {
      if (field === 'pdf' || field === 'file') {
        if (row.file instanceof File) return true
        const orig = findOriginalChildRow(row)
        if (!orig) {
          return normChildVal(row.pdf) !== '' || normChildVal(row.fileName) !== ''
        }
        return (
          normChildVal(row.pdf) !== normChildVal(orig.pdf) ||
          normChildVal(row.fileName) !== normChildVal(orig.fileName)
        )
      }

      const orig = findOriginalChildRow(row)
      if (!orig) {
        const defaults = {
          lastname: '',
          firstname: '',
          enlastname: '',
          enfirstname: '',
          gender: 'male',
          profession: '',
          dob: '',
          custody: defaultNewChildCustody()
        }
        return normChildVal(row[field]) !== normChildVal(defaults[field])
      }
      return normChildVal(row[field]) !== normChildVal(orig[field])
    }

    function childChangedCellClass(row, keys) {
      const list = Array.isArray(keys) ? keys : [keys]
      return list.some((k) => isChildFieldChanged(row, k)) ? 'changed-cell' : ''
    }
    
    const {
      rowHasDownload,
      rowHasPreview,
      onDocumentFileChange,
      downloadDocument
    } = useRowDocumentUpload(store, 'officerjobbackground/upload')
    
    // បង្កើត Row ថ្មី
    function nextKey() {
      const maxId = rows.value.reduce((max, row) => {
        const num = parseInt(row._key?.split('-').pop()) || 0
        return Math.max(max, num)
      }, 0)
      return `child-${maxId + 1}`
    }

    function addRow() {
      const key = nextKey()
      const newRow = {
        _key: key,
        id: null,
        lastname: '',
        firstname: '',
        enlastname: '',
        enfirstname: '',
        gender: 'male',
        profession: '',
        dob: '',
        custody: defaultNewChildCustody(),
        birth_number: '',
        book_number: '',
        issued_date: new Date().toISOString().split('T')[0],
        province_id: 0,
        district_id: 0,
        commune_id: 0,
        province_name: '',
        district_name: '',
        commune_name: '',
        file: null,
        fileName: '',
        attachment: '',
        pdf: ''
      }
      rows.value.push(newRow)
    }

    // REPLACED: Initialize rows from officer data instead of fetching
    const initializeRows = () => {
      const children = props.officer?.people?.wedding_certificates?.[0]?.birth_certificates || []
      
      rows.value = children.map((child, index) => ({
        _key: child.id ? `child-${child.id}` : `child-temp-${index + 1}`,
        id: child.id || null,
        lastname: child.lastname,
        firstname: child.firstname,
        enlastname: child.enlastname || '',
        enfirstname: child.enfirstname || '',
        gender: child.gender || 'male',
        profession: child.profession,
        custody: props.officer.people.lastname + ' ' + props.officer.people.firstname,
        dob: toInputDate(child.dob),
        // birth_number: child.birth_number || '',
        // book_number: child.book_number || '',
        // issued_date: toInputDate(child.issued_date),
        // province_id: child.province_id || 0,
        // district_id: child.district_id || 0,
        // commune_id: child.commune_id || 0,
        // province_name: child.province?.name_kh || '',
        // district_name: child.district?.name_kh || '',
        // commune_name: child.commune?.name_kh || '',
        file: null,
        fileName: child.pdf ? 'ឯកសារបានភ្ជាប់' : '',
        attachment: child.pdf || '',
        pdf: child.pdf
      }))
      originalSnapshot.value = JSON.parse(JSON.stringify(rows.value))
      loading.value = false
    }

    function removeRow(index) {
      rows.value.splice(index, 1)
    }

    function toInputDate(value) {
      if (!value) return ''
      const d = new Date(value)
      return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
    }

    function formatDateForAPI(value) {
      if (!value) return null
      return value
    }

function onFileChange(row, event) {
  const file = event.target.files[0]
  if (!file) return

  // 1. Validation Settings
  const allowed_mime_types = ["application/pdf"]
  const allowed_size_mb = 20

  // 2. Check File Type
  if (allowed_mime_types.indexOf(file.type) === -1) {
    notify.error({
      title: "ឯកសារយោង",
      description: "អនុញ្ញាតតែឯកសារ PDF ប៉ុណ្ណោះ។",
      duration: 3000
    })
    event.target.value = ''
    return
  }

  // 3. Check File Size
  if (file.size > allowed_size_mb * 1024 * 1024) {
    notify.error({
      title: "ឯកសារយោង",
      description: `ទំហំឯកសារធំពេក។ អនុញ្ញាតត្រឹម ${allowed_size_mb}MB ប៉ុណ្ណោះ។`,
      duration: 3000
    })
    event.target.value = ''
    return
  }

  // 4. IMPORTANT: Clear the previous file reference first
  if (row.file) {
    console.log(' Clearing previous file:', row.file.name)
    row.file = null
  }

  // 5. Set the new file
  row.file = file
  row.fileName = file.name
  
  console.log('🔵 New file selected:', file.name, 'for row:', row._key)
  
  // 6. Tell the parent component to enable the "Save" button
  emit('changed', true)
}

function onChildPdfSelect(row, file) {
  if (!row || !file) return

  // Keep existing UI state
  row.file = file
  row.fileName = file.name

  // Let useRowDocumentUpload track the local File so downloadDocument() works.
  onDocumentFileChange(row, file)

  // Enable "Save"
  emit('changed', true)
}

function clearFile(row) {
  console.log('🔵 Clearing file for row:', row._key, 'current file:', row.file?.name)
  
  // Reset the data state
  row.file = null
  row.fileName = '' // Set to empty string to show no file
  
  // Force reset the file input
  const inputId = `file-upload-${row._key}`
  const fileInput = document.getElementById(inputId)
  if (fileInput) {
    fileInput.value = ''
    // Create a new file input to completely reset it
    fileInput.type = 'text'
    fileInput.type = 'file'
    console.log('🔵 File input reset for:', inputId)
  }
  
  emit('changed', true)
}

    function shortenFileName(name) {
      const value = name || 'មិនទាន់ជ្រើសរើសឯកសារ'
      const max = 24
      if (value.length <= max) return value
      const head = value.slice(0, 12)
      const tail = value.slice(-8)
      return `${head}…${tail}`
    }

const persistChanges = async () => {

  const response = await store.dispatch('weddingcertificate/list', {
    search : "",
    perPage : 20,
    page: 1, 
    people_id : props.officer?.people?.id
  })
  console.log('response date', response.data)
  // let weddingCertificateId = props.officer?.people?.wedding_certificates?.[0]?.id
  let weddingCertificateId = response.data.records[0].id
  // if (!weddingCertificateId) {
  //   const peopleId = props.officer?.people?.id
  //   const marryStatus = props.officer?.people?.marry_status || 'single'
  //   // const shouldCreateWeddingCertificate = Boolean(peopleId) && marryStatus !== 'single'

  //   if (shouldCreateWeddingCertificate) {
  //     try {
  //       const createPayload = {
  //         people_id: peopleId,
  //         spouse_firstname: '',
  //         spouse_lastname: '',
  //         spouse_enfirstname: '',
  //         spouse_enlastname: '',
  //         spouse_dob: null,
  //         spouse_nid: '',
  //         spouse_pob: '',
  //         spouse_address: '',
  //         spouse_profession: '',
  //         spouse_national: '',
  //         spouse_nationality: '',
  //         spouse_death: '',
  //         spouse_profession_organization: '',
  //         birth_number: '',
  //         book_number: '',
  //         year: String(new Date().getFullYear()),
  //         province_id: 0,
  //         district_id: 0,
  //         commune_id: 0,
  //         organization: '',
  //         gender: 'male',
  //         issued_date: new Date().toISOString().slice(0, 10),
  //         issued_location: ''
  //       }
  //       const weddingRes = await store.dispatch('weddingcertificate/create', createPayload)
  //       weddingCertificateId = weddingRes?.data?.record?.id || null
  //     } catch (err) {
  //       console.error('🔴 CHILD: Failed to create wedding certificate for child save:', err)
  //       return false
  //     }
  //   }
  // }

  if (!weddingCertificateId) {
    console.error('🔴 CHILD: No wedding certificate found')
    return false
  }

  try {
    if (!(await validateChildrenBeforeSave())) {
      return false
    }

    // Track which rows have changes
    const changedRows = []
    
    // Identify changed rows by comparing with originalSnapshot
    for (const row of rows.value) {
      const originalRow = originalSnapshot.value.find(r => r.id === row.id)
      
      // Create a copy without file for comparison
      const rowForComparison = { ...row, file: undefined }
      const originalForComparison = originalRow ? { ...originalRow, file: undefined } : null
      
      // Check if there's a file to upload
      const hasFileToUpload = row.file instanceof File
      
      // Check if any field has changed (excluding file)
      const hasDataChanged = !originalRow || JSON.stringify(rowForComparison) !== JSON.stringify(originalForComparison)
      
      // Row is changed if either data changed OR there's a file to upload
      if (hasDataChanged || hasFileToUpload) {
        changedRows.push(row)
        console.log(`🔵 CHILD: Row ${row._key} changed:`, {
          hasDataChanged,
          hasFileToUpload,
          fileName: hasFileToUpload ? row.file.name : null
        })
      }
    }
    
    console.log('🔵 CHILD: Changed rows:', changedRows.length, 'details:', changedRows.map(r => ({
      key: r._key,
      hasFile: !!(r.file instanceof File)
    })))

    // Handle deleted rows
    const originalIds = originalSnapshot.value.map(r => r.id).filter(id => id)
    const currentIds = rows.value.map(r => r.id).filter(id => id)
    const deletedIds = originalIds.filter(id => !currentIds.includes(id))

    for (const id of deletedIds) {
      console.log(`🔵 CHILD: Deleting child ID: ${id}`)
      await store.dispatch('childcertificate/delete', { id })
    }

    // Process ONLY changed rows (create or update)
    for (const row of changedRows) {
      // Prepare the payload with all fields - using wedding_certificate_id
      const payload = {
        people_id: props.officer?.people.id,
        wedding_certificate_id: weddingCertificateId,
        lastname: row.lastname || '',
        firstname: row.firstname || '',
        enlastname: normalizeLatinNameForSave(row.enlastname),
        enfirstname: normalizeLatinNameForSave(row.enfirstname),
        gender: row.gender || 'male',
        profession: row.profession || '',
        custody: row.custody || '',
        dob: formatDateForAPI(row.dob) || '',
        province_id: row.province_id || 0,
        district_id: row.district_id || 0,
        commune_id: row.commune_id || 0,
        pdf: row.pdf || ''
      }

      console.log('🔵 CHILD: Sending payload for row:', row.id || 'new', payload)

      let response
      if (row.id) {
        // Update existing record
        payload.id = row.id
        response = await store.dispatch('childcertificate/update', payload)
        console.log('🔵 CHILD: Update response:', response)
      } else {
        // Create new record
        response = await store.dispatch('childcertificate/create', payload)
        console.log('🔵 CHILD: Create response:', response)
        
        // Update the row with the new ID from response
        if (response?.data?.record?.id) {
          row.id = response.data.record.id
          row._key = `child-${response.data.record.id}`
        }
      }
      row.enlastname = payload.enlastname
      row.enfirstname = payload.enfirstname

      // Handle file upload if there's a new file
      if (row.file && row.file instanceof File) {
        const recordId = row.id || response?.data?.record?.id || response?.data?.id
        if (recordId) {
          console.log('🔵 CHILD: File upload details:', {
            recordId: recordId,
            fileName: row.file.name,
            fileSize: row.file.size,
            fileType: row.file.type,
            lastModified: new Date(row.file.lastModified).toISOString()
          })
          
          const formData = new FormData()
          formData.append('id', recordId)
          formData.append('file', row.file)
          
          console.log('🔵 CHILD: FormData created with:')
          console.log('  - id:', recordId)
          console.log('  - file:', row.file.name, `(${row.file.type}, ${row.file.size} bytes)`)
          
          try {
            console.log('🔵 CHILD: Dispatching to childcertificate/upload...')
            const uploadResponse = await store.dispatch('childcertificate/upload', formData)
            console.log('🔵 CHILD: Upload response:', uploadResponse)
            
            if (uploadResponse?.data?.pdf) {
              console.log('🔵 CHILD: File uploaded successfully, new filename:', uploadResponse.data.pdf)
              row.pdf = uploadResponse.data.pdf
              row.fileName = uploadResponse.data.pdf
              row.attachment = uploadResponse.data.pdf
            }
            
            // Clear the file after successful upload
            row.file = null
            
            // Also clear the file input element
            const inputId = `file-upload-${row._key}`;
            const fileInput = document.getElementById(inputId);
            if (fileInput) {
              fileInput.value = '';
              console.log('🔵 CHILD: File input cleared for:', inputId)
            }
            
          } catch (uploadError) {
            console.error("🔴 CHILD: File upload failed:", uploadError)
            if (uploadError.response) {
              console.error('🔴 CHILD: Upload error response:', uploadError.response.data)
              console.error('🔴 CHILD: Upload error status:', uploadError.response.status)
            }
          }
        }
      }
    }

    // Update originalSnapshot to match current rows
    originalSnapshot.value = JSON.parse(JSON.stringify(rows.value))
    
    console.log('🔵 CHILD: persistChanges completed successfully')
    emit('changed', false)
    return true
    
  } catch (err) {
    console.error("🔴 CHILD: Failed to save children info:", err)
    if (err.response) {
      console.error('🔴 CHILD: Error response:', err.response.data)
      console.error('🔴 CHILD: Error status:', err.response.status)
    }
    return false
  }
}
    // UPDATED: Use initializeRows instead of fetchChildren
    const cancelChanges = () => {
      initializeRows()
      emit('changed', false)
    }

    const markSaved = () => {
      originalSnapshot.value = JSON.parse(JSON.stringify(rows.value))
      emit('changed', false)
    }

    // --- COMPUTED ---
    const isDirty = computed(() => {
      return JSON.stringify(rows.value) !== JSON.stringify(originalSnapshot.value)
    })
    const hasPendingChanges = computed(() => !props.disabled && isDirty.value)

    // --- WATCHERS ---
    watch(() => props.officer, (newVal, oldVal) => {
      if (newVal === oldVal) return
      if (newVal) {
        initializeRows()
      }
    }, { immediate: true })
    
    watch(rows, () => {
      emit('changed', hasPendingChanges.value)
    }, { deep: true })

    watch(
      () => props.disabled,
      (disabled) => {
        if (disabled) {
          emit('changed', false)
          return
        }
        emit('changed', hasPendingChanges.value)
      }
    )

    /**
     * Upload functions
     */
    /**
     * File upload
     */
    const model = reactive({
      name: 'childcertificate' ,
      module: 'childcertificates' ,
      title: 'អត្រានុកុលដ្ឋានកូន'
    })
    async function downloadRowDocument(row) {
      try {
        await downloadDocument(row, `${model.name}/pdf`)
      } catch (error) {
        console.error('Public work download error:', error)
        window.alert('Unable to download attachment.')
      }
    }
    const certificates = computed( () => {
      return store.getters[model.name + '/getRecords']
    })

    const selectedCertificate = ref(null)
    const pdfToggle = ref(false)
    function togglePdfModal(cert) {
      console.log(cert)
      selectedCertificate.value = cert == undefined || cert == null ? null : cert 
      pdfToggle.value = !pdfToggle.value
    }
    const uploadHelper = ref(false)
    function uploadToggler(certificate) {
        uploadHelper.value = !uploadHelper.value
        if( certificate == null || certificate == undefined ){
            
        }else{
            selectedCertificate.value = certificate
        }
    }
    
    const pdfs = ref([])
    /**
     * On change
     */
    function fileChange(event){
      for(const file of event.target.files ){
        // if( index == 'item' || index == 'length' ) continue;

        // allowed types
        let allowed_mime_types = [ 
        /**
         * Image mime type
         */
        // 'image/jpeg', 'image/png' 
        /**
         * Application file mime type
         */
        "application/pdf"
        ];
        
        // allowed max size in MB
        let allowed_size_mb = 25;

        // Validate file type
        if(allowed_mime_types.indexOf(file.type) == -1) {
            notify.error({
                title: "ឯកសារយោង" ,
                description: "ឯកសារនេះជាប្រភេទ៖ "+ file.type +"។ អនុញ្ញាតតែឯកសារដែលមានប្រភេទជា PDF។" ,
                duration: 3000
            })
            return;
        }

        // Validate file size
        if(file.size > allowed_size_mb*1024*1024) {
            notify.error({
                title: "ឯកសារយោង" ,
                description: "ទំហំនៃឯកសារគឺ៖ " + (file.size/1024/1024).toFixed(2) + " មេកាបៃ (MB) លើលទំហំដែលកំណត់គឺ ៥ មេកាបៃ។" ,
                duration: 3000
            })
        return;
        }


        let reader = new FileReader();
        reader.onerror = function(e) {
            console.log('On error');
        };
        reader.onprogress = function(e) {
            console.log('On progress');
        };
        reader.onabort = function(e) {
            console.log('On abort');
        };
        reader.onloadstart = function(e) {
            console.log( "On load start" )
        };
        reader.onload = function(e) {
        // Ensure that the progress bar displays 100% at the end.
        console.log( 'On load' )
        /**
         * Read binary string from 'e.target.result' and convert to base64
         */
        pdfs.value.push( btoa( e.target.result ) );
        // formData.append('files', btoa( e.target.result ) )
        }
        // // // Read in the image file as base64 type
        // // reader.readAsDataURL(file);
        reader.readAsBinaryString(file);

        // // Read in the image file as base64 type
        // props.record.pdfs.push( window.URL.createObjectURL( file ) )
        pdfs.value.push( file )
      }
    }
    /**
     * On click file upload
     */
    function clickUpload(){
        document.getElementById('referenceDocument').click()
    }
    function uploadFiles(){
        let formData = new FormData();
        formData.append('id', selectedCertificate.value.id )
        formData.append('file', pdfs.value[0] )
        notify.info({
            title: 'រក្សារទុកព័ត៌មាន' ,
            description: 'កំពុងបញ្ចូលឯកសារយោង។' ,
            duration: 3000
        })
        store.dispatch(model.name + '/upload', formData ).then( res => {
            notify.success({
                title: 'រក្សារទុកព័ត៌មាន' ,
                description: 'បានបញ្ចូលឯកសារយោងរួចរាល់។' ,
                duration: 3000
            })
            pdfs.value = []
            getCertificates()
        }).catch( err => {
            console.log( err )
            notify.error({
                title: 'រក្សារទុកព័ត៌មាន' ,
                description: 'មានបញ្ហាពេលបញ្ចូលឯកសារយោង។' ,
                duration: 3000
            })
        })
        uploadHelper.value = false
    }
    // End Upload
    
    return {
      model,
      pdfToggle,
      togglePdfModal,
      selectedCertificate,
      
      rows, 
      loading,
      addRow,
      removeRow,
      onFileChange,
      onChildPdfSelect,
      clearFile,
      shortenFileName,
      persistChanges,
      cancelChanges,
      markSaved,
      isDirty,
      hasPendingChanges,
      downloadRowDocument,
      rowHasDownload,
      rowHasPreview,
      childChangedCellClass,
      childValidationInputClass,
      rowFieldGroupClass,
      getChildFieldError,
      setRowRef,
      setFieldRef,
      focusFirstInvalidField
    }
  }
}
</script>

<style scoped>
.field-input {
  height: 32px;
  box-sizing: border-box;
  text-align: left;
}

.field-input[type='date'] {
  background-image: none;
}

.certificate-upload {
  min-width: 0;
  box-sizing: border-box;
  height: 32px;
  display: flex;
  align-items: center;
  gap: 4px;
  border: 1px solid #d8dee8;
  border-radius: 4px;
  background: #fff;
  padding: 0 4px 0 0;
  overflow: hidden;
}

.certificate-upload:hover {
  border-color: #22c55e;
}

.certificate-upload:focus-within {
  border-color: #16a34a;
  box-shadow: 0 0 0 1px rgba(22, 163, 74, 0.15);
}

.certificate-upload-trigger {
  height: 100%;
  display: inline-flex;
  align-items: center;
  border-radius: 0;
  border: none;
  border-right: 1px solid #d8dee8;
  background: #fff;
  color: #1e3a8a;
  font-size: 12px;
  padding: 0 10px;
  cursor: pointer;
  white-space: nowrap;
  box-sizing: border-box;
}

.certificate-upload-trigger:hover {
  background: #f8fafc;
}

.certificate-file-name {
  flex: 1;
  min-width: 0;
  background: #fff;
  color: #2c3e50;
  font-size: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 4px;
}

.certificate-file-type {
  font-size: 10px;
  line-height: 1;
  color: #1e3a8a;
  background: #e5eaf2;
  border-radius: 9999px;
  padding: 3px 6px;
  flex-shrink: 0;
}

.certificate-upload-clear {
  color: #9ca3af;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 2px;
  border: none;
  background: transparent;
  cursor: pointer;
}

.certificate-upload-clear:hover {
  color: #dc2626;
}

:deep(.child-gender-select.n-select .n-base-selection) {
  --n-height: 32px;
  min-height: 32px;
  border: 1px solid #d8dee8 !important;
  border-radius: 4px;
  background: #fff !important;
}

:deep(.child-gender-select.n-select.n-select--focus .n-base-selection) {
  border-color: #16a34a !important;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}

/* Same as profile.vue — highlight edited fields */
.changed-cell {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 0;
}

.validation-group-invalid {
  border: none;
  border-radius: 0;
  box-shadow: none;
}

.validation-input-invalid {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

:deep(.validation-input-invalid) {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

</style>
