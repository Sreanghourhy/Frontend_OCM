<template>
  <div class="birth-information">
    <Transition name="slide-fade" mode="out-in">
      <div class="absolute left-0 right-0 bottom-0 top-0 flex overflow-hidden">
        <div class="flex-1 min-h-0 min-w-0 flex flex-col overflow-hidden border border-gray-400 rounded p-4 m-4 w-full">
          <div class="flex title-bar border-b border-gray-200 bg-white items-center w-full mb-4 flex-shrink-0">
            <div class="w-full font-moul pb-2 text-lg">បញ្ចូលទិន្នន័យមន្ត្រីថ្មី</div>
            <div class="flex flex-1 justify-end items-center gap-2 pb-2">
              <router-link
                to="/officer"
                class="w-24 bg-blue-50 py-2 px-6 border border-blue-400 rounded hover:bg-blue-100 duration-500 hover:text-blue-600"
              >
                បញ្ជីមន្ត្រី
              </router-link>
              <n-button @click="cancelCreate" :disabled="saving">បោះបង់</n-button>
              <n-button type="success" :loading="saving" @click="createDraftOfficer">
                <template #icon>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5z" />
                  </svg>
                </template>
                បង្កើត និងបន្ត
              </n-button>
            </div>
          </div>

          <div class="flex-1 min-h-0">
            <n-scrollbar class="h-full">
              <div class="pb-6">
                <div class="flex items-center justify-between pb-2">
                  <h3 class="font-moul text-lg text-[#1E3A8A]">ក. ព័ត៌មានផ្ទាល់ខ្លួន</h3>
                </div>
                <div class="px-4 overflow-x-auto">
                  <table class="tbl-profile w-full min-w-[980px] border-collapse" style="border-spacing: 0px;">
                    <tbody>
                      <tr>
                        <td class="w-48">ឈ្មោះជាភាសាខ្មែរ</td>
                        <td colspan="4" class="p-1">
                          <div class="grid grid-cols-3 w-full">
                            <div class="flex flex-nowrap leading-8">
                              <div class="w-32">គោត្តនាម ៖</div>
                              <input v-model="form.lastname" type="text" placeholder="គោត្តនាម" class="field-input w-24 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                            </div>
                            <div class="flex flex-nowrap leading-8">
                              <div class="w-28">នាមខ្លួន ៖</div>
                              <input v-model="form.firstname" type="text" placeholder="នាមខ្លួន" class="field-input w-36 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                            </div>
                            <div class="inline-flex items-center gap-2 flex-nowrap">
                              <div class="text-[13px] whitespace-nowrap pl-10">ភេទ ៖</div>
                              <n-select
                                v-model:value="form.gender"
                                :options="genderOptions"
                                size="small"
                                class="w-36 uniform-select"
                                placeholder="ជ្រើសរើសភេទ"
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">ឈ្មោះជាអក្សរពុម្ពឡាតាំង</td>
                        <td class="p-1">
                          <div class="grid grid-cols-3 w-full">
                            <div class="flex flex-nowrap leading-8">
                              <div class="w-32">គោត្តនាមជាឡាតាំង ៖</div>
                              <input v-model="form.enlastname" type="text" placeholder="Last Name" class="field-input w-24 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                            </div>
                            <div class="flex flex-nowrap leading-8">
                              <div class="w-28">នាមខ្លួនជាឡាតាំង ៖</div>
                              <input v-model="form.enfirstname" type="text" placeholder="First Name" class="field-input w-36 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">ថ្ងៃខែឆ្នាំកំណើត</td>
                        <td colspan="2" class="p-1 flex">
                          <div class="w-40 mr-6">
                            <officer-date-input
                              v-model="dobForInput"
                              wrapper-class="relative inline-block align-middle w-full"
                              input-class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
                            />
                          </div>
                          <div class="flex leading-8 mr-6">
                            <div class="w-28">ជនជាតិ ៖</div>
                            <input v-model="form.national" type="text" placeholder="ជនជាតិ" class="field-input w-32 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                          </div>
                          <div class="flex leading-8">
                            <div class="w-28">សញ្ជាតិ ៖</div>
                            <input v-model="form.nationality" type="text" placeholder="សញ្ជាតិ" class="field-input w-32 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">ទីកន្លែងកំណើត</td>
                        <td colspan="3" class="pt-1">
                          <textarea v-model="form.pob" placeholder="ទីកន្លែងកំណើត" class="field-input field-input-textarea w-4/5 border border-[#D8DEE8] rounded px-2 py-1.5 text-[13px] bg-white resize-y" rows="2"></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">អាសយដ្ឋានបច្ចុប្បន្ន</td>
                        <td colspan="3" class="pt-0">
                          <textarea v-model="form.address" placeholder="អាសយដ្ឋានបច្ចុប្បន្ន" class="field-input field-input-textarea w-4/5 border border-[#D8DEE8] rounded px-2 py-1.5 text-[13px] bg-white resize-y" rows="2"></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">អាសយដ្ឋានអចិន្ត្រៃយ៍</td>
                        <td colspan="3" class="pt-0">
                          <textarea v-model="form.current_address" placeholder="អាសយដ្ឋានអចិន្ត្រៃយ៍" class="field-input field-input-textarea w-4/5 border border-[#D8DEE8] rounded px-2 py-1.5 text-[13px] bg-white resize-y" rows="2"></textarea>
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">លេខទូរស័ព្ទ</td>
                        <td colspan="2" class="pt-0">
                          <input v-model="form.mobile_phone" type="text" placeholder="លេខទូរស័ព្ទ" class="field-input w-40 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white mr-4" />
                          អ៊ីមែល
                          <input v-model="form.email" type="text" placeholder="អ៉ីមែល" class="field-input w-60 ml-4 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ</td>
                        <td colspan="3" class="p-0 flex items-start">
                          <div class="w-40 mr-5 mt-1">
                            <input v-model="form.nid" type="text" placeholder="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ" class="field-input w-40 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" />
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td class="w-48">កាយសម្បទា</td>
                        <td class="p-1 flex h-9">
                          <span class="flex items-center gap-4 w-60">
                            <label class="inline-flex items-center gap-1 cursor-pointer">
                              <input v-model.number="form.body_condition" type="radio" :value="0" name="draft_body_condition" class="rounded-full border-[#D8DEE8]" />
                              <span class="text-[13px]">គ្រប់គ្រាន់</span>
                            </label>
                            <label class="inline-flex items-center gap-1 cursor-pointer">
                              <input v-model.number="form.body_condition" type="radio" :value="1" name="draft_body_condition" class="rounded-full border-[#D8DEE8]" />
                              <span class="text-[13px]">ពិការភាព</span>
                            </label>
                          </span>
                          <Transition name="fade">
                            <input
                              v-if="parseInt(form.body_condition) === 1"
                              v-model="form.body_condition_desp"
                              type="text"
                              placeholder="ប្រភេទពិការភាព"
                              class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white"
                            />
                          </Transition>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </n-scrollbar>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useNotification } from 'naive-ui'
import { useRouter } from 'vue-router'
import dateFormat from 'dateformat'

export default {
  name: 'CreateProfileDraft',
  setup() {
    const store = useStore()
    const router = useRouter()
    const notify = useNotification()
    const saving = ref(false)
    const dob = ref(null)
    const genderOptions = [
      { label: 'ប្រុស', value: 1 },
      { label: 'ស្រី', value: 0 }
    ]

    const form = reactive({
      lastname: '',
      firstname: '',
      enlastname: '',
      enfirstname: '',
      gender: 1,
      national: '',
      nationality: '',
      pob: '',
      address: '',
      current_address: '',
      mobile_phone: '',
      email: '',
      nid: '',
      body_condition: 0,
      body_condition_desp: '',
      additional_officer_type: 'admin_official',
      marry_status: 'single'
    })

    const dobForInput = computed({
      get() {
        if (!dob.value) return ''
        const date = new Date(dob.value)
        return Number.isNaN(date.getTime()) ? '' : dateFormat(date, 'yyyy-mm-dd')
      },
      set(value) {
        dob.value = value ? new Date(value).getTime() : null
      }
    })

    function resetForm() {
      form.lastname = ''
      form.firstname = ''
      form.enlastname = ''
      form.enfirstname = ''
      form.gender = 1
      form.national = ''
      form.nationality = ''
      form.pob = ''
      form.address = ''
      form.current_address = ''
      form.mobile_phone = ''
      form.email = ''
      form.nid = ''
      form.body_condition = 0
      form.body_condition_desp = ''
      form.additional_officer_type = 'admin_official'
      form.marry_status = 'single'
      dob.value = null
    }

    function cancelCreate() {
      if (saving.value) return
      resetForm()
      if (window.history.length > 1) {
        router.back()
        return
      }
      router.push('/dashboard')
    }

    function validateForm() {
      if (!String(form.lastname || '').trim() || !String(form.firstname || '').trim()) {
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន',
          description: 'សូមបំពេញឈ្មោះជាភាសាខ្មែរ ឱ្យបានពេញលេញ',
          duration: 2500
        })
        return false
      }

      if (!String(form.enlastname || '').trim() || !String(form.enfirstname || '').trim()) {
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន',
          description: 'សូមបំពេញឈ្មោះជាអក្សរឡាតាំង ឱ្យបានពេញលេញ',
          duration: 2500
        })
        return false
      }

      if (parseInt(form.body_condition, 10) === 1 && !String(form.body_condition_desp || '').trim()) {
        notify.warning({
          title: 'ពិនិត្យព័ត៌មាន',
          description: 'សូមបំពេញប្រភេទពិការភាព',
          duration: 2500
        })
        return false
      }

      return true
    }

    async function createDraftOfficer() {
      if (!validateForm() || saving.value) return false

      saving.value = true
      try {
        const payload = {
          firstname: form.firstname,
          lastname: form.lastname,
          enfirstname: form.enfirstname,
          enlastname: form.enlastname,
          gender: form.gender,
          dob: dob.value ? dateFormat(new Date(dob.value), 'yyyy-mm-dd') : null,
          national: form.national,
          nationality: form.nationality,
          pob: form.pob,
          address: form.address,
          current_address: form.current_address,
          mobile_phone: form.mobile_phone,
          email: form.email,
          nid: form.nid,
          body_condition: parseInt(form.body_condition, 10) || 0,
          body_condition_desp: parseInt(form.body_condition, 10) === 1 ? form.body_condition_desp : '',
          additional_officer_type: form.additional_officer_type,
          marry_status: form.marry_status
        }

        const res = await store.dispatch('officer/create', payload)
        const createdOfficerId = res?.data?.record?.id

        if (res?.data?.ok && parseInt(createdOfficerId, 10) > 0) {
          notify.success({
            title: 'បញ្ចូលទិន្នន័យ',
            description: res.data.message || 'បានបង្កើតមន្ត្រីថ្មីរួចរាល់។',
            duration: 2500
          })
          resetForm()
          router.push(`/officer/profilecreate/${createdOfficerId}`)
          return true
        }

        notify.error({
          title: 'បញ្ចូលទិន្នន័យ',
          description: res?.data?.message || 'មិនអាចបង្កើតមន្ត្រីថ្មីបានទេ។',
          duration: 3000
        })
        return false
      } catch (error) {
        const apiMessage = error?.response?.data?.message
        notify.error({
          title: 'បញ្ចូលទិន្នន័យ',
          description: apiMessage || 'មានបញ្ហាក្នុងការបង្កើតមន្ត្រីថ្មី។',
          duration: 3000
        })
        return false
      } finally {
        saving.value = false
      }
    }

    return {
      cancelCreate,
      createDraftOfficer,
      dobForInput,
      form,
      genderOptions,
      saving
    }
  }
}
</script>

<style scoped>
.field-input {
  height: 32px;
  box-sizing: border-box;
  text-align: left;
}

.field-input-textarea {
  min-height: 72px;
  height: auto;
  resize: vertical;
}

:deep(.uniform-select .n-base-selection) {
  min-height: 32px !important;
  height: 32px !important;
  box-sizing: border-box;
  background-color: #fff !important;
}

:deep(.uniform-select .n-base-selection-label) {
  height: 100%;
  background-color: #fff !important;
}

.tbl-profile tr td {
  text-align: left;
  vertical-align: top;
}
</style>
