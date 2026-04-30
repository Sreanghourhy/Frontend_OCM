<template>
  <section  class="transition-all duration-300 p-4" >
    <!-- Father Section -->
    <h3 class="w-full text-left text-[15px] text-[#1E3A8A] pb-2">
      ខ.៣. ព័ត៌មានឪពុក និង​ម្ដាយបង្កើត
    </h3>

    <div class="flex flex-row gap-8 w-full items-start mb-8">
      <div class="flex flex-col gap-1 flex-1">
        <!-- Father Name Khmer -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ឪពុកឈ្មោះ</label>
          <div class="w-full">
            <div
              class="flex w-full rounded-sm p-0.5"
              :class="parentChangedCellClass(['f_lastname', 'f_firstname'])"
            >
              <input v-model="formData.f_lastname" type="text" class="field-input w-48 mr-2 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="ត្រកូល" />
              <input v-model="formData.f_firstname" type="text" class="field-input w-48 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="នាម" />
              <div class="flex items-center gap-1 flex-1 ml-2 ">
                  <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">ស្ថានភាព ៖</span>
                  <div
                    class="flex items-center gap-6 rounded-sm p-0.5"
                    :class="parentChangedCellClass('f_death')"
                  >
                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        v-model="formData.f_death"
                        type="radio"
                        :value="0"
                        name="f_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                      />
                      <span class="text-[13px] text-[#2C3E50]">រស់</span>
                    </label>

                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        v-model="formData.f_death"
                        type="radio"
                        :value="1"
                        name="f_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                      />
                      <span class="text-[13px] text-[#2C3E50]">ស្លាប់</span>
                    </label>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <!-- Father Name English -->
        <!-- <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ឈ្មោះជាអក្សរពុម្ពឡាតាំង</label>
          <div class="w-full relative">
            <div v-if="shouldShowDisplay('f_name_en')" @click="enableEdit('f_name_en')" class="flex gap-1">
              <div
              :class="[
                     'w-full border rounded px-3 py-2 text-[13px] font-medium cursor-pointer hover:border-[#22C55E] duration-150 text-left',
                     formData.f_en_firstname ? 'border-[#E2E8F0] ' : 'bg-white border-dashed border-gray-300 text-gray-400'
                   ]">
                {{ formData.f_en_firstname || 'First name ' }}
              </div>
              <div 
                   :class="[
                     'w-full border rounded px-3 py-2 text-[13px] font-medium cursor-pointer hover:border-[#22C55E] duration-150 text-left',
                     formData.f_en_lastname ? 'border-[#E2E8F0] ' : 'bg-white border-dashed border-gray-300 text-gray-400'
                   ]">
                {{ formData.f_en_lastname || 'Last name ' }}
              </div> 
            </div>
            <div v-else class="flex flex-col relative">
              <div class="flex flex-row gap-1">
                <input v-model="formData.f_en_firstname" v-focus type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="First name" />
                <input v-model="formData.f_en_lastname"  type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="Last name" />
              </div>
              <button @click="cancelEdit('f_name_en')" class="absolute right-2 top-2 text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <span v-if="getPrevious('f_name_en')" class="text-[10px] text-blue-500 mt-1 italic text-left">មុនកែ: {{ originalSnapshot.f_name_en }}</span>
            </div>
          </div>
        </div> -->

        <!-- Father Date of Birth -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ថ្ងៃខែឆ្នាំកំណើត</label>
          <div class="w-48 relative">
            <div
              class="w-full rounded-sm p-0.5"
              :class="parentChangedCellClass('f_dob')"
            >
              <officer-date-input
                v-model="formData.f_dob"
                wrapper-class="relative inline-block align-middle w-full"
            
              />
            </div>
          </div>
        </div>

        

        <!-- Father Current Address -->
        <!-- <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">អាសយដ្ឋានបច្ចុប្បន្ន</label>
          <div class="w-full relative">
            <div v-if="shouldShowDisplay('f_address')" @click="enableEdit('f_address')" 
                 :class="[
                   'w-full border rounded px-3 py-2 text-[13px] font-medium cursor-pointer text-left hover:border-[#22C55E] duration-150',
                   formData.f_address ? 'border-[#E2E8F0] ' : 'bg-white border-dashed border-gray-300 text-gray-400'
                 ]">
              {{ formData.f_address || 'មិនទាន់មានទិន្នន័យ' }}
            </div>
            <div v-else class="flex flex-col relative">
              <input v-model="formData.f_address" v-focus type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="បញ្ចូលអាសយដ្ឋាន..." />
              <button @click="cancelEdit('f_address')" class="absolute right-2 top-2 text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <span v-if="getPrevious('f_address')" class="text-[10px] text-blue-500 mt-1 italic text-left">មុនកែ: {{ originalSnapshot.f_address }}</span>
            </div>
          </div>
        </div> -->

        <!-- Father Occupation -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">មុខរបរ/មុខតំណែង</label>
          <div class="w-full">
            <div
              class="w-60 rounded-sm p-0.5"
              :class="parentChangedCellClass('f_occupation')"
            >
              <input v-model="formData.f_occupation" type="text" class="field-input w-60 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="បញ្ចូលមុខរបរ..." />
            </div>
          </div>
        </div>

        <!-- Father Place of Birth -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ទីកន្លែងកំណើត</label>
          <div class="w-full">
            <div
              class="w-full rounded-sm p-0.5"
              :class="parentChangedCellClass('f_pob')"
            >
              <textarea
                v-model="formData.f_pob"
                rows="2"
                class="field-input field-input-textarea w-full border border-[#D8DEE8] rounded p-2 text-[13px] bg-white"
                placeholder="បញ្ចូលទីកន្លែងកំណើត..."
              />
            </div>
          </div>
        </div>

      </div>

      <!-- Father Identity Fields -->
      <div class="flex flex-col gap-6 flex-1">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-1">
            <!-- Father National -->
            <!-- <div class="flex items-center gap-2 flex-1 min-w-0">
              <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">ជនជាតិ ៖</span>
              <div
                class="min-w-0 flex-1 rounded-sm p-0.5"
                :class="parentChangedCellClass('f_national')"
              >
                <input v-model="formData.f_national" type="text" class="field-input w-full min-w-0 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="ជនជាតិ" />
              </div>
            </div> -->
            <!-- Father Nationality -->
            <!-- <div class="flex items-center gap-2 flex-1 min-w-0">
              <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">សញ្ជាតិ ៖</span>
              <div
                class="min-w-0 flex-1 rounded-sm p-0.5"
                :class="parentChangedCellClass('f_nationality')"
              >
                <input v-model="formData.f_nationality" type="text" class="field-input w-full min-w-0 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="សញ្ជាតិ" />
              </div>
            </div> -->
          </div>
        </div>

        <div class="flex flex-col gap-2">
              <!-- <div class="flex flex-row gap-1">
                <div class="flex items-center gap-1 flex-1">
                  <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">ស្ថានភាព ៖</span>
                  <div
                    class="flex items-center gap-6 rounded-sm p-0.5"
                    :class="parentChangedCellClass('f_death')"
                  >
                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        v-model="formData.f_death"
                        type="radio"
                        :value="0"
                        name="f_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                      />
                      <span class="text-[13px] text-[#2C3E50]">រស់</span>
                    </label>

                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        v-model="formData.f_death"
                        type="radio"
                        :value="1"
                        name="f_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                      />
                      <span class="text-[13px] text-[#2C3E50]">ស្លាប់</span>
                    </label>
                  </div>
                </div>
              </div> -->
              <!-- Optional: Display current status in display mode -->
              <!-- <div v-if="shouldShowDisplay('spouse_death')" class="text-[12px] text-gray-500 mt-1">
                ស្ថានភាពបច្ចុប្បន្ន៖ 
                <span :class="formData.spouse_death === 0 ? 'text-green-600' : 'text-red-600'">
                  {{ formData.spouse_death === 0 ? 'រស់' : formData.spouse_death === 1 ? 'ស្លាប់' : 'មិនទាន់កំណត់' }}
                </span>
              </div> -->
            </div>
            <!-- ==================== END NEW ==================== -->
      </div>
    </div>

    <!-- Mother Section -->
    <!-- <h3 class="w-full text-left text-[15px] font-semibold  mb-6 border-b pb-2 text-[#1E3A8A]">
      ខ.៤. ព័ត៌មានម្ដាយ
    </h3> -->
    <hr class="mb-5">

    <div class="flex flex-row gap-8 w-full items-start">
      <div class="flex flex-col gap-1 flex-1">
        <!-- Mother Name Khmer -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ម្ដាយឈ្មោះ</label>
          <div class="w-full">
            <div
              class="flex "
              :class="parentChangedCellClass(['m_firstname', 'm_lastname'])"
            >
              <input v-model="formData.m_firstname" type="text" class="field-input w-48 border border-[#D8DEE8] mr-2 rounded px-2 text-[13px] bg-white" placeholder="នាម" />
              <input v-model="formData.m_lastname" type="text" class="field-input w-48 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="ត្រកូល" />
              <div class="flex items-center gap-1 flex-1 ml-2 ">
                  <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">ស្ថានភាព ៖</span>
                  <div
                    class="flex items-center gap-6 rounded-sm p-0.5 "
                    :class="parentChangedCellClass('m_death')"
                  >
                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        v-model="formData.m_death"
                        type="radio"
                        :value="0"
                        name="m_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                      />
                      <span class="text-[13px] text-[#2C3E50]">រស់</span>
                    </label>

                    <label class="inline-flex items-center gap-1 cursor-pointer">
                      <input
                        v-model="formData.m_death"
                        type="radio"
                        :value="1"
                        name="m_death"
                        class="h-4 w-4 rounded-full border-[#D8DEE8] cursor-pointer"
                      />
                      <span class="text-[13px] text-[#2C3E50]">ស្លាប់</span>
                    </label>
                  </div>
                </div>
            </div>
          </div>
        </div>

        <!-- Mother Name English -->
        <!-- <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ឈ្មោះជាអក្សរពុម្ពឡាតាំង</label>
          <div class="w-full relative">
            <div v-if="shouldShowDisplay('m_name_en')" @click="enableEdit('m_name_en')" class="flex gap-1">
              <div 
                   :class="[
                     'w-full border rounded px-3 py-2 text-[13px] font-medium cursor-pointer hover:border-[#22C55E] duration-150 text-left',
                     formData.m_en_lastname ? 'border-[#E2E8F0] ' : 'bg-white border-dashed border-gray-300 text-gray-400'
                   ]">
                {{ formData.m_en_lastname || 'Last name ' }}
              </div> 
              <div
                   :class="[
                     'w-full border rounded px-3 py-2 text-[13px] font-medium cursor-pointer hover:border-[#22C55E] duration-150 text-left',
                     formData.m_en_firstname ? 'border-[#E2E8F0] ' : 'bg-white border-dashed border-gray-300 text-gray-400'
                   ]">
                {{ formData.m_en_firstname || 'First name ' }}
              </div>
            </div>
            <div v-else class="flex flex-col relative">
              <div class="flex flex-row gap-1">
                <input v-model="formData.m_en_lastname" v-focus type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="Last name" />
                <input v-model="formData.m_en_firstname" type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="First name" />
              </div>
              <button @click="cancelEdit('m_name_en')" class="absolute right-2 top-2 text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <span v-if="getPrevious('m_name_en')" class="text-[10px] text-blue-500 mt-1 italic text-left">មុនកែ: {{ originalSnapshot.m_name_en }}</span>
            </div>
          </div>
        </div> -->

        <!-- Mother Date of Birth -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ថ្ងៃខែឆ្នាំកំណើត</label>
          <div class="w-48 relative">
            <div
              class="w-full rounded-sm p-0.5"
              :class="parentChangedCellClass('m_dob')"
            >
              <officer-date-input
                v-model="formData.m_dob"
                wrapper-class="relative inline-block align-middle w-full"
              />
            </div>
          </div>
        </div>

        

        <!-- Mother Current Address -->
        <!-- <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">អាសយដ្ឋានបច្ចុប្បន្ន</label>
          <div class="w-full relative">
            <div v-if="shouldShowDisplay('m_address')" @click="enableEdit('m_address')" 
                 :class="[
                   'w-full border rounded px-3 py-2 text-[13px] font-medium cursor-pointer text-left hover:border-[#22C55E] duration-150',
                   formData.m_address ? 'border-[#E2E8F0] ' : 'bg-white border-dashed border-gray-300 text-gray-400'
                 ]">
              {{ formData.m_address || 'មិនទាន់មានទិន្នន័យ' }}
            </div>
            <div v-else class="flex flex-col relative">
              <input v-model="formData.m_address" v-focus type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="បញ្ចូលអាសយដ្ឋាន..." />
              <button @click="cancelEdit('m_address')" class="absolute right-2 top-2 text-gray-400 hover:text-red-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              <span v-if="getPrevious('m_address')" class="text-[10px] text-blue-500 mt-1 italic text-left">មុនកែ: {{ originalSnapshot.m_address }}</span>
            </div>
          </div>
        </div> -->

        <!-- Mother Occupation -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">មុខរបរ/មុខតំណែង</label>
          <div class="w-60">
            <div
              class="w-full rounded-sm p-0.5"
              :class="parentChangedCellClass('m_occupation')"
            >
              <input v-model="formData.m_occupation" type="text" class="field-input w-full border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="បញ្ចូលមុខរបរ..." />
            </div>
          </div>
        </div>
        <!-- Mother Place of Birth -->
        <div class="grid grid-cols-[180px_1fr] items-center gap-1 ">
          <label class="text-[13px] text-left font-medium text-[#2C3E50]">ទីកន្លែងកំណើត</label>
          <div class="w-full">
            <div
              class="w-full rounded-sm p-0.5"
              :class="parentChangedCellClass('m_pob')"
            >
              <textarea
                v-model="formData.m_pob"
                rows="2"
                class="field-input field-input-textarea w-full border border-[#D8DEE8] rounded p-2 text-[13px] bg-white"
                placeholder="បញ្ចូលទីកន្លែងកំណើត..."
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Mother Identity Fields -->
      <div class="flex flex-col gap-6 flex-1">
        <div class="flex flex-col gap-2">
          <div class="flex flex-row gap-1">
            <!-- Mother National -->
            <!-- <div class="flex items-center gap-2 flex-1 min-w-0">
              <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">ជនជាតិ ៖</span>
              <div
                class="min-w-0 flex-1 rounded-sm p-0.5"
                :class="parentChangedCellClass('m_national')"
              >
                <input v-model="formData.m_national" type="text" class="field-input w-full min-w-0 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="ជនជាតិ" />
              </div>
            </div> -->
            <!-- Mother Nationality -->
            <!-- <div class="flex items-center gap-2 flex-1 min-w-0">
              <span class="text-[13px] whitespace-nowrap text-[#2C3E50]">សញ្ជាតិ ៖</span>
              <div
                class="min-w-0 flex-1 rounded-sm p-0.5"
                :class="parentChangedCellClass('m_nationality')"
              >
                <input v-model="formData.m_nationality" type="text" class="field-input w-full min-w-0 border border-[#D8DEE8] rounded px-2 text-[13px] bg-white" placeholder="សញ្ជាតិ" />
              </div>
            </div> -->
          </div>
          <div class="flex flex-col gap-2">
              <div class="flex flex-row gap-1">
                
              </div>
              <!-- Optional: Display current status in display mode -->
              <!-- <div v-if="shouldShowDisplay('spouse_death')" class="text-[12px] text-gray-500 mt-1">
                ស្ថានភាពបច្ចុប្បន្ន៖ 
                <span :class="formData.spouse_death === 0 ? 'text-green-600' : 'text-red-600'">
                  {{ formData.spouse_death === 0 ? 'រស់' : formData.spouse_death === 1 ? 'ស្លាប់' : 'មិនទាន់កំណត់' }}
                </span>
              </div> -->
            </div>
            <!-- ==================== END NEW ==================== -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, watch, computed } from 'vue'
import { useStore } from 'vuex'

export default {
  emits: ['changed'],
  props: {
    officer: { type: Object, default: () => ({}) }
  },
  setup(props, { emit }) {
    const store = useStore()
    const originalSnapshot = ref({})
    
    // ADD THIS - initial load flag to prevent emitting on first load
    const isInitialLoad = ref(true)
    
    const formData = ref({
      f_name_kh: '', f_firstname: '', f_lastname: '',
      f_name_en: '', f_en_firstname: '', f_en_lastname: '',
      f_dob: '', f_pob: '', f_address: '', f_occupation: '', f_national: '', f_nationality: '', f_death: '',
      m_name_kh: '', m_firstname: '', m_lastname: '',
      m_name_en: '', m_en_firstname: '', m_en_lastname: '',
      m_dob: '', m_pob: '', m_address: '', m_occupation: '', m_national: '', m_nationality: '', m_death: '',
    })

    function normParentVal(v) {
      if (v == null || v === undefined) return ''
      return String(v)
    }

    function normalizeParentNameForSave(value) {
      if (value == null || value === undefined) return ''
      return String(value).toUpperCase()
    }

    function isParentFieldChanged(field) {
      const orig = originalSnapshot.value || {}
      if (!orig || Object.keys(orig).length === 0) return false
      return normParentVal(formData.value[field]) !== normParentVal(orig[field])
    }

    function parentChangedCellClass(keys) {
      const list = Array.isArray(keys) ? keys : [keys]
      return list.some((k) => isParentFieldChanged(k)) ? 'changed-cell' : ''
    }

    const getPeopleId = () => {
      return props.officer?.people?.id || props.officer?.people_id || null
    }

    // Helper function to format date for API
    function formatDateForAPI(value) {
      if (!value) return null
      return value
    }

    function toInputDate(value) {
      if (!value) return ''
      const d = new Date(value)
      return Number.isNaN(d.getTime()) ? '' : d.toISOString().slice(0, 10)
    }

    function hydrateData() {
      if (!props.officer?.people) return
      const p = props.officer.people

      const mapped = {
        f_name_kh: `${p.father_firstname || ''} ${p.father_lastname || ''}`.trim(),
        f_firstname: p.father_firstname || '',
        f_lastname: p.father_lastname || '',
        f_name_en: `${p.father_enfirstname || ''} ${p.father_enlastname || ''}`.trim(),
        f_en_firstname: p.father_enfirstname || '',
        f_en_lastname: p.father_enlastname || '',
        f_dob: toInputDate(p.father_dob),
        f_pob: p.father_pob || '',
        f_address: p.father_address || '',
        f_occupation: p.father_profession || '',
        f_national: p.father_national || '',
        f_nationality: p.father_nationality || '',
        f_death: p.father_death ?? '',

        m_name_kh: `${p.mother_firstname || ''} ${p.mother_lastname || ''}`.trim(),
        m_firstname: p.mother_firstname || '',
        m_lastname: p.mother_lastname || '',
        m_name_en: `${p.mother_enfirstname || ''} ${p.mother_enlastname || ''}`.trim(),
        m_en_firstname: p.mother_enfirstname || '',
        m_en_lastname: p.mother_enlastname || '',
        m_dob: toInputDate(p.mother_dob),
        m_pob: p.mother_pob || '',
        m_address: p.mother_address || '',
        m_occupation: p.mother_profession || '',
        m_national: p.mother_national || '',
        m_nationality: p.mother_nationality || '',
        m_death: p.mother_death ?? '',
      }

      formData.value = { ...mapped }
      originalSnapshot.value = JSON.parse(JSON.stringify(mapped))

      // Reset initial load flag after hydration
      isInitialLoad.value = true
    }

    const persistChanges = async () => {
      console.log('🔵 CHILD (Parents): persistChanges started')
      
      // IMPORTANT: Check if there are actually any changes
      if (!isDirty.value) {
        console.log('🔵 CHILD (Parents): No changes detected, skipping save')
        return true
      }
      
      try {
        const pid = getPeopleId()
        if (!pid) {
          console.error('🔴 CHILD (Parents): No people_id found')
          return false
        }

        const normalizedFatherFirstname = normalizeParentNameForSave(formData.value.f_firstname)
        const normalizedFatherLastname = normalizeParentNameForSave(formData.value.f_lastname)
        const normalizedFatherEnFirstname = normalizeParentNameForSave(formData.value.f_en_firstname)
        const normalizedFatherEnLastname = normalizeParentNameForSave(formData.value.f_en_lastname)
        const normalizedMotherFirstname = normalizeParentNameForSave(formData.value.m_firstname)
        const normalizedMotherLastname = normalizeParentNameForSave(formData.value.m_lastname)
        const normalizedMotherEnFirstname = normalizeParentNameForSave(formData.value.m_en_firstname)
        const normalizedMotherEnLastname = normalizeParentNameForSave(formData.value.m_en_lastname)

        // Use spread operator to clone the entire officer object
        const payload = { ...props.officer }
        
        // Ensure people object exists
        if (!payload.people) {
          payload.people = {}
        }

        // Add updated_at timestamp
        payload.updated_at = new Date().toISOString()

        // Update ONLY the parent fields - all other officer data remains the same
        // Father fields
        payload.people.father_firstname = normalizedFatherFirstname || payload.people.father_firstname || ''
        payload.people.father_lastname = normalizedFatherLastname || payload.people.father_lastname || ''
        payload.people.father_enfirstname = normalizedFatherEnFirstname || payload.people.father_enfirstname || ''
        payload.people.father_enlastname = normalizedFatherEnLastname || payload.people.father_enlastname || ''
        payload.people.father_dob = formatDateForAPI(formData.value.f_dob) || payload.people.father_dob || null
        payload.people.father_pob = formData.value.f_pob || payload.people.father_pob || ''
        payload.people.father_address = formData.value.f_address || payload.people.father_address || ''
        payload.people.father_profession = formData.value.f_occupation || payload.people.father_profession || ''
        payload.people.father_national = formData.value.f_national || payload.people.father_national || ''
        payload.people.father_nationality = formData.value.f_nationality || payload.people.father_nationality || ''
        payload.people.father_death = formData.value.f_death > 0 ? 1 : 0

        // Mother fields
        payload.people.mother_firstname = normalizedMotherFirstname || payload.people.mother_firstname || ''
        payload.people.mother_lastname = normalizedMotherLastname || payload.people.mother_lastname || ''
        payload.people.mother_enfirstname = normalizedMotherEnFirstname || payload.people.mother_enfirstname || ''
        payload.people.mother_enlastname = normalizedMotherEnLastname || payload.people.mother_enlastname || ''
        payload.people.mother_dob = formatDateForAPI(formData.value.m_dob) || payload.people.mother_dob || null
        payload.people.mother_pob = formData.value.m_pob || payload.people.mother_pob || ''
        payload.people.mother_address = formData.value.m_address || payload.people.mother_address || ''
        payload.people.mother_profession = formData.value.m_occupation || payload.people.mother_profession || ''
        payload.people.mother_national = formData.value.m_national || payload.people.mother_national || ''
        payload.people.mother_nationality = formData.value.m_nationality || payload.people.mother_nationality || ''
        payload.people.mother_death = formData.value.m_death > 0 ? 1 : 0


        console.log('🔵 CHILD (Parents): Sending payload with updates:', payload)

        // Dispatch to Vuex - using the officer update endpoint
        const res = await store.dispatch('officer/update', payload)

        if (res?.data?.ok || res?.status === 200) {
          console.log('🔵 CHILD (Parents): Save successful')

          formData.value.f_firstname = normalizedFatherFirstname
          formData.value.f_lastname = normalizedFatherLastname
          formData.value.f_en_firstname = normalizedFatherEnFirstname
          formData.value.f_en_lastname = normalizedFatherEnLastname
          formData.value.m_firstname = normalizedMotherFirstname
          formData.value.m_lastname = normalizedMotherLastname
          formData.value.m_en_firstname = normalizedMotherEnFirstname
          formData.value.m_en_lastname = normalizedMotherEnLastname
          formData.value.f_name_kh = `${normalizedFatherFirstname || ''} ${normalizedFatherLastname || ''}`.trim()
          formData.value.m_name_kh = `${normalizedMotherFirstname || ''} ${normalizedMotherLastname || ''}`.trim()
          formData.value.f_name_en = `${normalizedFatherEnFirstname || ''} ${normalizedFatherEnLastname || ''}`.trim()
          formData.value.m_name_en = `${normalizedMotherEnFirstname || ''} ${normalizedMotherEnLastname || ''}`.trim()
          
          // Update the original snapshot with the new values
          originalSnapshot.value = JSON.parse(JSON.stringify(formData.value))
          emit('changed', false)
          return true
        }
        
        console.error('🔴 CHILD (Parents): Save failed - response not OK:', res)
        return false
        
      } catch (err) {
        console.error("🔴 CHILD (Parents): Failed to save parents info:", err)
        if (err.response) {
          console.error('🔴 CHILD: Error response data:', err.response.data)
          console.error('🔴 CHILD: Error response status:', err.response.status)
        }
        return false
      }
    }
    
    const cancelChanges = () => {
      hydrateData()
      emit('changed', false)
    }

    const isDirty = computed(() => {
      return JSON.stringify(formData.value) !== JSON.stringify(originalSnapshot.value)
    })

    // MODIFIED THIS WATCHER - with initial load flag
    watch(formData, () => {
      if (isInitialLoad.value) {
        isInitialLoad.value = false
        return
      }
      formData.value.f_name_kh = `${formData.value.f_firstname || ''} ${formData.value.f_lastname || ''}`.trim()
      formData.value.m_name_kh = `${formData.value.m_firstname || ''} ${formData.value.m_lastname || ''}`.trim()
      formData.value.f_name_en = `${formData.value.f_en_firstname || ''} ${formData.value.f_en_lastname || ''}`.trim()
      formData.value.m_name_en = `${formData.value.m_en_firstname || ''} ${formData.value.m_en_lastname || ''}`.trim()
      emit('changed', isDirty.value)
    }, { deep: true })

    watch(() => props.officer, hydrateData, { immediate: true, deep: true })

    return {
      formData,
      parentChangedCellClass,
      persistChanges,
      cancelChanges,
      markSaved: () => {
        emit('changed', false)
      },
      isDirty,
      originalSnapshot
    }
  }
}
</script>

<style scoped>
/* Match spouseInformation.vue / profile.vue text fields */
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

/* Same as spouseInformation / childrenInformation — edited field controls */
.changed-cell {
  background: transparent;
  box-shadow: none;
  border: none;
  border-radius: 0;
}
</style>
