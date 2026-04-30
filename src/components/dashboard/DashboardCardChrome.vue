<!-- <template>
  <div class="dashboard-card-chrome relative h-full min-w-0">
    <div class="dashboard-card-chrome__actions absolute top-2 right-2 z-20">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button
            quaternary
            circle
            size="small"
            class="dashboard-card-chrome__btn !bg-white/90 shadow-sm ring-1 ring-gray-200/80 hover:!bg-white"
            @click="expandOpen = true"
          >
            <template #icon>
              <svg
                class="w-[18px] h-[18px] text-gray-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <path
                  d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                />
              </svg>
            </template>
          </n-button>
        </template>
        ពង្រីក
      </n-tooltip>
    </div>
    <slot />
    <n-modal
      v-model:show="expandOpen"
      transform-origin="center"
      display-directive="if"
    >
      <div
        class="fixed flex h-screen left-0 top-0 right-0 bottom-0 overflow-hidden bg-white z-40"
      >
        <n-tooltip trigger="hover">
          <template #trigger>
            <div
              class="absolute text-red-500 top-2 right-6 p-2 cursor-pointer bg-opacity-50 hover:bg-opacity-100 duration-300 bg-white shadow-md rounded-full"
              @click="expandOpen = false"
            >
              <svg
                class="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path
                  d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </template>
          បិទ
        </n-tooltip>
      </div>
    </n-modal>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'DashboardCardChrome',
  setup() {
    const expandOpen = ref(false)
    return { expandOpen }
  }
}
</script> -->

<template>
  <div class="dashboard-card-chrome relative h-full min-w-0">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DashboardCardChrome'
}
</script>
