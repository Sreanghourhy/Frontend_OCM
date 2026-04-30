<template>
  <div
    ref="rootRef"
    :class="['date-input-shell', wrapperClass]"
    :style="wrapperStyle"
    @focusin="emitFocus"
    @focusout="emitBlur"
  >
    <n-date-picker
      v-bind="$attrs"
      v-model:value="pickerTimestamp"
      type="date"
      clearable
      :input-readonly="false"
      format="dd MM yyyy"
      calendar-day-format="EEEEE"
      :date-locale="khmerDateLocale"
      :placeholder="placeholder"
      :disabled="disabled"
      :is-date-disabled="isDateDisabled"
      :class="['date-picker-field', 'w-full', inputClass]"
      @update:value="handlePickerValueUpdate"
    />
  </div>
</template>

<script>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { enUS } from 'date-fns/locale'

const khmerWeekdayLetters = [
  '\u1780',
  '\u1781',
  '\u1782',
  '\u1783',
  '\u1784',
  '\u1785',
  '\u1786'
]

const khmerDateLocale = {
  name: 'km-KH-custom',
  locale: {
    ...enUS,
    localize: {
      ...enUS.localize,
      day: (day) => {
        return khmerWeekdayLetters[day] ?? enUS.localize.day(day, { width: 'narrow' })
      }
    }
  }
}

function getLocalMidnightTimestamp(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

function formatToYmd(date) {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseModelValue(value) {
  if (value === null || value === undefined || value === '') {
    return null
  }

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value
  }

  if (typeof value === 'number') {
    const parsedFromNumber = new Date(value)
    return Number.isNaN(parsedFromNumber.getTime()) ? null : parsedFromNumber
  }

  const rawValue = String(value).trim()
  if (rawValue === '') {
    return null
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(rawValue)) {
    const [year, month, day] = rawValue.split('-').map((part) => parseInt(part, 10))
    const parsedFromYmd = new Date(year, month - 1, day)
    return Number.isNaN(parsedFromYmd.getTime()) ? null : parsedFromYmd
  }

  const parsedFromString = new Date(rawValue)
  return Number.isNaN(parsedFromString.getTime()) ? null : parsedFromString
}

function serializeModelValue(value, currentValue, valueType) {
  if (value === null || value === undefined) {
    if (valueType === 'timestamp' || valueType === 'date') {
      return null
    }

    if (valueType === 'ymd') {
      return ''
    }

    return currentValue instanceof Date || typeof currentValue === 'number' ? null : ''
  }

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    if (valueType === 'timestamp' || valueType === 'date') {
      return null
    }

    if (valueType === 'ymd') {
      return ''
    }

    return currentValue instanceof Date || typeof currentValue === 'number' ? null : ''
  }

  const normalizedTimestamp = getLocalMidnightTimestamp(date)

  if (valueType === 'date') {
    return new Date(normalizedTimestamp)
  }

  if (valueType === 'timestamp') {
    return normalizedTimestamp
  }

  if (valueType === 'ymd') {
    return formatToYmd(new Date(normalizedTimestamp))
  }

  if (currentValue instanceof Date) {
    return new Date(normalizedTimestamp)
  }

  if (typeof currentValue === 'number') {
    return normalizedTimestamp
  }

  return formatToYmd(new Date(normalizedTimestamp))
}

function parseCompactDateInput(rawValue, allowedLengths = [6, 8]) {
  const digits = String(rawValue || '').replace(/\D/g, '')

  if (!allowedLengths.includes(digits.length)) {
    return null
  }

  const day = parseInt(digits.slice(0, 2), 10)
  const month = parseInt(digits.slice(2, 4), 10)
  const year = digits.length === 8
    ? parseInt(digits.slice(4, 8), 10)
    : (() => {
      const shortYear = parseInt(digits.slice(4, 6), 10)
      return shortYear >= 50 ? 1900 + shortYear : 2000 + shortYear
    })()

  const parsedDate = new Date(year, month - 1, day)

  if (
    Number.isNaN(parsedDate.getTime())
    || parsedDate.getFullYear() !== year
    || parsedDate.getMonth() !== month - 1
    || parsedDate.getDate() !== day
  ) {
    return null
  }

  return getLocalMidnightTimestamp(parsedDate)
}

export default {
  name: 'OfficerDateInput',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [String, Number, Date, null],
      default: ''
    },
    placeholder: {
      type: String,
      default: 'dd mm yy'
    },
    disabled: {
      type: Boolean,
      default: false
    },
    valueType: {
      type: String,
      default: 'auto'
    },
    inputClass: {
      type: [String, Array, Object],
      default: ''
    },
    wrapperClass: {
      type: [String, Array, Object],
      default: 'relative inline-block align-middle'
    },
    wrapperStyle: {
      type: [String, Object, Array],
      default: null
    },
    min: {
      // Soft-lock: disable dates strictly before this date.
      type: [String, Number, Date, null],
      default: null
    },
    max: {
      // Soft-lock: disable dates strictly after this date.
      type: [String, Number, Date, null],
      default: null
    }
  },
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props, { emit, expose }) {
    const rootRef = ref(null)
    const nativeInputRef = ref(null)
    const pickerTimestamp = ref(null)

    function syncFromModelValue(value) {
      const parsedDate = parseModelValue(value)
      pickerTimestamp.value = parsedDate ? getLocalMidnightTimestamp(parsedDate) : null
    }

    function commitValue(value) {
      pickerTimestamp.value = value
      const serializedValue = serializeModelValue(value, props.modelValue, props.valueType)
      emit('update:modelValue', serializedValue)
      emit('change', serializedValue)
    }

    function handlePickerValueUpdate(value) {
      commitValue(value)
    }

    function handleRawInput(rawValue, allowedLengths) {
      const normalizedRawValue = String(rawValue ?? '')

      if (normalizedRawValue.trim() === '') {
        if (pickerTimestamp.value !== null) {
          commitValue(null)
        }
        return
      }

      const parsedTimestamp = parseCompactDateInput(normalizedRawValue, allowedLengths)

      if (parsedTimestamp !== null) {
        commitValue(parsedTimestamp)
      }
    }

    function handleNativeInput(event) {
      handleRawInput(event?.target?.value, [8])
    }

    function handleNativeCommit(event) {
      handleRawInput(event?.target?.value, [6, 8])
    }

    function bindNativeInput() {
      const nextInput = rootRef.value?.querySelector('.n-input__input-el') ?? null

      if (nativeInputRef.value === nextInput) {
        return
      }

      if (nativeInputRef.value) {
        nativeInputRef.value.removeEventListener('input', handleNativeInput)
        nativeInputRef.value.removeEventListener('change', handleNativeCommit)
        nativeInputRef.value.removeEventListener('blur', handleNativeCommit)
      }

      nativeInputRef.value = nextInput

      if (nativeInputRef.value) {
        nativeInputRef.value.addEventListener('input', handleNativeInput)
        nativeInputRef.value.addEventListener('change', handleNativeCommit)
        nativeInputRef.value.addEventListener('blur', handleNativeCommit)
      }
    }

    function emitFocus(event) {
      emit('focus', event)
    }

    function emitBlur(event) {
      if (rootRef.value?.contains(event?.relatedTarget)) {
        return
      }

      emit('blur', event)
    }

    function normalizeBoundaryTimestamp(boundary) {
      const parsed = parseModelValue(boundary)
      return parsed ? getLocalMidnightTimestamp(parsed) : null
    }

    function isDateDisabled(ts) {
      const time = typeof ts === 'number' ? ts : null
      if (time === null) return false

      const minTs = normalizeBoundaryTimestamp(props.min)
      const maxTs = normalizeBoundaryTimestamp(props.max)

      if (minTs !== null && time < minTs) return true
      if (maxTs !== null && time > maxTs) return true
      return false
    }

    async function focus() {
      if (props.disabled) return

      await nextTick()

      const input = rootRef.value?.querySelector('.n-input__input-el')
      if (input && typeof input.focus === 'function') {
        input.focus()
      }
    }

    watch(
      () => props.modelValue,
      (value) => {
        syncFromModelValue(value)
        void nextTick(bindNativeInput)
      },
      { immediate: true }
    )

    onMounted(() => {
      void nextTick(bindNativeInput)
    })

    onBeforeUnmount(() => {
      if (nativeInputRef.value) {
        nativeInputRef.value.removeEventListener('input', handleNativeInput)
        nativeInputRef.value.removeEventListener('change', handleNativeCommit)
        nativeInputRef.value.removeEventListener('blur', handleNativeCommit)
      }
    })

    expose({
      focus
    })

    return {
      rootRef,
      pickerTimestamp,
      khmerDateLocale,
      isDateDisabled,
      handlePickerValueUpdate,
      emitFocus,
      emitBlur,
      focus
    }
  }
}
</script>

<style scoped>
.date-input-shell {
  position: relative;
  display: inline-flex;
  align-items: stretch;
  vertical-align: middle;
  width: 100%;
}

:deep(.date-picker-field .n-input) {
  min-height: 32px;
  box-sizing: border-box;
  background-color: #fff;
}

:deep(.date-picker-field .n-input__input-el) {
  font: inherit;
  line-height: 1.25;
}

:deep(.date-picker-field .n-date-panel-weekdays__day) {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-height: 32px;
  padding: 4px 2px;
  overflow: hidden;
  font-size: 13px;
  line-height: 1.1;
  letter-spacing: 0;
  font-family: "Battambang", "Kantumruy Pro", sans-serif;
}

:deep(.date-picker-field.validation-input-invalid .n-input) {
  border-color: #dc2626 !important;
  box-shadow: 0 0 0 1px rgba(220, 38, 38, 0.12);
}

:deep(.date-picker-field.changed-field .n-input) {
  border-color: #d8dee8 !important;
  box-shadow: none;
}
</style>
