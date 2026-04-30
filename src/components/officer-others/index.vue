<template>
  <div class="absolute left-0 top-12 right-0 flex bottom-0 flex-wrap system-layout">
    <div class="flex-1 min-h-0 min-w-0 overflow-hidden flex flex-col relative">
      <router-view v-if="$hasPermission('portal_staff_listing')" v-slot="{ Component }">
        <transition :name="$route.meta.transition || 'slide-fade'" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <float-top-menu :title="' '" />
    <sidebar />
  </div>
</template>
<script >
import ocmLogoUrl from '@assets/logo.svg'
import FloatTopMenu from '@components/menu/topmenu-float-items.vue'
import Sidebar from '@components/widgets/Sidebar.vue'
import Footer from '@components/footer/copy-right.vue'
export default {
  watch: {
  },
  components: {
    FloatTopMenu ,
    Sidebar ,
    Footer ,
    ocmLogoUrl
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.system-layout {
  margin-left: 60px;
  transition: margin-left 0.2s ease;
}
.app_snav_open .system-layout {
  margin-left: 230px;
}
</style>
