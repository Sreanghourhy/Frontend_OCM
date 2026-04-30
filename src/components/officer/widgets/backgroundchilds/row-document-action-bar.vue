<template>
  <div class="action-toolbar">
    <n-tooltip trigger="hover" placement="top">
      <template #trigger>
        <span class="action-trigger">
          <label
            :for="inputId"
            :class="[
              'action-button',
              uploadPending ? 'action-upload-pending' : 'action-upload'
            ]"
          >
            <svg
              class="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M19.35 10.04A7.49 7.49 0 0 0 12 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 0 0 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5c0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4c0-2.05 1.53-3.76 3.56-3.97l1.07-.11l.5-.95A5.469 5.469 0 0 1 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5l1.53.11A2.98 2.98 0 0 1 22 15c0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"
              />
            </svg>
          </label>
        </span>
      </template>
      {{ uploadPending ? uploadPendingTooltip : uploadTooltip }}
    </n-tooltip>

    <input
      :id="inputId"
      type="file"
      :accept="accept"
      class="hidden"
      @change="handleChange"
    />

    <n-tooltip v-if="!previewDisabled" trigger="hover" placement="top">
      <template #trigger>
        <button
          type="button"
          :class="['action-button', 'action-preview']"
          @click="handlePreview"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M509.2 490.8c-.7-1.3-1.4-1.9-2.2-2c-2.9 3.3-2.2 31.5 2.7 51.4c4-13.6 4.7-40.5-.5-49.4zm-1.6 120.5c-7.7 20-18.8 47.3-32.1 71.4c4-1.6 8.1-3.3 12.3-5c17.6-7.2 37.3-15.3 58.9-20.2c-14.9-11.8-28.4-27.7-39.1-46.2z" fill-opacity=".15" fill="currentColor"></path>
            <path d="M534 352V136H232v752h560V394H576a42 42 0 0 1-42-42zm55 287.6c16.1-1.9 30.6-2.8 44.3-2.3c12.8.4 23.6 2 32 5.1c.2.1.3.1.5.2c.4.2.8.3 1.2.5c.5.2 1.1.4 1.6.7c.1.1.3.1.4.2c4.1 1.8 7.5 4 10.1 6.6c9.1 9.1 11.8 26.1 6.2 39.6c-3.2 7.7-11.7 20.5-33.3 20.5c-21.8 0-53.9-9.7-82.1-24.8c-25.5 4.3-53.7 13.9-80.9 23.1c-5.8 2-11.8 4-17.6 5.9c-38 65.2-66.5 79.4-84.1 79.4c-4.2 0-7.8-.9-10.8-2c-6.9-2.6-12.8-8-16.5-15c-.9-1.7-1.6-3.4-2.2-5.2c-1.6-4.8-2.1-9.6-1.3-13.6l.6-2.7c.1-.2.1-.4.2-.6c.2-.7.4-1.4.7-2.1c0-.1.1-.2.1-.3c4.1-11.9 13.6-23.4 27.7-34.6c12.3-9.8 27.1-18.7 45.9-28.4c15.9-28 37.6-75.1 51.2-107.4c-10.8-41.8-16.7-74.6-10.1-98.6c.9-3.3 2.5-6.4 4.6-9.1c.2-.2.3-.4.5-.6c.1-.1.1-.2.2-.2c6.3-7.5 16.9-11.9 28.1-11.5c16.6.7 29.7 11.5 33 30.1c1.7 8 2.2 16.5 1.9 25.7v.7c0 .5 0 1-.1 1.5c-.7 13.3-3 26.6-7.3 44.7c-.4 1.6-.8 3.2-1.2 5.2l-1 4.1l-.1.3c.1.2.1.3.2.5l1.8 4.5c.1.3.3.7.4 1c.7 1.6 1.4 3.3 2.1 4.8v.1c8.7 18.8 19.7 33.4 33.9 45.1c4.3 3.5 8.9 6.7 13.9 9.8c1.8-.5 3.5-.7 5.3-.9z" fill-opacity=".15" fill="currentColor"></path>
            <path d="M391.5 761c5.7-4.4 16.2-14.5 30.1-34.7c-10.3 9.4-23.4 22.4-30.1 34.7zm270.9-83l.2-.3h.2c.6-.4.5-.7.4-.9c-.1-.1-4.5-9.3-45.1-7.4c35.3 13.9 43.5 9.1 44.3 8.6z" fill-opacity=".15" fill="currentColor"></path>
            <path d="M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM602 137.8L790.2 326H602V137.8zM792 888H232V136h302v216a42 42 0 0 0 42 42h216v494z" fill="currentColor"></path>
            <path d="M535.9 585.3c-.8-1.7-1.5-3.3-2.2-4.9c-.1-.3-.3-.7-.4-1l-1.8-4.5c-.1-.2-.1-.3-.2-.5l.1-.3l.2-1.1c4-16.3 8.6-35.3 9.4-54.4v-.7c.3-8.6-.2-17.2-2-25.6c-3.8-21.3-19.5-29.6-32.9-30.2c-11.3-.5-21.8 4-28.1 11.4c-.1.1-.1.2-.2.2c-.2.2-.4.4-.5.6c-2.1 2.7-3.7 5.8-4.6 9.1c-6.6 24-.7 56.8 10.1 98.6c-13.6 32.4-35.3 79.4-51.2 107.4v.1c-27.7 14.3-64.1 35.8-73.6 62.9c0 .1-.1.2-.1.3c-.2.7-.5 1.4-.7 2.1c-.1.2-.1.4-.2.6c-.2.9-.5 1.8-.6 2.7c-.9 4-.4 8.8 1.3 13.6c.6 1.8 1.3 3.5 2.2 5.2c3.7 7 9.6 12.4 16.5 15c3 1.1 6.6 2 10.8 2c17.6 0 46.1-14.2 84.1-79.4c5.8-1.9 11.8-3.9 17.6-5.9c27.2-9.2 55.4-18.8 80.9-23.1c28.2 15.1 60.3 24.8 82.1 24.8c21.6 0 30.1-12.8 33.3-20.5c5.6-13.5 2.9-30.5-6.2-39.6c-2.6-2.6-6-4.8-10.1-6.6c-.1-.1-.3-.1-.4-.2c-.5-.2-1.1-.4-1.6-.7c-.4-.2-.8-.3-1.2-.5c-.2-.1-.3-.1-.5-.2c-16.2-5.8-41.7-6.7-76.3-2.8l-5.3.6c-5-3-9.6-6.3-13.9-9.8c-14.2-11.3-25.1-25.8-33.8-44.7zM391.5 761c6.7-12.3 19.8-25.3 30.1-34.7c-13.9 20.2-24.4 30.3-30.1 34.7zM507 488.8c.8.1 1.5.7 2.2 2c5.2 8.9 4.5 35.8.5 49.4c-4.9-19.9-5.6-48.1-2.7-51.4zm-19.2 188.9c-4.2 1.7-8.3 3.4-12.3 5c13.3-24.1 24.4-51.4 32.1-71.4c10.7 18.5 24.2 34.4 39.1 46.2c-21.6 4.9-41.3 13-58.9 20.2zm175.4-.9c.1.2.2.5-.4.9h-.2l-.2.3c-.8.5-9 5.3-44.3-8.6c40.6-1.9 45 7.3 45.1 7.4z" fill="currentColor"></path>
          </svg>
        </button>
      </template>
      {{ previewTooltip }}
    </n-tooltip>

    <!-- <n-tooltip v-if="!downloadDisabled" trigger="hover" placement="top">
      <template #trigger>
        <button
          type="button"
          :class="['action-button', 'action-download']"
          @click="handleDownload"
        >
          <svg
            class="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 3v11m0 0l4-4m-4 4l-4-4M4 17.5v.75A1.75 1.75 0 0 0 5.75 20h12.5A1.75 1.75 0 0 0 20 18.25v-.75"
            />
          </svg>
        </button>
      </template>
      {{ downloadTooltip }}
    </n-tooltip> -->

    <template v-if="showRemove">
      <span class="action-divider" aria-hidden="true"></span>

      <n-popconfirm
        :positive-text="positiveText"
        :negative-text="negativeText"
        :positive-button-props="{ type: 'error', size: 'small' }"
        :negative-button-props="{ size: 'small' }"
        @positive-click="$emit('remove')"
      >
        <template #trigger>
          <n-tooltip trigger="hover" placement="top">
            <template #trigger>
              <button type="button" class="action-button action-delete">
                <svg
                  class="w-5 h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M112 112l20 320c.95 18.49 14.4 32 32 32h184c17.67 0 30.87-13.51 32-32l20-320" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>
                  <path stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="32" d="M80 112h352" fill="currentColor"></path>
                  <path d="M192 112V72h0a23.93 23.93 0 0 1 24-24h80a23.93 23.93 0 0 1 24 24h0v40" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32"></path>
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 176v224"></path>
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M184 176l8 224"></path>
                  <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M328 176l-8 224"></path>
                </svg>
              </button>
            </template>
            {{ deleteTooltip }}
          </n-tooltip>
        </template>
        {{ deleteMessage }}
      </n-popconfirm>
    </template>
  </div>
</template>

<script>
export default {
  name: 'RowDocumentActionBar',
  emits: ['select', 'preview', 'download', 'clear', 'remove'],
  props: {
    inputId: {
      type: String,
      required: true
    },
    accept: {
      type: String,
      default: '.pdf,application/pdf'
    },
    uploadPending: {
      type: Boolean,
      default: false
    },
    previewDisabled: {
      type: Boolean,
      default: false
    },
    downloadDisabled: {
      type: Boolean,
      default: false
    },
    clearDisabled: {
      type: Boolean,
      default: false
    },
    showRemove: {
      type: Boolean,
      default: true
    },
    uploadTooltip: {
      type: String,
      default: 'បញ្ជូលឯកសារ'
    },
    uploadPendingTooltip: {
      type: String,
      default: 'បានជ្រើស PDF រួចហើយ។ សូមរក្សាទុកព័ត៌មាន។'
    },
    previewTooltip: {
      type: String,
      default: 'មើលឯកសារយោង។'
    },
    previewDisabledTooltip: {
      type: String,
      default: 'មិនមានឯកសារយោង។'
    },
    downloadTooltip: {
      type: String,
      default: 'ទាញយកឯកសារ'
    },
    downloadDisabledTooltip: {
      type: String,
      default: 'មិនមានឯកសារយោង។'
    },
    clearTooltip: {
      type: String,
      default: 'ដកឯកសារយោងចេញ។'
    },
    clearDisabledTooltip: {
      type: String,
      default: 'មិនមានឯកសារយោង។'
    },
    deleteTooltip: {
      type: String,
      default: 'លុបព័ត៌មាននេះ។'
    },
    deleteMessage: {
      type: String,
      default: 'តើអ្នកចង់លុបទិន្នន័យនេះមែនឬទេ?'
    },
    positiveText: {
      type: String,
      default: 'លុប'
    },
    negativeText: {
      type: String,
      default: 'បោះបង់'
    }
  },
  methods: {
    handleChange(event) {
      const file = event?.target?.files?.[0]
      if (!file) return

      const normalizedType = String(file.type || '').trim().toLowerCase()
      const normalizedName = String(file.name || '').trim().toLowerCase()
      const isPdf = normalizedType === 'application/pdf' || normalizedName.endsWith('.pdf')

      if (!isPdf) {
        window.alert('សូមជ្រើសរើសឯកសារ PDF តែប៉ុណ្ណោះ។')
        event.target.value = ''
        return
      }

      this.$emit('select', file)
      event.target.value = ''
    },
    handlePreview() {
      if (this.previewDisabled) return
      this.$emit('preview')
    },
    handleDownload() {
      if (this.downloadDisabled) return
      this.$emit('download')
    }
  }
}
</script>

<style scoped>
.action-toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
}

.action-trigger {
  display: inline-flex;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  min-height: 32px;
  padding: 4px;
  border-radius: 9999px;
  transition:
    color 0.2s ease,
    opacity 0.2s ease,
    background-color 0.2s ease;
}

.action-button:hover {
  background: #f8fafc;
}

.action-upload {
  color: #16a34a;
  cursor: pointer;
}

.action-upload:hover {
  color: #15803d;
}

.action-upload-pending {
  color: #d97706;
  cursor: pointer;
}

.action-upload-pending:hover {
  color: #b45309;
}

.action-preview {
  color: #2563eb;
}

.action-preview:hover {
  color: #1d4ed8;
}

.action-download {
  color: #6b7280;
}

.action-download:hover {
  color: #475569;
}

.action-clear {
  color: #dc2626;
}

.action-clear:hover {
  color: #b91c1c;
}

.action-delete {
  color: #dc2626;
}

.action-delete:hover {
  color: #b91c1c;
}

.action-button-disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.action-button-disabled:hover {
  background: transparent;
  color: inherit;
}

.action-divider {
  width: 1px;
  height: 16px;
  background: #d8dee8;
}
</style>
