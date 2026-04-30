<template>
  <div class="rounded-[7px] border border-gray-200 bg-white p-4 font-moul shadow-sm text-left">
    <div
      class="flex gap-2"
      :class="noPositionBreakdown ? 'items-start mb-2' : 'items-center mb-3'"
    >
      <div class="flex-shrink-0 w-9 h-9 rounded-[5px] flex items-center justify-center" :class="iconBgClass">
        <slot name="icon">
          <svg v-if="icon === 'people'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor">
            <path d="M16 8a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3.003 3.003 0 0 1-3 3z"/>
            <path d="M16 2a14 14 0 1 0 14 14A14.016 14.016 0 0 0 16 2zm-6 24.377V25a3.003 3.003 0 0 1 3-3h6a3.003 3.003 0 0 1 3 3v1.377a11.899 11.899 0 0 1-12 0zm13.992-1.451A5.002 5.002 0 0 0 19 20h-6a5.002 5.002 0 0 0-4.992 4.926a12 12 0 1 1 15.985 0z"/>
          </svg>
          <svg v-else-if="icon === 'building'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M4.5 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5h-.75V3.75a.75.75 0 0 0 0-1.5H4.5ZM6 10.5a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10.5Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Zm-9 3.75a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Zm4.5 0a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5h-2.25a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd"/>
          </svg>
          <svg v-else-if="icon === 'document'" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor">
            <path d="M6.25 4.75A2.25 2.25 0 0 0 4 7v14a2.25 2.25 0 0 0 2.25 2.25h13.5A2.25 2.25 0 0 0 22 21V9.376a2.25 2.25 0 0 0-.659-1.591L17.215 2.66A2.25 2.25 0 0 0 15.624 2H6.25zM18.5 9.25V20.25a.75.75 0 0 1-.75.75H6.25a.75.75 0 0 1-.75-.75V7c0-.414.336-.75.75-.75h7.5v-2.5h.69l3.81 3.75z"/>
          </svg>
          <svg v-else class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M2.25 6a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V6Zm3.97 4.72a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 0 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Zm4.28 0a.75.75 0 0 0 0 1.06l1.72 1.72-1.72 1.72a.75.75 0 1 0 1.06 1.06l2.25-2.25a.75.75 0 0 0 0-1.06l-2.25-2.25a.75.75 0 0 0-1.06 0Z" clip-rule="evenodd"/>
          </svg>
        </slot>
      </div>
      <template v-if="noPositionBreakdown">
        <div class="min-w-0 flex-1 flex flex-wrap items-center gap-x-2 gap-y-1">
          <span class="text-base font-medium text-gray-700">{{ title }}</span>
          <span class="text-xl font-bold text-gray-800">{{ valueFormatted }}</span>
          <div
            v-if="genderMaleCount != null && genderFemaleCount != null"
            class="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium"
          >
            <span class="inline-flex items-center gap-1 text-blue-600">
              <svg class="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="6.5" r="3.25" />
                <path d="M12 11.25c-2.35 0-4.25 1.9-4.25 4.25V19h2.1v-3.1c0-1.19.97-2.15 2.15-2.15s2.15.96 2.15 2.15V19h2.1v-3.5c0-2.35-1.9-4.25-4.25-4.25z" />
              </svg>
              <span>ប្រុស {{ genderMaleFormatted }}</span>
            </span>
            <span class="text-gray-300 select-none">|</span>
            <span class="inline-flex items-center gap-1 text-pink-600">
              <svg class="w-5 h-5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="6.5" r="3.25" />
                <path d="M12 11.1c-1.85 0-3.55 1.1-4.25 2.8l-1.65 5.1h2.15l1.1-3.2c.35-.85 1.15-1.4 2.05-1.4h.35c.9 0 1.7.55 2.05 1.4l1.1 3.2h2.15l-1.65-5.1c-.7-1.7-2.4-2.8-4.25-2.8z" />
              </svg>
              <span>ស្រី {{ genderFemaleFormatted }}</span>
            </span>
          </div>
        </div>
      </template>
      <span v-else class="text-base font-medium text-gray-700">{{ title }}</span>
    </div>
    <div v-if="!noPositionBreakdown" class="flex flex-col gap-1">
      <span class="text-2xl font-bold text-gray-800">{{ valueFormatted }}</span>
      <div
        v-if="genderMaleCount != null && genderFemaleCount != null"
        class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium"
      >
        <span class="inline-flex items-center gap-1.5 text-blue-600">
          <svg class="w-7 h-7 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="6.5" r="3.25" />
            <path d="M12 11.25c-2.35 0-4.25 1.9-4.25 4.25V19h2.1v-3.1c0-1.19.97-2.15 2.15-2.15s2.15.96 2.15 2.15V19h2.1v-3.5c0-2.35-1.9-4.25-4.25-4.25z" />
          </svg>
          <span>ប្រុស {{ genderMaleFormatted }}</span>
        </span>
        <span class="text-gray-300 select-none">|</span>
        <span class="inline-flex items-center gap-1.5 text-pink-600">
          <svg class="w-7 h-7 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="6.5" r="3.25" />
            <path d="M12 11.1c-1.85 0-3.55 1.1-4.25 2.8l-1.65 5.1h2.15l1.1-3.2c.35-.85 1.15-1.4 2.05-1.4h.35c.9 0 1.7.55 2.05 1.4l1.1 3.2h2.15l-1.65-5.1c-.7-1.7-2.4-2.8-4.25-2.8z" />
          </svg>
          <span>ស្រី {{ genderFemaleFormatted }}</span>
        </span>
      </div>
    </div>
    <div
      v-if="noPositionBreakdown"
      class="mt-1 flex min-h-[225px] flex-col items-center justify-center rounded-md border border-dashed border-gray-200 bg-gray-50/90 px-3 py-4 text-center"
    >
      <p class="text-sm text-gray-500 leading-relaxed">
        គ្មានការបែងចែកតាមមុខតំណែង
      </p>
    </div>
  </div>
</template>

<script>
import { parseNumber } from '@/utils/khmer'

const iconColorMap = {
  blue: 'bg-blue-100 text-blue-600',
  emerald: 'bg-emerald-100 text-emerald-600',
  amber: 'bg-amber-100 text-amber-600',
  violet: 'bg-violet-100 text-violet-600',
  slate: 'bg-slate-100 text-slate-700'
}

export default {
  name: 'DashboardStatCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: [Number, String],
      default: 0
    },
    icon: {
      type: String,
      default: 'people'
    },
    iconColor: {
      type: String,
      default: 'blue',
      validator: (v) => Object.keys(iconColorMap).includes(v)
    },
    genderMaleCount: {
      type: Number,
      default: null
    },
    genderFemaleCount: {
      type: Number,
      default: null
    },
    noPositionBreakdown: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    iconBgClass() {
      return iconColorMap[this.iconColor] || iconColorMap.blue
    },
    valueFormatted() {
      return parseNumber(Math.max(0, Number(this.value) || 0).toLocaleString('en-US'))
    },
    genderMaleFormatted() {
      return parseNumber(
        Math.max(0, Math.round(Number(this.genderMaleCount) || 0)).toLocaleString('en-US')
      )
    },
    genderFemaleFormatted() {
      return parseNumber(
        Math.max(0, Math.round(Number(this.genderFemaleCount) || 0)).toLocaleString('en-US')
      )
    }
  }
}
</script>
