const PDCV_CACHE_DB_NAME = 'pdcv cache'
const PDCV_CACHE_STORE_NAME = 'key-value'
const PDCV_CACHE_KEY = 'location-pdcv-v1'

export const PDCV_CACHE_TTL_MS = 24 * 60 * 60 * 1000

function openCacheDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null)
      return
    }

    const request = window.indexedDB.open(PDCV_CACHE_DB_NAME, 1)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(PDCV_CACHE_STORE_NAME)) {
        db.createObjectStore(PDCV_CACHE_STORE_NAME)
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export function isPdcvCacheFresh(cached, ttlMs = PDCV_CACHE_TTL_MS) {
  const updatedAt = Number(cached?.updatedAt || 0)
  if (!updatedAt) return false
  const cacheAge = Date.now() - updatedAt
  return cacheAge >= 0 && cacheAge < ttlMs
}

export async function readPdcvCache() {
  const db = await openCacheDatabase()
  if (!db) return null

  return await new Promise((resolve, reject) => {
    const tx = db.transaction(PDCV_CACHE_STORE_NAME, 'readonly')
    const store = tx.objectStore(PDCV_CACHE_STORE_NAME)
    const request = store.get(PDCV_CACHE_KEY)

    request.onsuccess = () => resolve(request.result || null)
    request.onerror = () => reject(request.error)
    tx.oncomplete = () => db.close()
    tx.onerror = () => db.close()
  })
}

export async function writePdcvCache(data) {
  const db = await openCacheDatabase()
  if (!db) return

  await new Promise((resolve, reject) => {
    const tx = db.transaction(PDCV_CACHE_STORE_NAME, 'readwrite')
    const store = tx.objectStore(PDCV_CACHE_STORE_NAME)
    store.put(
      {
        updatedAt: Date.now(),
        data
      },
      PDCV_CACHE_KEY
    )

    tx.oncomplete = () => {
      db.close()
      resolve()
    }
    tx.onerror = () => {
      db.close()
      reject(tx.error)
    }
  })
}
