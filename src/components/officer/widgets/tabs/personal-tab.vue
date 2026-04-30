<template>
  <div class="personal-tab">
    <div class="space-y-6">
      <!-- Basic Personal Information -->
      <section-edit-toggle
        title="ក. ព័ត៌មានផ្ទាល់ខ្លួន"
        :editing="editingSections.personal"
        :last-saved="lastSaved.personal"
        @edit="$emit('toggle-edit', 'personal')"
        @cancel="$emit('cancel-edit', 'personal')"
        @save="$emit('save-section', 'personal')"
      >
        <template #view>
          <!-- Read-only view (similar to background.vue) -->
          <div class="personal-info-view">
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="w-48 font-btb-black p-2">ឈ្មោះជាភាសាខ្មែរ</td>
                  <td class="p-2">
                    {{ 'គោត្តនាម ៖ ' + (record.people?.lastname || 'មិនទាន់មាន') }} 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    {{ " នាមខ្លួន ៖ " + (record.people?.firstname || 'មិនទាន់មាន') }}
                  </td>
                  <td class="p-2" colspan="2">
                    ភេទ ៖ {{ parseInt(record.people?.gender) == 1 ? 'ប្រុស' : 'ស្រី' }}
                  </td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">ឈ្មោះជាអក្សរពុម្ពឡាតាំង</td>
                  <td class="p-2" colspan="3">
                    {{ 'គោត្តនាម ៖ ' + (record.people?.enlastname || 'មិនទាន់មាន') }} 
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
                    {{ " នាមខ្លួន ៖ " + (record.people?.enfirstname || 'មិនទាន់មាន') }}
                  </td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">ថ្ងៃខែឆ្នាំកំណើត</td>
                  <td class="p-2">{{ formatDate(record.people?.dob) }}</td>
                  <td class="p-2">ជនជាតិ ៖ {{ record.people?.national || '' }}</td>
                  <td class="p-2">សញ្ជាតិ ៖ {{ record.people?.nationality || '' }}</td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">ទីកន្លែងកំណើត</td>
                  <td class="p-2" colspan="3">
                    ភូមិ {{ record.people?.address || '' }}
                  </td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">អាសយដ្ឋានបច្ចុប្បន្ន</td>
                  <td class="p-2" colspan="3">{{ record.people?.address || '' }}</td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">អាសយដ្ឋានអចិន្ត្រៃយ៍</td>
                  <td class="p-2" colspan="3">{{ record.people?.current_address || '' }}</td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2"></td>
                  <td class="p-2">{{ toKhmer(record.people?.mobile_phone) }}</td>
                  <td class="p-2" colspan="2">អ៉ីមែល៖ {{ record.people?.email || '' }}</td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">អត្តលេខមន្ត្រីរាជការ</td>
                  <td class="p-2" colspan="3">{{ toKhmer(record.code) }}</td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">កាយសម្បទា</td>
                  <td class="p-2">
                    <n-space item-style="display: flex;" align="center">
                      <n-space>
                        <n-radio :checked="parseInt(record.people?.body_condition) == 0">គ្រប់គ្រាន់</n-radio>
                        <n-radio :checked="parseInt(record.people?.body_condition) == 1">ពិការភាព</n-radio>
                      </n-space>
                    </n-space>
                  </td>
                  <td class="p-2" colspan="2">
                    ប្រភេទពិការភាព ៖ {{ parseInt(record.people?.body_condition) == 1 ? record.people?.body_condition_desp : '' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
        
        <template #edit>
          <!-- Editable form -->
          <n-form class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <n-form-item label="គោត្តនាម (ខ្មែរ)" required>
                <n-input v-model:value="editData.personal.lastname" placeholder="គោត្តនាម" />
              </n-form-item>
              <n-form-item label="នាម (ខ្មែរ)" required>
                <n-input v-model:value="editData.personal.firstname" placeholder="នាម" />
              </n-form-item>
              <n-form-item label="គោត្តនាម (អង់គ្លេស)">
                <n-input v-model:value="editData.personal.enlastname" placeholder="Lastname" />
              </n-form-item>
              <n-form-item label="នាម (អង់គ្លេស)">
                <n-input v-model:value="editData.personal.enfirstname" placeholder="Firstname" />
              </n-form-item>
              <n-form-item label="ភេទ" class="col-span-2">
                <n-radio-group v-model:value="editData.personal.gender">
                  <n-space>
                    <n-radio value="0" label="ស្រី" />
                    <n-radio value="1" label="ប្រុស" />
                  </n-space>
                </n-radio-group>
              </n-form-item>
              <n-form-item label="ថ្ងៃខែឆ្នាំកំណើត" class="col-span-2">
                <n-date-picker 
                  v-model:value="editData.personal.dob" 
                  type="date" 
                  format="dd-MM-yyyy"
                  placeholder="ថ្ងៃខែឆ្នាំកំណើត"
                  class="w-full"
                />
              </n-form-item>
              <n-form-item label="ជនជាតិ">
                <n-input v-model:value="editData.personal.national" placeholder="ជនជាតិ" />
              </n-form-item>
              <n-form-item label="សញ្ជាតិ">
                <n-input v-model:value="editData.personal.nationality" placeholder="សញ្ជាតិ" />
              </n-form-item>
              <n-form-item label="ទីកន្លែងកំណើត" class="col-span-2">
                <n-input v-model:value="editData.personal.address" placeholder="ទីកន្លែងកំណើត" />
              </n-form-item>
              <n-form-item label="អាសយដ្ឋានបច្ចុប្បន្ន" class="col-span-2">
                <n-input v-model:value="editData.personal.address" placeholder="អាសយដ្ឋានបច្ចុប្បន្ន" />
              </n-form-item>
              <n-form-item label="អាសយដ្ឋានអចិន្ត្រៃយ៍" class="col-span-2">
                <n-input v-model:value="editData.personal.current_address" placeholder="អាសយដ្ឋានអចិន្ត្រៃយ៍" />
              </n-form-item>
              <n-form-item label="លេខទូរស័ព្ទ">
                <n-input v-model:value="editData.personal.mobile_phone" placeholder="លេខទូរស័ព្ទ" />
              </n-form-item>
              <n-form-item label="អ៉ីមែល">
                <n-input v-model:value="editData.personal.email" placeholder="អ៉ីមែល" />
              </n-form-item>
              <n-form-item label="កាយសម្បទា" class="col-span-2">
                <n-radio-group v-model:value="editData.personal.body_condition">
                  <n-space>
                    <n-radio value="0" label="គ្រប់គ្រាន់" />
                    <n-radio value="1" label="ពិការភាព" />
                  </n-space>
                </n-radio-group>
              </n-form-item>
              <n-form-item v-if="editData.personal.body_condition == '1'" label="ប្រភេទពិការភាព" class="col-span-2">
                <n-input v-model:value="editData.personal.body_condition_desp" placeholder="ប្រភេទពិការភាព" />
              </n-form-item>
            </div>
          </n-form>
        </template>
      </section-edit-toggle>
      
      <!-- Passports Section -->
      <section-edit-toggle
        v-if="record.people?.passports?.length > 0"
        title="លិខិតឆ្លងដែន"
        subtitle="អាចមានលិខិតឆ្លងដែនច្រើន"
        :editing="editingSections.passports"
        :last-saved="lastSaved.passports"
        @edit="$emit('toggle-edit', 'passports')"
        @cancel="$emit('cancel-edit', 'passports')"
        @save="$emit('save-section', 'passports')"
      >
        <template #view>
          <div class="passports-view">
            <div v-for="(passport, index) in record.people.passports" :key="index" class="mb-4 p-3 border border-gray-200 rounded">
              <div class="font-medium">{{ passport.number }}</div>
              <div class="text-sm text-gray-600">
                ថ្ងៃផុតកំណត់: {{ formatDate(passport.expired_date) }}
              </div>
            </div>
          </div>
        </template>
        
        <template #edit>
          <div class="space-y-4">
            <div v-for="(passport, index) in editData.passports" :key="index" class="p-4 border border-gray-300 rounded">
              <div class="flex justify-between items-center mb-2">
                <h4 class="font-medium">លិខិតឆ្លងដែនទី {{ index + 1 }}</h4>
                <n-button @click="removePassport(index)" size="tiny" type="error">
                  លុប
                </n-button>
              </div>
              <n-form-item label="លេខលិខិតឆ្លងដែន">
                <n-input v-model:value="passport.number" placeholder="លេខលិខិតឆ្លងដែន" />
              </n-form-item>
              <n-form-item label="ថ្ងៃផុតកំណត់">
                <n-date-picker 
                  v-model:value="passport.expired_date" 
                  type="date" 
                  format="dd-MM-yyyy"
                  placeholder="ថ្ងៃផុតកំណត់"
                />
              </n-form-item>
            </div>
            <n-button @click="addPassport" type="primary" size="small">
              + បន្ថែមលិខិតឆ្លងដែន
            </n-button>
          </div>
        </template>
      </section-edit-toggle>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NRadio, NRadioGroup, NSpace, NDatePicker, NButton } from 'naive-ui'
import SectionEditToggle from '../section-edit-toggle.vue'

export default {
  name: 'PersonalTab',
  components: {
    SectionEditToggle,
    NForm,
    NFormItem,
    NInput,
    NRadio,
    NRadioGroup,
    NSpace,
    NDatePicker,
    NButton
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    editData: {
      type: Object,
      required: true
    },
    editingSections: {
      type: Object,
      required: true
    },
    lastSaved: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle-edit', 'cancel-edit', 'save-section'],
  setup(props, { emit }) {
    const formatDate = (dateString) => {
      if (!dateString) return ''
      try {
        const date = new Date(dateString)
        return date.toLocaleDateString('km-KH', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        })
      } catch (e) {
        return dateString
      }
    }
    
    const toKhmer = (number) => {
      if (!number) return ''
      const khmerDigits = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩']
      return number.toString().replace(/\d/g, digit => khmerDigits[digit])
    }
    
    const addPassport = () => {
      if (!props.editData.passports) {
        props.editData.passports = []
      }
      props.editData.passports.push({
        number: '',
        expired_date: null
      })
    }
    
    const removePassport = (index) => {
      if (props.editData.passports && props.editData.passports.length > index) {
        props.editData.passports.splice(index, 1)
      }
    }
    
    return {
      formatDate,
      toKhmer,
      addPassport,
      removePassport
    }
  }
}
</script>

<style scoped>
.personal-tab {
  @apply p-4;
}

.personal-info-view table {
  @apply border-collapse;
}

.personal-info-view td {
  @apply border border-gray-200;
}

.passports-view {
  @apply space-y-3;
}
</style>