<template>
  <div class="vcb-pop-create font-ktr">
    <n-modal
      v-bind:show="show"
      :on-esc="handleClose"
      :on-mask-click="handleClose"
      :on-after-enter="initial"
      transform-origin="center"
    >
      <div class="table-loading fixed flex h-screen left-1 top-1 right-1 bottom-1 overflow-hidden bg-white z-40">
        <div v-if="isCompareMode" class="pdf-compare-layout">
          <div class="pdf-compare-column">
            <div class="pdf-compare-header">
              <div class="pdf-compare-title">PDF ចាស់</div>
              <div class="pdf-compare-filename">{{ comparePdf.old.filename || '-' }}</div>
            </div>
            <div class="pdf-compare-body">
              <vue-pdf-embed
                v-if="comparePdf.old.url"
                :source="comparePdf.old.url"
                class="compare-pdf"
                @loaded="() => handleCompareDocumentLoad('old')"
                @rendered="handleCompareDocumentRender"
              />
            </div>
          </div>

          <div class="pdf-compare-column">
            <div class="pdf-compare-header">
              <div class="pdf-compare-title">PDF ថ្មី</div>
              <div class="pdf-compare-filename">{{ comparePdf.new.filename || '-' }}</div>
            </div>
            <div class="pdf-compare-body">
              <vue-pdf-embed
                v-if="comparePdf.new.url"
                :source="comparePdf.new.url"
                class="compare-pdf"
                @loaded="() => handleCompareDocumentLoad('new')"
                @rendered="handleCompareDocumentRender"
              />
            </div>
          </div>
        </div>

        <vue-pdf-embed
          v-else
          :source="pdf.url"
          :page="currentPage"
          class="single-pdf w-full h-screen p-2 overflow-y-auto"
          @password-requested="handlePasswordRequest"
          @loaded="handleDocumentLoad"
          @rendered="handleDocumentRender"
        />

        <Transition name="slide-fade">
          <div v-if="isLoading" class="fixed flex left-0 top-0 right-0 bottom-0 bg-white">
            <div class="flex mx-auto items-center">
              <div class="spinner">
                <svg class="animate-spin w-16 mx-auto text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M304 48c0 26.51-21.49 48-48 48s-48-21.49-48-48s21.49-48 48-48s48 21.49 48 48zm-48 368c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zm208-208c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.49-48-48-48zM96 256c0-26.51-21.49-48-48-48S0 229.49 0 256s21.49 48 48 48s48-21.49 48-48zm12.922 99.078c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.491-48-48-48zm294.156 0c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48c0-26.509-21.49-48-48-48zM108.922 60.922c-26.51 0-48 21.49-48 48s21.49 48 48 48s48-21.49 48-48s-21.491-48-48-48z" fill="currentColor"></path></svg>
                <br /><br />កំពុងអាន...
              </div>
            </div>
          </div>
        </Transition>

        <div v-if="!isCompareMode" class="fixed left-0 right-0 bottom-1 flex flex-wrap">
          <Transition name="slide-fade">
            <div v-if="totalPages > 1 && currentPage != null" class="vcb-table-pagination bg-blue-300 mx-auto">
              <div class="vcb-table-pagination-info font-pvh text-blue-600 p-1">{{ currentPage > 0 ? "ទំព័រទី " + $toKhmer(currentPage) : "" }}</div>
              <div class="vcb-table-pagination-info font-pvh text-blue-600 p-1">{{ totalPages > 0 ? " នៃ " + $toKhmer(totalPages) + " ទំព័រ" : "" }}</div>
              <div class="vcb-pagination-page p-1" @click="goTo(1)">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.29 17.29a.996.996 0 0 0 0-1.41L14.42 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L12.3 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z" fill="currentColor"></path><path d="M11.7 17.29a.996.996 0 0 0 0-1.41L7.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L5.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.38.38 1.01.38 1.4-.01z" fill="currentColor"></path></svg>
              </div>
              <Transition name="slide-fade">
                <div class="vcb-pagination-page p-1" @click="goTo(currentPage - 1)">
                  <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.71 15.88L10.83 12l3.88-3.88a.996.996 0 1 0-1.41-1.41L8.71 11.3a.996.996 0 0 0 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0c.38-.39.39-1.03 0-1.42z" fill="currentColor"></path></svg>
                </div>
              </Transition>
              <Transition name="slide-fade">
                <div class="vcb-pagination-page p-1" @click="goTo(currentPage + 1)">
                  <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z" fill="currentColor"></path></svg>
                </div>
              </Transition>
              <div class="vcb-pagination-page p-1" @click="goTo(totalPages)">
                <svg class="w-5 h-5 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.7 6.71a.996.996 0 0 0 0 1.41L9.58 12L5.7 15.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L7.12 6.71c-.39-.39-1.03-.39-1.42 0z" fill="currentColor"></path><path d="M12.29 6.71a.996.996 0 0 0 0 1.41L16.17 12l-3.88 3.88a.996.996 0 1 0 1.41 1.41l4.59-4.59a.996.996 0 0 0 0-1.41L13.7 6.7c-.38-.38-1.02-.38-1.41.01z" fill="currentColor"></path></svg>
              </div>
            </div>
          </Transition>
        </div>

        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="absolute text-red-500 top-2 right-6 p-2 cursor-pointer bg-opacity-50 hover:bg-opacity-100 duration-300 bg-white shadow-md rounded-full" @click="handleClose">
              <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z" fill="currentColor"></path></svg>
            </div>
          </template>
          បិទឯកសារយោង
        </n-tooltip>

        <n-tooltip v-if="showStoredDownloadButton" trigger="hover">
          <template #trigger>
            <div class="absolute text-slate-600 top-16 right-6 p-2 cursor-pointer bg-opacity-50 hover:bg-opacity-100 duration-300 bg-white shadow-md rounded-full" @click="downloadStoredPdf">
              <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v11m0 0l4-4m-4 4l-4-4M4 17.5v.75A1.75 1.75 0 0 0 5.75 20h12.5A1.75 1.75 0 0 0 20 18.25v-.75" />
              </svg>
            </div>
          </template>
          ទាញយក PDF ចាស់
        </n-tooltip>

        <n-tooltip v-if="!isCompareMode" trigger="hover">
          <template #trigger>
            <div class="absolute text-blue-500 top-2 left-2 p-2 cursor-pointer bg-opacity-50 hover:bg-opacity-100 duration-300 bg-white shadow-md rounded-full" @click="viewPdfAsHorVer">
              <svg v-if="viewMode === false" class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6"></path><path d="M10 18H3"></path><path d="M21 18h-7"></path><path d="M6 15l-3 3l3 3"></path><path d="M18 15l3 3l-3 3"></path></g></svg>
              <svg v-else class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6"></path><path d="M18 14v7"></path><path d="M18 3v7"></path><path d="M15 18l3 3l3-3"></path><path d="M15 6l3-3l3 3"></path></g></svg>
            </div>
          </template>
          {{ viewMode === true ? "បង្ហាញពេញជំហរ" : "បង្ហាញពេញផ្ដេក" }}
        </n-tooltip>
      </div>
    </n-modal>
  </div>
</template>

<script>
import axios from 'axios'
import { computed, reactive, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useNotification } from 'naive-ui'
import VuePdfEmbed from 'vue-pdf-embed'
import { getAuthorization } from '../../../../plugins/authentication'

export default {
  components: {
    VuePdfEmbed
  },
  props: {
    model: {
      type: Object
    },
    record: {
      type: Object
    },
    show: {
      type: Boolean,
      default: false
    },
    onClose: {
      type: Function
    }
  },
  setup(props) {
    const notify = useNotification()
    const store = useStore()
    const pdf = reactive({
      viewer: false,
      filename: '',
      url: ''
    })
    const comparePdf = reactive({
      old: {
        filename: '',
        url: ''
      },
      new: {
        filename: '',
        url: ''
      }
    })

    const isLoading = ref(true)
    const currentPage = ref(null)
    const totalPages = ref(null)
    const showAllPages = ref(false)
    const viewMode = ref(false)
    const isCompareMode = ref(false)
    const localObjectUrls = ref([])
    const compareLoadedState = reactive({
      old: false,
      new: false
    })
    const previewRequestId = ref(0)

    const showStoredDownloadButton = computed(() => {
      if (!isCompareMode.value) return false
      return parseInt(props.record?.id || 0) > 0 && Boolean(comparePdf.old.url)
    })

    function resetViewerState() {
      isLoading.value = true
      currentPage.value = null
      totalPages.value = null
      compareLoadedState.old = false
      compareLoadedState.new = false
    }

    function resetCompareState() {
      isCompareMode.value = false
      comparePdf.old.filename = ''
      comparePdf.old.url = ''
      comparePdf.new.filename = ''
      comparePdf.new.url = ''
    }

    function revokeLocalObjectUrls() {
      if (!Array.isArray(localObjectUrls.value) || localObjectUrls.value.length <= 0) return
      localObjectUrls.value.forEach((url) => {
        if (!url) return
        window.URL.revokeObjectURL(url)
      })
      localObjectUrls.value = []
    }

    function createLocalObjectUrl(file) {
      const objectUrl = window.URL.createObjectURL(file)
      localObjectUrls.value.push(objectUrl)
      return objectUrl
    }

    function hasStoredPdfValue(value) {
      if (value === true || value === 1) return true
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

    function resolveLocalPdfFile(record) {
      if (!record || typeof record !== 'object') return null

      const candidates = [
        record.__localPdfFile,
        record.pendingPdfFile,
        record._localPdfFile,
        record.file,
        record.pdf
      ]

      return candidates.find((item) => typeof Blob !== 'undefined' && item instanceof Blob) || null
    }

    function isDirectPdfUrl(value) {
      const source = String(value || '').trim()
      if (!source) return false

      return (
        source.startsWith('blob:') ||
        source.startsWith('data:application/pdf') ||
        source.startsWith('/') ||
        /^https?:\/\//i.test(source)
      )
    }

    function resolvePdfFilename(record, localFile = null) {
      return String(
        localFile?.name ||
        record?.filename ||
        (typeof record?.pdf === 'string' ? record.pdf : '') ||
        'attachment.pdf'
      ).trim() || 'attachment.pdf'
    }

    function resolveStoredPdfFilename(record) {
      return String(
        record?.__storedPdfLabel ||
        record?._storedPdf ||
        record?.filename ||
        (typeof record?.pdf === 'string' ? record.pdf : '') ||
        'attachment.pdf'
      ).trim() || 'attachment.pdf'
    }

    function shouldCompareWithStoredPdf(record, localFile) {
      if (!(typeof File !== 'undefined' && localFile instanceof File)) return false
      if (record?.__compareStoredPdf === true) return true
      if (parseInt(record?.id || 0) <= 0) return false
      return hasStoredPdfValue(record?.__storedPdfLabel || record?._storedPdf || record?.pdf)
    }

    function handleDocumentLoad({ numPages }) {
      if (isCompareMode.value) return
      currentPage.value = parseInt(numPages) > 0 ? 1 : null
      totalPages.value = numPages
    }

    function handleCompareDocumentLoad(type) {
      compareLoadedState[type] = true
      if (compareLoadedState.old && compareLoadedState.new) {
        setTimeout(() => {
          if (isLoading.value) {
            isLoading.value = false
          }
        }, 200)
      }
    }

    function goTo(page) {
      if (isLoading.value === false) {
        isLoading.value = true
      }

      setTimeout(() => {
        currentPage.value = page
      }, 100)
    }

    function handleDocumentRender() {
      if (isCompareMode.value) return

      setTimeout(() => {
        if (isLoading.value === true) {
          isLoading.value = false
        }
      }, 200)

      const pdfEmbededPage = document.getElementsByClassName('vue-pdf-embed__page')
      if (pdfEmbededPage.length <= 0) return

      const pdfEmbeded = pdfEmbededPage[0]
      if (!pdfEmbeded?.children?.length) return

      for (const child of Array.from(pdfEmbeded.children || [])) {
        if (child?.nodeName !== 'CANVAS') continue
        child.style.cssText = viewMode.value === false
          ? 'display: block; width: auto; height: 98vh; margin: auto; border: 1px solid #CACACA;'
          : 'display: block; width: 98%; height: auto; margin: auto; border: 1px solid #CACACA;'
      }
    }

    function handleCompareDocumentRender() {
      if (!isCompareMode.value) return

      setTimeout(() => {
        if (compareLoadedState.old && compareLoadedState.new && isLoading.value) {
          isLoading.value = false
        }
      }, 200)
    }

    function viewPdfAsHorVer() {
      isLoading.value = true
      setTimeout(() => {
        viewMode.value = !viewMode.value
        handleDocumentRender()
      }, 200)
    }

    function handlePasswordRequest({ callback, isWrongPassword }) {
      callback(prompt(isWrongPassword ? 'Enter password again' : 'Enter password'))
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

    function normalizeDownloadFilename(filename, fallback = 'attachment.pdf') {
      const value = String(filename || fallback).trim() || fallback
      const sanitized = value.replace(/[\\/:*?"<>|]+/g, '_')
      if (/\.pdf$/i.test(sanitized)) return sanitized
      return `${sanitized}.pdf`
    }

    async function downloadRemoteFile(url, filename) {
      const response = await axios({
        method: 'GET',
        url,
        responseType: 'blob',
        headers: {
          Authorization: getAuthorization()
        }
      })

      const blob = response?.data
      if (!(blob instanceof Blob)) {
        throw new Error('Failed to fetch attachment blob')
      }

      const objectUrl = window.URL.createObjectURL(blob)
      triggerBrowserDownload(objectUrl, normalizeDownloadFilename(filename))
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000)
    }

    async function downloadStoredPdf() {
      if (!props.model?.name || parseInt(props.record?.id || 0) <= 0) return

      try {
        const res = await store.dispatch(`${props.model.name}/pdf`, { id: parseInt(props.record.id) })
        const fileUrl = res?.data?.pdf
        if (!fileUrl) {
          throw new Error('Attachment file URL is missing')
        }

        await downloadRemoteFile(
          fileUrl,
          comparePdf.old.filename || resolveStoredPdfFilename(props.record) || res?.data?.filename
        )
      } catch (err) {
        notify.error({
          title: 'ទាញយកឯកសារ',
          content: err?.response?.data?.message || 'មានបញ្ហាពេលទាញយកឯកសារចាស់។',
          duration: 3000
        })
      }
    }

    async function pdfPreview() {
      const record = props.record
      const requestId = previewRequestId.value + 1
      previewRequestId.value = requestId

      resetViewerState()
      resetCompareState()
      revokeLocalObjectUrls()

      if (!record) return

      const localPdfFile = resolveLocalPdfFile(record)
      const localPdfUrl = localPdfFile ? createLocalObjectUrl(localPdfFile) : ''

      if (localPdfFile && shouldCompareWithStoredPdf(record, localPdfFile) && props.model?.name) {
        try {
          const res = await store.dispatch(`${props.model.name}/pdf`, { id: parseInt(record.id) })
          if (!props.show || previewRequestId.value !== requestId) return

          const fileUrl = res?.data?.pdf || ''
          if (fileUrl) {
            comparePdf.old.filename = resolveStoredPdfFilename(record) || res?.data?.filename
            comparePdf.old.url = fileUrl
            comparePdf.new.filename = resolvePdfFilename(record, localPdfFile)
            comparePdf.new.url = localPdfUrl
            isCompareMode.value = true
            return
          }
        } catch (err) {
          notify.warning({
            title: 'បង្ហាញឯកសារយោង',
            content: 'មិនអាចបង្ហាញឯកសារចាស់សម្រាប់ប្រៀបធៀបបានទេ។ បង្ហាញតែឯកសារថ្មីជំនួស។',
            duration: 3000
          })
        }
      }

      if (localPdfFile) {
        if (!props.show || previewRequestId.value !== requestId) return
        pdf.filename = resolvePdfFilename(record, localPdfFile)
        pdf.url = localPdfUrl
        pdf.viewer = true
        return
      }

      const directPdfUrl = isDirectPdfUrl(record?.pdf) ? String(record.pdf).trim() : ''
      if (directPdfUrl && parseInt(record?.id || 0) <= 0) {
        pdf.filename = resolvePdfFilename(record)
        pdf.url = directPdfUrl
        pdf.viewer = true
        return
      }

      if (record?.pdf && parseInt(record?.id || 0) > 0 && props.model?.name) {
        try {
          const res = await store.dispatch(`${props.model.name}/pdf`, { id: record.id })
          if (!props.show || previewRequestId.value !== requestId) return

          pdf.filename = resolveStoredPdfFilename(record) || res?.data?.filename
          pdf.url = res?.data?.pdf || ''
          pdf.viewer = true
        } catch (err) {
          notify.error({
            title: 'បង្ហាញឯកសារយោង',
            content: err?.response?.data?.message || 'មានបញ្ហាពេលបង្ហាញឯកសារ។',
            duration: 3000
          })
        }
        return
      }

      notify.info({
        title: 'ឯកសារយោង',
        description: 'មិនមានឯកសារយោងសម្រាប់បង្ហាញ',
        duration: 3000
      })
    }

    function closePdf() {
      previewRequestId.value += 1
      revokeLocalObjectUrls()
      pdf.filename = ''
      pdf.url = ''
      pdf.viewer = false
      viewMode.value = false
      resetCompareState()
      resetViewerState()
    }

    function handleClose() {
      closePdf()
      if (typeof props.onClose === 'function') {
        props.onClose()
      }
    }

    function initial() {
      pdfPreview()
    }

    watch(() => props.show, (value) => {
      if (!value) {
        closePdf()
      }
    })

    return {
      initial,
      pdf,
      comparePdf,
      isLoading,
      currentPage,
      totalPages,
      showAllPages,
      viewMode,
      isCompareMode,
      showStoredDownloadButton,
      handleDocumentLoad,
      handleCompareDocumentLoad,
      handleDocumentRender,
      handleCompareDocumentRender,
      handlePasswordRequest,
      goTo,
      viewPdfAsHorVer,
      downloadStoredPdf,
      closePdf,
      handleClose
    }
  }
}
</script>

<style scoped>
.single-pdf :deep(.vue-pdf-embed__page canvas) {
  width: auto !important;
  height: 100vh !important;
}

.pdf-compare-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  height: 100%;
  padding: 16px 76px 16px 16px;
  overflow-y: auto;
}

.pdf-compare-column {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: #fff;
  border: 1px solid #d8dee8;
  border-radius: 8px;
  overflow: hidden;
}

.pdf-compare-header {
  padding: 12px 16px;
  border-bottom: 1px solid #e5e7eb;
  background: #f8fafc;
}

.pdf-compare-title {
  font-size: 14px;
  font-weight: 700;
  color: #1e3a8a;
}

.pdf-compare-filename {
  margin-top: 4px;
  font-size: 12px;
  color: #64748b;
  word-break: break-all;
}

.pdf-compare-body {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 12px;
}

.compare-pdf :deep(.vue-pdf-embed__page canvas) {
  display: block;
  width: 100% !important;
  height: auto !important;
  margin: 0 auto 12px;
  border: 1px solid #cacaca;
}

@media (max-width: 960px) {
  .pdf-compare-layout {
    grid-template-columns: 1fr;
    padding-right: 16px;
  }
}
</style>
