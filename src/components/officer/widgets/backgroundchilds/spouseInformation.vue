<template>
  <div class="flex items-center gap-2 pt-4 pb-6 pl-4">
    <div class="flex items-center gap-2 rounded-sm px-2 py-1 marital-status-choice-group">
      <label class="flex leading-5 mr-4 cursor-pointer hover:text-blue-600 duration-500">
        <input
          id="single"
          v-model="officer.people.marry_status"
          type="radio"
          value="single"
          class="w-4 h-4 cursor-pointer mr-2"
        />នៅលីវ
      </label>

      <label class="flex leading-5 mr-4 cursor-pointer hover:text-blue-600 duration-500">
        <input
          id="married"
          v-model="officer.people.marry_status"
          type="radio"
          value="married"
          class="w-4 h-4 cursor-pointer mr-2"
        />រៀបការហើយ
      </label>

      <label class="flex leading-5 mr-4 cursor-pointer hover:text-blue-600 duration-500">
        <input
          id="divorced"
          v-model="officer.people.marry_status"
          type="radio"
          value="divorced"
          class="w-4 h-4 cursor-pointer mr-2"
        />ពោះម៉ាយ / មេមាយ
      </label>
    </div>
  </div>

  <section
    class="transition-all duration-300 z-40 pl-4"
    :class="[!isEnabled ? 'opacity-50 pointer-events-none select-none grayscale-[30%]' : 'opacity-100']"
  >
    <h3 class="w-full text-left text-[15px] pb-2 text-[#1E3A8A]">
      ខ.១. ព័ត៌មានប្តីឬប្រពន្ធ
    </h3>

    <div class="flex flex-row gap-8 w-full items-start">
      <div class="flex flex-col gap-2 flex-1">
        <div class="grid grid-cols-[180px_1fr] items-start gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ឈ្មោះប្តីឬប្រពន្ធ</label>
          <div class="w-full">
            <div class="flex w-full flex-wrap items-start gap-2">
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('lastname_kh')"
                  v-model="formData.lastname_kh"
                  type="text"
                  :class="['field-input w-48 border rounded px-2 text-[13px] bg-white', spouseFieldClass('lastname_kh')]"
                  placeholder="គោត្តនាម"
                  :disabled="isDisabled"
                  @keydown="handleRestrictedKeydown('lastname_kh', $event)"
                  @beforeinput="handleRestrictedBeforeInput('lastname_kh', $event)"
                  @paste="handleRestrictedPaste('lastname_kh', $event)"
                  @input="handleRestrictedInput('lastname_kh', $event)"
                  @focus="handleFieldFocus('lastname_kh')"
                  @blur="handleFieldBlur('lastname_kh')"
                />
                <p
                  v-if="getFieldError('lastname_kh')"
                  class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('lastname_kh') }}
                </p>
              </div>
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('firstname_kh')"
                  v-model="formData.firstname_kh"
                  type="text"
                  :class="['field-input w-48 border rounded px-2 text-[13px] bg-white', spouseFieldClass('firstname_kh')]"
                  placeholder="នាម"
                  :disabled="isDisabled"
                  @keydown="handleRestrictedKeydown('firstname_kh', $event)"
                  @beforeinput="handleRestrictedBeforeInput('firstname_kh', $event)"
                  @paste="handleRestrictedPaste('firstname_kh', $event)"
                  @input="handleRestrictedInput('firstname_kh', $event)"
                  @focus="handleFieldFocus('firstname_kh')"
                  @blur="handleFieldBlur('firstname_kh')"
                />
                <p
                  v-if="getFieldError('firstname_kh')"
                  class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('firstname_kh') }}
                </p>
              </div>
              <div class="flex min-w-0 flex-1 flex-col">
                <div class="flex items-center gap-2">
                  <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">ស្ថានភាព ៖</span>
                  <div :class="['flex items-center gap-6 rounded-sm px-2 py-1 choice-group', spouseChoiceGroupClass('spouse_death')]">
                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        :ref="setValidationFieldRef('spouse_death')"
                        v-model="formData.spouse_death"
                        type="radio"
                        :value="0"
                        name="spouse_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                        :disabled="isDisabled"
                        @focus="handleFieldFocus('spouse_death')"
                        @blur="handleFieldBlur('spouse_death')"
                      />
                      <span class="text-[13px] text-[#2C3E50]">រស់</span>
                    </label>
                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        v-model="formData.spouse_death"
                        type="radio"
                        :value="1"
                        name="spouse_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                        :disabled="isDisabled"
                        @focus="handleFieldFocus('spouse_death')"
                        @blur="handleFieldBlur('spouse_death')"
                      />
                      <span class="text-[13px] text-[#2C3E50]">ស្លាប់</span>
                    </label>
                  </div>
                </div>
                <p
                  v-if="getFieldError('spouse_death')"
                  class="pt-1 max-w-[20rem] text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('spouse_death') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-[180px_1fr] items-start gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ឈ្មោះជាអក្សរពុម្ពឡាតាំង</label>
          <div class="w-full">
            <div class="flex w-full flex-wrap items-start gap-2">
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('lastname_en')"
                  v-model="formData.lastname_en"
                  type="text"
                  :class="['field-input w-48 border rounded px-2 text-[13px] bg-white', spouseFieldClass('lastname_en')]"
                  placeholder="lastname"
                  :disabled="isDisabled"
                  @keydown="handleRestrictedKeydown('lastname_en', $event)"
                  @beforeinput="handleRestrictedBeforeInput('lastname_en', $event)"
                  @paste="handleRestrictedPaste('lastname_en', $event)"
                  @input="handleRestrictedInput('lastname_en', $event)"
                  @focus="handleFieldFocus('lastname_en')"
                  @blur="handleFieldBlur('lastname_en')"
                />
                <p
                  v-if="getFieldError('lastname_en')"
                  class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('lastname_en') }}
                </p>
              </div>
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('firstname_en')"
                  v-model="formData.firstname_en"
                  type="text"
                  :class="['field-input w-48 border rounded px-2 text-[13px] bg-white', spouseFieldClass('firstname_en')]"
                  placeholder="firstname"
                  :disabled="isDisabled"
                  @keydown="handleRestrictedKeydown('firstname_en', $event)"
                  @beforeinput="handleRestrictedBeforeInput('firstname_en', $event)"
                  @paste="handleRestrictedPaste('firstname_en', $event)"
                  @input="handleRestrictedInput('firstname_en', $event)"
                  @focus="handleFieldFocus('firstname_en')"
                  @blur="handleFieldBlur('firstname_en')"
                />
                <p
                  v-if="getFieldError('firstname_en')"
                  class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('firstname_en') }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-[180px_1fr] items-start gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ថ្ងៃខែឆ្នាំកំណើត</label>
          <div class="flex min-w-0 flex-col">
            <officer-date-input
              :ref="setValidationFieldRef('dob')"
              v-model="formData.dob"
              wrapper-class="relative align-middle" style="width: 190px; "
              :input-class="[spouseFieldClass('dob')]"
              :disabled="isDisabled"
              @focus="handleFieldFocus('dob')"
              @blur="handleFieldBlur('dob')"
            />
            <p
              v-if="getFieldError('dob')"
              class="pt-1 max-w-[14rem] text-left text-[11px] leading-snug text-red-600"
            >
              {{ getFieldError('dob') }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-[180px_1fr] items-start gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">លេខអត្ត.សញ្ជាតិខ្មែរ</label>
          <div class="flex min-w-0 flex-col">
            <input
              :ref="setValidationFieldRef('nid')"
              v-model="formData.nid"
              type="text"
              inputmode="text"
              :class="['field-input w-48 border rounded px-2 text-[13px] bg-white', spouseFieldClass('nid')]"
              :disabled="isDisabled"
              @keydown="handleRestrictedKeydown('nid', $event)"
              @beforeinput="handleRestrictedBeforeInput('nid', $event)"
              @paste="handleRestrictedPaste('nid', $event)"
              @input="handleRestrictedInput('nid', $event)"
              @focus="handleFieldFocus('nid')"
              @blur="handleFieldBlur('nid')"
            />
            <p
              v-if="getFieldError('nid')"
              class="pt-1 max-w-[16rem] text-left text-[11px] leading-snug text-red-600"
            >
              {{ getFieldError('nid') }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-[180px_1fr] items-center gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ទីកន្លែងកំណើត</label>
          <div class="w-full">
            <textarea
              v-model="formData.pob"
              :class="['field-input field-input-textarea w-full border rounded p-2 text-[13px] bg-white', spouseFieldClass('pob')]"
              placeholder="បញ្ចូលទីកន្លែងកំណើត..."
              :disabled="isDisabled"
              rows="2"
            />
          </div>
        </div>

        <div class="grid grid-cols-[180px_1fr] items-center gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">មុខរបរ/មុខតំណែង</label>
          <div class="w-full">
            <input
              v-model="formData.occupation"
              type="text"
              :class="['field-input w-full border rounded px-2 text-[13px] bg-white', spouseFieldClass('occupation')]"
              placeholder="បញ្ចូលមុខរបរ..."
              :disabled="isDisabled"
            />
          </div>
        </div>

        <div class="grid grid-cols-[180px_1fr] items-center gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ឈ្មោះអង្គភាព</label>
          <div class="w-full">
            <input
              v-model="formData.profession_organization"
              type="text"
              :class="['field-input w-full border rounded px-2 text-[13px] bg-white', spouseFieldClass('profession_organization')]"
              placeholder="បញ្ចូលឈ្មោះអង្គភាព..."
              :disabled="isDisabled"
            />
          </div>
        </div>

        <div class="grid grid-cols-[180px_1fr] items-center gap-2">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">អាសយដ្ឋានបច្ចុប្បន្ន</label>
          <div class="w-full">
            <textarea
              v-model="formData.current_address"
              :class="['field-input field-input-textarea w-full border rounded p-2 text-[13px] bg-white', spouseFieldClass('current_address')]"
              placeholder="បញ្ចូលអាសយដ្ឋាន..."
              :disabled="isDisabled"
              rows="2"
            />
          </div>
        </div>

        <div class="flex gap-2 text-left">
          <label class="text-[13px] w-48 text-left font-medium text-[#2C3E50]">លិខិតអាពាហ៍ពិពាហ៍</label>
          <row-document-action-bar
            input-id="spouse-wedding-cert-document"
            :upload-pending="Boolean(formData.pdf_file)"
            :preview-disabled="!rowHasPreview(formData)"
            :download-disabled="true"
            :show-remove="false"
            @select="onSpousePdfSelect"
            @preview="togglePdfModal(formData)"
            @download="() => false"
          />
        </div>
      </div>

      <div class="flex flex-col gap-6 flex-1"></div>
    </div>

    <pdf-preview v-model:model="model" v-model:record="selectedCertificate" v-bind:show="pdfToggle" :onClose="togglePdfModal" />
  </section>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import PdfPreview from './pdfpreview.vue'
import { useRowDocumentUpload } from './use-row-document-upload'
import RowDocumentActionBar from './row-document-action-bar.vue'

export default {
  components: {
    PdfPreview,
    RowDocumentActionBar
  },
  props: {
    officer: { type: Object, default: () => ({}) },
    status: { type: String, default: 'single' }
  },
  emits: ['changed'],
  setup(props, { emit }) {
    const store = useStore()
    const isInitialLoad = ref(true)
    const formData = ref({
      name_kh: '',
      firstname_kh: '',
      lastname_kh: '',
      name_en: '',
      firstname_en: '',
      lastname_en: '',
      dob: '',
      pob: '',
      current_address: '',
      occupation: '',
      nid: '',
      national: '',
      nationality: '',
      spouse_death: '',
      profession_organization: '',
      pdf_file: null,
      existing_pdf_name: '',
      pdf: '',
      id: null,
      _key: 'spouse-wedding-cert'
    })
    const originalSnapshot = ref({})
    const originalMarryStatus = ref('single')
    const weddingCertificateId = ref(null)

    const {
      rowHasPreview,
      onDocumentFileChange,
      downloadDocument
    } = useRowDocumentUpload(store, 'weddingcertificate/upload')

    const hasSpouseSectionStatus = (status) => status === 'married'
    const isDisabled = computed(() => !hasSpouseSectionStatus(props.officer?.people?.marry_status))
    const isEnabled = computed(
      () => hasSpouseSectionStatus(props.status) || hasSpouseSectionStatus(props.officer?.people?.marry_status)
    )
    const currentMarryStatus = computed(() => props.officer?.people?.marry_status || 'single')
    const isMarryStatusChanged = computed(() => currentMarryStatus.value !== originalMarryStatus.value)

    const validationFieldOrder = ['lastname_kh', 'firstname_kh', 'lastname_en', 'firstname_en', 'spouse_death', 'dob', 'nid']
    const activeValidationField = ref('')
    const validationFieldRefs = reactive(validationFieldOrder.reduce((acc, key) => ({ ...acc, [key]: null }), {}))
    const lastValidFieldValues = reactive(validationFieldOrder.reduce((acc, key) => ({ ...acc, [key]: '' }), {}))
    const blockedFieldMessages = reactive(validationFieldOrder.reduce((acc, key) => ({ ...acc, [key]: '' }), {}))

    function trimValue(value) {
      if (value === null || value === undefined) return ''
      return String(value).trim()
    }

    function normalizeLatinNameForSave(value) {
      if (value === null || value === undefined) return ''
      return String(value).toUpperCase()
    }

    function hasFieldValue(field) {
      return trimValue(formData.value[field]) !== ''
    }

    function isKhmerOnly(value) {
      const normalized = trimValue(value)
      if (normalized === '') return true
      return /^[\u1780-\u17FF\s]+$/u.test(normalized)
    }

    function isLatinOnly(value) {
      const normalized = trimValue(value)
      if (normalized === '') return true
      return /^[A-Za-z\s.'-]+$/.test(normalized)
    }

    function isAllowedNidValue(value) {
      const normalized = trimValue(value)
      if (normalized === '') return true
      return /^[0-9០-៩!@#$%^&*()]+$/.test(normalized)
    }

    function hasSelectedSpouseStatus() {
      return [0, 1, '0', '1'].includes(formData.value.spouse_death)
    }

    function getFieldRestriction(field) {
      const restrictionMap = {
        lastname_kh: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) => String(value).replace(/[^\u1780-\u17FF\s]/gu, ''),
          message: 'សូមប្តូរក្ដារចុចទៅជាភាសាខ្មែរ'
        },
        firstname_kh: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) => String(value).replace(/[^\u1780-\u17FF\s]/gu, ''),
          message: 'សូមប្តូរក្ដារចុចទៅជាភាសាខ្មែរ'
        },
        lastname_en: {
          pattern: /^[A-Za-z\s.'-]+$/,
          sanitize: (value) => String(value).replace(/[^A-Za-z\s.'-]/g, ''),
          message: 'សូមប្តូរក្ដារចុចទៅជាអក្សរឡាតាំង'
        },
        firstname_en: {
          pattern: /^[A-Za-z\s.'-]+$/,
          sanitize: (value) => String(value).replace(/[^A-Za-z\s.'-]/g, ''),
          message: 'សូមប្តូរក្ដារចុចទៅជាអក្សរឡាតាំង'
        },
        nid: {
          pattern: /^[0-9០-៩!@#$%^&*()]+$/,
          sanitize: (value) => String(value).replace(/[^0-9០-៩!@#$%^&*()]/g, ''),
          message: 'សូមបំពេញលេខអត្ត.សញ្ជាតិខ្មែរ ដោយអាចប្រើលេខ និងសញ្ញា !@#$%^&*()'
        }
      }

      return restrictionMap[field] || null
    }

    function sanitizeFieldValue(field, value) {
      const rule = getFieldRestriction(field)
      if (!rule) return value ?? ''
      return rule.sanitize(value ?? '')
    }

    function rememberLastValidValue(field, value) {
      lastValidFieldValues[field] = sanitizeFieldValue(field, value)
    }

    function setBlockedFieldMessage(field, message) {
      blockedFieldMessages[field] = message
      activeValidationField.value = field
    }

    function clearBlockedFieldMessage(field) {
      blockedFieldMessages[field] = ''
    }

    function isControlKeyEvent(event) {
      if (!event) return false
      if (event.ctrlKey || event.metaKey || event.altKey) return true
      return ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End', 'Tab', 'Enter', 'Escape'].includes(event.key)
    }

    function handleRestrictedKeydown(field, event) {
      const rule = getFieldRestriction(field)
      if (!rule || !event) return
      if (isControlKeyEvent(event) || event.isComposing === true) {
        return
      }
      if (typeof event.key !== 'string' || event.key.length !== 1) return
      if (rule.pattern.test(event.key)) {
        clearBlockedFieldMessage(field)
        return
      }
      setBlockedFieldMessage(field, rule.message)
    }

    function handleRestrictedBeforeInput(field, event) {
      const rule = getFieldRestriction(field)
      if (!rule || event?.isComposing === true) return
      const inputType = event?.inputType || ''
      if (inputType.startsWith('delete')) {
        return
      }
      const insertedValue = event?.data ?? ''
      if (insertedValue === '') return
      if (rule.pattern.test(insertedValue)) {
        clearBlockedFieldMessage(field)
        return
      }
      setBlockedFieldMessage(field, rule.message)
    }

    function handleRestrictedPaste(field, event) {
      const rule = getFieldRestriction(field)
      if (!rule) return
      const pastedText = event?.clipboardData?.getData('text') || ''
      if (pastedText === '') return
      if (sanitizeFieldValue(field, pastedText) === pastedText) {
        clearBlockedFieldMessage(field)
        return
      }
      setBlockedFieldMessage(field, rule.message)
    }

    function handleRestrictedInput(field, event) {
      const currentValue = event?.target?.value ?? formData.value[field]
      const sanitizedValue = sanitizeFieldValue(field, currentValue)
      if (sanitizedValue !== currentValue) {
        const rule = getFieldRestriction(field)
        if (rule?.message) {
          setBlockedFieldMessage(field, rule.message)
        }
      } else {
        clearBlockedFieldMessage(field)
      }
      rememberLastValidValue(field, currentValue)
    }

    const fieldErrors = computed(() => {
      const errors = {}
      const requireSpouseInfo = isEnabled.value

      if (requireSpouseInfo && !hasFieldValue('lastname_kh')) {
        errors.lastname_kh = 'សូមបំពេញគោត្តនាមប្តីឬប្រពន្ធជាអក្សរខ្មែរ'
      } else if (hasFieldValue('lastname_kh') && !isKhmerOnly(formData.value.lastname_kh)) {
        errors.lastname_kh = 'សូមបំពេញគោត្តនាមជាអក្សរខ្មែរ'
      }

      if (requireSpouseInfo && !hasFieldValue('firstname_kh')) {
        errors.firstname_kh = 'សូមបំពេញនាមប្តីឬប្រពន្ធជាអក្សរខ្មែរ'
      } else if (hasFieldValue('firstname_kh') && !isKhmerOnly(formData.value.firstname_kh)) {
        errors.firstname_kh = 'សូមបំពេញនាមខ្លួនជាអក្សរខ្មែរ'
      }

      if (requireSpouseInfo && !hasFieldValue('lastname_en')) {
        errors.lastname_en = 'សូមបំពេញគោត្តនាមប្តីឬប្រពន្ធជាអក្សរឡាតាំង'
      } else if (hasFieldValue('lastname_en') && !isLatinOnly(formData.value.lastname_en)) {
        errors.lastname_en = 'សូមបំពេញគោត្តនាមជាអក្សរឡាតាំងប៉ុណ្ណោះ'
      }

      if (requireSpouseInfo && !hasFieldValue('firstname_en')) {
        errors.firstname_en = 'សូមបំពេញនាមប្តីឬប្រពន្ធជាអក្សរឡាតាំង'
      } else if (hasFieldValue('firstname_en') && !isLatinOnly(formData.value.firstname_en)) {
        errors.firstname_en = 'សូមបំពេញនាមខ្លួនជាអក្សរឡាតាំងប៉ុណ្ណោះ'
      }

      if (requireSpouseInfo && !hasSelectedSpouseStatus()) {
        errors.spouse_death = 'សូមជ្រើសរើសស្ថានភាពប្តីឬប្រពន្ធ'
      }

      if (requireSpouseInfo && !hasFieldValue('dob')) {
        errors.dob = 'សូមបំពេញថ្ងៃខែឆ្នាំកំណើតប្តីឬប្រពន្ធ'
      }

      if (requireSpouseInfo && !hasFieldValue('nid')) {
        errors.nid = 'សូមបំពេញលេខអត្ត.សញ្ជាតិខ្មែរបស់ប្តីឬប្រពន្ធ'
      } else if (hasFieldValue('nid') && !isAllowedNidValue(formData.value.nid)) {
        errors.nid = 'សូមបំពេញលេខអត្ត.សញ្ជាតិខ្មែរ ដោយអាចប្រើលេខ និងសញ្ញា !@#$%^&*()'
      }

      return errors
    })

    function setValidationFieldRef(field) {
      return (element) => {
        if (element) {
          validationFieldRefs[field] = element
          return
        }
        delete validationFieldRefs[field]
      }
    }

    function handleFieldFocus(field) {
      activeValidationField.value = field
    }

    function handleFieldBlur(field) {
      if (activeValidationField.value === field) {
        activeValidationField.value = ''
      }
    }

    function shouldHighlightFieldError(field) {
      return Boolean(fieldErrors.value[field])
    }

    function getFieldError(field) {
      if (blockedFieldMessages[field]) {
        return blockedFieldMessages[field]
      }
      if (fieldErrors.value[field]) {
        return fieldErrors.value[field]
      }
      return ''
    }

    function spouseFieldChanged(field) {
      return JSON.stringify(formData.value[field]) !== JSON.stringify(originalSnapshot.value[field])
    }

    function spouseFieldClass(field) {
      if (validationFieldOrder.includes(field) && shouldHighlightFieldError(field)) {
        return 'validation-input-invalid'
      }
      return 'border-[#D8DEE8]'
    }

    function spouseChoiceGroupClass(field) {
      return shouldHighlightFieldError(field) ? 'validation-choice-invalid' : ''
    }

    function resetFieldValidationState() {
      activeValidationField.value = ''
      validationFieldOrder.forEach((field) => {
        rememberLastValidValue(field, formData.value[field] ?? '')
        clearBlockedFieldMessage(field)
      })
    }

    function validateSpouseFields() {
      if (Object.keys(fieldErrors.value).length > 0) {
        const firstInvalidField = validationFieldOrder.find((field) => Boolean(fieldErrors.value[field])) || ''
        if (firstInvalidField) {
          window.setTimeout(() => {
            const target = validationFieldRefs[firstInvalidField]
            if (typeof target?.focus === 'function') {
              target.focus()
              return
            }
            target?.$el?.focus?.()
          }, 0)
        }
        return false
      }
      return true
    }

    function getPeopleId() {
      return props.officer?.people?.id || props.officer?.people_id || null
    }

    function toInputDate(value) {
      if (!value) return ''
      const d = new Date(value)
      return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
    }

    function formatDateForAPI(value) {
      return value || null
    }

    function hydrateData() {
      const weddingCertificate = props.officer?.people?.wedding_certificates?.[0] || {}
      weddingCertificateId.value = weddingCertificate?.id ?? null
      originalMarryStatus.value = props.officer?.people?.marry_status || 'single'

      let existingPdf = ''
      if (weddingCertificate?.pdf) {
        const path = typeof weddingCertificate.pdf === 'string' ? weddingCertificate.pdf : ''
        const parts = path.split(/[/\\]/)
        existingPdf = parts[parts.length - 1] || 'ឯកសារបានភ្ជាប់'
      }

      const mapped = {
        name_kh: weddingCertificate.spouse_firstname ? `${weddingCertificate.spouse_lastname || ''} ${weddingCertificate.spouse_firstname || ''}`.trim() : '',
        firstname_kh: weddingCertificate.spouse_firstname || '',
        lastname_kh: weddingCertificate.spouse_lastname || '',
        name_en: weddingCertificate.spouse_enfirstname ? `${weddingCertificate.spouse_enfirstname || ''} ${weddingCertificate.spouse_enlastname || ''}`.trim() : '',
        firstname_en: weddingCertificate.spouse_enfirstname || '',
        lastname_en: weddingCertificate.spouse_enlastname || '',
        dob: toInputDate(weddingCertificate.spouse_dob),
        nid: weddingCertificate.spouse_nid || '',
        pob: weddingCertificate.spouse_pob || '',
        current_address: weddingCertificate.spouse_address || '',
        occupation: weddingCertificate.spouse_profession || '',
        national: weddingCertificate.spouse_national || '',
        nationality: weddingCertificate.spouse_nationality || '',
        spouse_death: weddingCertificate.spouse_death ?? '',
        profession_organization: weddingCertificate.spouse_profession_organization || '',
        pdf_file: null,
        existing_pdf_name: existingPdf,
        pdf: weddingCertificate.pdf || '',
        id: weddingCertificate.id || null,
        _key: 'spouse-wedding-cert'
      }

      formData.value = { ...mapped }
      originalSnapshot.value = JSON.parse(JSON.stringify(mapped))
      resetFieldValidationState()
      isInitialLoad.value = true
    }

    const isDirty = computed(() => JSON.stringify(formData.value) !== JSON.stringify(originalSnapshot.value))
    const hasPendingChanges = computed(() => isDirty.value || isMarryStatusChanged.value)

    async function persistChanges() {
      try {
        const peopleId = getPeopleId()
        if (!peopleId) return false

        const normalizedLastnameEn = normalizeLatinNameForSave(formData.value.lastname_en)
        const normalizedFirstnameEn = normalizeLatinNameForSave(formData.value.firstname_en)

        // Validate only when married (divorced should stay disabled but still be allowed to save nulls).
        if (currentMarryStatus.value === 'married' && isEnabled.value && !validateSpouseFields()) {
          return false
        }

        if (isMarryStatusChanged.value) {
          const existingPeople = props.officer?.people || {}
          const peopleResponse = await store.dispatch('people/update', {
            id: peopleId,
            people: {
              marry_status: currentMarryStatus.value
            }
          })

          if (!(peopleResponse?.status === 200 && peopleResponse?.data?.ok === true)) {
            return false
          }

          originalMarryStatus.value = currentMarryStatus.value
        }

        // UI is enabled only for married, but we still want to persist when divorced.
        if (currentMarryStatus.value !== 'married' && currentMarryStatus.value !== 'divorced') {
          emit('changed', false)
          return true
        }

        // For divorced, allow saving even when form is empty/unchanged (send null spouse fields).
        if (!isDirty.value && currentMarryStatus.value !== 'divorced') {
          emit('changed', false)
          return true
        }

        const payload = JSON.parse(JSON.stringify(props.officer || {}))
        if (!payload.people) payload.people = {}
        if (!Array.isArray(payload.people.wedding_certificates)) payload.people.wedding_certificates = []
        if (payload.people.wedding_certificates.length === 0) payload.people.wedding_certificates.push({})

        const cert = payload.people.wedding_certificates[0]
        Object.assign(cert, {
          // If divorced, clear spouse info in DB (set to nulls).
          spouse_firstname: currentMarryStatus.value === 'divorced' ? null : (formData.value.firstname_kh || ''),
          spouse_lastname: currentMarryStatus.value === 'divorced' ? null : (formData.value.lastname_kh || ''),
          spouse_enfirstname: currentMarryStatus.value === 'divorced' ? null : normalizedFirstnameEn,
          spouse_enlastname: currentMarryStatus.value === 'divorced' ? null : normalizedLastnameEn,
          spouse_dob: currentMarryStatus.value === 'divorced' ? null : formatDateForAPI(formData.value.dob),
          spouse_nid: currentMarryStatus.value === 'divorced' ? null : (formData.value.nid || ''),
          spouse_pob: currentMarryStatus.value === 'divorced' ? null : (formData.value.pob || ''),
          spouse_address: currentMarryStatus.value === 'divorced' ? null : (formData.value.current_address || ''),
          spouse_profession: currentMarryStatus.value === 'divorced' ? null : (formData.value.occupation || ''),
          spouse_national: currentMarryStatus.value === 'divorced' ? null : (formData.value.national || ''),
          spouse_nationality: currentMarryStatus.value === 'divorced' ? null : (formData.value.nationality || ''),
          spouse_death: currentMarryStatus.value === 'divorced' ? null : (formData.value.spouse_death ?? ''),
          spouse_profession_organization: currentMarryStatus.value === 'divorced' ? null : (formData.value.profession_organization || ''),
          birth_number: '',
          book_number: '',
          year: String(new Date().getFullYear()),
          province_id: 0,
          district_id: 0,
          commune_id: 0,
          organization: '',
          gender: 'male',
          issued_date: new Date().toISOString().slice(0, 10),
          issued_location: ''
        })

        let response
        if (!weddingCertificateId.value) {
          cert.people_id = peopleId
          delete cert.id
          response = await store.dispatch('weddingcertificate/create', cert)
          if (response?.data?.record?.id) {
            weddingCertificateId.value = response.data.record.id
          }
        } else {
          cert.id = weddingCertificateId.value
          response = await store.dispatch('weddingcertificate/update', cert)
        }

        if (!(response?.data?.ok || response?.status === 200)) {
          return false
        }

        if (formData.value.pdf_file) {
          const recordId = weddingCertificateId.value || response?.data?.record?.id
          if (recordId) {
            const uploadData = new FormData()
            uploadData.append('id', recordId)
            uploadData.append('file', formData.value.pdf_file)
            await store.dispatch('weddingcertificate/upload', uploadData)
          }
        }

        formData.value.firstname_en = normalizedFirstnameEn
        formData.value.lastname_en = normalizedLastnameEn
        formData.value.name_en = `${normalizedLastnameEn || ''} ${normalizedFirstnameEn || ''}`.trim()
        originalSnapshot.value = JSON.parse(JSON.stringify(formData.value))
        resetFieldValidationState()
        emit('changed', false)
        return true
      } catch (error) {
        console.error('Failed to save spouse info:', error)
        return false
      }
    }

    function cancelChanges() {
      hydrateData()
      if (props.officer?.people) {
        props.officer.people.marry_status = originalMarryStatus.value
      }
      emit('changed', false)
    }

    function markSaved() {
      originalSnapshot.value = JSON.parse(JSON.stringify(formData.value))
      originalMarryStatus.value = currentMarryStatus.value
      resetFieldValidationState()
      emit('changed', false)
    }

    function onSpousePdfSelect(file) {
      if (!file) return
      if (file.type !== 'application/pdf') return
      if (file.size > 5 * 1024 * 1024) return
      formData.value.pdf_file = file
      formData.value.existing_pdf_name = file.name
      onDocumentFileChange(formData.value, file)
      emit('changed', true)
    }

    const model = reactive({
      name: 'weddingcertificate',
      module: 'weddingcertificates',
      title: 'លិខិតអាពាហ៍ពិពាហ៍'
    })

    async function downloadRowDocument(row) {
      try {
        await downloadDocument(row, `${model.name}/pdf`)
      } catch (error) {
        console.error('Wedding certificate download error:', error)
        window.alert('Unable to download attachment.')
      }
    }

    const selectedCertificate = ref(null)
    const pdfToggle = ref(false)

    function togglePdfModal(cert) {
      const record = cert && cert.pdf_file instanceof File ? { ...cert, file: cert.pdf_file } : cert
      selectedCertificate.value = record || null
      pdfToggle.value = !pdfToggle.value
    }

    watch(
      formData,
      () => {
        if (isInitialLoad.value) {
          isInitialLoad.value = false
          return
        }
        formData.value.name_kh = `${formData.value.lastname_kh || ''} ${formData.value.firstname_kh || ''}`.trim()
        formData.value.name_en = `${formData.value.lastname_en || ''} ${formData.value.firstname_en || ''}`.trim()
        emit('changed', hasPendingChanges.value)
      },
      { deep: true }
    )

    watch(
      () => props.officer?.people?.marry_status,
      () => {
        if (isInitialLoad.value) return
        emit('changed', hasPendingChanges.value)
      }
    )

    watch(() => props.officer, hydrateData, { immediate: true })

    return {
      model,
      pdfToggle,
      togglePdfModal,
      selectedCertificate,
      isDisabled,
      isEnabled,
      isDirty,
      hasPendingChanges,
      isMarryStatusChanged,
      formData,
      originalSnapshot,
      rowHasPreview,
      onSpousePdfSelect,
      persistChanges,
      cancelChanges,
      markSaved,
      downloadRowDocument,
      setValidationFieldRef,
      handleRestrictedKeydown,
      handleRestrictedBeforeInput,
      handleRestrictedPaste,
      handleRestrictedInput,
      handleFieldFocus,
      handleFieldBlur,
      getFieldError,
      spouseFieldClass,
      spouseChoiceGroupClass
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

.field-input-textarea {
  min-height: 72px;
  height: auto;
  resize: vertical;
}

.validation-input-invalid {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

.marital-status-choice-group {
  border: 1px solid transparent;
}

.choice-group {
  border: 1px solid transparent;
}

.validation-choice-invalid {
  border: 1px solid #dc2626;
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

.validation-choice-invalid input[type='radio'] {
  accent-color: #b91c1c;
}
</style>
