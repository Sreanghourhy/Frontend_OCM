<template>
  <section class="pb-6 pl-4 transition-all duration-300">
    <!-- <h3 class="w-full pb-2 text-left text-[15px] text-[#1E3A8A]">
      គ. ព័ត៌មានទំនាក់ទំនងក្នុងករណីមានអាសន្ន
    </h3> -->

    <div class="flex w-full max-w-5xl flex-col gap-2">
      <div class="grid grid-cols-1 items-start gap-2 sm:grid-cols-[180px_1fr]">
        <label class="text-left text-[13px] font-medium text-[#2C3E50]">ឈ្មោះជាភាសាខ្មែរ</label>
        <div class="flex min-w-0 flex-wrap items-start gap-x-2 gap-y-2">
          <n-tooltip
            trigger="hover"
            placement="top"
            :show-arrow="true"
            :disabled="!getFieldError('e_lastname')"
          >
            <template #trigger>
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('e_lastname')"
                  v-model="formData.e_lastname"
                  type="text"
                  :class="['field-input w-48 border rounded px-2 text-[13px] bg-white', fieldInputClass('e_lastname')]"
                  placeholder="គោត្តនាម"
                  @keydown="handleRestrictedKeydown('e_lastname', $event)"
                  @beforeinput="handleRestrictedBeforeInput('e_lastname', $event)"
                  @paste="handleRestrictedPaste('e_lastname', $event)"
                  @input="handleRestrictedInput('e_lastname', $event)"
                />
                <p
                  v-if="getFieldError('e_lastname')"
                  class="max-w-[14rem] pt-1 text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('e_lastname') }}
                </p>
              </div>
            </template>
            {{ getFieldError('e_lastname') }}
          </n-tooltip>
          <n-tooltip
            trigger="hover"
            placement="top"
            :show-arrow="true"
            :disabled="!getFieldError('e_firstname')"
          >
            <template #trigger>
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('e_firstname')"
                  v-model="formData.e_firstname"
                  type="text"
                  :class="['field-input w-48 border rounded px-2 text-[13px] bg-white', fieldInputClass('e_firstname')]"
                  placeholder="នាមខ្លួន"
                  @keydown="handleRestrictedKeydown('e_firstname', $event)"
                  @beforeinput="handleRestrictedBeforeInput('e_firstname', $event)"
                  @paste="handleRestrictedPaste('e_firstname', $event)"
                  @input="handleRestrictedInput('e_firstname', $event)"
                />
                <p
                  v-if="getFieldError('e_firstname')"
                  class="max-w-[14rem] pt-1 text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('e_firstname') }}
                </p>
              </div>
            </template>
            {{ getFieldError('e_firstname') }}
          </n-tooltip>
          <div class="inline-flex items-center gap-2">
            <span class="whitespace-nowrap text-[13px] text-[#2C3E50]">ភេទ ៖</span>
            <n-select
              v-model:value="formData.e_gender"
              :options="genderOptions"
              size="small"
              :clearable="false"
              class="w-36 uniform-select"
              placeholder="ជ្រើសរើស"
            />
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 items-start gap-2 sm:grid-cols-[180px_1fr]">
        <label class="text-left text-[13px] font-medium text-[#2C3E50]">ទំនាក់ទំនងត្រូវជា</label>
        <div class="min-w-0 max-w-2xl">
          <input
            v-model="formData.e_relationship"
            type="text"
            :class="['field-input w-full border rounded px-2 text-[13px] bg-white', fieldInputClass('e_relationship')]"
            placeholder="ឧ. បងប្រុស"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 items-start gap-2 sm:grid-cols-[180px_1fr]">
        <label class="text-left text-[13px] font-medium text-[#2C3E50]">មុខរបរ</label>
        <div class="min-w-0 max-w-2xl">
          <input
            v-model="formData.e_profession"
            type="text"
            :class="['field-input w-full border rounded px-2 text-[13px] bg-white', fieldInputClass('e_profession')]"
            placeholder="បញ្ចូលមុខរបរ…"
          />
        </div>
      </div>

      <div class="grid grid-cols-1 items-start gap-2 sm:grid-cols-[180px_1fr]">
        <label class="text-left text-[13px] font-medium text-[#2C3E50]">លេខទូរសព្ទ / អ៉ីម៉ែល</label>
        <div class="inline-flex flex-wrap items-start gap-y-1">
          <n-tooltip
            trigger="hover"
            placement="top"
            :show-arrow="true"
            :disabled="!getFieldError('e_phone')"
          >
            <template #trigger>
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('e_phone')"
                  v-model="formData.e_phone"
                  type="text"
                  inputmode="numeric"
                  :class="['field-input mr-4 w-40 border rounded px-2 text-[13px] bg-white', fieldInputClass('e_phone')]"
                  placeholder="លេខទូរសព្ទ"
                  @keydown="handleRestrictedKeydown('e_phone', $event)"
                  @beforeinput="handleRestrictedBeforeInput('e_phone', $event)"
                  @paste="handleRestrictedPaste('e_phone', $event)"
                  @input="handleRestrictedInput('e_phone', $event)"
                />
                <p
                  v-if="getFieldError('e_phone')"
                  class="mr-4 max-w-[16rem] pt-1 text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('e_phone') }}
                </p>
              </div>
            </template>
            {{ getFieldError('e_phone') }}
          </n-tooltip>
          <span class="self-center leading-8 text-[13px] text-[#2C3E50]">អ៉ីម៉ែល</span>
          <n-tooltip
            trigger="hover"
            placement="top"
            :show-arrow="true"
            :disabled="!getFieldError('e_email')"
          >
            <template #trigger>
              <div class="flex min-w-0 flex-col">
                <input
                  :ref="setValidationFieldRef('e_email')"
                  v-model="formData.e_email"
                  type="email"
                  :class="['field-input ml-4 w-60 border rounded px-2 text-[13px] bg-white', fieldInputClass('e_email')]"
                  placeholder="អ៉ីម៉ែល"
                  @keydown="handleRestrictedKeydown('e_email', $event)"
                  @beforeinput="handleRestrictedBeforeInput('e_email', $event)"
                  @paste="handleRestrictedPaste('e_email', $event)"
                  @input="handleRestrictedInput('e_email', $event)"
                />
                <p
                  v-if="getFieldError('e_email')"
                  class="ml-4 max-w-[18rem] pt-1 text-left text-[11px] leading-snug text-red-600"
                >
                  {{ getFieldError('e_email') }}
                </p>
              </div>
            </template>
            {{ getFieldError('e_email') }}
          </n-tooltip>
        </div>
      </div>

      <div class="grid grid-cols-1 items-start gap-2 sm:grid-cols-[180px_1fr]">
        <label class="pt-1 text-left text-[13px] font-medium text-[#2C3E50]">អាសយដ្ឋានបច្ចុប្បន្ន</label>
        <div class="min-w-0 max-w-2xl">
          <textarea
            v-model="formData.e_address"
            :class="['field-input field-input-textarea w-full border rounded px-2 py-1.5 text-[13px] bg-white', fieldInputClass('e_address')]"
            placeholder="បញ្ចូលអាសយដ្ឋាន…"
            rows="2"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['changed'],
  props: {
    officer: { type: Object, default: () => ({}) }
  },
  setup(props, { emit }) {
    const store = useStore()
    const isInitialLoad = ref(true)
    const formData = ref({
      e_lastname: '',
      e_firstname: '',
      e_gender: 1,
      e_relationship: '',
      e_profession: '',
      e_address: '',
      e_phone: '',
      e_email: ''
    })
    const originalSnapshot = ref({})

    const genderOptions = [
      { label: 'ប្រុស', value: 1 },
      { label: 'ស្រី', value: 0 }
    ]

    const validationFieldOrder = ['e_lastname', 'e_firstname', 'e_phone', 'e_email']
    const validationFieldRefs = reactive(validationFieldOrder.reduce((acc, key) => ({ ...acc, [key]: null }), {}))
    const lastValidFieldValues = reactive(validationFieldOrder.reduce((acc, key) => ({ ...acc, [key]: '' }), {}))
    const blockedFieldMessages = reactive(validationFieldOrder.reduce((acc, key) => ({ ...acc, [key]: '' }), {}))

    function hydrateData() {
      const source = props.officer?.people || {}
      const mapped = {
        e_lastname: source.emergency_lastname || '',
        e_firstname: source.emergency_firstname || '',
        e_gender: source.emergency_gender ?? 1,
        e_relationship: source.emergency_relationship || '',
        e_profession: source.emergency_profession || '',
        e_address: source.emergency_address || '',
        e_phone: source.emergency_phone || '',
        e_email: source.emergency_email || ''
      }

      formData.value = { ...mapped }
      originalSnapshot.value = JSON.parse(JSON.stringify(mapped))
      resetFieldValidationState()
      isInitialLoad.value = true
    }

    function trimValue(value) {
      if (value === null || value === undefined) return ''
      return String(value).trim()
    }

    function hasFieldValue(field) {
      return trimValue(formData.value[field]) !== ''
    }

    function isKhmerOnly(value) {
      const normalized = trimValue(value)
      if (normalized === '') return true
      return /^[\u1780-\u17FF\s]+$/u.test(normalized)
    }

    function isNumericOnly(value) {
      const normalized = trimValue(value)
      if (normalized === '') return true
      return /^[0-9០-៩]+$/.test(normalized)
    }

    function isValidEmail(value) {
      const normalized = trimValue(value)
      if (normalized === '') return true
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)
    }

    function getFieldRestriction(field) {
      const restrictionMap = {
        e_lastname: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) => String(value).replace(/[^\u1780-\u17FF\s]/gu, ''),
          message: 'សូមប្តូរក្ដារចុចទៅជាភាសាខ្មែរ'
        },
        e_firstname: {
          pattern: /^[\u1780-\u17FF\s]+$/u,
          sanitize: (value) => String(value).replace(/[^\u1780-\u17FF\s]/gu, ''),
          message: 'សូមប្តូរក្ដារចុចទៅជាភាសាខ្មែរ'
        },
        e_phone: {
          pattern: /^[0-9០-៩]+$/,
          sanitize: (value) => String(value).replace(/[^0-9០-៩]/g, ''),
          message: 'សូមបំពេញលេខទូរសព្ទជាតួលេខប៉ុណ្ណោះ'
        },
        e_email: {
          pattern: /^[A-Za-z0-9@._%+-]+$/,
          sanitize: (value) => String(value).replace(/[^A-Za-z0-9@._%+-]/g, ''),
          message: 'សូមប្រើតែអក្សរឡាតាំង លេខ និងសញ្ញាអ៊ីមែល'
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
      if (hasFieldValue('e_lastname') && !isKhmerOnly(formData.value.e_lastname)) errors.e_lastname = 'សូមបំពេញគោត្តនាមជាអក្សរខ្មែរ'
      if (hasFieldValue('e_firstname') && !isKhmerOnly(formData.value.e_firstname)) errors.e_firstname = 'សូមបំពេញនាមខ្លួនជាអក្សរខ្មែរ'
      if (hasFieldValue('e_phone') && !isNumericOnly(formData.value.e_phone)) errors.e_phone = 'សូមបំពេញលេខទូរសព្ទជាតួលេខប៉ុណ្ណោះ'
      if (hasFieldValue('e_email') && !isValidEmail(formData.value.e_email)) errors.e_email = 'សូមបំពេញអ៊ីមែលឱ្យបានត្រឹមត្រូវ ឧ. name@example.com'
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

    function fieldInputClass(field) {
      if (validationFieldOrder.includes(field) && shouldHighlightFieldError(field)) {
        return 'validation-input-invalid'
      }
      return 'border-[#D8DEE8]'
    }

    function resetFieldValidationState() {
      validationFieldOrder.forEach((field) => {
        rememberLastValidValue(field, formData.value[field] ?? '')
        clearBlockedFieldMessage(field)
      })
    }

    function validateOptionalFields() {
      if (Object.keys(fieldErrors.value).length > 0) {
        const firstInvalidField = validationFieldOrder.find((field) => Boolean(fieldErrors.value[field])) || ''
        if (firstInvalidField) {
          window.setTimeout(() => validationFieldRefs[firstInvalidField]?.focus?.(), 0)
        }
        return false
      }
      return true
    }

    const isDirty = computed(() => JSON.stringify(formData.value) !== JSON.stringify(originalSnapshot.value))

    async function persistChanges() {
      try {
        if (!isDirty.value) {
          emit('changed', false)
          return true
        }

        if (!validateOptionalFields()) {
          return false
        }

        const officer = JSON.parse(JSON.stringify(props.officer || {}))
        // const payload = JSON.parse(JSON.stringify(props.officer || {}))
        // if (!payload.people) {
        //   payload.people = {}
        // }

        // payload.people.emergency_lastname = formData.value.e_lastname
        // payload.people.emergency_firstname = formData.value.e_firstname
        // payload.people.emergency_gender = formData.value.e_gender
        // payload.people.emergency_relationship = formData.value.e_relationship
        // payload.people.emergency_profession = formData.value.e_profession
        // payload.people.emergency_address = formData.value.e_address
        // payload.people.emergency_phone = formData.value.e_phone
        // payload.people.emergency_email = formData.value.e_email

        // console.log([
        //   "people_id", officer.people.id,
        //   "emergency_lastname" ,  formData.value.e_lastname,
        //   "emergency_firstname" ,  formData.value.e_firstname,
        //   "emergency_gender" ,  formData.value.e_emergency_gender,
        //   "emergency_relationship" ,  formData.value.e_relationship,
        //   "emergency_profession" ,  formData.value.e_profession,
        //   "emergency_address" ,  formData.value.e_address,
        //   "emergency_phone" ,  formData.value.e_phone,
        //   "emergency_email" ,  formData.value.e_email
        // ])

        // const payload = {
        //   officer_id : officer.id,
        //   people : [{
        //     emergency_lastname :  formData.value.e_lastname,
        //     emergency_firstname :  formData.value.e_firstname,
        //     emergency_gender :  formData.value.e_gender,
        //     emergency_relationship :  formData.value.e_relationship,
        //     emergency_profession :  formData.value.e_profession,
        //     emergency_address :  formData.value.e_address,
        //     emergency_phone :  formData.value.e_phone,
        //     emergency_email :  formData.value.e_email
        //   }],
        // }
        const payload = {
            people_id: officer.people.id,
            emergency_lastname :  formData.value.e_lastname,
            emergency_firstname :  formData.value.e_firstname,
            emergency_gender :  formData.value.e_gender,
            emergency_relationship :  formData.value.e_relationship,
            emergency_profession :  formData.value.e_profession,
            emergency_address :  formData.value.e_address,
            emergency_phone :  formData.value.e_phone,
            emergency_email :  formData.value.e_email
          
        };


        console.log( payload )
        

        const response = await store.dispatch('officer/updateemmergency', payload)
        if (!response) {
          return false
        }

        originalSnapshot.value = JSON.parse(JSON.stringify(formData.value))
        resetFieldValidationState()
        emit('changed', false)
        return true
      } catch (error) {
        console.error('Emergency contact save failed:', error)
        return false
      }
    }

    function cancelChanges() {
      hydrateData()
      emit('changed', false)
    }

    function markSaved() {
      originalSnapshot.value = JSON.parse(JSON.stringify(formData.value))
      resetFieldValidationState()
      emit('changed', false)
    }

    // Shallow watch: re-hydrate only when officer ref changes (e.g. refetch).
    // Deep watch would reset local form whenever another section mutates officer.people in place (e.g. parents save).
    watch(() => props.officer, hydrateData, { immediate: true })

    watch(
      formData,
      () => {
        if (isInitialLoad.value) {
          isInitialLoad.value = false
          return
        }
        emit('changed', isDirty.value)
      },
      { deep: true }
    )

    return {
      formData,
      originalSnapshot,
      genderOptions,
      persistChanges,
      cancelChanges,
      markSaved,
      isDirty,
      setValidationFieldRef,
      handleRestrictedKeydown,
      handleRestrictedBeforeInput,
      handleRestrictedPaste,
      handleRestrictedInput,
      getFieldError,
      fieldInputClass
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
</style>
