import axios from 'axios'
import { ref } from 'vue'
import { getAuthorization } from '../../../../plugins/authentication'

export function useRowDocumentUpload(store, uploadAction) {
  const documentFileMap = ref({})
  const clearStoredPdfMap = ref({})
  const originalNameStorageKey = `row-document-original-name:${uploadAction}`

  function readOriginalNameMap() {
    try {
      const raw = window.localStorage.getItem(originalNameStorageKey)
      const parsed = raw ? JSON.parse(raw) : {}
      return parsed && typeof parsed === 'object' ? parsed : {}
    } catch (error) {
      return {}
    }
  }

  function writeOriginalNameMap(value) {
    try {
      window.localStorage.setItem(originalNameStorageKey, JSON.stringify(value || {}))
    } catch (error) {}
  }

  function getPersistedOriginalFilename(recordId) {
    const normalizedId = parseInt(recordId || 0)
    if (normalizedId <= 0) return ''
    const storedValue = readOriginalNameMap()[normalizedId]
    return storedFileLabel(storedValue || '')
  }

  function rememberOriginalFilename(recordId, filename) {
    const normalizedId = parseInt(recordId || 0)
    const normalizedFilename = storedFileLabel(filename || '')
    if (normalizedId <= 0 || !normalizedFilename) return

    const map = readOriginalNameMap()
    map[normalizedId] = normalizedFilename
    writeOriginalNameMap(map)
  }

  function forgetOriginalFilename(recordId) {
    const normalizedId = parseInt(recordId || 0)
    if (normalizedId <= 0) return

    const map = readOriginalNameMap()
    if (!Object.prototype.hasOwnProperty.call(map, normalizedId)) return
    delete map[normalizedId]
    writeOriginalNameMap(map)
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

  function isPdfFile(file) {
    if (!file) return false
    const normalizedType = String(file.type || '').trim().toLowerCase()
    const normalizedName = String(file.name || '').trim().toLowerCase()
    return normalizedType === 'application/pdf' || normalizedName.endsWith('.pdf')
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

  function resolveDownloadFilename(row, apiFilename, rowId) {
    const persistedLabel = getPersistedOriginalFilename(rowId)
    const rowLabel = storedFileLabel(row?._storedPdf || row?.pdf || '')
    const serverLabel = storedFileLabel(apiFilename || '')

    if (persistedLabel) return normalizeDownloadFilename(persistedLabel)
    if (rowLabel) return normalizeDownloadFilename(rowLabel)
    if (serverLabel) return normalizeDownloadFilename(serverLabel)
    return normalizeDownloadFilename(`attachment-${rowId}.pdf`)
  }

  function resolveStoredDisplayName(recordId, storedValue) {
    return getPersistedOriginalFilename(recordId) || storedFileLabel(storedValue)
  }

  function onDocumentFileChange(row, file) {
    if (!row || !file) return
    if (!isPdfFile(file)) {
      window.alert('សូមជ្រើសរើសឯកសារ PDF តែប៉ុណ្ណោះ។')
      return
    }
    documentFileMap.value[row._key] = file
    delete clearStoredPdfMap.value[row._key]
    row.pdf = file.name
  }

  function buildPreviewRecord(row) {
    if (!row) return null

    const localFile = documentFileMap.value[row._key]
    const hasLocalFile = typeof File !== 'undefined' && localFile instanceof File
    const storedValue = row._storedPdf !== undefined ? row._storedPdf : row.pdf
    const hasStoredPdf = parseInt(row.id || 0) > 0 && hasStoredPdfValue(storedValue)

    return {
      ...row,
      __localPdfFile: hasLocalFile ? localFile : null,
      __storedPdfLabel: hasStoredPdf ? storedValue : '',
      __compareStoredPdf: Boolean(hasLocalFile && hasStoredPdf)
    }
  }

  function clearDocumentFile(row) {
    if (!row) return
    const hasPendingLocalFile = Boolean(documentFileMap.value[row._key])
    delete documentFileMap.value[row._key]

    if (hasPendingLocalFile) {
      // If user just picked a new file, `x` should only cancel that pick.
      row.pdf = row._storedPdf || ''
      return
    }

    // No pending local file means user wants to remove the currently stored file.
    forgetOriginalFilename(row?.id)
    row.pdf = ''
    row._storedPdf = ''
    clearStoredPdfMap.value[row._key] = true
  }

  function documentFileTypeLabel(rowKey) {
    const file = documentFileMap.value[rowKey]
    if (!file) return ''
    return 'PDF'
  }

  function resetDocumentFiles() {
    documentFileMap.value = {}
    clearStoredPdfMap.value = {}
  }

  function rowHasPreview(row) {
    if (!row) return false
    if (typeof File !== 'undefined' && documentFileMap.value[row._key] instanceof File) return true

    const storedValue = row._storedPdf !== undefined ? row._storedPdf : row.pdf
    return parseInt(row.id || 0) > 0 && hasStoredPdfValue(storedValue)
  }

  function rowHasDownload(row) {
    if (!row) return false
    if (typeof File !== 'undefined' && documentFileMap.value[row._key] instanceof File) {
      return false
    }

    const storedValue = row._storedPdf !== undefined ? row._storedPdf : row.pdf
    return parseInt(row.id || 0) > 0 && hasStoredPdfValue(storedValue)
  }

  function shouldClearStoredPdf(rowKey) {
    return Boolean(clearStoredPdfMap.value[rowKey])
  }

  async function uploadDocumentIfNeeded(recordId, row) {
    const file = documentFileMap.value[row?._key]
    if (!file || parseInt(recordId || 0) <= 0) return

    const originalFilename = file.name || ''
    const formData = new FormData()
    formData.append('id', String(recordId))
    formData.append('file', file)
    const response = await store.dispatch(uploadAction, formData)
    rememberOriginalFilename(recordId, originalFilename)
    delete documentFileMap.value[row._key]
    delete clearStoredPdfMap.value[row._key]
    return response
  }

  async function downloadDocument(row, pdfAction) {
    if (!row) return false

    const localFile = documentFileMap.value[row._key]
    if (localFile instanceof File) {
      const objectUrl = window.URL.createObjectURL(localFile)
      triggerBrowserDownload(objectUrl, localFile.name || 'attachment.pdf')
      window.setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000)
      return true
    }

    const rowId = parseInt(row.id || 0)
    if (rowId <= 0 || !rowHasPreview(row) || !pdfAction) {
      return false
    }

    const res = await store.dispatch(pdfAction, { id: rowId })
    const fileUrl = res?.data?.pdf
    if (!fileUrl) {
      throw new Error('Attachment file URL is missing')
    }

    const downloadFilename = resolveDownloadFilename(row, res?.data?.filename, rowId)

    await downloadRemoteFile(fileUrl, downloadFilename)

    return true
  }

  return {
    documentFileMap,
    storedFileLabel,
    onDocumentFileChange,
    clearDocumentFile,
    documentFileTypeLabel,
    buildPreviewRecord,
    resetDocumentFiles,
    rowHasPreview,
    rowHasDownload,
    shouldClearStoredPdf,
    resolveStoredDisplayName,
    uploadDocumentIfNeeded,
    downloadDocument
  }
}
