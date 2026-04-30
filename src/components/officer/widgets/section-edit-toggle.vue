<template>
  <div class="section-edit-toggle" :class="{ 'editing': editing }">
    <div class="section-header flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
      <div class="section-title">
        <h3 class="font-moul text-lg text-gray-700">{{ title }}</h3>
        <p v-if="subtitle" class="text-sm text-gray-500 mt-1">{{ subtitle }}</p>
      </div>
      
      <div class="section-actions flex space-x-2">
        <n-button 
          v-if="!editing && !readonly" 
          @click="startEditing"
          type="primary"
          size="small"
          class="edit-button"
        >
          <template #icon>
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M11.842 3.097L12.9 2.04a2.438 2.438 0 1 1 3.447 3.447l-1.058 1.058l-3.447-3.447zm-1.685 1.685L3.098 11.84a2.2 2.2 0 0 0-.577 1.02l-.876 3.925a.55.55 0 0 0 .674.673l3.925-.875c.386-.086.739-.28 1.02-.577l7.059-7.059l-3.447-3.447zM5.5 4A1.5 1.5 0 0 1 7 2.5h5.75a.75.75 0 0 1 0 1.5H7a.5.5 0 0 0-.5.5v9.75a.75.75 0 0 1-1.5 0V4z" fill="currentColor"></path></g></svg>
          </template>
          កែប្រែ
        </n-button>
        
        <n-button 
          v-if="editing" 
          @click="cancelEditing"
          type="error"
          size="small"
          class="cancel-button"
        >
          <template #icon>
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512"><path d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192s192-86 192-192z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M320 320L192 192"></path><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M192 320l128-128"></path></svg>
          </template>
          បោះបង់
        </n-button>
        
        <n-button 
          v-if="editing" 
          @click="saveChanges"
          type="success"
          size="small"
          class="save-button"
          :loading="saving"
        >
          <template #icon>
            <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 20 20"><g fill="none"><path d="M3 5a2 2 0 0 1 2-2h8.379a2 2 0 0 1 1.414.586l1.621 1.621A2 2 0 0 1 17 6.621V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1v-4.5A1.5 1.5 0 0 1 6.5 10h7a1.5 1.5 0 0 1 1.5 1.5V16a1 1 0 0 0 1-1V6.621a1 1 0 0 0-.293-.707l-1.621-1.621A1 1 0 0 0 13.379 4H13v2.5A1.5 1.5 0 0 1 11.5 8h-4A1.5 1.5 0 0 1 6 6.5V4H5zm2 0v2.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5V4H7zm7 12v-4.5a.5.5 0 0 0-.5-.5h-7a.5.5 0 0 0-.5.5V16h8z" fill="currentColor"></path></g></svg>
          </template>
          រក្សាទុក
        </n-button>
      </div>
    </div>
    
    <div class="section-content">
      <!-- View Mode -->
      <div v-if="!editing" class="view-mode">
        <slot name="view">
          <div class="p-4 bg-white rounded-lg border border-gray-100">
            <p class="text-gray-500 text-center">មិនទាន់មានព័ត៌មាន</p>
          </div>
        </slot>
      </div>
      
      <!-- Edit Mode -->
      <div v-if="editing" class="edit-mode">
        <div class="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <slot name="edit">
            <div class="text-center p-8">
              <p class="text-gray-500">សូមបន្ថែមទម្រង់កែប្រែនៅទីនេះ</p>
            </div>
          </slot>
        </div>
      </div>
    </div>
    
    <!-- Save status indicator -->
    <div v-if="showStatus && lastSaved" class="mt-2 text-xs text-gray-400 flex items-center">
      <svg class="w-3 h-3 mr-1 text-green-500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024"><path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448s448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 0 1-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8l157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" fill="currentColor"></path></svg>
      រក្សាទុកចុងក្រោយ: {{ formatDate(lastSaved) }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { NButton } from 'naive-ui'

export default {
  name: 'SectionEditToggle',
  components: {
    NButton
  },
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    editing: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showStatus: {
      type: Boolean,
      default: true
    },
    lastSaved: {
      type: [Date, String, Number],
      default: null
    }
  },
  emits: ['edit', 'cancel', 'save'],
  setup(props, { emit }) {
    const saving = ref(false)
    
    const startEditing = () => {
      emit('edit', true)
    }
    
    const cancelEditing = () => {
      emit('cancel')
    }
    
    const saveChanges = async () => {
      saving.value = true
      try {
        await emit('save')
      } finally {
        saving.value = false
      }
    }
    
    const formatDate = (date) => {
      if (!date) return ''
      const d = new Date(date)
      return d.toLocaleDateString('km-KH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }
    
    return {
      saving,
      startEditing,
      cancelEditing,
      saveChanges,
      formatDate
    }
  }
}
</script>

<style scoped>
.section-edit-toggle {
  transition: all 0.3s ease;
}

.section-edit-toggle.editing {
  border-left: 3px solid #3b82f6;
  padding-left: 8px;
}

.section-header {
  transition: all 0.3s ease;
}

.edit-mode {
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>