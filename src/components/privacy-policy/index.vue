<template>
  <div class="privacy-policy-layout absolute left-0 top-12 right-0 bottom-0">
    <div class="system-layout h-full">
      <div class="privacy-shell h-full p-4 sm:p-6">
        <div class="privacy-stage">
          <div class="privacy-card-wrap">
            <div class="relative privacy-card p-14 sm:p-20 lg:p-24">
              <div class="w-24 mx-auto my-4">
                <img :src="logo" alt="OCM Logo" class="w-full" />
              </div>
              <div class="w-full font-moul text-center leading-9 text-xs text-slate-700">
                ក្រោមការណែនាំដ៏ខ្ពង់ខ្ពស់របស់<br />
                ឧបនាយករដ្ឋមន្ត្រី រដ្ឋមន្ត្រីទទួលបន្ទុកទីស្ដីការគណៈរដ្ឋមន្ត្រី
              </div>
              <div class="font-tacteing w-full text-center h-4 leading-4 text-4xl text-amber-700">6</div>
              <div class="w-full text-center font-moul leading-9 text-xs text-slate-700">
                {{ systemName }}<br />
                អភិវឌ្ឍន៍ដោយ<br />
                អគ្គនាយកដ្ឋានបរិវត្តកម្មឌីជីថល<br />
                កំណែប្រែ ១.០
              </div>
              <FrameCorner4Component />
            </div>
          </div>

          <div class="w-full py-1 text-gray-500 mx-auto break-words print:hidden">
            <div class="text-center copy-rightleading-9 flex cursor-pointer justify-center flex-wrap text-gray-500" @click="togglePolicy = true">
              <div class="mx-2 p-1 h-5 text-xs">
                &copy; រក្សារសិទ្ធិគ្រប់យ៉ាង {{ $toKhmer(dateFormat(new Date(), 'yyyy')) }}
              </div>
              <div class="mx-2 p-1 h-5 text-xs">ទីស្ដីការគណៈរដ្ឋមន្ត្រី</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <n-modal v-model:show="togglePolicy" class="privacy-modal" :block-scroll="false">
      <div v-if="togglePolicy" class="relative privacy-modal-card p-14 sm:p-20 lg:p-24">
        <div class="w-24 mx-auto my-4">
          <img :src="logo" alt="OCM Logo" class="w-full" />
        </div>
        <div class="w-full font-moul text-center leading-9 text-xs text-slate-700">
          ក្រោមការណែនាំដ៏ខ្ពង់ខ្ពស់របស់<br />
          ឧបនាយករដ្ឋមន្ត្រី រដ្ឋមន្ត្រីទទួលបន្ទុកទីស្ដីការគណៈរដ្ឋមន្ត្រី
        </div>
        <div class="font-tacteing w-full text-center h-4 leading-4 text-4xl text-amber-700">6</div>
        <div class="w-full text-center font-moul leading-9 text-xs text-slate-700">
          {{ systemName }}<br />
          អភិវឌ្ឍន៍ដោយ<br />
          អគ្គនាយកដ្ឋានបរិវត្តកម្មឌីជីថល<br />
          កំណែប្រែ ១.០
        </div>
        <FrameCorner4Component />
      </div>
    </n-modal>

    <float-top-menu title="គោលការណ៍ឯកជនភាព" />
    <sidebar />
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import dateFormat from 'dateformat'
import logo from '@assets/logo.svg'
import FloatTopMenu from '@components/menu/topmenu-float-items.vue'
import Sidebar from '@components/widgets/Sidebar.vue'
import FrameCorner4Component from '@components/widgets/frame/corner4.vue'

export default {
  name: 'PrivacyPolicyPage',
  components: {
    FloatTopMenu,
    Sidebar,
    FrameCorner4Component
  },
  setup() {
    const store = useStore()
    const togglePolicy = ref(false)

    const systemName = computed(() => {
      return store.state.system.name !== '' ? store.state.system.name : 'ប្រព័ន្ធបណ្ដុំឯកសារ'
    })

    return {
      dateFormat,
      logo,
      systemName,
      togglePolicy
    }
  }
}
</script>

<style scoped>
.privacy-policy-layout {
  background:
    radial-gradient(circle at top left, rgba(37, 99, 235, 0.08), transparent 28%),
    linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%);
}

.system-layout {
  margin-left: 60px;
  height: 100%;
  transition: margin-left 0.2s ease;
}

.app_snav_open .system-layout {
  margin-left: 230px;
}

.privacy-shell {
  min-height: 100%;
}

.privacy-stage {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 18px;
}

.privacy-card-wrap {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.privacy-card {
  width: min(100%, 980px);
  min-height: 620px;
  overflow: hidden;
  border-radius: 0;
  background: #ffffff;
  box-shadow: none;
}

.privacy-modal-card {
  width: min(1120px, calc(100vw - 48px));
  min-height: 680px;
  margin: 24px auto;
  overflow: hidden;
  border-radius: 0;
  background: #ffffff;
  box-shadow: none;
}

@media (max-width: 640px) {
  .privacy-stage {
    gap: 12px;
  }

  .privacy-card {
    width: min(100%, 760px);
    min-height: 500px;
  }

  .privacy-modal-card {
    width: calc(100vw - 24px);
    min-height: 520px;
    margin: 12px auto;
  }
}
</style>
