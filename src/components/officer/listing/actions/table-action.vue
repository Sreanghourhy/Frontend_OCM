<template>
  <div class="actions">
    <Transition name="slide-fade">
      <div v-if="show" class="panel">
        <!-- Visible main actions: View (primary) and Edit (secondary) -->
        <div class="inline-flex items-center gap-2">
          <button
            v-if="$hasPermission('portal_staff_background_information')"
            @click="showDetailModal(record)"
            :title="'ប្រវត្តរូបមន្ត្រី'"
            class="btn-view"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M248 64C146.39 64 64 146.39 64 248s82.39 184 184 184s184-82.39 184-184S349.61 64 248 64z"
                fill="none"
                stroke="currentColor"
                stroke-miterlimit="10"
                stroke-width="32"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M220 220h32v116"
              ></path>
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-miterlimit="10"
                stroke-width="32"
                d="M208 340h88"
              ></path>
              <path
                d="M248 130a26 26 0 1 0 26 26a26 26 0 0 0-26-26z"
                fill="currentColor"
              ></path>
            </svg>
          </button>

          <button
            v-if="$hasPermission('portal_staff_updating')"
            @click="showEditModal(record)"
            :title="'កែប្រែ'"
            class="btn-edit"
          >
            <svg
              class="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <g fill="none">
                <path
                  d="M4 15h5.986c-.227.3-.4.639-.51 1H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5.232c-.326.14-.631.343-.897.609L15 9.944V4a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1zm8-9.5a.5.5 0 0 1 1 0v6.444l-.88.88A.498.498 0 0 1 12 12.5v-7zm-7 2a.5.5 0 0 1 1 0v5a.5.5 0 0 1-1 0v-5zM9 9a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 1 0v-3A.5.5 0 0 0 9 9zm1.98 6.377l4.83-4.83a1.87 1.87 0 1 1 2.645 2.646l-4.83 4.829a2.197 2.197 0 0 1-1.02.578l-1.498.374a.89.89 0 0 1-1.079-1.078l.375-1.498c.096-.386.296-.74.578-1.02z"
                  fill="currentColor"
                ></path>
              </g>
            </svg>
          </button>

          <!-- Kebab / overflow menu -->
          <div class="relative" ref="kebabRoot">
            <button
              @click="toggleKebab"
              :title="'មុខងារច្រើនទៀត'"
              class="btn-kebab"
              ref="kebabBtn"
            >
              <svg
                class="w-4 h-4"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="5" r="1.5" fill="currentColor" />
                <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                <circle cx="12" cy="19" r="1.5" fill="currentColor" />
              </svg>
            </button>

            <div v-if="kebabOpen" ref="kebabDropdown" class="kebab-dropdown">
              <ul class="py-1">
                <li v-if="$hasPermission('portal_staff_profile_photo_change')">
                  <button @click="onProfileClick(record)" class="kebab-item">
                    ប្ដូររូបភាព
                  </button>
                </li>
                <li
                  v-if="
                    $hasPermission('portal_staff_print_preview_officer_card')
                  "
                >
                  <button
                    @click="onPreviewCardClick(record)"
                    class="kebab-item"
                  >
                    កាតសម្គាល់ខ្លួនសម្រាប់បោះចេញ
                  </button>
                </li>
                <li
                  v-if="
                    $hasPermission('portal_staff_print_preview_officer_card')
                  "
                >
                  <button
                    @click="onOfficialCardClick(record)"
                    class="kebab-item"
                  >
                    កាតសម្គាល់ខ្លួន
                  </button>
                </li>
                <li v-if="$hasPermission('portal_staff_delete')">
                  <button
                    @click="onDeleteClick(record)"
                    class="kebab-item kebab-item-danger"
                  >
                    លុបព័ត៌មានนี้
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <n-tooltip v-if="!show" trigger="hover">
      <template #trigger>
        <div
          class="action-toggle bg-gray-200 hover:bg-blue-500 duration-500 hover:text-gray-50"
          @click="toggleActions"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M8.12 9.29L12 13.17l3.88-3.88a.996.996 0 1 1 1.41 1.41l-4.59 4.59a.996.996 0 0 1-1.41 0L6.7 10.7a.996.996 0 0 1 0-1.41c.39-.38 1.03-.39 1.42 0z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </template>
      មុខងារផ្សេងៗ
    </n-tooltip>
    <n-tooltip
      v-if="!show && record.card != undefined && record.card != null"
      trigger="hover"
    >
      <template #trigger>
        <svg
          class="absolute right-8 top-1 w-5 h-5 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 28 28"
        >
          <g fill="none">
            <path
              d="M15 11.75a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 0 1.5h-5.5a.75.75 0 0 1-.75-.75zm.75 3.25a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5zm-4.5-3.25a1.75 1.75 0 1 1-3.5 0a1.75 1.75 0 0 1 3.5 0zM7 14.5h5a1 1 0 0 1 1 1v.5s-.5 2.5-3.5 2.5S6 16 6 16v-.5a1 1 0 0 1 1-1zM2.004 6.75A2.75 2.75 0 0 1 4.754 4H23.25A2.75 2.75 0 0 1 26 6.75v14.5A2.75 2.75 0 0 1 23.25 24H4.755a2.75 2.75 0 0 1-2.75-2.75V6.75zm2.75-1.25c-.69 0-1.25.56-1.25 1.25v14.5c0 .69.56 1.25 1.25 1.25H23.25c.69 0 1.25-.56 1.25-1.25V6.75c0-.69-.56-1.25-1.25-1.25H4.755z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
      </template>
      បានបោះកាតរួចហើយ
    </n-tooltip>
    <n-tooltip v-if="show" trigger="hover">
      <template #trigger>
        <div
          class="action-toggle bg-blue-500 text-gray-50"
          @click="toggleActions"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 24 24"
          >
            <path
              d="M8.12 14.71L12 10.83l3.88 3.88a.996.996 0 1 0 1.41-1.41L12.7 8.71a.996.996 0 0 0-1.41 0L6.7 13.3a.996.996 0 0 0 0 1.41c.39.38 1.03.39 1.42 0z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
      </template>
      បិទមុខងារផ្សេងៗ
    </n-tooltip>
    <!-- Form update account -->
    <update-form
      v-bind:model="model"
      v-bind:record="record"
      v-bind:show="editModal.show"
      :onClose="closeUpdate"
    />
    <!-- Form update account -->
    <detail-form
      v-bind:model="model"
      v-bind:record="record"
      v-bind:show="detailModal.show"
      :onClose="closeDetail"
    />
    <!-- Form Online Card-->
    <preview-card-form
      v-bind:model="model"
      v-bind:record="record"
      v-bind:show="previewCardModal.show"
      :onClose="closePreviewCard"
    />
    <!-- Form Official Card -->
    <official-card-form
      v-bind:model="model"
      v-bind:record="record"
      v-bind:show="officialCardModal.show"
      :onClose="closeOfficialCard"
    />
    <!-- Form Profile -->
    <profile-form
      v-bind:model="model"
      v-bind:record="record"
      v-bind:show="profileModal.show"
      :onClose="closeProfileModal"
    />
  </div>
</template>
<script>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useDialog, useMessage, useNotification } from "naive-ui";
import UpdateForm from "./../../widgets/update.vue";
import DetailForm from "./../../widgets/detail.vue";
import PreviewCardForm from "./../../widgets/card1.vue";
import OfficialCardForm from "./../../widgets/officialcard.vue";
import ProfileForm from "./../../widgets/profile.vue";
/**
 * CRUD component form
 */
export default {
  name: "ThumbnailActions",
  components: {
    UpdateForm,
    DetailForm,
    PreviewCardForm,
    OfficialCardForm,
    ProfileForm,
  },
  props: {
    model: {
      type: Object,
    },
    record: {
      type: Object,
    },
    onClose: {
      type: Function,
    },
  },
  setup(props) {
    var store = useStore();
    const dialog = useDialog();
    const message = useMessage();
    const notify = useNotification();

    const show = ref(false);
    const kebabOpen = ref(false);
    const kebabRoot = ref(null);
    const kebabBtn = ref(null);
    function toggleActions() {
      show.value = !show.value;
    }

    function closeDetail(actionStatus) {
      detailModal.show = false;
      props.onClose(parseInt(actionStatus));
    }

    function closeUpdate(actionStatus) {
      editModal.show = false;
      props.onClose(parseInt(actionStatus));
    }

    function closePreviewCard(actionStatus) {
      previewCardModal.show = false;
      props.onClose(parseInt(actionStatus));
    }

    function closeProfileModal(actionStatus) {
      profileModal.show = false;
      props.onClose(parseInt(actionStatus));
    }

    function closeActions(actionStatus) {
      show.value = false;
      if (parseInt(actionStatus) > 0) props.onClose(actionStatus);
    }

    function toggleKebab() {
      kebabOpen.value = !kebabOpen.value;
    }

    function closeKebab() {
      kebabOpen.value = false;
    }

    function onProfileClick(record) {
      showProfileModal(record);
      closeKebab();
    }

    function onPreviewCardClick(record) {
      showPreviewCardModal(record);
      closeKebab();
    }

    function onOfficialCardClick(record) {
      showOfficialCardModal(record);
      closeKebab();
    }

    function onDeleteClick(record) {
      // reuse existing deleteAccount which shows confirmation
      deleteAccount(record);
      closeKebab();
    }

    function handleOutsideClick(e) {
      const root = kebabRoot.value;
      if (!root) return;
      if (root.contains(e.target)) return;
      closeKebab();
    }

    onMounted(() => {
      document.addEventListener("click", handleOutsideClick);
    });

    onBeforeUnmount(() => {
      document.removeEventListener("click", handleOutsideClick);
    });

    var editModal = reactive({ show: false });

    function showEditModal(record) {
      editModal.show = true;
      show.value = false;
    }

    var previewCardModal = reactive({ show: false });
    function showPreviewCardModal(record) {
      console.log(record.countesy);
      previewCardModal.show = true;
      show.value = false;
    }

    var profileModal = reactive({ show: false });
    function showProfileModal(record) {
      profileModal.show = true;
      show.value = false;
    }

    var officialCardModal = reactive({ show: false });
    function showOfficialCardModal(record) {
      officialCardModal.show = true;
      show.value = false;
    }
    function closeOfficialCard(actionStatus) {
      officialCardModal.show = false;
      props.onClose(parseInt(actionStatus));
    }
    var detailModal = reactive({ show: false });
    function showDetailModal(record) {
      detailModal.show = true;
      show.value = false;
    }

    function documentFocal(officer) {}

    function deleteAccount(record) {
      show.value = false;
      dialog.warning({
        title: "លុបគណនី",
        content: "តើអ្នកចង់ លុប គណនីនេះមែនទេ ?",
        positiveText: "បាទ / ចាស",
        negativeText: "ទេ",
        onPositiveClick: () => {
          store
            .dispatch(props.model.name + "/delete", { id: record.id })
            .then((res) => {
              if (res.data.ok) {
                notify.success({
                  title: "លុបទិន្នន័យ",
                  description: "លុបបានរួចរាល់។",
                  duration: 3000,
                });
                closeActions(1);
              } else {
                notify.success({
                  title: "លុបទិន្នន័យ",
                  description: "មានបញ្ហាក្នុងពេលលុបទិន្នន័យ។",
                  duration: 3000,
                });
              }
            })
            .catch((err) => {
              message.error(err);
            });
          closeActions(0);
        },
        onNegativeClick: () => {},
      });
    }

    return {
      /**
       * Variables
       */

      /**
       * Editing
       */
      editModal,
      showEditModal,
      /**
       * Detail modal
       */
      showDetailModal,
      detailModal,
      /**
       * Functions
       */
      deleteAccount,
      toggleActions,
      show,
      closeActions,
      closeUpdate,
      closeDetail,
      //
      showPreviewCardModal,
      closePreviewCard,
      previewCardModal,
      //
      showOfficialCardModal,
      closeOfficialCard,
      officialCardModal,
      //
      showProfileModal,
      profileModal,
      closeProfileModal,
    };
  },
};
</script>
<style type="text/css" scoped>
.actions {
  @apply flex flex-wrap justify-center absolute left-0 top-0 right-0 bottom-0;
}
.actions .action-toggle {
  @apply absolute top-1 right-1 w-5 h-5 p-1 rounded-full cursor-pointer;
}
.actions .panel {
  @apply bg-white bg-opacity-90 absolute w-full top-0 bottom-0 flex flex-wrap content-center justify-center p-4;
}
.actions .action {
  @apply cursor-pointer w-8 m-1 p-1 bg-white border border-gray-200 rounded-sm;
}

/* Buttons styling for new layout */
.btn-view {
  @apply inline-flex items-center justify-center h-8 px-2 rounded border border-transparent bg-blue-500 text-white hover:bg-blue-600 duration-150;
}
.btn-edit {
  @apply inline-flex items-center justify-center h-8 px-2 rounded border border-yellow-500 bg-yellow-50 text-yellow-700 hover:bg-yellow-100 duration-150;
}
.btn-kebab {
  @apply inline-flex items-center justify-center h-8 w-8 rounded border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 duration-150;
}
.kebab-dropdown {
  @apply absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-10;
}
.kebab-item {
  @apply w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 duration-150;
}
.kebab-item-danger {
  @apply text-red-600 hover:bg-red-50;
}
</style>
