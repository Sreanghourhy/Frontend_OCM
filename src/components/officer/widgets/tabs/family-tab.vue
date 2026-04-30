<!-- src/components/officer/widgets/tabs/family-tab.vue -->
<template>
  <div class="family-tab">
    <div class="space-y-6">
      <!-- Wedding Certificate -->
      <section-edit-toggle
        title="ខ.១ ព័ត៌មានប្រពន្ធឬប្ដី"
        :editing="editingSections.wedding"
        :last-saved="lastSaved.wedding"
        @edit="$emit('toggle-edit', 'wedding')"
        @cancel="$emit('cancel-edit', 'wedding')"
        @save="$emit('save-section', 'wedding')"
      >
        <template #view>
          <div v-if="record.people?.wedding_certificates?.length > 0" class="wedding-view">
            <table class="w-full">
              <tbody>
                <tr>
                  <td class="w-48 font-btb-black p-2">លេខសំបុត្រអាពាហ៍ពិពាហ៍</td>
                  <td class="p-2">{{ toKhmer(record.people.wedding_certificates[0].wedding_number) }}</td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">ឈ្មោះប្រពន្ធឬប្តី</td>
                  <td class="p-2">{{ record.people.wedding_certificates[0].spouse_lastname }} {{ record.people.wedding_certificates[0].spouse_firstname }}</td>
                </tr>
                <tr>
                  <td class="w-48 font-btb-black p-2">ថ្ងៃខែឆ្នាំកំណើត</td>
                  <td class="p-2">{{ formatDate(record.people.wedding_certificates[0].spouse_dob) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-center p-8 text-gray-500">
            មិនទាន់មានសំបុត្រអាពាហ៍ពិពាហ៍
          </div>
        </template>
        
        <template #edit>
          <div class="wedding-edit">
            <n-form class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <n-form-item label="លេខសំបុត្រអាពាហ៍ពិពាហ៍">
                  <n-input v-model:value="editData.family.wedding.wedding_number" placeholder="លេខសំបុត្រ" />
                </n-form-item>
                <n-form-item label="គោត្តនាមប្រពន្ធឬប្តី">
                  <n-input v-model:value="editData.family.wedding.spouse_lastname" placeholder="គោត្តនាម" />
                </n-form-item>
                <n-form-item label="នាមប្រពន្ធឬប្តី">
                  <n-input v-model:value="editData.family.wedding.spouse_firstname" placeholder="នាម" />
                </n-form-item>
                <n-form-item label="ថ្ងៃខែឆ្នាំកំណើត">
                  <n-date-picker 
                    v-model:value="editData.family.wedding.spouse_dob" 
                    type="date" 
                    format="dd-MM-yyyy"
                    placeholder="ថ្ងៃខែឆ្នាំកំណើត"
                  />
                </n-form-item>
              </div>
            </n-form>
          </div>
        </template>
      </section-edit-toggle>

      <!-- Parents Information -->
      <section-edit-toggle
        title="ខ.៣ ព័ត៌មានឪពុកនិងម្ដាយបង្កើត"
        :editing="editingSections.parents"
        :last-saved="lastSaved.parents"
        @edit="$emit('toggle-edit', 'parents')"
        @cancel="$emit('cancel-edit', 'parents')"
        @save="$emit('save-section', 'parents')"
      >
        <template #view>
          <div class="parents-view space-y-4">
            <!-- Father -->
            <div class="p-3 border border-gray-200 rounded">
              <h4 class="font-medium mb-2">ឪពុកបង្កើត</h4>
              <div>{{ record.people?.father_lastname || '' }} {{ record.people?.father_firstname || '' }}</div>
              <div v-if="record.people?.father_profession" class="text-sm text-gray-600">
                មុខរបរ: {{ record.people.father_profession }}
              </div>
            </div>
            
            <!-- Mother -->
            <div class="p-3 border border-gray-200 rounded">
              <h4 class="font-medium mb-2">ម្ដាយបង្កើត</h4>
              <div>{{ record.people?.mother_lastname || '' }} {{ record.people?.mother_firstname || '' }}</div>
              <div v-if="record.people?.mother_profession" class="text-sm text-gray-600">
                មុខរបរ: {{ record.people.mother_profession }}
              </div>
            </div>
          </div>
        </template>
        
        <template #edit>
          <div class="parents-edit space-y-6">
            <!-- Father form -->
            <div class="p-4 border border-gray-300 rounded">
              <h4 class="font-medium mb-4">ឪពុកបង្កើត</h4>
              <div class="grid grid-cols-2 gap-4">
                <n-form-item label="គោត្តនាម">
                  <n-input v-model:value="editData.family.parents.father_lastname" placeholder="គោត្តនាម" />
                </n-form-item>
                <n-form-item label="នាម">
                  <n-input v-model:value="editData.family.parents.father_firstname" placeholder="នាម" />
                </n-form-item>
                <n-form-item label="មុខរបរ">
                  <n-input v-model:value="editData.family.parents.father_profession" placeholder="មុខរបរ" />
                </n-form-item>
              </div>
            </div>
            
            <!-- Mother form -->
            <div class="p-4 border border-gray-300 rounded">
              <h4 class="font-medium mb-4">ម្ដាយបង្កើត</h4>
              <div class="grid grid-cols-2 gap-4">
                <n-form-item label="គោត្តនាម">
                  <n-input v-model:value="editData.family.parents.mother_lastname" placeholder="គោត្តនាម" />
                </n-form-item>
                <n-form-item label="នាម">
                  <n-input v-model:value="editData.family.parents.mother_firstname" placeholder="នាម" />
                </n-form-item>
                <n-form-item label="មុខរបរ">
                  <n-input v-model:value="editData.family.parents.mother_profession" placeholder="មុខរបរ" />
                </n-form-item>
              </div>
            </div>
          </div>
        </template>
      </section-edit-toggle>
    </div>
  </div>
</template>

<script>
import { NForm, NFormItem, NInput, NDatePicker } from 'naive-ui'
import SectionEditToggle from '../section-edit-toggle.vue'

export default {
  name: 'FamilyTab',
  components: {
    SectionEditToggle,
    NForm,
    NFormItem,
    NInput,
    NDatePicker
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
  setup(props) {
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
    
    return {
      formatDate,
      toKhmer
    }
  }
}
</script>

<style scoped>
.family-tab {
  @apply p-4;
}
</style>