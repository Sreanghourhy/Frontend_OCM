<template>
  <nav
    class="profile-toc-panel flex h-full min-h-0 flex-shrink-0 overflow-visible bg-white select-none"
    :class="{ 'profile-toc-panel--dragging': isDragging }"
    :style="{ width: panelWidthPx + 'px' }"
  >
    <div class="profile-toc-track">
      <button
        type="button"
        class="profile-toc-grip"
        aria-label="អូសដើម្បីពង្រីក ឬបង្រួមបញ្ជី"
        @pointerdown.prevent="onGripPointerDown"
      >
        <!-- Resize handle -->
        <svg
          class="profile-toc-grip-svg"
          width="11"
          height="21"
          viewBox="0 0 15 28"
          aria-hidden="true"
        >
          <rect
            x="1"
            y="1"
            width="13"
            height="26"
            rx="1.75"
            fill="#eceff2"
            stroke="#d4d6db"
            stroke-width="1"
          />
          <circle cx="5.25" cy="8" r="1.05" fill="#1a1a1a" />
          <circle cx="9.75" cy="8" r="1.05" fill="#1a1a1a" />
          <circle cx="5.25" cy="14" r="1.05" fill="#1a1a1a" />
          <circle cx="9.75" cy="14" r="1.05" fill="#1a1a1a" />
          <circle cx="5.25" cy="20" r="1.05" fill="#1a1a1a" />
          <circle cx="9.75" cy="20" r="1.05" fill="#1a1a1a" />
        </svg>
      </button>
    </div>
    <div
      class="profile-toc-menu min-h-0 min-w-0 flex-1 overflow-y-auto py-6 pl-3 pr-2"
      :class="{ 'profile-toc-menu--collapsed': isCollapsed }"
    >
      <div v-for="item in items" :key="item.id" class="profile-toc-group">
        <button
          type="button"
          :class="['profile-toc-item', isItemActive(item) ? 'profile-toc-item-active' : '']"
          :title="isCollapsed ? item.label : undefined"
          @click="$emit('select-section', item.id)"
        >
          <span v-if="!isCollapsed" class="profile-toc-item-label">{{ item.label }}</span>
          <span v-else class="profile-toc-item-letter">{{ shortLabelFor(item) }}</span>
        </button>

        <div
          v-if="!isCollapsed && isSubmenuOpen(item)"
          class="profile-toc-submenu"
        >
          <button
            v-for="child in item.children"
            :key="child.id"
            type="button"
            :class="['profile-toc-subitem', activeId === child.id ? 'profile-toc-subitem-active' : '']"
            @click="$emit('select-section', child.id)"
          >
            <span class="profile-toc-subitem-label">{{ child.label }}</span>
          </button>
        </div>
      </div>
      <button
        type="button"
        class="profile-toc-toggle"
        :title="isCollapsed ? 'បើកម៉ឺនុយ' : 'បិទម៉ឺនុយ'"
        @click="toggleMenu"
      >
        <span v-if="!isCollapsed">បិទម៉ឺនុយ</span>
        <svg
          v-else
          class="profile-toc-toggle-icon"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M15 6l-6 6 6 6"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </div>
  </nav>
</template>

<script>
const STORAGE_KEY = 'officerProfileTocWidth'
const DEFAULT_WIDTH = 220
const MIN_WIDTH = 52
const MAX_WIDTH = 420
const COLLAPSE_AT = 108

export default {
  name: 'ProfileTableOfContent',
  props: {
    items: {
      type: Array,
      default: () => []
    },
    activeId: {
      type: String,
      default: ''
    }
  },
  emits: ['select-section'],
  data() {
    return {
      panelWidthPx: DEFAULT_WIDTH,
      isDragging: false,
      dragStartX: 0,
      dragStartWidth: 0,
      lastExpandedWidthPx: DEFAULT_WIDTH,
      gripCaptureEl: null,
      gripPointerId: null
    }
  },
  computed: {
    isCollapsed() {
      return this.panelWidthPx <= COLLAPSE_AT
    }
  },
  mounted() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw != null) {
        const n = parseInt(raw, 10)
        if (!Number.isNaN(n)) {
          this.panelWidthPx = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, n))
        }
      }
    } catch (e) {}
    this.onMoveBound = this.onGripPointerMove.bind(this)
    this.onUpBound = this.onGripPointerUp.bind(this)
  },
  beforeUnmount() {
    if (this.gripCaptureEl != null && this.gripPointerId != null) {
      try {
        this.gripCaptureEl.releasePointerCapture(this.gripPointerId)
      } catch (e) {}
    }
    this.gripCaptureEl = null
    this.gripPointerId = null
    this.teardownDrag()
  },
  watch: {
    panelWidthPx(w) {
      if (w > COLLAPSE_AT) {
        this.lastExpandedWidthPx = w
      }
      try {
        localStorage.setItem(STORAGE_KEY, String(Math.round(w)))
      } catch (e) {}
    }
  },
  methods: {
    shortLabelFor(item) {
      if (item.shortLabel) return item.shortLabel
      const s = String(item.label || '')
      const m = s.match(/^[\u1780-\u17FF\u17F0-\u17F9]+/)
      return m ? m[0].charAt(0) : s.charAt(0) || '•'
    },
    isItemActive(item) {
      if (this.activeId === item.id) return true
      if (!Array.isArray(item.children) || item.children.length === 0) return false
      return item.children.some((child) => child.id === this.activeId)
    },
    isSubmenuOpen(item) {
      if (!Array.isArray(item.children) || item.children.length === 0) return false
      return this.isItemActive(item)
    },
    toggleMenu() {
      if (this.isCollapsed) {
        this.lastExpandedWidthPx = MAX_WIDTH
        this.panelWidthPx = MAX_WIDTH
        return
      }
      this.lastExpandedWidthPx = this.panelWidthPx
      this.panelWidthPx = MIN_WIDTH
    },
    onGripPointerDown(e) {
      if (e.button !== undefined && e.button !== 0) return
      this.isDragging = true
      this.dragStartX = e.clientX
      this.dragStartWidth = this.panelWidthPx
      this.gripCaptureEl = e.currentTarget
      this.gripPointerId = e.pointerId
      window.addEventListener('pointermove', this.onMoveBound)
      window.addEventListener('pointerup', this.onUpBound)
      window.addEventListener('pointercancel', this.onUpBound)
      try {
        e.currentTarget.setPointerCapture(e.pointerId)
      } catch (err) {}
    },
    onGripPointerMove(e) {
      if (!this.isDragging) return
      const dx = e.clientX - this.dragStartX
      let w = this.dragStartWidth - dx
      w = Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, w))
      this.panelWidthPx = w
    },
    onGripPointerUp() {
      if (this.gripCaptureEl != null && this.gripPointerId != null) {
        try {
          this.gripCaptureEl.releasePointerCapture(this.gripPointerId)
        } catch (err) {}
      }
      this.gripCaptureEl = null
      this.gripPointerId = null
      this.teardownDrag()
    },
    teardownDrag() {
      this.isDragging = false
      window.removeEventListener('pointermove', this.onMoveBound)
      window.removeEventListener('pointerup', this.onUpBound)
      window.removeEventListener('pointercancel', this.onUpBound)
    }
  }
}
</script>

<style scoped>
.profile-toc-panel {
  border-left: 1px solid #d8dee8;
}

.profile-toc-panel--dragging {
  cursor: col-resize;
}

.profile-toc-track {
  position: relative;
  flex-shrink: 0;
  align-self: stretch;
  width: 11px;
  min-height: 0;
  border-right: 1px solid #d8dee8;
}

.profile-toc-grip {
  position: absolute;
  left: 100%;
  top: 50%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  border-radius: 0;
  background: transparent;
  cursor: col-resize;
  touch-action: none;
  line-height: 0;
  transform: translate(-50%, -50%);
}

.profile-toc-grip:hover .profile-toc-grip-svg rect {
  fill: #e5e8ec;
  stroke: #c9cdd4;
}

.profile-toc-grip-svg {
  display: block;
  flex-shrink: 0;
}

.profile-toc-menu {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  font-size: 12px;
}

.profile-toc-menu--collapsed {
  padding-left: 10px;
  padding-right: 8px;
}

.profile-toc-toggle {
  width: 100%;
  margin-top: 10px;
  padding: 10px 8px;
  border: 1px solid #d8dee8;
  border-radius: 3px;
  background: #f8fafc;
  color: #111111;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  text-align: center;
  cursor: pointer;
}

.profile-toc-toggle:hover {
  background: #eef2ff;
}

.profile-toc-menu--collapsed .profile-toc-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  padding: 6px 2px;
  margin-left: -4px;
}

.profile-toc-toggle-icon {
  display: block;
}

.profile-toc-item {
  width: 100%;
  padding: 10px 4px 10px 2px;
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  text-align: left;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  position: relative;
  transition: color 0.15s ease;
}

.profile-toc-item-label {
  font-size: 14px;
}

.profile-toc-menu--collapsed .profile-toc-item {
  text-align: left;
  padding-left: 0;
  padding-right: 0;
  font-weight: 400;
}

.profile-toc-item:hover {
  color: #374151;
}

.profile-toc-item-active {
  color: #1e3a8a;
  font-weight: 600;
  background: transparent;
}

.profile-toc-item-active::before {
  content: '';
  position: absolute;
  left: -12px;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 3px;
  height: calc(100% - 6px);
  min-height: 1.15em;
  border-radius: 1px;
  background: #1e3a8a;
}

.profile-toc-menu--collapsed .profile-toc-item-active::before {
  left: -10px;
}

.profile-toc-item-letter {
  font-size: 16px;
  font-weight: 400;
}

.profile-toc-submenu {
  margin-top: 2px;
  margin-bottom: 6px;
  margin-left: 10px;
  padding-left: 8px;
  border-left: 1px solid #d8dee8;
}

.profile-toc-subitem {
  width: 100%;
  padding: 6px 4px;
  margin: 0;
  text-align: left;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.4;
  cursor: pointer;
}

.profile-toc-subitem:hover {
  color: #374151;
}

.profile-toc-subitem-active {
  color: #1e3a8a;
  font-weight: 600;
}
</style>
