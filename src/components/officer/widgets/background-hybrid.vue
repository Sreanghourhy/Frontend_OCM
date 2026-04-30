<template>
  <div v-if="show" class="background-hybrid-editable">
    <!-- Main header -->
    <div class="header mb-6">
      <div class="flex justify-between items-center mb-4">
        <h1 class="font-moul text-2xl text-gray-800">កែប្រែជីវប្រវត្តិ{{ officerTypeText }}</h1>
        
        <!-- Global actions -->
        <div class="flex space-x-2">
          <n-button 
            v-if="hasUnsavedChanges" 
            @click="discardAllChanges"
            type="error"
            size="small"
          >
            បោះបង់ការផ្លាស់ប្តូរទាំងអស់
          </n-button>
          
          <n-button 
            @click="saveAllChanges"
            type="primary"
            size="small"
            :loading="savingAll"
            :disabled="!hasUnsavedChanges"
          >
            <template #icon>
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20">
                <g fill="none">
                  <path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path>
                </g>
              </svg>
            </template>
            រក្សាទុកទាំងអស់
          </n-button>
        </div>
      </div>
      
      <!-- Tab navigation -->
      <n-tabs 
        v-model:value="activeTab" 
        type="segment" 
        animated
        class="hybrid-tabs"
      >
        <!-- Tab 1: Personal Information -->
        <n-tab-pane name="personal" tab="ព័ត៌មានផ្ទាល់ខ្លួន">
          <personal-tab 
            :record="record"
            :edit-data="editData"
            :editing-sections="editingSections"
            :last-saved="lastSaved"
            @toggle-edit="toggleSectionEdit"
            @cancel-edit="cancelSectionEdit"
            @save-section="saveSection"
          />
        </n-tab-pane>
        
        <!-- Tab 2: Family Information -->
        <n-tab-pane name="family" tab="ព័ត៌មានគ្រួសារ">
          <family-tab 
            :record="record"
            :edit-data="editData"
            :editing-sections="editingSections"
            :last-saved="lastSaved"
            @toggle-edit="toggleSectionEdit"
            @cancel-edit="cancelSectionEdit"
            @save-section="saveSection"
          />
        </n-tab-pane>
        
        <!-- Tab 3: Education & Languages -->
        <!-- <n-tab-pane name="education" tab="ការអប់រំ និងភាសា">
          <education-tab 
            :record="record"
            :edit-data="editData"
            :editing-sections="editingSections"
            :last-saved="lastSaved"
            @toggle-edit="toggleSectionEdit"
            @cancel-edit="cancelSectionEdit"
            @save-section="saveSection"
          />
        </n-tab-pane> -->
        
        <!-- Tab 4: Work Background -->
        <!-- <n-tab-pane name="work" tab="ប្រវត្តិការងារ">
          <work-tab 
            :record="record"
            :edit-data="editData"
            :editing-sections="editingSections"
            :last-saved="lastSaved"
            @toggle-edit="toggleSectionEdit"
            @cancel-edit="cancelSectionEdit"
            @save-section="saveSection"
          />
        </n-tab-pane> -->
        
        <!-- Tab 5: Rewards & Penalties -->
        <!-- <n-tab-pane name="rewards" tab="ការលើកសរសើរ និងវិន័យ">
          <rewards-tab 
            :record="record"
            :edit-data="editData"
            :editing-sections="editingSections"
            :last-saved="lastSaved"
            @toggle-edit="toggleSectionEdit"
            @cancel-edit="cancelSectionEdit"
            @save-section="saveSection"
          />
        </n-tab-pane> -->

      </n-tabs>
    </div>
    
    <!-- Status bar -->
    <div v-if="hasUnsavedChanges" class="status-bar fixed bottom-4 right-4 bg-blue-100 border border-blue-300 rounded-lg p-3 shadow-lg">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
        <span class="text-sm font-medium text-blue-700">មានការផ្លាស់ប្តូរដែលមិនទាន់រក្សាទុក</span>
        <n-button @click="saveAllChanges" size="tiny" type="primary">
          រក្សាទុកឥឡូវ
        </n-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { NButton, NTabs, NTabPane } from 'naive-ui'
import SectionEditToggle from './section-edit-toggle.vue'

// Import tab components
import PersonalTab from './tabs/personal-tab.vue'
import FamilyTab from './tabs/family-tab.vue'
import EducationTab from './tabs/education-tab.vue'
import WorkTab from './tabs/work-tab.vue'
import RewardsTab from './tabs/rewards-tab.vue'

export default {
  name: 'BackgroundHybridEditable',
  components: {
    NButton,
    NTabs,
    NTabPane,
    SectionEditToggle,
    PersonalTab,
    FamilyTab,
    // EducationTab,
    // WorkTab,
    // RewardsTab
  },
  props: {
    record: {
      type: Object,
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const store = useStore()
    
    // State
    const activeTab = ref('personal')
    const savingAll = ref(false)
    const editData = reactive({
      personal: {},
      family: {},
      education: {},
      work: {},
      rewards: {}
    })
    
    const editingSections = reactive({
      personal: false,
      family: false,
      education: false,
      work: false,
      rewards: false
    })
    
    const lastSaved = reactive({
      personal: null,
      family: null,
      education: null,
      work: null,
      rewards: null
    })
    
    // Computed
    const officerTypeText = computed(() => {
      const type = props.record?.additional_officer_type
      const types = {
        'politician': 'មន្ត្រីនយោបាយ',
        'admin_official': 'មន្ត្រីមុខងារសាធារណៈ',
        'admin_unofficial': 'មន្ត្រីជាប់កិច្ចសន្យា',
        'contracted_officer': 'មន្ត្រីផ្អែកលើកិច្ចព្រមព្រៀងការងារ'
      }
      return types[type] || 'មន្ត្រីរាជការ'
    })
    
    const hasUnsavedChanges = computed(() => {
      return Object.values(editingSections).some(value => value === true)
    })
    
    // Methods
    const initializeEditData = () => {
      // Deep clone record data for editing
      if (props.record) {
        editData.personal = JSON.parse(JSON.stringify(props.record.people || {}))
        editData.family = {
          wedding: props.record.people?.wedding_certificates?.[0] || {},
          parents: {
            father_lastname: props.record.people?.father_lastname || '',
            father_firstname: props.record.people?.father_firstname || '',
            mother_lastname: props.record.people?.mother_lastname || '',
            mother_firstname: props.record.people?.mother_firstname || ''
          }
        }
        // Initialize other sections similarly
      }
    }
    
    const toggleSectionEdit = (section) => {
      editingSections[section] = !editingSections[section]
      if (editingSections[section]) {
        initializeEditData()
      }
    }
    
    const cancelSectionEdit = (section) => {
      editingSections[section] = false
      // Reset edit data for this section
      initializeEditData()
    }
    
    const saveSection = async (section) => {
      try {
        // Implement section-specific save logic
        console.log(`Saving ${section} section:`, editData[section])
        
        // Update last saved timestamp
        lastSaved[section] = new Date()
        
        // Turn off edit mode
        editingSections[section] = false
        
        // Show success message
        // message.success(`Saved ${section} successfully`)
      } catch (error) {
        console.error(`Error saving ${section}:`, error)
        // message.error(`Failed to save ${section}`)
      }
    }
    
    const saveAllChanges = async () => {
      savingAll.value = true
      try {
        // Save all sections that have been edited
        const sectionsToSave = Object.keys(editingSections).filter(key => editingSections[key])
        
        for (const section of sectionsToSave) {
          await saveSection(section)
        }
        
        // Show success message
        // message.success('All changes saved successfully')
      } catch (error) {
        console.error('Error saving all changes:', error)
        // message.error('Failed to save all changes')
      } finally {
        savingAll.value = false
      }
    }
    
    const discardAllChanges = () => {
      // Reset all edit states
      Object.keys(editingSections).forEach(key => {
        editingSections[key] = false
      })
      initializeEditData()
      // message.info('All changes discarded')
    }
    
    // Initialize when component mounts
    initializeEditData()
    
    return {
      activeTab,
      savingAll,
      editData,
      editingSections,
      lastSaved,
      officerTypeText,
      hasUnsavedChanges,
      toggleSectionEdit,
      cancelSectionEdit,
      saveSection,
      saveAllChanges,
      discardAllChanges
    }
  }
}
</script>

<style scoped>
.background-hybrid-editable {
  @apply p-6 bg-gray-50 min-h-screen;
}

.hybrid-tabs {
  @apply bg-white rounded-lg shadow-sm;
}

.status-bar {
  z-index: 1000;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>